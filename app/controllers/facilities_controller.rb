class FacilitiesController < ApplicationController

  layout "user", except: [:index]

  def index
    @facilities = Facility.page(params[:page])
  end

  def show
    @facility = Facility.find(params[:id])
    @routes = @facility.routes.page(params[:page])
    @activeroutes = @facility.routes.where("enddate >= ?", Date.today)
    @facilityticks = Tick.where("facility_id = ?", @facility)
  end

  def leaderboard
    @facility = Facility.find(params[:id])
  end

  def social
    @facility = Facility.find(params[:id])
  end

  def analytics
    @facility = Facility.find(params[:id])
  end

  private

    def facility_params
      params.require(:facility).permit(:name, :location, :addressline1, :addressline2, :city, :state, :zipcode, :custom)
    end
end
