class GradesController < ApplicationController


  layout :check_layout

  def check_layout
    if params[:facility_id].present?
      'admin'
    else
      'user'
    end
  end


  def index
    @facility = Facility.find(params[:facility_id])
    @grade_system = GradeSystem.new
    @grade = Grade.new
    @grades = Grade.order('grade_system_id ASC', 'rank ASC').page(params[:page])
    @grade_systems = available_systems.order('facility_id ASC').page(params[:page])
    @facility_grade_system = FacilityGradeSystem.new
    @facility_grade_systems = FacilityGradeSystem.page(params[:page]).per(50)

  end

  def show
    @grade = Grade.find(params[:id])
  end

  private

    def grade_params
      params.require(:grade).permit(:grade, :system, :discipline, :rank, :facility_id)
    end
end
