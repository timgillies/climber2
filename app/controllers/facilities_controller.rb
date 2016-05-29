class FacilitiesController < ApplicationController
  def index
    @facilities = Facility.paginate(page: params[:page])
  end

  def show
    @facility = Facility.find(params[:id])
    @routes = @facility.routes.paginate(page: params[:page])
  end

  private

    def facility_params
      params.require(:facility).permit(:name, :addressline1, :city, :state, :zipcode)
    end
end
