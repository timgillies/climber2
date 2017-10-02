class UsersController < ApplicationController
  before_action :authenticate_user!,    only: [:index, :edit, :update, :destroy]
  before_action :correct_user, only: [:home, :edit, :update, :destroy]
  before_action :site_admin, only: [:manage_users]

  include UsersHelper
  include FacilitiesHelper


  layout 'user', except: [:manage_users]

  def index
    @user = current_user

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
      @users = User.filterrific_find(@filterrific).page(params[:page]).per(50)

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
    @user = User.find(params[:id])
    @facilities = @user.facilities.page(params[:page])
    @routes = @user.routes.page(params[:page])
    @facility_roles = FacilityRole.where(user_id: @user, confirmed: true).page(params[:page])
    @tick_dates = Tick.where(user_id: @user.id).map { |tick| tick.date }.uniq
    @ticks = Tick.where('extract(month from date) = ?', Date.current.strftime("%m")).where(user_id: @user)
    @annualticks = Tick.where(user_id: @user)
    @userfacilities_check = @user.facility_relationships.all

    #refactored tick_feed and new_route_feed into respective models
    @news_feed = @user.ticks.tick_feed(@userfacilities_check) + @user.routes.new_route_feed(@userfacilities_check)

    #combines new ticks and new routes, newest first
    @news_feed.sort! { |a, b| b.created_at <=> a.created_at }
    @userfacilities_check = @user.facility_relationships.all
    @competitions = Competition.where(facility_id: @userfacilities_check)
  end

  def new
    @user = User.new
    @genders = genders
  end

  def create
    @user = User.new(user_params)
    @genders = genders
    if @user.save
      @user.send_activation_email
      flash[:info] = "Please check your email to activate your account."
      redirect_to user_path
    else
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
    @genders = genders
  end

  def update
    @user = User.find(params[:id])
    @genders = genders
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated"
      redirect_to user_path
      # Handle a successful update.
    else
      render 'edit'
    end
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "User deleted"
    redirect_to manage_users_users_path
  end

  def manage
    @user = User.find(params[:id])
    @facilities = @user.facilities.page(params[:page])
  end

  def inbox
    @facility_roles = FacilityRole.where("email = ?", current_user.email).page(params[:page])
    @user = User.find(params[:id])
  end

  def home
    @user = User.find(params[:id])
    @userfacilities_check = @user.facility_relationships.all

    # refactored tick_feed and new_route_feed into respective models

    if Tick.hardest_send(@user) && @ticks
      @news_feed = Tick.user_tick_feed(@userfacilities_check, @user) + Route.user_new_route_feed(@userfacilities_check, @user)
    else
      @news_feed =  Tick.tick_feed(@userfacilities_check) + Route.new_route_feed(@userfacilities_check)
    end

    # combines new ticks and new routes, newest first
    @news_feed.sort! { |a, b| b.created_at <=> a.created_at }
    @ticks = Tick.where('extract(month from date) = ?', Date.current.strftime("%m")).where(user_id: @user)
    @annualticks = Tick.where(user_id: @user)
    @admin_facility_roles = FacilityRole.where(user_id: @user).where.not(name: 'climber').page(params[:page])


    if (@ticks.ascent.size > 1) && (Route.current.where(facility_id: @userfacilities_check, grade_id: Grade.previous(@ticks.ascent.grade_desc.first)).first)
      # featured route take your hardest ascent and then takes the next grade down
      @route = Route.current.where(facility_id: @userfacilities_check, grade_id: Grade.previous(@ticks.ascent.grade_desc.first)).where.not(id: Tick.where(user_id: @user.id).pluck(:route_id)).first

    elsif (@ticks.ascent.size > 0) && (Route.current.where(facility_id: @userfacilities_check, grade_id: Grade.where(id: @ticks.ascent.grade_desc.first.grade_id).first).first)
      # returns top rated route for the climber's gyms
      @route = Route.current.where(facility_id: @userfacilities_check, grade_id: Grade.where(id: @ticks.ascent.grade_desc.first.grade_id).first).where.not(id: Tick.where(user_id: @user.id).pluck(:route_id)).first

    elsif Route.current.where(id: Route.top_ten(@userfacilities_check)).first
      # returns top rated route for the climber's gyms
      @route = Route.current.where(id: Route.top_ten(@userfacilities_check)).where.not(id: Tick.where(user_id: @user.id).pluck(:route_id)).first
    end

    @userfacilities_check = @user.facility_relationships.all
    @competitions = Competition.where(facility_id: @userfacilities_check)

  end

  def manage_users
    @user = current_user
    @users = User.order(id: :desc).all
  end

  def analytics
    @user = User.find(params[:id])
    @userfacilities_check = @user.facility_relationships.all
    @ticks = Tick.where('extract(month from date) = ?', Date.current.strftime("%m")).where(user_id: @user)

  end

  def follow
    @user = User.find(params[:id])
    @relationship = Relationship.new(follower_id: current_user.id, followed_id: @user.id)
    @relationship.save
    if @relationship.save
      respond_to do |format|
        format.html {redirect_to @users}
        format.js
      end
    else
      redirect_to @users
    end
  end

  def unfollow
    @user = User.find(params[:id])
    @relationship = Relationship.find_by(follower_id: current_user.id, followed_id: @user.id)
    @relationship.destroy
    respond_to do |format|
      format.html {redirect_to @users}
      format.js
    end

  end

  def followers
    @user = User.find(params[:id])
    @ticks = Tick.where('extract(month from date) = ?', Date.current.strftime("%m")).where(user_id: @user)
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
      @users = @user.followers.filterrific_find(@filterrific).page(params[:page]).per(50)

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

  def following
    @user = User.find(params[:id])
    @ticks = Tick.where('extract(month from date) = ?', Date.current.strftime("%m")).where(user_id: @user)
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
      @users = @user.following.filterrific_find(@filterrific).page(params[:page]).per(50)

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

  def competitions
    @user = User.find(params[:id])
    @userfacilities_check = @user.facility_relationships.all
    @competitions = Competition.where(facility_id: @userfacilities_check)
  end






  private

  def user_params
    params.require(:user).permit(:name, :email, :password,
                                    :password_confirmation, :role, :gender, :zip, :avatar)
  end

  # Before filters

  # Confirms the correct user
  def correct_user
    @user = User.find(params[:id])
    unless user_signed_in? && (current_user == @user || current_user.role == "site_admin")
    redirect_to(root_url)
    flash[:warning] = "You can't access that!"
    end

  end

  def options_for_state_select

    Facility.all.map{ |f| [f.name, f.id] }
    # provides the list of available grades in the route list filters
  end

end
