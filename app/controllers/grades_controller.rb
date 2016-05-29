class GradesController < ApplicationController
  def index
    @grades = Grade.order('discipline ASC', 'rank ASC').paginate(page: params[:page])
  end

  def show
    @grade = Grade.find(params[:id])
  end

  private

    def grade_params
      params.require(:grade).permit(:grade, :system, :discipline, :rank, :facility_id)
    end
end
