class Admin::WallsController < Admin::FacilitiesController
  before_action :logged_in_user,    only: [:index, :show, :edit, :update, :destroy]
  before_action :facilityroute_admin,      only: [:index, :show, :edit, :update, :destroy]

  layout "admin"

  def index
    @walls = Wall.paginate(page: params[:page])
  end

  def new
    @wall = Wall.new
    @facility = Facility.find(params[:facility_id])
    @walls = @facility.walls.paginate(page: params[:page])

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
      redirect_to(new_admin_facility_wall_path(@facility))
    else
      render 'new'
    end
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @wall = @facility.walls.find(params[:id])
    if @wall.update_attributes(wall_params)
      flash[:success] = "Wall updated!"
      redirect_to(new_admin_facility_wall_path(@facility))
      # Handle a successful update.
    else
      render :new
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @wall = Wall.find(params[:id])
    @walls = @facility.walls.paginate(page: params[:page])
  end

  def destroy
    Wall.find(params[:id]).destroy
    flash[:success] = "Wall deleted"
    redirect_to :back
  end

  private

    def wall_params
      params.require(:wall).permit(:name, :facility_id, :user_id)
    end
  end
