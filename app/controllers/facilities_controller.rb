class FacilitiesController < ApplicationController

  before_filter :authenticate_user!

  layout "admin", except: [:index]

  def index
    @facilities = Facility.page(params[:page])
  end

  def show
    @facility = Facility.find(params[:id])
    @routes = @facility.routes.page(params[:page])
    @activeroutes = @facility.routes.where("enddate >= ?", Date.current)
    @facilityticks = Tick.where("facility_id = ?", @facility)

    #refactored tick_feed and new_route_feed into respective models
    @news_feed = Tick.tick_feed(@facility) + Route.new_route_feed(@facility)

    #combines new ticks and new routes, newest first
    @news_feed.sort! { |a, b| b.created_at <=> a.created_at }
  end

  def leaderboard
    @facility = Facility.find(params[:id])
  end

  def social
    @facility = Facility.find(params[:id])
  end

  def analytics
    @facility = Facility.find(params[:id])
    @routes = @facility.routes.page(params[:page])
    @activeroutes = @facility.routes.where("enddate >= ?", Date.current)
    @facilityticks = Tick.where("facility_id = ?", @facility)
  end

  private

    def facility_params
      params.require(:facility).permit(:name, :location, :addressline1, :addressline2, :city, :state, :zipcode, :custom)
    end
end
