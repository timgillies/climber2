class WallsController < ApplicationController

  def index
    @walls = Wall.paginate(page: params[:page])
  end

  def new
    @wall = Wall.new
    @walls = Wall.paginate(page: params[:page])
    @facility = Facility.find(params[:facility_id])
  end

  def show
    @wall = Wall.find(params[:id])
  end

  def create
    @facility = Facility.find(params[:facility_id]) #This ensures the redirect_to goes back to the nested resource
    @wall = current_user.walls.build(wall_params)
    @walls = Wall.paginate(page: params[:page]) # makes "each" work in the partial
    @wall.facility_id = params[:facility_id] #this passes the facility ID through the field
    if @wall.save
      flash[:success] = "Wall created!"
      redirect_to(new_facility_wall_path(@facility))
    else
      render :new
    end
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @wall = current_user.walls.build(wall_params)
    if @wall.update_attributes(wall_params)
      flash[:success] = "Wall updated!"
      redirect_to(new_facility_wall_path(@facility))
      # Handle a successful update.
    else
      render :new
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @wall = Wall.find(params[:id])
    @zones = Wall.order('discipline ASC', 'rank ASC').paginate(page: params[:page]) # makes "each" work in the partial
  end

  def destroy
  end

  private

    def wall_params
      params.require(:wall).permit(:name, :facility_id, :user_id)
    end
  end
