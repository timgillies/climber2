class Admin::ZonesController < ApplicationController
  before_action :authenticate_user!,        only: [:index, :show, :new, :create, :edit, :update, :destroy]
  before_action :facility_admin,            only: [:index, :show, :new, :create, :edit, :update, :destroy]
  before_action :setter_role,               only: [:destroy, :new, :create, :edit, :update]
  before_action :guest_role,               only: [:destroy, :new, :create, :edit, :update]
  before_action :marketing_role,            except: [:index, :show]

  layout "admin"

  def index
    @facility = Facility.find(params[:facility_id])
    @zones = @facility.zones.page(params[:page])
    @wall = Wall.new
    @facilityzones = @facility.zones.all.map{|fw| [fw.name, fw.id ] }
  end

  def new
    @zone = Zone.new
    @facility = Facility.find(params[:facility_id])
    @zones = @facility.zones.page(params[:page])
  end

  def show
    @zones = @facility.zones.page(params[:page])
  end

  def create
    @facility = Facility.find(params[:facility_id]) #This ensures the redirect_to goes back to the nested resource
    @zone = current_user.zones.build(zone_params)
    @zones = @facility.zones.page(params[:page]) # makes "each" work in the partial
    @zone.facility_id = params[:facility_id] #this passes the facility ID through the field
    if @zone.save
      flash[:success] = "Zone created!"
      redirect_to(admin_facility_zones_path(@facility))
    else
      flash[:danger] = "Zone not saved!"
      render 'index'
    end
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @zones = @facility.zones.page(params[:page])
    @zone = @facility.zones.find(params[:id])
    if @zone.update_attributes(zone_params)
      flash[:success] = "Zone updated!"
      redirect_to(admin_facility_zones_path(@facility))
      # Handle a successful update.
    else
      flash[:danger] = "Zone not saved!"
      render 'index'
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @zone = Zone.find(params[:id])
    @zones = @facility.zones.page(params[:page])
  end

  def mass_expire
    @facility = Facility.find(params[:facility_id])
    @zone = Zone.find(params[:zone_id])
    @route = Route.where(zone_id: @zone.id )
    @route.update_all( {:enddate => Date.yesterday})
    redirect_to(admin_facility_zones_path(@facility))
  end

  def destroy
    Zone.find(params[:id]).destroy
    flash[:success] = "Zone deleted"
    redirect_to :back
  end

  private

    def zone_params
      params.require(:zone).permit(:name, :facility_id, :user_id)
    end
  end
