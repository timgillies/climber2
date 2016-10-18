class Admin::WallsController < ApplicationController
  before_action :authenticate_user!,        only: [:index, :show, :new, :create, :edit, :update, :destroy]
  before_action :facility_admin,            only: [:index, :show, :new, :create, :edit, :update, :destroy]
  before_action :setter_role,               only: [:destroy]
  before_action :marketing_role,            except: [:index, :show]

  layout "admin"

  def index
    @walls = Wall.page(params[:page])
  end

  def new
    @wall = Wall.new
    @facility = Facility.find(params[:facility_id])
    @walls = @facility.walls.page(params[:page])
    @facilityzones = @facility.zones.all.map{|fw| [fw.name, fw.id ] }

  end

  def show
    @wall = Wall.find(params[:id])
  end

  def create
    @facility = Facility.find(params[:facility_id]) #This ensures the redirect_to goes back to the nested resource
    @wall = current_user.walls.build(wall_params)
    @walls = Wall.page(params[:page]) # makes "each" work in the partial
    @wall.facility_id = params[:facility_id] #this passes the facility ID through the field
    @facilityzones = @facility.zones.all.map{|fw| [fw.name, fw.id ] }
    if @wall.save
      flash[:success] = "Zone created!"
      redirect_to(admin_facility_zones_path(@facility))
    else
      render 'new'
    end
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @wall = @facility.walls.find(params[:id])
    @facilityzones = @facility.zones.all.map{|fw| [fw.name, fw.id ] }
    if @wall.update_attributes(wall_params)
      flash[:success] = "Zone updated!"
      redirect_to(admin_facility_zones_path(@facility))
      # Handle a successful update.
    else
      render :new
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @wall = Wall.find(params[:id])
    @walls = @facility.walls.page(params[:page])
    @facilityzones = @facility.zones.all.map{|fw| [fw.name, fw.id ] }
  end

  def destroy
    Wall.find(params[:id]).destroy
    flash[:success] = "Zone deleted"
    redirect_to :back
  end

  private

    def wall_params
      params.require(:wall).permit(:name, :facility_id, :user_id, :vertical_ft, :zone_id)
    end
  end
