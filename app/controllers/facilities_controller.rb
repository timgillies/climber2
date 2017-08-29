class FacilitiesController < ApplicationController

  before_filter :authenticate_user!, except: [:index]

  layout "admin", except: [:index]

  include FacilitiesHelper


  def index
    @filterrific = initialize_filterrific(
        Facility,
        params[:filterrific],
        select_options: {
          with_state: options_for_state_select,
        },
        persistence_id: false,
      ) or return
      # Get an ActiveRecord::Relation for all students that match the filter settings.
      # You can paginate with will_paginate or kaminari.
      # NOte: filterrific_find returns an ActiveRecord Relation that can be
      # chained with other scopes to further narrow down the scope of the list,
      # e.g., to apply permissions or to hard coded exclude certain types of records.
      @facilities = Facility.filterrific_find(@filterrific).page(params[:page]).per(50)

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

  def followers
    @facility = Facility.find(params[:id])
    @filterrific = initialize_filterrific(
        User,
        params[:filterrific],
        select_options: {
          with_facility: options_for_state_select,
        },
        persistence_id: false,
      ) or return
      # Get an ActiveRecord::Relation for all students that match the filter settings.
      # You can paginate with will_paginate or kaminari.
      # NOte: filterrific_find returns an ActiveRecord Relation that can be
      # chained with other scopes to further narrow down the scope of the list,
      # e.g., to apply permissions or to hard coded exclude certain types of records.
      @users = User.joins(:facility_roles).where( 'facility_roles.facility_id = ?', @facility.id ).filterrific_find(@filterrific).page(params[:page]).per(50)

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

  private

    def facility_params
      params.require(:facility).permit(:name, :location, :addressline1, :addressline2, :city, :state, :zipcode, :custom, :public)
    end

    def options_for_state_select
      us_states
      # provides the list of available grades in the route list filters
    end
end
