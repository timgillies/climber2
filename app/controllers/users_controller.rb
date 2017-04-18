class UsersController < ApplicationController
  before_action :authenticate_user!,    only: [:index, :edit, :update, :destroy]

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

    @tick_feed = Tick.where('ticks.created_at > ?', 6.days.ago.to_date).joins(:route).merge(Route.where(facility_id: @userfacilities_check)).includes(:user, :grade, :route, :facility)
    @new_route_feed = Route.where(facility_id: @userfacilities_check).where('routes.created_at > ?', 6.days.ago.to_date).order(created_at: :desc).includes(:zone, :grade, :facility)

    @news_feed = @tick_feed + @new_route_feed

    #newest first
    @news_feed.sort! { |a, b| b.created_at <=> a.created_at }

    @top_10_sends = Tick.includes(:grade, :user).where.not(tick_type: "project").grade_desc.take(10)

    # gets top 10 routes based on ratings cache average
    @top_10_routes = Route.where(facility_id: @userfacilities_check).includes(:grade, :facility).where(id: RatingCache.where(cacheable_type: "Route").order('rating_caches.avg desc').take(10).map { |rate| [rate.cacheable_id.to_i] } )

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

    redirect_to(root_url) unless (current_user == @user || current_user.role == "site_admin")
  end

end
