class ZonesController < ApplicationController

  def index
    @zones = Zone.order('discipline ASC', 'rank ASC').paginate(page: params[:page])
  end

  def new
    @zone = Zone.new
    @zones = Zone.paginate(page: params[:page])
    @facility = Facility.find(params[:facility_id])
  end

  def show
    @zones = Zone.find(params[:id])
  end

  def create
    @facility = Facility.find(params[:facility_id]) #This ensures the redirect_to goes back to the nested resource
    @zone = current_user.zones.build(zone_params)
    @zones = Zone.paginate(page: params[:page]) # makes "each" work in the partial
    @zone.facility_id = params[:facility_id] #this passes the facility ID through the field
    if @zone.save
      flash[:success] = "Zone created!"
      redirect_to(new_facility_zone_path(@facility))
    else
      render :new
    end
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @zone = current_user.zones.build(zone_params)
    if @zone.update_attributes(zone_params)
      flash[:success] = "Zone updated!"
      redirect_to(new_facility_zone_path(@facility))
      # Handle a successful update.
    else
      render :new
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @zone = Zone.find(params[:id])
    @zones = Zone.order('discipline ASC', 'rank ASC').paginate(page: params[:page]) # makes "each" work in the partial
  end

  def destroy
  end

  private

    def zone_params
      params.require(:zone).permit(:name, :facility_id, :user_id)
    end
  end
