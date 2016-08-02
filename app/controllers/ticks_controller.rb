class TicksController < ApplicationController

  before_action :authenticate_user!
  
  def new
    @tick = Tick.new
    @tick.facility_id = params[:facility_id] #this passes the facility ID through the field
    @tick.route_id = params[:route_id]
  end

  def create
    @facility = Facility.find(params[:facility_id])
    @route = Route.find(params[:route_id])
    @tick = current_user.ticks.build(tick_params)
    @tick.facility_id = params[:facility_id] #this passes the facility ID through the field
    @tick.route_id = params[:route_id]
    @ticks = Tick.page(params[:page]) # makes "each" work in the partial

    if params[:commit] == "Onsight"
       @tick.update_attribute(:tick_type, "onsight")

        if @tick.save
          flash[:success] = "Onsight! Congrats."
          redirect_to facility_route_path(@facility, @route)
        else
          render 'new'
        end


    elsif params[:commit] == "Flash"
       @tick.update_attribute(:tick_type, "flash")

        if @tick.save
          flash[:success] = "Flashed it! Nice job."
          redirect_to facility_route_path(@facility, @route)
        else
          render 'new'
        end

    elsif params[:commit] == "Redpoint"
       @tick.update_attribute(:tick_type, "redpoint")

        if @tick.save
          flash[:success] = "Redpointed"
          redirect_to facility_route_path(@facility, @route)
        else
          render 'new'
        end

    elsif params[:commit] == "Project"
       @tick.update_attribute(:tick_type, "project")

        if @tick.save
          flash[:success] = "Project attempt added.  Keep crushing, you'll get it!"
          redirect_to facility_route_path(@facility, @route)
        else
          render 'new'
        end
    end
  end

  def new
    @tick = Tick.new
    @tick.facility_id = params[:facility_id] #this passes the facility ID through the field
    @tick.route_id = params[:route_id]
  end

  def show
    @tick = Tick.find(params[:id])
  end

  private

    def tick_params
      params.require(:tick).permit(:route_id, :facility_id, :user_id, :tick_type, :description, :date)
    end


end
