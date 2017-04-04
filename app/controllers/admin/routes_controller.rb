class Admin::RoutesController < ApplicationController
  before_action :authenticate_user!,        only: [:index, :show, :new, :create, :edit, :update, :destroy, :mass_expire], :unless => :facility_is_demo
  before_action :facility_admin,            only: [:index, :show, :new, :create, :edit, :update, :destroy, :mass_expire], :unless => :facility_is_demo
  before_action :setter_role,               only: [:destroy], :unless => :facility_is_demo
  before_action :guest_role,                only: [:destroy], :unless => :facility_is_demo
  before_action :marketing_role,            except: [:index, :show], :unless => :facility_is_demo
  # before_action :paid_subscriber,           only: [:new, :create], :unless => :facility_is_demo
  before_action :route_owner,               only: [:edit, :update], :unless => :facility_is_demo
  before_action :demo_facility,             except: [:index, :show, :new]


  layout "admin"

  include GradesHelper
  include RoutesHelper

  def index
    @route = Route.new
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }
    @r_value = ric_values
    @i_value = ric_values
    @c_value = ric_values
    @route_status = route_status_values
    @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }
    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id]}
    @facility = Facility.find(params[:facility_id])
    @filterrific = initialize_filterrific(
      Route,
      params[:filterrific],
      select_options: {
        sorted_by: Route.options_for_sorted_by,
        with_grade_id: options_for_grade_select,
        with_zone_id: options_for_zone_select,
        with_wall_id: options_for_wall_select,
        with_setter_id: options_for_setter_select,
        with_status_id: Route.options_for_status_select
      },
      persistence_id: true,
    ) or return
    # Get an ActiveRecord::Relation for all students that match the filter settings.
    # You can paginate with will_paginate or kaminari.
    # NOte: filterrific_find returns an ActiveRecord Relation that can be
    # chained with other scopes to further narrow down the scope of the list,
    # e.g., to apply permissions or to hard coded exclude certain types of records.
    @routes = @facility.routes.where(status: nil).filterrific_find(@filterrific).page(params[:page]).per(50)

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
    @r_value = ric_values
    @i_value = ric_values
    @c_value = ric_values
    @route_status = route_status_values

    @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }

    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id]}
    @recentroutes = @facility.routes.order("created_at DESC").page(params[:page]).limit(10)

  end

  def show
    @route = Route.find(params[:id])
    @facility = Facility.find(params[:facility_id])
    @totalticks = Tick.where("route_id = ?", @route)
    @averagerating = Rate.where("rateable_id = ?", @route).average(:stars)
    @ratingcount = Rate.where("rateable_id = ?", @route).count(:stars)
  end

  def create
    @facility = Facility.find(params[:facility_id])
    @route = Route.create( route_params )
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }

    @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }

    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @r_value = ric_values
    @i_value = ric_values
    @c_value = ric_values
    @route_status = route_status_values
    @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id]}
    @recentroutes = @facility.routes.order("created_at DESC").page(params[:page]).limit(10)
    @route.facility_id = params[:facility_id]

    if @route.save
      if @route.task_id?
      @task = Task.find_by(id: @route.task_id)
      @task.update_attributes(status: 'completed', completed_by_id: @route.user_id, completed_at: DateTime.current)
      @old_route = Route.find_by(id: @task.route_id)
        if @task.route_id?
          @old_route.update_attribute(:enddate, Date.yesterday)
        end
      end
      flash[:success] = "Route added!"
      redirect_to(admin_facility_routes_path(@facility))
    else
      unless @route.valid?
        @route.image.clear
        @route.image.queued_for_write.clear
      end
      render :new
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @route = Route.find(params[:id])
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }

    @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }

    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @r_value = ric_values
    @i_value = ric_values
    @c_value = ric_values
    @route_status = route_status_values
    @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id]}
    @route.facility_id = params[:facility_id]
    @recentroutes = @facility.routes.order("created_at DESC").page(params[:page]).limit(10)

    @facilitydisciplines = facility_grades.map{ |fg| [fg.discipline, fg.discipline ] }

  end

  def update
    @facility = Facility.find(params[:facility_id])
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }

    @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }

    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @r_value = ric_values
    @i_value = ric_values
    @c_value = ric_values
    @route_status = route_status_values
    @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id]}
    @route = Route.find(params[:id])
    if @route.update_attributes(route_params)
      flash[:success] = "Route updated"
      redirect_to(admin_facility_routes_path(@facility))
      # Handle a successful update.
    else
      render :edit
    end
  end

  def expire
    @facility = Facility.find(params[:facility_id])
    @route = Route.find(params[:id])
    @route.update_attribute(:enddate, Date.yesterday)
    redirect_to(admin_facility_routes_path(@facility))

  end

  def mass_expire_2
    @facility = Facility.find(params[:facility_id])
    @routes = @facility.routes.where(status: nil).filterrific_find(@filterrific).page(params[:page]).per(50)
    @route.update_all( {:enddate => Date.yesterday}, {:zone_id => fz.id} )
    redirect_to(admin_facility_zones_path(@facility))
  end

  def mass_expire
    @facility = Facility.find(params[:facility_id])
    @routes = @facility.routes.where(status: nil).filterrific_find(@filterrific).page(params[:page])
    @routes.update_all( {:enddate => Date.yesterday} )
    redirect_to(admin_facility_routes_path(@facility))
  end

  def tagged
    @facility = Facility.find(params[:facility_id])
    @route = Route.find(params[:id])
    @route.update_attribute(:tagged, true)
    redirect_to(admin_facility_routes_path(@facility))
  end

  def untagged
    @facility = Facility.find(params[:facility_id])
    @route = Route.find(params[:id])
    @route.update_attribute(:tagged, false)
    redirect_to(admin_facility_routes_path(@facility))
  end

  def create_task
    @facility = Facility.find(params[:facility_id])
    @route = Route.find(params[:id]) # find original object
    redirect_to(new_admin_facility_task_path(:name => @route.name, :grade_id => @route.grade_id, :color => @route.color, :color_hex => @route.color_hex, :zone_id => @route.zone_id, :wall_id => @route.wall_id, :sub_child_zone_id => @route.sub_child_zone_id, :description => @route.description, :route_id => @route.id, :task_type => 'non_route_task' ))
  end



  def destroy
    Route.find(params[:id]).destroy
    flash[:success] = "Route deleted"
    redirect_to :back
  end

  private


  def route_params
    params.require(:route).permit(:name, :color, :setdate, :enddate, :facility_id, :grade_id, :zone_id, :wall_id, :sub_child_zone_id, :set_by_id, :user_id, :discipline, :description, :active, :tagged, :risk, :intensity, :complexity, :status, :task_description, :task_id, :image, :color_hex)
  end

  def options_for_grade_select
      facility_grades.map{ |sg| [sg.grade, sg.id ] }
    # provides the list of available grades in the route list filters
  end

  def options_for_zone_select
      @facility.zones.all.map{|fz| [fz.name, fz.id ] }
    # provides the list of available zones in the route list filters
  end

  def options_for_wall_select
      @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    # provides the list of available walls in the route list filters
  end

  def options_for_setter_select
      @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id.to_i]}
    # provides the list of available walls in the route list filters
  end

end
