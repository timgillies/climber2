class RoutesController < ApplicationController

  def index
    @routes = Route.paginate(page: params[:page])
  end

  def show
    @route = Route.find(params[:id])
  end

  private

    def route_params
      params.require(:route).permit(:name, :color, :setter, :setdate, :enddate, :facility_id, :grade_id, :zone_id, :wall_id)
    end

end
