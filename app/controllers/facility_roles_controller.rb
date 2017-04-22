class FacilityRolesController < ApplicationController
  before_action :authenticate_user!


layout 'user'

  def index
    @user = User.find(params[:user_id])
    @facilities = Facility.all.page(params[:page]).per(2000)
    @facility_role = FacilityRole.new
    @facility_roles = FacilityRole.where(user_id: @user).page(params[:page])

    # put the below in the model eventually ----------
    @userfacilities_check = current_user.facility_relationships.all

        @tick_feed = Tick.where('ticks.created_at > ?', 6.days.ago.to_date).joins(:route).merge(Route.where(facility_id: @userfacilities_check)).includes(:user, :grade, :route, :facility, :rate_average_without_dimension)
        @new_route_feed = Route.where(facility_id: @userfacilities_check).where('routes.created_at > ?', 6.days.ago.to_date).order(created_at: :desc).includes(:zone, :grade, :facility)
        @news_feed = @tick_feed + @new_route_feed
        #newest first
        @news_feed.sort! { |a, b| b.created_at <=> a.created_at }
        @top_10_sends = Tick.includes(:grade, :user).where(route_id: Route.where(facility_id: @userfacilities_check)).where.not(tick_type: "project").grade_desc.take(10)
        # gets top 10 routes based on ratings cache average
        @top_10_routes = Route.where(facility_id: @userfacilities_check).includes(:grade, :facility, :rating_cache).where(id: RatingCache.where(cacheable_type: "Route").order('rating_caches.avg desc').take(10).map { |rate| [rate.cacheable_id.to_i] } )
        @newest_10_routes = Route.where(facility_id: @userfacilities_check).includes(:grade, :facility, :zone).order('routes.setdate desc').limit(10)
        @ticks = current_user.ticks.where('ticks.date > ?', 7.days.ago.beginning_of_day.to_date)
    # -------------------------------------------------
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



  private

    def facility_role_params
      params.permit(:email, :name, :user_id, :confirmed, :facility_id)
    end


end
