class RoutesController < ApplicationController

  def index
    @routes = Route.paginate(page: params[:page])
  end

  def new
    @route = Route.new
    @userfacilities = current_user.facilities.all.map{|uf| [ uf.name, uf.id ] }
  end

  def show
    @route = Route.find(params[:id])
  end

  def create
    @route = current_user.routes.build(route_params)
    @userfacilities = current_user.facilities.all.map{|uf| [ uf.name, uf.id ] }
    if @route.save
      flash[:success] = "Route created!"
      redirect_to new_route_url
    else
      render 'new'
    end
  end


  def destroy
  end

  private

    def route_params
      params.require(:route).permit(:name, :color, :setter, :setdate, :enddate, :facility_id)
    end
end
