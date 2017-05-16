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
    @facilityticks = Tick.ascent.where("facility_id = ?", @facility)

    #refactored tick_feed and new_route_feed into respective models
    @news_feed = Tick.tick_feed(@facility) + Route.new_route_feed(@facility)

    #combines new ticks and new routes, newest first
    @news_feed.sort! { |a, b| b.created_at <=> a.created_at }

    #shows top 10 for facility only
    @userfacilities_check = @facility


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

  def follow_facility
    @facility = Facility.find(params[:facility_id])
    @facility_role = FacilityRole.new(user_id: current_user.id, name: 'climber',  confirmed: true, email: current_user.email, facility_id: @facility.id)
    if @facility_role.save
      flash[:success] = "You are now following #{ @facility.name }"
      redirect_to (facility_path(@facility))
    else
      flash[:error] = "That did not work"
      redirect_to (facility_path(@facility))
    end
  end

  def unfollow_facility
    @facility = Facility.find(params[:facility_id])
    @facility_role = FacilityRole.where(user_id: current_user, facility_id: @facility.id).first
    @facility_role.destroy
    if @facility_role.destroy
      flash[:success] = "You are no longer associated with #{@facility.name}"
      redirect_to (facility_path(@facility))
    else
      flash[:error] = "That did not work"
      redirect_to (facility_path(@facility))
    end
  end

  def management
    @facility = Facility.find(params[:facility_id])
    @facility_role = FacilityRole.new(user_id: current_user.id, name: 'facility_management',  confirmed: true, email: current_user.email, facility_id: @facility.id)
    if @facility_role.save
      flash[:success] = "You are now following #{ @facility.name }"
      redirect_to (facility_path(@facility))
    else
      flash[:error] = "That did not work"
      redirect_to (facility_path(@facility))
    end
  end

  private

    def facility_params
      params.require(:facility).permit(:name, :location, :addressline1, :addressline2, :city, :state, :zipcode, :custom)
    end
end
