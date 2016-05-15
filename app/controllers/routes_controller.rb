class RoutesController < ApplicationController

  def index
    @routes = Route.paginate(page: params[:page])
  end

  def new
    @route = Route.new
    @userfacilities = current_user.facilities.all.map{|uf| [ uf.name, uf.id ] }
    @facility = Facility.find(params[:facility_id])
    @facilitygrades = @facility.grades.all.map{|uf| [uf.grade, uf.id ] }
  end

  def show
    @route = Route.find(params[:id])
  end

  def create
    @facility = Facility.find(params[:facility_id])
    @route = current_user.routes.build(route_params)
    @userfacilities = current_user.facilities.all.map{|uf| [ uf.name, uf.id ] }
    @facilitygrades = @facility.grades.all.map{|uf| [uf.grade, uf.id ] }
    if @route.save
      flash[:success] = "Route created!"
      redirect_to(new_facility_route_path(@facility))
    else
      render 'new'
    end
  end


  def destroy
  end

  private

    def route_params
      params.require(:route).permit(:name, :color, :setter, :setdate, :enddate, :facility_id, :grade_id)
    end
end
