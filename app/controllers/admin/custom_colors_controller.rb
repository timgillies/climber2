class Admin::CustomColorsController < ApplicationController

  before_action :authenticate_user!,    only: [:index, :show, :edit, :update, :destroy]
  before_action :facility_admin,      only: [:index, :show, :edit, :update, :destroy]

  layout "admin"


  def new
    @custom_color = CustomColor.new
    @facility = Facility.find(params[:facility_id])
  end

  def create
    @facility = Facility.find(params[:facility_id]) #This ensures the redirect_to goes back to the nested resource
    @custom_color = current_user.custom_colors.build(custom_color_params)
    @custom_color.facility_id = params[:facility_id] #this passes the facility ID through the field
    if @custom_color.save
      flash[:success] = "Color created!"
      redirect_to(admin_facility_custom_colors_path(@facility))
    else
      render 'index'
    end
  end

  def index
    @facility = Facility.find(params[:facility_id])
    @custom_colors = @facility.custom_colors.page(params[:page])
    @custom_color = CustomColor.new

    # Respond to html for initial page load and to js for AJAX filter updates.
    respond_to do |format|
      format.html
      format.js
    end
  end

  def destroy
    CustomColor.find(params[:id]).destroy
    flash[:success] = "Color deleted"
    redirect_to :back
  end

  private

  def custom_color_params
    params.require(:custom_color).permit(:color_hex, :color_name, :text_color_hex, :user_id, :facility_id)
  end

end
