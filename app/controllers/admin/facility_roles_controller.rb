class Admin::FacilityRolesController < ApplicationController
  before_action :authenticate_user!,        only: [:index, :new, :edit, :update, :destroy]
  before_action :facility_admin,            only: [:index, :edit, :update, :destroy]
  before_action :setter_role,               except: [:index, :show]
  before_action :marketing_role,            except: [:index, :show]


  include FacilityRolesHelper
  include FacilitiesHelper

  layout "admin"

  def index
    @facility = Facility.find(params[:facility_id])
    @facility_role = FacilityRole.new
    @facility_roles = @facility.facility_roles.page(params[:page])
    @role_names = role_names # populates drop down of role names for creating a new facility user
    @facility_systems = facility_systems.page(params[:page])
  end

  def new
    @facility_role = FacilityRole.new
    @facility = Facility.find(params[:facility_id])
    @facility_roles = @facility.facility_roles.page(params[:page])
    @role_names = role_names
  end

  def create
    @facility = Facility.find(params[:facility_id]) #This ensures the redirect_to goes back to the nested resource
    @facility_role = @facility.facility_roles.build(facility_role_params)
    @facility_roles = FacilityRole.page(params[:page]) # makes "each" work in the partial
    @facility_role.facility_id = params[:facility_id] #this passes the facility ID through the field
    if @facility_role.save
      flash[:success] = "User added!"
      redirect_to(admin_facility_facility_roles_path(@facility))
    else
      render 'new'
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
    @facility_roles = @facility.facility_roles.page(params[:page])
    @role_names = role_names
  end

  def destroy
    FacilityRole.find(params[:id]).destroy
    flash[:success] = "Role deleted"
    redirect_to :back
  end

  private

    def facility_role_params
      params.require(:facility_role).permit(:email, :name, :user_id, :confirmed, :facility_id)
    end


end
