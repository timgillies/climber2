class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :set_facilities
  before_action :set_facility_role_access

  include RoutesHelper
  include GradesHelper



  before_filter :configure_permitted_parameters, if: :devise_controller?

  private

  # Confirms a logged-in user.


  # Sets up facilities to list in Route Management dropdown
  # facility_relationships refers to the user/facility model association
    #  has_many :facility_relationships, :through => :facility_roles, source: :facility

  def set_facilities
    if user_signed_in?
      if current_user.role == "site_admin"
        @userfacilities = Facility.all
      else
        @userfacilities = current_user.facility_relationships.includes(:facility_roles).where.not(facility_roles: {name: 'climber'}).all
      end
    end
  end

def set_facility_role_access
    if ((params[:facility_id].blank?) && (params[:controller] == 'admin/facilities')) || (params[:facility_id].present?)
      facility_controller_check
      @route = Route.new
      facility_controller_check
      @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }
      @r_value = ric_values
      @i_value = ric_values
      @c_value = ric_values
      @route_status = route_status_values

      @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }

      @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
      @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id]}
      if user_signed_in?
        @facility_role_access = FacilityRole.where.not(name: 'climber').find_by(facility_id: @facility.id, user_id: current_user.id)
      else
        @facility_role_access = nil
      end
  end
end

  # Sets the role names that have access to the facility within the admin area
  def facility_admin_roles
    ['facility_management', 'setter', 'head_setter', 'marketing', 'guest']
  end


  # checks if @facility is used within the facility controller or outside of it
  def facility_controller_check
    if params[:controller] == 'admin/facilities'
      if params[:action] == 'new'
        @facility = Facility.new
      elsif params[:action] == 'create'
        @facility = current_user.facilities.build(facility_params)
      else
      @facility = Facility.find(params[:id])
      end
    else
      @facility = Facility.find(params[:facility_id])
    end
  end

  # redirects user to facility home if role does not have permission (based on "before_action" filters in controllers)
  def role_redirect(role)
    facility_controller_check
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
    unless  current_user.role == "site_admin" || (@facility_role_access.present? && current_user.role == "facility_admin")
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

  def guest_role
    facility_controller_check
    role_redirect('guest')
  end

  def paid_subscriber
    facility_controller_check
    unless @facility.subscriptions.where(status: "active").count > 0 #checks if customer is a paid subscriber
      unless Route.where(facility_id: @facility.id).count < 101  #if not a subscriber, allows first 100 routes for free
        redirect_to new_admin_facility_subscription_path(@facility)
      end
    end
  end

  def site_admin
    unless current_user.role == "site_admin"
      flash[:danger] = 'Page not found'
      redirect_to root_url
    end
  end

  def route_owner
    facility_controller_check
    @route = Route.find(params[:id])
    unless current_user.role == "site_admin"
       unless current_user == @route.user || ["facility_management", "head_setter"].include?(@facility_role_access.name)
         flash[:danger] = 'You cannot edit this route.  You may flag this route to have your manager or the route owner update the route.'
         redirect_to admin_facility_routes_url(@facility)
      end
    end
  end

  def demo_facility
    unless user_signed_in? && current_user.role == "site_admin"
      if @facility.demo?
        flash[:success] = "Whoa there!  You can't do that in demo mode, but hopefully you're getting psyched about Climb Connect."
        redirect_to :back
      end
    end
  end

  def facility_is_demo
    @facility.demo == true if @facility
  end

  def filter_reset
    filterrific[reset_filterrific]
  end

protected

  def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password, :role) }
      devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:name, :email, :password, :current_password, :role, :gender, :zip, :avatar) }
  end
end
