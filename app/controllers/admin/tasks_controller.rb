class Admin::TasksController < ApplicationController

  before_action :authenticate_user!,        only: [:index, :show, :new, :create, :edit, :update, :destroy]
  before_action :facility_admin,            only: [:index, :show, :new, :create, :edit, :update, :destroy]



  layout "admin"

  include TasksHelper
  include GradesHelper

  def index
    @facility = Facility.find(params[:facility_id])
    @filterrific = initialize_filterrific(
      Task,
      params[:filterrific],
      select_options: {
        task_sorted_by: Task.options_for_sorted_by,
        task_with_grade_id: options_for_grade_select,
        task_with_zone_id: options_for_zone_select,
        task_with_wall_id: options_for_wall_select,
        task_with_setter_id: options_for_setter_select,
        task_with_status_id: Task.options_for_status_select
      },
      persistence_id: 'shared_key',
    ) or return
    # Get an ActiveRecord::Relation for all students that match the filter settings.
    # You can paginate with will_paginate or kaminari.
    # NOte: filterrific_find returns an ActiveRecord Relation that can be
    # chained with other scopes to further narrow down the scope of the list,
    # e.g., to apply permissions or to hard coded exclude certain types of records.
    @tasks = @facility.tasks.all.filterrific_find(@filterrific).page(params[:page]).per(50)

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
    @task = Task.new
    @facility = Facility.find(params[:facility_id])
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }
    @task_type = task_type_values
    @task_status = task_status_values
    @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }

    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id.to_i]}
    @facility_role_access = FacilityRole.find_by(facility_id: @facility.id, user_id: current_user.id)
  end

  def create
    @facility = Facility.find(params[:facility_id])
    @task = Task.new(task_params)
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }

    @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }

    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @task_type = task_type_values
    @task_status = task_status_values
    @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id.to_i]}
    @task.facility_id = params[:facility_id]
    if @task.save
      @task.update_attribute(:task_number, (@facility.id.to_s + current_user.id.to_s + "000" + @task.id.to_s).to_i)
      flash[:success] = "Task created!"
      if @task.assignee_id?
        TaskMailer.task_assignment_email(@task).deliver_now
      end
      redirect_to(admin_facility_tasks_path(@facility))
    else
      render :new
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @task = Task.find(params[:id])
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }

    @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }

    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @task_type = task_type_values
    @task_status = task_status_values
    @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id]}
    @task.facility_id = params[:facility_id]

    @facilitydisciplines = facility_grades.map{ |fg| [fg.discipline, fg.discipline ] }

  end

  def update
    @facility = Facility.find(params[:facility_id])
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }

    @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }

    @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    @task_type = task_type_values
    @task_status = task_status_values
    @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id]}
    @task = Task.find(params[:id])
    if @task.update_attributes(task_params)
      flash[:success] = "Task updated"
      redirect_to(admin_facility_tasks_path(@facility))
      # Handle a successful update.
    else
      render :edit
    end
  end

  def activate_route
    @facility = Facility.find(params[:facility_id])
    @task = Task.find(params[:id]) # find original object
    redirect_to(new_admin_facility_route_path(:name => @task.name, :grade_id => @task.grade_id, :color => @task.color, :assignee_id => @task.assignee_id, :zone_id => @task.zone_id, :wall_id => @task.wall_id, :sub_child_zone_id => @task.sub_child_zone_id, :description => @task.description, :task_id => @task.id ))
  end

  def complete_task
    @facility = Facility.find(params[:facility_id])
    @task = Task.find(params[:id]) # find original object
    @task.update_attributes(status: "completed", completed_at: Date.current, completed_by_id: current_user.id)
    redirect_to(admin_facility_tasks_path(@facility))
  end

  def un_complete_task
    @facility = Facility.find(params[:facility_id])
    @task = Task.find(params[:id]) # find original object
    @task.update_attributes(status: "active", completed_at: nil, completed_by_id: nil)
    redirect_to(admin_facility_tasks_path(@facility))
  end


  private

  def task_params
    params.require(:task).permit(:name, :color, :setdate, :enddate, :facility_id, :grade_id, :zone_id, :wall_id, :sub_child_zone_id, :set_by_id, :assignee_id, :assigner_id, :discipline, :description, :active, :tagged, :status, :task_description, :task_type)
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
