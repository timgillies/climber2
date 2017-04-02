class TicksController < ApplicationController

  before_action :authenticate_user!

  layout "user"

  def new
    @tick = Tick.new
    @user = User.find(params[:user_id])
    @tick.route_id = params[:route_id]
  end

  def index
    @user = User.find(params[:user_id])
    @ticks = Tick.where(user_id: @user).page(params[:page])
    @tick_dates = Tick.where(user_id: @user.id).map { |tick| tick.date }.uniq
  end

  def create
    @tick = current_user.ticks.build(tick_params)
    @tick.route_id = params[:route_id]
    @ticks = Tick.page(params[:page]) # makes "each" work in the partial

    if params[:route_id]
      @tick.grade_id = Route.where(id: params[:route_id]).first.grade_id
    end

    if @tick.save
      flash[:success] = "Ascent Saved!"
      redirect_to user_routes_path(current_user)
    else
      render 'new'
    end
  end

  def show
    @tick = Tick.find(params[:id])
  end

  def edit
    @tick= Tick.find(params[:id])
    @user = User.find(params[:user_id])
    @route = @tick.route
    @facility = @tick.route.facility
  end

  def edit
    @tick= Tick.find(params[:id])
    @user = User.find(params[:user_id])
    @route = @tick.route
  end

  def update
    @tick= Tick.find(params[:id])
    @user = User.find(params[:user_id])
    @route = @tick.route
    if @tick.update_attributes(tick_params)
      flash[:success] = "Ascent updated"
      redirect_to(user_ticks_path(@user))
      # Handle a successful update.
    else
      render :edit
    end
  end

  private

    def tick_params
      params.require(:tick).permit(:route_id, :facility_id, :user_id, :tick_type, :description, :date, :lead, :grade_id, :grade_vote_id, :color_hex)
    end


end
