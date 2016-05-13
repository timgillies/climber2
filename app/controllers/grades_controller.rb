class GradesController < ApplicationController

  def index
    @grades = Grade.paginate(page: params[:page])
  end

  def new
    @facility = Facility.find(params[:facility_id])
    @grade = Grade.new
    @userfacilities = current_user.facilities.all.map{|uf| [ uf.name, uf.id ] }
  end

  def show
    @grade = Grade.find(params[:id])
  end

  def create
    @facility = Facility.find(params[:facility_id])
    @grade = current_user.grades.build(grade_params)
    @grade.facility_id = params[:facility_id]
    @userfacilities = current_user.facilities.all.map{|uf| [ uf.name, uf.id ] }
    @grade.update_attribute(:system, "custom")
    if @grade.save
      flash[:success] = "Route created!"
      redirect_to(new_facility_grade_path(@facility))
    else
      flash[:danger] = "Route not saved"
      redirect_to(new_facility_grade_path(@facility))
    end
  end


  def destroy
  end

  private

    def grade_params
      params.require(:grade).permit(:grade, :system, :discipline, :rank, :enddate, :facility_id)
    end
  end
