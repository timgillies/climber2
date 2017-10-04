class CompetitionsController < ApplicationController
  before_action :authenticate_user!

  layout "admin"

  include CompetitionsHelper
  include FacilitiesHelper

  def index
    @facility = Facility.find(params[:facility_id])
    @competitions = @facility.competitions.all
    @user = current_user
    @userfacilities_check = @user.facility_relationships.all
    @ticks = @user.ticks.where('ticks.date > ?', 7.days.ago.to_date)

  end

  def new
    @competition = Competition.new
    @facility = Facility.find(params[:facility_id])
  end

  def create
    @competition = current_user.competitions.build(competition_params)
    if @competition.save
      competition_admin = CompRelationship.create(user_id: current_user.id, competition_id: @competition.id, role_name: 'admin')
      competition_admin.save
      flash[:success] = "Competition created!"
      redirect_to(facility_competition_path(@competition.facility_id, @competition))
    else
      render 'new'
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:id])
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:id])
    if @competition.update_attributes(competition_params)
      flash[:success] = "Comp updated!"
      redirect_to(facility_competition_path(@facility, @competition))
      # Handle a successful update.
    else
      flash[:error] = "Comp not updaed!  Please check the form."
      redirect_to(edit_facility_competition_path(@facility, @competition))
    end
  end

  def show
    @user = current_user
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:id])
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
        with_status_id: Route.options_for_status_select
      },
      persistence_id: false,
    ) or return
    # Get an ActiveRecord::Relation for all students that match the filter settings.
    # You can paginate with will_paginate or kaminari.
    # NOte: filterrific_find returns an ActiveRecord Relation that can be
    # chained with other scopes to further narrow down the scope of the list,
    # e.g., to apply permissions or to hard coded exclude certain types of records.
    @routes = @competition.routes.filterrific_find(@filterrific).includes(:zone, :wall, :user, :grade, :facility ).page(params[:page]).per(50)

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

  def routes
    @user = current_user
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:id])
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }
    @route_status = route_status_values
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
      persistence_id: false,
    ) or return
    # Get an ActiveRecord::Relation for all students that match the filter settings.
    # You can paginate with will_paginate or kaminari.
    # NOte: filterrific_find returns an ActiveRecord Relation that can be
    # chained with other scopes to further narrow down the scope of the list,
    # e.g., to apply permissions or to hard coded exclude certain types of records.
    @routes = @facility.routes.current.where(status: nil).filterrific_find(@filterrific).includes(:zone, :wall, :user, :grade, :facility ).page(params[:page]).per(50)

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

  def add_route
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:id])
    @route = Route.find(params[:route_id])
    @comp_route = CompRoute.new(user_id: current_user.id, route_id: @route.id, competition_id: @competition.id)
    @comp_route.save
    if @comp_route.save
      respond_to do |format|
        format.html {redirect_to @competition}
        format.js
      end
    else
      redirect_to @competition
    end
  end

  def route_list
    @user = current_user
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:id])
    @facilityzones = @facility.zones.all.map{|fz| [fz.name, fz.id ] }
    @route_status = route_status_values
    @facility = Facility.find(params[:facility_id])

    @filterrific = initialize_filterrific(
      Route,
      params[:filterrific],
      select_options: {
        sorted_by: Route.options_for_sorted_by,
        with_grade_id: options_for_grade_select,
        with_zone_id: options_for_zone_select,
        with_wall_id: options_for_wall_select,
        with_setter_id: options_for_setter_select,
        with_status_id: Route.options_for_status_select
      },
      persistence_id: false,
    ) or return
    # Get an ActiveRecord::Relation for all students that match the filter settings.
    # You can paginate with will_paginate or kaminari.
    # NOte: filterrific_find returns an ActiveRecord Relation that can be
    # chained with other scopes to further narrow down the scope of the list,
    # e.g., to apply permissions or to hard coded exclude certain types of records.
    @routes = @competition.routes.filterrific_find(@filterrific).includes(:zone, :wall, :user, :grade, :facility ).page(params[:page]).per(50)

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


  def add_user
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:id])
    @user = current_user
    @new_participant = CompRelationship.new(user_id: current_user.id, competition_id: @competition.id, role_name: 'climber')
    @new_participant.save
    if @new_participant.save
      respond_to do |format|
        format.html {redirect_to @competition}
        format.js
      end
    else
      redirect_to @competition
    end
  end

  def results
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:id])
    @user = current_user
    @participants = @competition.participants.all
  end

  def followers
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:id])
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
      @users = @competition.participants.filterrific_find(@filterrific).page(params[:page]).per(50)

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

  def invite
    @facility = Facility.find(params[:facility_id])
    @competition = Competition.find(params[:id])
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
      @users = current_user.following.filterrific_find(@filterrific).page(params[:page]).per(50)
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

  def invite_user
    @user = User.find(params[:user_id])
    @competition = Competition.find(params[:id])
    @comp_invite = CompInvite.new(inviter_id: current_user.id, invitee_id: @user.id, competition_id: @competition.id)
    @comp_invite.save
    respond_to do |format|
      format.html
      format.js
    end
    CompInviteMailer.comp_invite_user_email(@competition.facility, @competition, @user, current_user).deliver_now
  end



  private

  def competition_params
    params.require(:competition).permit(:user_id, :facility_id, :name, :description, :private, :start_date, :end_date, :private, :password, :password_confirmation, :comp_format, :logo_image)
  end

  def options_for_facility_select
    Facility.where(id: climber_facilities).all.map{|fz| [fz.name , fz.id ] }
    # provides the list of available grades in the route list filters
  end

  def options_for_grade_select
      facility_grades.map{ |sg| [sg.grade, sg.id ] }
    # provides the list of available grades in the route list filters
  end

  def options_for_zone_select
      @facility.zones.all.map{|fz| [fz.name, fz.id ] }
    # provides the list of available zones in the route list filters
  end

  def options_for_wall_select
      @facility.walls.all.map{|fw| [fw.name, fw.id ] }
    # provides the list of available walls in the route list filters
  end

  def options_for_setter_select
      @facility.facility_roles.where(confirmed: true).where.not(name: 'climber').map{|fs| [fs.user.name, fs.user.id]}
    # provides the list of available walls in the route list filters
  end

  def options_for_state_select
    us_states
    # provides the list of available grades in the route list filters
  end

end
