class Admin::GradesController < ApplicationController
  before_action :logged_in_user,    only: [:index, :show, :edit, :update, :destroy]
  before_action :facilityroute_admin,      only: [:index, :show, :edit, :update, :destroy]

  layout "admin"

  def index
    @grades = Grade.order('discipline ASC', 'rank ASC').page(params[:page])
  end

  def new
    @grade = Grade.new
    @facility = Facility.find(params[:facility_id])

    if @facility.custom?
      @grades = @facility.grades.order('discipline ASC', 'rank ASC').page(params[:page]).per(50)
    else
      @grades = Grade.where(system: ['yds','vscale']).order('discipline ASC', 'rank ASC').page(params[:page]).per(50)
    end

  end

  def show
    @grade = Grade.find(params[:id])
  end

  def create
    @facility = Facility.find(params[:facility_id]) #This ensures the redirect_to goes back to the nested resource
    @grade = current_user.grades.build(grade_params)
    @grades = Grade.order('discipline ASC', 'rank ASC').page(params[:page]) # makes "each" work in the partial
    @grade.facility_id = params[:facility_id] #this passes the facility ID through the field
    if @grade.save
      flash[:success] = "Route created!"
      redirect_to(new_admin_facility_grade_path(@facility))
    else
      render :new
    end
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @grade = @facility.grades.find(params[:id])
    @grades = Grade.order('discipline ASC', 'rank ASC').page(params[:page]) # makes "each" work in the partial
    if @grade.update_attributes(grade_params)
      flash[:success] = "Route updated!"
      redirect_to(new_admin_facility_grade_path(@facility))
      # Handle a successful update.
    else
      render :new
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @grade = @facility.grades.find(params[:id])
    @grades = @facility.grades.order('discipline ASC', 'rank ASC').page(params[:page]).per(50) # makes "each" work in the partial
  end

  def destroy
    Grade.find(params[:id]).destroy
    flash[:success] = "Grade deleted"
    redirect_to :back
  end

  private

    def grade_params
      params.require(:grade).permit(:grade, :system, :discipline, :rank, :facility_id)
    end
  end
