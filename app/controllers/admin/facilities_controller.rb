class Admin::FacilitiesController < ApplicationController
  before_action :authenticate_user!,        only: [:new, :index, :show, :create, :edit, :update, :destroy], :unless => :facility_is_demo
  before_action :facility_admin,            only: [:index, :show, :edit, :update, :destroy], :unless => :facility_is_demo
  before_action :head_setter_role,          only: [:destroy], :unless => :facility_is_demo
  before_action :setter_role,               except: [:new, :create, :index, :show], :unless => :facility_is_demo
  before_action :guest_role,               except: [:new, :create, :index, :show], :unless => :facility_is_demo
  before_action :marketing_role,            except: [:new, :create, :index, :show], :unless => :facility_is_demo
  before_action :demo_facility,             except: [:index, :show, :new]



  layout "admin", except: [:index, :new, :create, :plans]

  include FacilitiesHelper


  def index
    @facilities = current_user.facilities.page(params[:page])
  end

  def show
    @facility = Facility.find(params[:id])
    @routes = @facility.routes.page(params[:page])
    @activeroutes = @facility.routes.where("enddate >= ?", Date.current)
    @facilityticks = Tick.where("facility_id = ?", @facility)
    @facility_systems = facility_systems.page(params[:page])
  end

  def new

  end

  def create
    if @facility.save
      @facility.update_plan_choice("1")
      unless current_user.role == "site_admin"
        current_user.update_attribute(:role, 'facility_admin')
      end
      redirect_to admin_facility_path(@facility)
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

  def plans
    @facility = Facility.find(params[:id])
  end

  def choose_free_plan
    @facility = Facility.find(params[:id])
    @facility.update_plan_choice("1")
    redirect_to admin_facility_path(@facility)
  end

  def choose_basic_plan
    @facility = Facility.find(params[:id])
    @facility.update_plan_choice("2")
    redirect_to new_admin_facility_subscription_path(@facility)
  end

  def choose_pro_plan
    @facility = Facility.find(params[:id])
    @facility.update_plan_choice("3")
    redirect_to new_admin_facility_subscription_path(@facility)
  end





  private

    def facility_params
      params.require(:facility).permit(:name, :location, :addressline1, :addressline2, :city, :state, :zipcode, :custom, :vscale, :yds, :user_id, :plan_id, :days_from_start_date, :country, :logo_image)
    end

    # Before filters

    # Confirms an admin user.
    def admin_user
      redirect_to root_url unless current_user.admin?
    end

    def logged_in_user
      unless logged_in?
        redirect_to new_user_registration_path
      end
    end

    # Returns true if the user is logged in, false otherwise.
    def logged_in?
      !current_user.nil?
    end

end
