class Admin::FacilitiesController < ApplicationController
  before_filter :authenticate_user!,    only: [:index, :show, :edit, :update, :destroy]
  before_action :facility_admin,      only: [:show, :edit, :update, :destroy]

  layout "admin", except: [:index, :new]

  def index
    @facilities = current_user.facilities.page(params[:page])
  end

  def show
    @facility = current_user.facilities.find(params[:id])
    @routes = @facility.routes.page(params[:page])
    @activeroutes = @facility.routes.where("enddate >= ?", Date.today)
    @facilityticks = Tick.where("facility_id = ?", @facility)
  end

  def new
    @facility = current_user.facilities.new
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

  def update
    @facility = Facility.find(params[:id])
    if @facility.update_attributes(facility_params)
      flash[:success] = "Info updated!"
      redirect_to(admin_facility_path(@facility))
      # Handle a successful update.
    else
      flash[:danger] = "Thank you for registering!"
      render 'edit'
    end
  end



  def destroy
    Facility.find(params[:id]).destroy
    flash[:success] = "Facility deleted"
    redirect_to admin_facilities_url
  end



  private

    def facility_params
      params.require(:facility).permit(:name, :location, :addressline1, :addressline2, :city, :state, :zipcode, :custom, :user_id)
    end

    # Before filters

    # Confirms an admin user.
    def admin_user
      redirect_to root_url unless current_user.admin?
    end

end
