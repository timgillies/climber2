class Admin::ZonesController < ApplicationController
  before_action :authenticate_user!,        only: [:index, :show, :new, :create, :edit, :update, :destroy], :unless => :facility_is_demo
  before_action :facility_admin,            only: [:index, :show, :new, :create, :edit, :update, :destroy], :unless => :facility_is_demo
  before_action :setter_role,               only: [:destroy, :new, :create, :edit, :update], :unless => :facility_is_demo
  before_action :guest_role,               only: [:destroy, :new, :create, :edit, :update], :unless => :facility_is_demo
  before_action :marketing_role,            except: [:index, :show], :unless => :facility_is_demo
  before_action :demo_facility,             except: [:index, :show, :new]


  layout "admin"

  include FacilitiesHelper
  include GradesHelper



  def index
    @facility = Facility.find(params[:facility_id])
    @zones = @facility.zones.page(params[:page])
    @wall = Wall.new
    @facilityzones = @facility.zones.all.map{|fw| [fw.name, fw.id ] }
    @zone = Zone.new
    @sub_child_zone = SubChildZone.new
    @facility_systems = facility_systems.page(params[:page])
  end

  def new
    @zone = Zone.new
    @facility = Facility.find(params[:facility_id])
    @zones = @facility.zones.page(params[:page])
  end

  def show
    @zones = @facility.zones.page(params[:page])
    @facility_systems = facility_systems.page(params[:page])

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
      render 'new'
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
      render 'edit'
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @zone = Zone.find(params[:id])
    @zones = @facility.zones.page(params[:page])
  end

  def show
    @facility = Facility.find(params[:facility_id])
    @zone = Zone.find(params[:id])
    @wall = Wall.new
    @sub_child_zone = SubChildZone.new
    @zones = @facility.zones.page(params[:page])
    @facility_systems = facility_systems.page(params[:page])
    @routes = @facility.routes.where('enddate >= ? AND zone_id = ?', Date.today, @zone).page(params[:page]).per(50)

    # Respond to html for initial page load and to js for AJAX filter updates.
    respond_to do |format|
      format.html
      format.js
    end

  end

  def mass_expire
    @facility = Facility.find(params[:facility_id])
    @zone = Zone.find(params[:zone_id])
    @route = Route.where(zone_id: @zone.id )
    @route.update_all( {:enddate => Date.yesterday})
    redirect_to(admin_facility_zones_path(@facility))
  end

  def mass_create_tasks
    @facility = Facility.find(params[:facility_id])
    @zone = Zone.find(params[:zone_id])
    @target = FacilityTarget.where(zone_id: @zone.id)

    target = @target.each do |target|
      target.value.times do
        @task = Task.create({assigner_id: current_user.id, setdate: Date.current, color: "", facility_id: @facility.id, grade_id: target.grade_id, zone_id: target.zone_id, status: 'active', task_type: 'route_task'})
        if @task.save
          @task.update_attribute(:task_number, (@facility.id.to_s + current_user.id.to_s + "000" + @task.id.to_s).to_i)
        end
      end
    end

    redirect_to(admin_facility_tasks_path(@facility))
  end


  def destroy
    @facility = Facility.find(params[:facility_id])
    Zone.find(params[:id]).destroy
    flash[:success] = "Zone deleted"
    redirect_to admin_facility_zones_path(@facility)
  end

  private

    def zone_params
      params.require(:zone).permit(:name, :facility_id, :user_id, :image)
    end
  end
