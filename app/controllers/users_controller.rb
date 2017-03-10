class UsersController < ApplicationController
  before_action :authenticate_user!,    only: [:index, :edit, :update, :destroy]

  include UsersHelper

  layout 'user'

  def index
    @users = User.page(params[:page]).per(25)
  end

  def show
    @user = User.find(params[:id])
    @facilities = @user.facilities.page(params[:page])
    @routes = @user.routes.page(params[:page])
    @facility_roles = FacilityRole.where(user_id: @user, confirmed: true).page(params[:page])
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
