class ResultsController < ApplicationController

  def routes_index
    @user = User.find(params[:user_id])
    @tick = Tick.new
    if params[:facility_id].present?
      @facility = Facility.find(params[:facility_id])
      @userfacilities_check = @facility
    else
      @userfacilities_check = current_user.facility_relationships.all
    end

    @ticks = Tick.where('extract(month from date) = ?', Date.current.strftime("%m")).where(user_id: @user)
    @filterrific = initialize_filterrific(
      Route,
      params[:filterrific],
      select_options: {
        sorted_by: Route.options_for_sorted_by,
        with_facility_id: options_for_facility_select,
        with_grade_id: options_for_grade_select,
        with_zone_id: options_for_zone_select,
        with_wall_id: options_for_wall_select,
        with_setter_id: options_for_setter_select,
      },
      persistence_id: true,
    ) or return
    # Get an ActiveRecord::Relation for all students that match the filter settings.
    # You can paginate with will_paginate or kaminari.
    # NOte: filterrific_find returns an ActiveRecord Relation that can be
    # chained with other scopes to further narrow down the scope of the list,
    # e.g., to apply permissions or to hard coded exclude certain types of records.
    @routes = Route.where(facility_id: @userfacilities_check).filterrific_find(@filterrific).includes(:zone, :wall, :user, :grade, :facility).page(params[:page]).per(10)

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


end
