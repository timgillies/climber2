class FacilitiesController < ApplicationController
  before_action :logged_in_user, only: [:create, :edit]

  def index
    @facilities = Facility.paginate(page: params[:page])
  end

  def show
    @facility = Facility.find(params[:id])
  end

  def new
    @facility = Facility.new
  end

  def create
    @facility = current_user.facilities.build(facility_params)
    if @facility.save
      flash[:success] = "Thank you for registering!"
      redirect_to @facility
    else
      render 'new'
    end
  end

  def edit
    @facility = Facility.find(params[:id])
  end

  private

    def facility_params
      params.require(:facility).permit(:name, :addressline1, :city, :state, :zipcode)
    end
end
