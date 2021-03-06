class RoutesController < ApplicationController
  before_action :authenticate_user!
  before_action :check_layout


layout :check_layout

def check_layout
  if params[:facility_id].present?
    'admin'
  else
    'user'
  end
end



  def index
    @user = User.find(params[:user_id])
    @tick = Tick.new
    if params[:facility_id].present?
      @facility = Facility.find(params[:facility_id])
      @userfacilities_check = @facility
    else
      @userfacilities_check = current_user.facility_relationships.all
    end

    @ticks = Tick.where('extract(month from date) = ?', Date.current.strftime("%m")).where(user_id: @user)
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
      },
      persistence_id: true,
    ) or return
    # Get an ActiveRecord::Relation for all students that match the filter settings.
    # You can paginate with will_paginate or kaminari.
    # NOte: filterrific_find returns an ActiveRecord Relation that can be
    # chained with other scopes to further narrow down the scope of the list,
    # e.g., to apply permissions or to hard coded exclude certain types of records.
    @routes = Route.where(facility_id: @userfacilities_check).filterrific_find(@filterrific).includes(:zone, :wall, :user, :grade, :facility).page(params[:page]).per(25)

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

  def filter_results
    @user = User.find(params[:user_id])
    @tick = Tick.new
    if params[:facility_id].present?
      @facility = Facility.find(params[:facility_id])
      @userfacilities_check = @facility
    else
      @userfacilities_check = current_user.facility_relationships.all
    end

    @ticks = Tick.where('extract(month from date) = ?', Date.current.strftime("%m")).where(user_id: @user)
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
      },
      persistence_id: true,
    ) or return
    # Get an ActiveRecord::Relation for all students that match the filter settings.
    # You can paginate with will_paginate or kaminari.
    # NOte: filterrific_find returns an ActiveRecord Relation that can be
    # chained with other scopes to further narrow down the scope of the list,
    # e.g., to apply permissions or to hard coded exclude certain types of records.
    @routes = Route.where(facility_id: @userfacilities_check).filterrific_find(@filterrific).includes(:zone, :wall, :user, :grade, :facility).page(params[:page]).per(10)

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

    @user = current_user
    @route = Route.find(params[:id])
    @tick = Tick.new
    @totalticks = Tick.where("route_id = ?", @route)
    @userticks = current_user.ticks.where("route_id = ?", @route)
    @averagerating = Rate.where("rateable_id = ?", @route).average(:stars)
    @ratingcount = Rate.where("rateable_id = ?", @route).count(:stars)

    @userfacilities_check = current_user.facility_relationships.all
    @ticks = Tick.where('extract(month from date) = ?', Date.current.strftime("%m")).where(user_id: @user)
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

  def quick_flash
    @user = current_user
    @route = Route.find(params[:id])
    @tick = Tick.new(user_id: current_user.id, route_id: @route.id, grade_id: @route.grade_id, tick_type: 'flash', date: Date.current)
    if params[:competition_id].present?
      @tick.competition_id = params[:competition_id]
    end
    @userfacilities_check = @user.facility_relationships.all
    @ticks = @user.ticks.where('ticks.date > ?', 7.days.ago.to_date)
    @tick.save
    if @tick.save
      respond_to do |format|
        format.html {redirect_to user_routes_path(@user)}
        format.js
      end
    else
      redirect_to user_routes_path(@user)
    end
  end

  def quick_redpoint
    @user = current_user
    @route = Route.find(params[:id])
    @tick = Tick.new(user_id: current_user.id, route_id: @route.id, grade_id: @route.grade_id, tick_type: 'redpoint', date: Date.current)
    if params[:competition_id].present?
      @tick.competition_id = params[:competition_id]
    end
    @userfacilities_check = @user.facility_relationships.all
    @ticks = @user.ticks.where('ticks.date > ?', 7.days.ago.to_date)
    @tick.save
    if @tick.save
      respond_to do |format|
        format.html {redirect_to user_routes_path(@user)}
        format.js
      end
    else
      redirect_to user_routes_path(@user)
    end
  end

  def quick_project
    @user = current_user
    @route = Route.find(params[:id])

    @tick = Tick.new(user_id: current_user.id, route_id: @route.id, grade_id: @route.grade_id, tick_type: 'project', date: Date.current)

    @userfacilities_check = @user.facility_relationships.all
    @ticks = @user.ticks.where('ticks.date > ?', 7.days.ago.to_date)
    @tick.save
    if params[:competition_id].present?
      @tick.competition_id = params[:competition_id]
    end
    if @tick.save
      respond_to do |format|
        format.html {redirect_to user_routes_path(@user)}
        format.js
      end
    else
      redirect_to user_routes_path(@user)
    end
  end

  def quick_comp_flash
    @user = current_user
    @route = Route.find(params[:id])
    @competition = Competition.find(params[:competition_id])
    @tick = Tick.new(user_id: current_user.id, route_id: @route.id, grade_id: @route.grade_id, tick_type: 'flash', date: Date.current)
    if params[:competition_id].present?
      @tick.competition_id = params[:competition_id]
    end
    @userfacilities_check = @user.facility_relationships.all
    @ticks = @user.ticks.where('ticks.date > ?', 7.days.ago.to_date)
    @tick.save
    if @tick.save
      respond_to do |format|
        format.html {redirect_to user_routes_path(@user)}
        format.js
      end
    else
      redirect_to user_routes_path(@user)
    end
  end

  def quick_comp_project
    @user = current_user
    @route = Route.find(params[:id])
    @competition = Competition.find(params[:competition_id])
    @tick = Tick.new(user_id: current_user.id, route_id: @route.id, grade_id: @route.grade_id, tick_type: 'project', date: Date.current)
    @userfacilities_check = @user.facility_relationships.all
    @ticks = @user.ticks.where('ticks.date > ?', 7.days.ago.to_date)
    @tick.save
    if params[:competition_id].present?
      @tick.competition_id = params[:competition_id]
    end
    if @tick.save
      respond_to do |format|
        format.html {redirect_to user_routes_path(@user)}
        format.js
      end
    else
      redirect_to user_routes_path(@user)
    end
  end

  def quick_comp_redpoint
    @user = current_user
    @route = Route.find(params[:id])
    @tick = Tick.new(user_id: current_user.id, route_id: @route.id, grade_id: @route.grade_id, tick_type: 'redpoint', date: Date.current)
    @competition = Competition.find(params[:competition_id])
    if params[:competition_id].present?
      @tick.competition_id = params[:competition_id]
    end
    @userfacilities_check = @user.facility_relationships.all
    @ticks = @user.ticks.where('ticks.date > ?', 7.days.ago.to_date)
    @tick.save
    if @tick.save
      respond_to do |format|
        format.html {redirect_to user_routes_path(@user)}
        format.js
      end
    else
      redirect_to user_routes_path(@user)
    end
  end

  def quick_tick
    @user = User.find(params[:user_id])
    @route = Route.find(params[:id])
    @tick = Tick.new(user_id: current_user.id, route_id: @route.id, grade_id: @route.grade_id, tick_type: 'quick_add', date: Date.current)
    @tick.save
    redirect_to (user_route_tick_path(current_user, @route, @tick))
  end

  def route_like
    @user = User.find(params[:user_id])
    @route = Route.find(params[:id])
    @route_like = RouteLike.new(user_id: current_user.id, route_id: @route.id, like: true)
    @route_like.save
    if @route_like.save
      respond_to do |format|
        format.html {redirect_to user_routes_path(@user)}
        format.js
      end
    else
      redirect_to user_routes_path(@user)
    end
  end

  def route_unlike
    @user = User.find(params[:user_id])
    @route = Route.find(params[:id])
    @route_like = RouteLike.find_by(user_id: current_user.id, route_id: @route.id)
    @route_like.destroy
    respond_to do |format|
      format.html {redirect_to @users}
      format.js
    end
  end

  def add_route
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:competition_id])
    @route = Route.find(params[:route_id])
    @comp_route = CompRoute.new(user_id: current_user.id, route_id: @route.id, competition_id: @competition.id)
    @comp_route.save
    if @comp_route.save
      respond_to do |format|
        format.html {redirect_to @competition}
        format.js
      end
    else
      redirect_to @competition
    end
  end

  def remove_route
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:competition_id])
    @route = Route.find(params[:route_id])
    @comp_route = CompRoute.find_by(route_id: @route.id, competition_id: @competition.id)
    @comp_route.destroy
    respond_to do |format|
      format.html {redirect_to @competition}
      format.js
    end
  end



  private


  def route_params
    params.require(:route).permit(:name, :color, :setdate, :enddate, :facility_id, :grade_id, :zone_id, :wall_id, :setter_id, :discipline, :description, :active, :total_holds, :foot_holds,)
  end

  def options_for_facility_select
    Facility.where(id: climber_facilities).all.map{|fz| [fz.name , fz.id ] }
    # provides the list of available grades in the route list filters
  end

  def options_for_grade_select
    Grade.joins(:facility_grade_systems).merge(FacilityGradeSystem.where(facility_id: @userfacilities_check)).uniq.map{|sg| [sg.grade , sg.id ] }
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
