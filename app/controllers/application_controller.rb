class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :set_facilities



  before_filter :configure_permitted_parameters, if: :devise_controller?

  private

  # Confirms a logged-in user.


  # Sets up facilities to list in Route Management dropdown
  def set_facilities
    @userfacilities = current_user.facilities.all if user_signed_in?
  end


  # Confirms user owns the facility
  def facility_admin
    @facility = Facility.find(params[:id])
    unless @facility.user_id == current_user.id
      flash[:danger] = 'Page not found'
      redirect_to admin_facilities_url
    end
  end

  def facilityroute_admin
    @facility = Facility.find(params[:facility_id])
    unless @facility.user_id == current_user.id
      flash[:danger] = 'Page not found'
      redirect_to admin_facilities_url
    end
  end

protected

    def configure_permitted_parameters
        devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password, :role) }
        devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:name, :email, :password, :current_password, :role) }
    end
end
