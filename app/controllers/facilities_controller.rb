class FacilitiesController < ApplicationController

  def show
    @facility = Facility.find(params[:id])
  end

  def new
    @facility = Facility.new
  end

  def create
    @facility = Facility.new(facility_params)
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
