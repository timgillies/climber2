class Admin::GradesController < ApplicationController
  before_action :authenticate_user!,        only: [:index, :show, :new, :create, :edit, :update, :destroy]
  before_action :site_admin

  include GradesHelper
  include GradeSystemsHelper

  layout "admin", only: [:index]

  def index
    @facility = Facility.find(params[:facility_id])
    @grade_system = GradeSystem.new
    @grade = Grade.new
    @grades = Grade.order('grade_system_id ASC', 'rank ASC').page(params[:page])
    @grade_systems = available_systems.order('facility_id ASC').page(params[:page])
    @facility_grade_system = FacilityGradeSystem.new
    @facility_grade_systems = FacilityGradeSystem.page(params[:page]).per(50)

  end

  def new
    @grade = Grade.new
    @grades = Grade.all.order('grade_system_id ASC', 'rank ASC').page(params[:page]).per(50)
    @grade_systems = GradeSystem.available_systems.map{ |f| [f.name, f.id ] }

  end

  def show
    @grade = Grade.find(params[:id])
  end

  def create
    @grades = Grade.all.order('grade_system_id ASC', 'rank ASC').page(params[:page]).per(50)
    @grade = current_user.grades.build(grade_params)
    @grade.rank = ((params[:range_start]).to_f + (params[:range_end]).to_f)/2
    @grade_system_select = GradeSystem.all.map{ |f| [f.name, f.id ] }
    @grade_system = GradeSystem.find(params[:grade_system_id])
    @grade.grade_system_id = params[:grade_system_id]
    if @grade.save
      flash[:success] = "Grade created!"
      redirect_to(edit_admin_grade_system_path(@grade_system))
    else
      render 'new'
    end
  end

  def update
    @grade_system = GradeSystem.find(params[:grade_system_id])
    @grade = @grade_system.grades.find(params[:id])
    @grades = @grade_system.grades.order('grade_system_id ASC', 'rank ASC').page(params[:page]).per(50)

    @grade.rank = ((params[:range_start]).to_f + (params[:range_end]).to_f)/2

    if @grade.update_attributes(grade_params)
      flash[:success] = "Grade updated!"
      redirect_to(edit_admin_grade_system_path(@grade_system))
      # Handle a successful update.
    else
      render 'new'
    end
  end

  def edit
    @grade_system = GradeSystem.find(params[:grade_system_id])
    @grade = @grade_system.grades.find(params[:id])
    @grades = @grade_system.grades.order('grade_system_id ASC', 'rank ASC').page(params[:page]).per(50)

  end

  def destroy
    Grade.find(params[:id]).destroy
    flash[:success] = "Grade deleted"
    redirect_to :back
  end

  private

    def grade_params
      params.require(:grade).permit(:grade, :system, :discipline, :grade_system_id, :rank, :range_start, :range_end)
    end

  end
