class GradesController < ApplicationController

  def index
    @grades = Grade.order('discipline ASC', 'rank ASC').paginate(page: params[:page])
  end

  def new
    @grade = Grade.new
    @grades = Grade.order('discipline ASC', 'rank ASC').paginate(page: params[:page])
    @facility = Facility.find(params[:facility_id])
    @userfacilities = current_user.facilities.all.map{|uf| [ uf.name, uf.id ] }
  end

  def show
    @grade = Grade.find(params[:id])
  end

  def create
    @facility = Facility.find(params[:facility_id]) #This ensures the redirect_to goes back to the nested resource
    @grade = current_user.grades.build(grade_params)
    @grades = Grade.order('discipline ASC', 'rank ASC').paginate(page: params[:page]) # makes "each" work in the partial
    @grade.facility_id = params[:facility_id] #this passes the facility ID through the field
    @userfacilities = current_user.facilities.all.map{|uf| [ uf.name, uf.id ] }
    if @grade.save
      @grade.update_attribute(:system, "custom")
      flash[:success] = "Route created!"
      redirect_to(new_facility_grade_path(@facility))
    else
      render :new
    end
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @grade = current_user.grades.build(grade_params)
    if @grade.update_attributes(grade_params)
      @grade.update_attribute(:system, "custom")
      flash[:success] = "Route created!"
      redirect_to(new_facility_grade_path(@facility))
      # Handle a successful update.
    else
      render :new
    end
  end


  def destroy
  end

  private

    def grade_params
      params.require(:grade).permit(:grade, :system, :discipline, :rank, :enddate, :facility_id)
    end
  end
