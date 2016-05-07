class RoutesController < ApplicationController

  def index
    @routes = Route.paginate(page: params[:page])
  end

  def new
    @route = Route.new
  end

  def show
    @route = Route.find(params[:id])
  end

  def create
    @route = current_user.routes.build(route_params)
    if @route.save
      flash[:success] = "Route created!"
      redirect_to root_url
    else
      render 'static_pages/home'
    end
  end


  def destroy
  end

  private

    def route_params
      params.require(:route).permit(:name, :color, :setter, :setdate, :enddate)
    end
end
