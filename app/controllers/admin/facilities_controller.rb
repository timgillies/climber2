class Admin::FacilitiesController < ApplicationController
  before_action :logged_in_user, only: [:create, :edit]

  layout "admin"

  def index
    @facilities = current_user.facilities.paginate(page: params[:page])
  end

  def show
    @facility = Facility.find(params[:id])
    @routes = @facility.routes.paginate(page: params[:page])
  end

  def new
    @facility = Facility.new
  end

  def create
    @facility = current_user.facilities.build(facility_params)
    if @facility.save
      flash[:success] = "Thank you for registering!"
      redirect_to admin_facilities_url
    else
      render 'new'
    end
  end

  def edit
    @facility = Facility.find(params[:id])
  end

  def destroy
    Facility.find(params[:id]).destroy
    flash[:success] = "Facility deleted"
    redirect_to users_url
  end


  private

    def facility_params
      params.require(:facility).permit(:name, :addressline1, :city, :state, :zipcode)
    end
end
