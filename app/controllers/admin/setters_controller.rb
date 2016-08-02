class Admin::SettersController < ApplicationController
  before_action :authenticate_user!,    only: [:index, :show, :edit, :update, :destroy]
  before_action :facilityroute_admin,      only: [:index, :show, :edit, :update, :destroy]

  layout "admin"

  def index
    @setters = Setter.page(params[:page])
  end

  def new
    @setter = Setter.new
    @facility = Facility.find(params[:facility_id])
    @setters = @facility.setters.page(params[:page])
  end

  def create
    @facility = Facility.find(params[:facility_id]) #This ensures the redirect_to goes back to the nested resource
    @setter = current_user.setters.build(setter_params)
    @setters = Setter.page(params[:page]) # makes "each" work in the partial
    @setter.facility_id = params[:facility_id] #this passes the facility ID through the field
    if @setter.save
      flash[:success] = "Routesetter created!"
      redirect_to(new_admin_facility_setter_path(@facility))
    else
      render 'new'
    end
  end

  def update
    @facility = Facility.find(params[:facility_id])
    @setter = @facility.setters.find(params[:id])
    if @setter.update_attributes(setter_params)
      flash[:success] = "Routesetter updated!"
      redirect_to(new_admin_facility_setter_path(@facility))
      # Handle a successful update.
    else
      render :new
    end
  end

  def edit
    @facility = Facility.find(params[:facility_id])
    @setter = Setter.find(params[:id])
    @setters = @facility.setters.page(params[:page])
  end

  def destroy
    Setter.find(params[:id]).destroy
    flash[:success] = "Routesetter deleted"
    redirect_to :back
  end

  private

    def setter_params
      params.require(:setter).permit(:first_name, :last_name, :nick_name, :email, :facility_id)
    end


end
