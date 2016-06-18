class Admin::RoutesController < Admin::FacilitiesController
  before_action :logged_in_user,    only: [:index, :show, :edit, :update, :destroy]
  before_action :facilityroute_admin,      only: [:index, :show, :edit, :update, :destroy]

  layout "admin"

  def index
    @facility = Facility.find(params[:facility_id])
    @routes = @facility.routes.page(params[:page])

    @filterrific = initialize_filterrific(
      Facility.routes,
      params[:filterrific]
    ) or return
    @routes = @filterrific.find.page(params[:page])

    respond_to do |format|
      format.html
      format.js
    end


  end

  def new
    @route = Route.new
    @facility = Facility.find(params[:facility_id])
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }

    if @facility.custom?
      @facilitygrades = @facility.grades.all.map{|fg| [fg.grade, fg.id ] }
    else
      @facilitygrades = Grade.where(system: ['yds','vscale']).map{|sg| [sg.grade, sg.id ] }
    end

    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
  end

  def show
    @route = Route.find(params[:id])
  end

  def create
    @facility = Facility.find(params[:facility_id])
    @route = current_user.routes.build(route_params)
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }
    if @facility.custom?
      @facilitygrades = @facility.grades.all.map{|fg| [fg.grade, fg.id ] }
    else
      @facilitygrades = Grade.where(system: ['yds','vscale']).map{|sg| [sg.grade, sg.id ] }
    end
    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @route.facility_id = params[:facility_id]
    if @route.save
      flash[:success] = "Route created!"
      redirect_to(new_admin_facility_route_path(@facility))
    else
      render 'new'
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @route = Route.find(params[:id])
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }
    @facilitygrades = @facility.grades.all.map{|fg| [fg.grade, fg.id ] }
    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @route.facility_id = params[:facility_id]
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @route = Route.find(params[:id])
    if @route.update_attributes(route_params)
      flash[:success] = "Route updated"
      redirect_to(admin_facility_routes_path(@facility))
      # Handle a successful update.
    else
      render 'edit'
    end
  end

  def destroy
    Route.find(params[:id]).destroy
    flash[:success] = "Route deleted"
    redirect_to :back
  end

  private


  def route_params
    params.require(:route).permit(:name, :color, :setter, :setdate, :enddate, :facility_id, :grade_id, :zone_id, :wall_id)
  end
end
