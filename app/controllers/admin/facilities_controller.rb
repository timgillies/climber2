class Admin::FacilitiesController < ApplicationController
  before_action :authenticate_user!,        only: [:index, :show, :new, :create, :edit, :update, :destroy]
  before_action :facility_admin,            only: [:index, :show, :edit, :update, :destroy]
  before_action :head_setter_role,          only: [:destroy]
  before_action :setter_role,               except: [:new, :create, :index, :show]
  before_action :marketing_role,            except: [:new, :create, :index, :show]


  layout "admin", except: [:index, :new]

  include FacilitiesHelper


  def index
    @facilities = current_user.facilities.page(params[:page])
  end

  def show
    @facility = Facility.find(params[:id])
    @routes = @facility.routes.page(params[:page])
    @activeroutes = @facility.routes.where("enddate >= ?", Date.today)
    @facilityticks = Tick.where("facility_id = ?", @facility)
    @facility_systems = facility_systems.page(params[:page])
  end

  def new
    @facility = Facility.new
  end

  def create
    @facility = current_user.facilities.build(facility_params)
    if @facility.save
      current_user.update_attribute(:role, 'facility_admin')
      flash[:success] = "Thank you for registering your facility"
      redirect_to root_url

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
      flash[:danger] = "Facility not saved"
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
      params.require(:facility).permit(:name, :location, :addressline1, :addressline2, :city, :state, :zipcode, :custom, :vscale, :yds, :user_id)
    end

    # Before filters

    # Confirms an admin user.
    def admin_user
      redirect_to root_url unless current_user.admin?
    end

end
