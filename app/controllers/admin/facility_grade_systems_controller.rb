class Admin::FacilityGradeSystemsController < ApplicationController
  before_action :authenticate_user!,        only: [:create, :destroy], :unless => :facility_is_demo
  before_action :facility_admin,            only: [:create, :destroy], :unless => :facility_is_demo
  before_action :demo_facility,             except: [:index, :show, :new]
  before_action :setter_role,               only: [:create, :destroy], :unless => :facility_is_demo# using "only" will exclude these actions, "except" will allow
  before_action :guest_role,               only: [:create, :destroy], :unless => :facility_is_demo # using "only" will exclude these actions, "except" will allow
  before_action :marketing_role,            only: [:create, :destroy], :unless => :facility_is_demo # using "only" will exclude these actions, "except" will allow


  layout "admin", only: [:index]



  def create
    @facility = Facility.find(params[:facility_id])
    @grade_system = GradeSystem.find(params[:grade_system_id])
    @grade_systems = GradeSystem.order('discipline ASC', 'id ASC').page(params[:page]).per(50)
    @facility_grade_system = @facility.facility_grade_systems.build(facility_grade_system_params)
    @grade = Grade.new
    @grade_system_select = GradeSystem.all.map{ |f| [f.name, f.id ] }

    respond_to do |format|
      if @facility_grade_system.save
        format.html { redirect_to admin_facility_grades_path(@facility) }
        format.js
      else
        render 'index'
      end
    end
  end

  def destroy
    @facility = Facility.find(params[:facility_id])
    FacilityGradeSystem.find(params[:id]).destroy

    respond_to do |format|
      format.html { redirect_to :back }
      format.js
    end

  end

  private



  def facility_grade_system_params
    params.permit(:facility_id, :grade_system_id)
  end


end
