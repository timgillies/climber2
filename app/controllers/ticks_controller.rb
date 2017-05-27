class TicksController < ApplicationController

  before_action :authenticate_user!

  layout "user"

  def new
    @tick = Tick.new
    @user = User.find(params[:user_id])
    @tick.route_id = params[:route_id]
    @userfacilities_check = current_user.facility_relationships.all
    @ticks = current_user.ticks.where('ticks.date > ?', 7.days.ago.to_date)
  end


  def index
    @user = User.find(params[:user_id])
    @userfacilities_check = @user.facility_relationships.all
    @tick_dates = Tick.where(user_id: @user.id).map { |tick| tick.date }.uniq

    @filterrific = initialize_filterrific(
      Tick,
      params[:filterrific],

      persistence_id: false,
    ) or return
    # Get an ActiveRecord::Relation for all students that match the filter settings.
    # You can paginate with will_paginate or kaminari.
    # NOte: filterrific_find returns an ActiveRecord Relation that can be
    # chained with other scopes to further narrow down the scope of the list,
    # e.g., to apply permissions or to hard coded exclude certain types of records.
    @tick_dates = Tick.order(date: :desc).where(user_id: @user.id).filterrific_find(@filterrific).map { |tick| tick.date }.uniq
    @ticks = Tick.where(user_id: @user).filterrific_find(@filterrific).page(params[:page]).per(5000000)

    # Respond to html for initial page load and to js for AJAX filter updates.
    respond_to do |format|
      format.html
      format.js
    end

  # Recover from invalid param sets, e.g., when a filter refers to the
  # database id of a record that doesn’t exist any more.
  # In this case we reset filterrific and discard all filter params.
  rescue ActiveRecord::RecordNotFound => e
    # There is an issue with the persisted param_set. Reset it.
    puts "Had to reset filterrific params: #{ e.message }"
    redirect_to(reset_filterrific_url(format: :html)) and return
  end

  def tick_list

    @user = User.find(params[:user_id])
    @userfacilities_check = @user.facility_relationships.all

    @filterrific = initialize_filterrific(
      Tick,
      params[:filterrific],

      persistence_id: false,
    ) or return
    # Get an ActiveRecord::Relation for all students that match the filter settings.
    # You can paginate with will_paginate or kaminari.
    # NOte: filterrific_find returns an ActiveRecord Relation that can be
    # chained with other scopes to further narrow down the scope of the list,
    # e.g., to apply permissions or to hard coded exclude certain types of records.
    @ticks = Tick.where(user_id: @user.id).filterrific_find(@filterrific).page(params[:page]).per(5000000)

    # Respond to html for initial page load and to js for AJAX filter updates.
    respond_to do |format|
      format.html
      format.js
    end

  # Recover from invalid param sets, e.g., when a filter refers to the
  # database id of a record that doesn’t exist any more.
  # In this case we reset filterrific and discard all filter params.
  rescue ActiveRecord::RecordNotFound => e
    # There is an issue with the persisted param_set. Reset it.
    puts "Had to reset filterrific params: #{ e.message }"
    redirect_to(reset_filterrific_url(format: :html)) and return
  end


  def create
    @user = User.find(params[:user_id])
    @tick = current_user.ticks.build(tick_params)
    @tick.route_id = params[:route_id]
    # Put this in model eventually
    @userfacilities_check = current_user.facility_relationships.all
    @ticks = current_user.ticks.where('ticks.date > ?', 7.days.ago.to_date)

    if params[:route_id]
      @tick.grade_id = Route.where(id: params[:route_id]).first.grade_id
    elsif @tick.facility_id

      #creates new zone named "climber generated" if it doesn't already exist
      unless Zone.where(facility_id: @tick.facility_id, name: "Climber Generated").present?
        @zone = Zone.new(facility_id: @tick.facility_id, name: 'Climber Generated', user_id: current_user.id)
        @zone.save
      else
        @zone = Zone.where(facility_id: @tick.facility_id, name: "Climber Generated").first
      end

      @route = Route.new(facility_id: @tick.facility_id, zone_id: @zone.id, setdate: @tick.date, grade_id: @tick.grade_id, color_hex: @tick.color_hex, user_id: current_user.id, image: @tick.image)
      @route.save
      @tick.update_attributes(route_id: @route.id)
    end

    if @tick.save

      if params[:route_id]
        respond_to do |format|
          format.html { [flash[:success] = "Success!", redirect_to(facility_route_path(Route.where(id: params[:route_id]).first.facility_id, params[:route_id]))] }
          format.js
        end
      else

        respond_to do |format|
          format.html { [flash[:success] = "Success!", redirect_to(user_routes_path(@user))] }
          format.js
        end
      end
    else
      render 'new'
    end
  end

  def show
    @tick = Tick.find(params[:id])
    @route = Route.find(params[:route_id])
    @user = User.find(params[:user_id])
    @userfacilities_check = @user.facility_relationships.all
    @ticks = @user.ticks.where('ticks.date > ?', 7.days.ago.to_date)
  end

  def edit
    @tick= Tick.find(params[:id])
    @user = User.find(params[:user_id])
    @route = @tick.route
    @userfacilities_check = @user.facility_relationships.all
  end

  def update
    @tick= Tick.find(params[:id])
    @user = User.find(params[:user_id])
    @route = @tick.route
    @userfacilities_check = @user.facility_relationships.all
    if @tick.update_attributes(tick_params)
      flash[:success] = "Ascent updated"
      redirect_to(user_ticks_path(@user))
      # Handle a successful update.
    else
      render :edit
    end
  end

  def destroy
    Tick.find(params[:id]).destroy
    flash[:success] = "Tick deleted"
    redirect_to :back
  end



  private

    def tick_params
      params.require(:tick).permit(:route_id, :facility_id, :user_id, :tick_type, :description, :date, :lead, :grade_id, :grade_vote_id, :color_hex, :image)
    end


end
