class Admin::FacilityRolesController < ApplicationController
  before_action :authenticate_user!,        only: [:index, :new, :edit, :update, :destroy], :unless => :facility_is_demo
  before_action :facility_admin,            only: [:index, :edit, :update, :destroy], :unless => :facility_is_demo
  before_action :demo_facility,             except: [:index, :show, :new]
  before_action :setter_role,               except: [:index, :show]
  before_action :guest_role,               except: [:index, :show]
  before_action :marketing_role,            except: [:index, :show]



  include FacilityRolesHelper
  include FacilitiesHelper
  include GradesHelper

  layout "admin"

  def index
    @facility = Facility.find(params[:facility_id])
    @facility_role = FacilityRole.new
    @facility_roles = @facility.facility_roles.admin.includes(:user).page(params[:page]).per(2000)
    @role_names = role_names # populates drop down of role names for creating a new facility user
    @facility_systems = facility_systems.page(params[:page]).per(2000)
  end

  def new
    @facility_role = FacilityRole.new
    @facility = Facility.find(params[:facility_id])
    @facility_roles = @facility.facility_roles.admin.includes(:user).page(params[:page]).per(2000)
    @role_names = role_names
  end

  def create
    @facility = Facility.find(params[:facility_id]) #This ensures the redirect_to goes back to the nested resource
    @facility_role = @facility.facility_roles.build(facility_role_params)
    @facility_roles = @facility.facility_roles.admin.includes(:user).page(params[:page]).per(2000)
    @facility_role.facility_id = params[:facility_id] #this passes the facility ID through the field
    @inviter = current_user
    if @facility_role.save
      flash[:success] = "#{ @facility_role.email } was successfully invited!"
      FacilityRoleMailer.role_invite_email(@facility_role).deliver_now
      redirect_to(admin_facility_facility_roles_path(@facility))
    elsif FacilityRole.where(facility_id: @facility.id, email: @facility_role.email).present?
       @existing_facility_role = FacilityRole.where(facility_id: @facility.id, email: @facility_role.email).first
       @existing_facility_role.update_attributes(name: @facility_role.name)
       flash[:success] = "#{ @existing_facility_role.user.name } was updated to #{ @existing_facility_role.name } !"
       redirect_to(admin_facility_facility_roles_path(@facility))
    else
      flash[:error] = "#{ @facility_role.email } was not added!  Please make sure #{ @facility_role.email } is not already assigned a role."
      redirect_to(admin_facility_facility_roles_path(@facility))
    end
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @facility_role = @facility.facility_roles.find(params[:id])
    if @facility_role.update_attributes(facility_role_params)
      flash[:success] = "Role updated!"
      redirect_to(admin_facility_facility_roles_path(@facility))
      # Handle a successful update.
    else
      render :new
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @facility_role = FacilityRole.find(params[:id])
    @facility_roles = @facility.facility_roles.admin.includes(:user).page(params[:page]).per(2000)
    @role_names = role_names
  end

  def destroy
    FacilityRole.find(params[:id]).destroy
    flash[:success] = "Role deleted"
    redirect_to :back
  end

  def resend_invite
    @facility_role = FacilityRole.find(params[:id])
    FacilityRoleMailer.role_invite_email(@facility_role).deliver_now
    redirect_to(admin_facility_facility_roles_path(@facility))
  end

  private

    def facility_role_params
      params.require(:facility_role).permit(:email, :name, :user_id, :confirmed, :facility_id)
    end


end
