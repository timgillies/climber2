class Admin::SubChildZonesController < ApplicationController
  before_action :authenticate_user!,        only: [:new, :create, :edit, :update, :destroy]
  before_action :facility_admin,            only: [:new, :create, :edit, :update, :destroy]
  before_action :setter_role,               only: [:destroy, :new, :create, :edit, :update]
  before_action :guest_role,               only: [:destroy, :new, :create, :edit, :update]
  before_action :marketing_role,            except: [:index, :show]

  layout "admin"

  def new
    @sub_child_zone = SubChildZone.new
    @facility = Facility.find(params[:facility_id])
    @sub_child_zones = @facility.sub_child_zones.page(params[:page])
    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }

  end

  def create
    @facility = Facility.find(params[:facility_id]) #This ensures the redirect_to goes back to the nested resource
    @sub_child_zone = current_user.sub_child_zones.build(sub_child_zone_params)
    @sub_child_zones = @facility.sub_child_zones.page(params[:page]) # makes "each" work in the partial
    @sub_child_zone.facility_id = params[:facility_id] #this passes the facility ID through the field
    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    if @sub_child_zone.save
      flash[:success] = "Zone created!"
      redirect_to(admin_facility_zones_path(@facility))
    else
      render 'new'
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @sub_child_zone = SubChildZone.find(params[:id])
    @sub_child_zones = @facility.sub_child_zones.page(params[:page])
    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @sub_child_zone = @facility.sub_child_zones.find(params[:id])
    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    if @sub_child_zone.update_attributes(wall_params)
      flash[:success] = "Zone updated!"
      redirect_to(admin_facility_zones_path(@facility))
      # Handle a successful update.
    else
      flash[:danger] = "Zone not saved!"
      redirect_to(admin_facility_zones_path(@facility))
    end
  end

  def destroy
    SubChildZone.find(params[:id]).destroy
    flash[:success] = "Zone deleted"
    redirect_to :back
  end

  private

  def sub_child_zone_params
    params.require(:sub_child_zone).permit(:name, :facility_id, :user_id, :wall_id)
  end

end
