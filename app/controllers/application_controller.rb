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
    if user_signed_in?
      if current_user.role == "site_admin"
        @userfacilities = Facility.all
      else
        @userfacilities = current_user.facilities.all
      end
    end
  end

  # Sets the role names that have access to the facility within the admin area
  def facility_admin_roles
    ['facility_management', 'setter', 'head_setter', 'marketing']
  end


  # checks if @facility is used within the facility controller or outside of it
  def facility_controller_check
    if params[:controller] == 'admin/facilities'
      @facility = Facility.find(params[:id])
    else
      @facility = Facility.find(params[:facility_id])
    end
    @facility_role_access = FacilityRole.find_by(facility_id: @facility.id, user_id: current_user.id)
  end

  # redirects user to facility home if role does not have permission (based on "before_action" filters in controllers)
  def role_redirect(role)
    @facility_role_access = FacilityRole.find_by(facility_id: @facility.id, user_id: current_user.id)

    unless current_user.role == "site_admin" # overrides assigned facility roles
      if @facility_role_access.present? && @facility_role_access.name == role
          flash[:danger] = 'You are not authorized.  Contact your manager for access'
          redirect_to admin_facility_path(@facility)
      end
    end
  end


  # Confirms a relationship between the user and the facility based on the above roles
  def facility_admin
    facility_controller_check
    @facility_role_access = FacilityRole.find_by(facility_id: @facility.id, user_id: current_user.id)
    unless  ((@facility_role_access.present? && facility_admin_roles.include?(@facility_role_access.name)) || current_user.role == "site_admin") || ((params[:action] == 'new' || params[:action] == 'create') && current_user.role == "facility_admin")
      flash[:danger] = 'You are not authorized.  Please request access from your manager'
      redirect_to root_url
    end
  end

  # Roles for "before_action" filters
  def head_setter_role
    facility_controller_check
    role_redirect('head_setter')
  end

  def setter_role
    facility_controller_check
    role_redirect('setter')
  end

  def facility_management_role
    facility_controller_check
    role_redirect('facility_management')
  end

  def marketing_role
    facility_controller_check
    role_redirect('marketing')
  end



  def site_admin
    unless current_user.role == "site_admin"
      flash[:danger] = 'Page not found'
      redirect_to root_url
    end
  end

protected

  def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password, :role) }
      devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:name, :email, :password, :current_password, :role) }
  end
end
