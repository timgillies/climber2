class UsersController < ApplicationController
  before_action :authenticate_user!,    only: [:index, :edit, :update, :destroy]
  before_action :correct_user, only: [:edit, :update, :destroy]

  include UsersHelper

  layout 'user'

  def index
    @users = User.page(params[:page]).per(25)
    @user = User.find(params[:id])
  end

  def show
    @user = User.find(params[:id])
    @facilities = @user.facilities.page(params[:page])
    @routes = @user.routes.page(params[:page])
    @facility_roles = FacilityRole.where(user_id: @user, confirmed: true).page(params[:page])
    @tick_dates = Tick.where(user_id: @user.id).map { |tick| tick.date }.uniq
    @ticks = Tick.where(user_id: @user).page(params[:page]).per(5000000)
    @userfacilities_check = @user.facility_relationships.all

    #refactored tick_feed and new_route_feed into respective models
    @news_feed = @user.ticks.tick_feed(@userfacilities_check) + @user.routes.new_route_feed(@userfacilities_check)

    #combines new ticks and new routes, newest first
    @news_feed.sort! { |a, b| b.created_at <=> a.created_at }
  end

  def new
    @user = User.new
    @genders = genders
  end

  def create
    @user = User.new(user_params)
    @genders = genders
    if @user.save
      @user.send_activation_email
      flash[:info] = "Please check your email to activate your account."
      redirect_to user_path
    else
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
    @genders = genders
  end

  def update
    @user = User.find(params[:id])
    @genders = genders
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated"
      redirect_to user_path
      # Handle a successful update.
    else
      render 'edit'
    end
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "User deleted"
    redirect_to users_url
  end

  def manage
    @user = User.find(params[:id])
    @facilities = @user.facilities.page(params[:page])
  end

  def inbox
    @facility_roles = FacilityRole.where("email = ?", current_user.email).page(params[:page])
    @user = User.find(params[:id])
  end

  def home
    @user = User.find(params[:id])
    @userfacilities_check = current_user.facility_relationships.all

    #refactored tick_feed and new_route_feed into respective models
    @news_feed = Tick.tick_feed(@userfacilities_check) + Route.new_route_feed(@userfacilities_check)

    #combines new ticks and new routes, newest first
    @news_feed.sort! { |a, b| b.created_at <=> a.created_at }

    @ticks = Tick.where('ticks.date > ?', 7.days.ago.beginning_of_day.to_date).where(user_id: @user)
    @admin_facility_roles = FacilityRole.where(user_id: @user).where.not(name: 'climber').page(params[:page])
  end






  private

  def user_params
    params.require(:user).permit(:name, :email, :password,
                                    :password_confirmation, :role, :gender, :zip, :avatar)
  end

  # Before filters

  # Confirms the correct user
  def correct_user
    @user = User.find(params[:id])
    unless (current_user == @user || current_user.role == "site_admin")
    redirect_to(root_url)
    flash[:warning] = "You can't access that!"
    end

  end

end
