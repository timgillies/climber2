class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper

  private

  # Confirms a logged-in user.
  def logged_in_user
    unless logged_in?
      store_location
      flash[:danger] = "Please log in."
      redirect_to login_url
    end
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
end
