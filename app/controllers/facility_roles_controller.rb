class FacilityRolesController < ApplicationController
  before_action :authenticate_user!


  layout :check_layout

  def check_layout
    if params[:facility_id].present?
      'admin'
    else
      'user'
    end
  end


  include FacilitiesHelper


  def index
    @user = User.find(params[:user_id])
    @facility_role = FacilityRole.new
    @facility_roles = FacilityRole.where(user_id: @user).page(params[:page])

    # put the below in the model eventually ----------
    @userfacilities_check = current_user.facility_relationships.all

        @tick_feed = Tick.where('ticks.created_at > ?', 6.days.ago.to_date).joins(:route).merge(Route.where(facility_id: @userfacilities_check)).includes(:user, :grade, :route, :facility, :rate_average_without_dimension)
        @new_route_feed = Route.where(facility_id: @userfacilities_check).where('routes.created_at > ?', 6.days.ago.to_date).order(created_at: :desc).includes(:zone, :grade, :facility)
        @news_feed = @tick_feed + @new_route_feed
        #newest first
        @news_feed.sort! { |a, b| b.created_at <=> a.created_at }
        @top_10_sends = Tick.includes(:grade, :user).where(route_id: Route.where(facility_id: @userfacilities_check)).ascent.grade_desc.take(10)
        # gets top 10 routes based on ratings cache average
        @top_10_routes = Route.where(facility_id: @userfacilities_check).includes(:grade, :facility, :rating_cache).where(id: RatingCache.where(cacheable_type: "Route").order('rating_caches.avg desc').take(10).map { |rate| [rate.cacheable_id.to_i] } )
        @newest_10_routes = Route.where(facility_id: @userfacilities_check).includes(:grade, :facility, :zone).order('routes.setdate desc').limit(10)
        @ticks = current_user.ticks.where('ticks.date > ?', 7.days.ago.beginning_of_day.to_date)
    # -------------------------------------------------

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
    @user = User.find(params[:user_id])
  end

  def create
    @user = User.find(params[:user_id])
    @facility_role = @user.facility_roles.build(facility_role_params)
    @facility_roles = FacilityRole.where(user_id: @user).page(params[:page])
    if @facility_role.save
      flash[:success] = "Success!"
      redirect_to(user_facility_roles_path(@user))
    else
      flash[:error] = "#{ @facility_role.email } was not added!  Please make sure #{ @facility_role.email } is not already assigned a role."
      redirect_to(user_facility_roles_path(@user))
    end
  end


  def destroy
    FacilityRole.find(params[:id]).destroy
    redirect_to :back
  end

  def confirm
    @facility_role = FacilityRole.find(params[:id])
    @facility_role.update_attributes(confirmed: true, user_id: current_user.id)
    unless current_user.role == "site_admin"
      current_user.update_attributes(role: "facility_admin")
    end
    redirect_to(inbox_user_path(current_user))
  end

  def new
    @user = current_user
    @facility = Facility.find(params[:facility_id])
    @facility_role = FacilityRole.new

  end




  private

    def facility_role_params
      params.permit(:email, :name, :user_id, :confirmed, :facility_id)
    end

    def options_for_state_select
      us_states
      # provides the list of available grades in the route list filters
    end


end
