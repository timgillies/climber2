class Admin::GradeSystemsController < ApplicationController
  before_action :authenticate_user!,        only: [:index, :new, :create, :edit, :update, :destroy]
  before_action :site_admin


  include GradeSystemsHelper
  include GradesHelper


  def index
    @grade_system = GradeSystem.new
    @grade_systems = GradeSystem.order('discipline ASC').page(params[:page])
    @grade_system_select = GradeSystem.all.map{ |f| [f.name , f.id ] }
    @facilities = Facility.all.map{ |f| ["#{f.id}: #{f.name} #{f.location}", f.id] }
    @disciplines = disciplines
    @categories = categories
  end

  def new
    @grade_system = GradeSystem.new
    @grade_systems = available_systems.order('discipline ASC', 'id ASC').page(params[:page]).per(50)

  end

  def create
    @grade_systems = GradeSystem.order('discipline ASC', 'id ASC').page(params[:page]).per(50)
    @grade_system = current_user.grade_systems.build(grade_system_params)
    @grade = Grade.new
    @grade_system_select = GradeSystem.all.map{ |f| [f.name, f.id ] }

    if @grade_system.save
      flash[:success] = "Grade system created!"
      redirect_to(admin_grade_systems_path)
    else
      render 'index'
    end
  end

  def update
    @grade_system = GradeSystem.find(params[:id])
    @grade_systems = GradeSystem.order('discipline ASC', 'id ASC').page(params[:page]).per(50)
    if @grade_system.update_attributes(grade_system_params)
      flash[:success] = "Grade system updated!"
      redirect_to(admin_grade_systems_path)
      # Handle a successful update.
    else
      render 'index'
    end
  end

  def edit
    @grade_system = GradeSystem.find(params[:id])
    @grade_systems = GradeSystem.order('discipline ASC', 'id ASC').page(params[:page]).per(50)
    @grade = Grade.new
    @grades = system_grades.order('rank ASC').page(params[:page]).per(50)
    @grade_system_select = GradeSystem.all.map{ |f| [f.name, f.id ] }
    @facilities = Facility.all.map{ |f| ["#{f.id}: #{f.name} #{f.location}", f.id] }
    @disciplines = disciplines
    @categories = categories
  end

  def destroy
    GradeSystem.find(params[:id]).destroy
    flash[:success] = "Grade system deleted"
    redirect_to :back
  end




  private



    def grade_system_params
      params.require(:grade_system).permit(:name, :facility_id, :user_id, :discipline, :category, :description)
    end
end
