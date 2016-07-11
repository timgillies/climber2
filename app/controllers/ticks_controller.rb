class TicksController < ApplicationController
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
          flash[:success] = "Onsight! Nice work."
          redirect_to facility_route_path(@facility, @route)
        else
          render 'new'
        end


    elsif params[:commit] == "Flash"
       @tick.update_attribute(:tick_type, "flash")

        if @tick.save
          flash[:success] = "Flashed it!"
          redirect_to facility_route_path(@facility, @route)
        else
          render 'new'
        end

    elsif params[:commit] == "Redpoint"
       @tick.update_attribute(:tick_type, "redpoint")

        if @tick.save
          flash[:success] = "Onsight! Nice work."
          redirect_to facility_route_path(@facility, @route)
        else
          render 'new'
        end

    elsif params[:commit] == "Project"
       @tick.update_attribute(:tick_type, "project")

        if @tick.save
          flash[:success] = "Keep crushing, you'll get it!"
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

  private

    def tick_params
      params.require(:tick).permit(:route_id, :facility_id, :user_id, :tick_type, :description, :date)
    end


end