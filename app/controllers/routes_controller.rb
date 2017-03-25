class RoutesController < ApplicationController
  before_action :authenticate_user!,    only: [:show]

  layout "user"

  def index
    @user = User.find(params[:user_id])
    @filterrific = initialize_filterrific(
      Route,
      params[:filterrific],
      select_options: {
        sorted_by: Route.options_for_sorted_by,
        with_facility_id: options_for_facility_select,
        with_grade_id: options_for_grade_select,
        with_zone_id: options_for_zone_select,
        with_wall_id: options_for_wall_select,
        with_setter_id: options_for_setter_select,
        with_status_id: Route.options_for_status_select
      },
      persistence_id: 'shared_key',
    ) or return
    # Get an ActiveRecord::Relation for all students that match the filter settings.
    # You can paginate with will_paginate or kaminari.
    # NOte: filterrific_find returns an ActiveRecord Relation that can be
    # chained with other scopes to further narrow down the scope of the list,
    # e.g., to apply permissions or to hard coded exclude certain types of records.
    @routes = Route.where(status: nil).filterrific_find(@filterrific).page(params[:page]).per(50)

    # Respond to html for initial page load and to js for AJAX filter updates.
    respond_to do |format|
      format.html
      format.js
    end

  # Recover from invalid param sets, e.g., when a filter refers to the
  # database id of a record that doesn’t exist any more.
  # In this case we reset filterrific and discard all filter params.
  rescue ActiveRecord::RecordNotFound => e
    # There is an issue with the persisted param_set. Reset it.
    puts "Had to reset filterrific params: #{ e.message }"
    redirect_to(reset_filterrific_url(format: :html)) and return
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
    @facilitysetters = @facility.setters.all.map{|fs| [fs.nick_name, fs.id]}

    # refactor into model
    @recentroutes = @facility.routes.order("created_at DESC").page(params[:page]).limit(10)
  end

  def show
    @user = User.find(params[:user_id])
    @route = Route.find(params[:id])
    @tick = Tick.new
    @totalticks = Tick.where("route_id = ?", @route)
    @userticks = current_user.ticks.where("route_id = ?", @route)
    @averagerating = Rate.where("rateable_id = ?", @route).average(:stars)
    @ratingcount = Rate.where("rateable_id = ?", @route).count(:stars)
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
    @facilitysetters = @facility.setters.all.map{|fs| [fs.nick_name, fs.id]}
    @recentroutes = @facility.routes.order("created_at DESC").page(params[:page]).limit(10)
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

    if @facility.custom?
      @facilitygrades = @facility.grades.all.map{|fg| [fg.grade, fg.id ] }
    else
      @facilitygrades = Grade.where(system: ['yds','vscale']).map{|sg| [sg.grade, sg.id ] }
    end

    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @facilitysetters = @facility.setters.all.map{|fs| [fs.nick_name, fs.id]}
    @route.facility_id = params[:facility_id]
    @recentroutes = @facility.routes.order("created_at DESC").page(params[:page]).limit(10)
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @route = Route.find(params[:id])
    if @route.update_attributes(route_params)
      flash[:success] = "Route updated"
      redirect_to(admin_facility_routes_path(@facility))
      # Handle a successful update.
    else
      render 'new'
    end
  end

  def destroy
    Route.find(params[:id]).destroy
    flash[:success] = "Route deleted"
    redirect_to :back
  end

  private


  def route_params
    params.require(:route).permit(:name, :color, :setdate, :enddate, :facility_id, :grade_id, :zone_id, :wall_id, :setter_id, :discipline, :description, :active)
  end

  def options_for_facility_select
    Facility.where(id: climber_facilities).all.map{|fz| [fz.name, fz.id ] }
    # provides the list of available grades in the route list filters
  end



  def options_for_grade_select
    Route.where(facility_id: climber_facilities).pluck(:grade_id).uniq.map{|sg| [Grade.where(id: sg).first , sg ] }
    # provides the list of available grades in the route list filters
  end

  def options_for_zone_select
    Zone.where(facility_id: climber_facilities).all.map{|fz| [fz.name, fz.id ] }
    # provides the list of available zones in the route list filters
  end

  def options_for_wall_select
    Wall.where(facility_id: climber_facilities).all.map{|fz| [fz.name, fz.id ] }

    #  climber_facilities.walls.all.map{|fw| [fw.name, fw.id ] }
    # provides the list of available walls in the route list filters
  end

  def options_for_setter_select
    climber_facilities.all.map{|fz| [fz.name, fz.id ] }

  #    climber_facilities.setters.all.map{|fs| [fs.nick_name, fs.id ] }
    # provides the list of available walls in the route list filters
  end

end
