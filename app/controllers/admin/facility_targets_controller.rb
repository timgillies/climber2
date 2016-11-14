class Admin::FacilityTargetsController < ApplicationController
    before_action :authenticate_user!,        only: [:index, :show, :new, :create, :edit, :update, :destroy]
    before_action :facility_admin,            only: [:index, :show, :new, :create, :edit, :update, :destroy]
    before_action :setter_role,               only: [:destroy]
    before_action :marketing_role,            except: [:index, :show]

    include FacilityTargetsHelper

    layout 'admin'

    def index
      @facility_target = FacilityTarget.new
      @facility_targets = FacilityTarget.page(params[:page])
      @facility = Facility.find(params[:facility_id])
      @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }
      @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    end


    def new
      @facility_target = FacilityTarget.new
      @facility = Facility.find(params[:facility_id])
      @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }
      @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }
      @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
      @facilitysubchildzones = @facility.sub_child_zones.all.map{|fw| [fw.name, fw.id ] }
      @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id]}
      @recentfacility_targets = @facility.facility_targets.order("created_at DESC").page(params[:page]).limit(10)
      @facility_role_access = FacilityRole.find_by(facility_id: @facility.id, user_id: current_user.id)
    end

    def show
      @facility_target = FacilityTarget.find(params[:id])
      @facility = Facility.find(params[:facility_id])
      @totalticks = Tick.where("facility_target_id = ?", @facility_target)
      @averagerating = Rate.where("rateable_id = ?", @facility_target).average(:stars)
      @ratingcount = Rate.where("rateable_id = ?", @facility_target).count(:stars)
    end

    def create
      @facility = Facility.find(params[:facility_id])
      @facility_target = current_user.facility_targets.build(facility_target_params)
      @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }

      @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }

      @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
      @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id]}
      @recentfacility_targets = @facility.facility_targets.order("created_at DESC").page(params[:page]).limit(10)
      @facility_target.facility_id = params[:facility_id]
      if @facility_target.save
        flash[:success] = "Target created!"
        redirect_to(admin_facility_facility_targets_path(@facility))
      else
        render 'index'
      end
    end

    def edit
      @facility = Facility.find(params[:facility_id])
      @facility_target = FacilityTarget.find(params[:id])
      @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }

      @facilitygrades = facility_grades.map{ |sg| [sg.grade, sg.id ] }

      @facilitywalls = @facility.walls.all.map{|fw| [fw.name, fw.id ] }
      @facilitysetters = @facility.facility_roles.where(confirmed: true).map{|fs| [fs.user.name, fs.user.id]}
      @facility_target.facility_id = params[:facility_id]
      @recentfacility_targets = @facility.facility_targets.order("created_at DESC").page(params[:page]).limit(10)

      @facilitydisciplines = facility_grades.map{ |fg| [fg.discipline, fg.discipline ] }

    end

    def update
      @facility = Facility.find(params[:facility_id])
      @facility_target = FacilityTarget.find(params[:id])
      if @facility_target.update_attributes(facility_target_params)
        flash[:success] = "Route updated"
        redirect_to(admin_facility_facility_targets_path(@facility))
        # Handle a successful update.
      else
        render 'index'
      end
    end




    def destroy
      FacilityTarget.find(params[:id]).destroy
      flash[:success] = "Target deleted"
      redirect_to :back
    end

    private


    def facility_target_params
      params.require(:facility_target).permit(:value, :facility_id, :grade_id, :zone_id, :wall_id, :sub_child_zone_id, :user_id)
    end
end
