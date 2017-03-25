class FacilityRolesController < ApplicationController

layout 'user'

  def index
    @user = User.find(params[:user_id])
    @facilities = Facility.all.page(params[:page]).per(2000)
    @facility_role = FacilityRole.new
    @facility_roles = FacilityRole.where(user_id: @user).page(params[:page])
  end

  def show
    @user = User.find(params[:user_id])
  end

  def create
    @user = User.find(params[:user_id])
    @facility_role = @user.facility_roles.build(facility_role_params)
    @facility_roles = FacilityRole.where(user_id: @user).page(params[:page])
    if @facility_role.save
      redirect_to(user_facility_roles_path(@user))
    else
      flash[:danger] = "#{ @facility_role.email } was not added!  Please make sure #{ @facility_role.email } is not already assigned a role."
      redirect_to(user_facility_roles_path(@user))
    end
  end


  def destroy
    FacilityRole.find(params[:id]).destroy
    flash[:success] = "Role deleted"
    redirect_to :back
  end

  def confirm
    @facility_role = FacilityRole.find(params[:id])
    @facility_role.update_attributes(confirmed: true, user_id: current_user.id)
    unless current_user.role == "site_admin"
      current_user.update_attributes(role: "facility_admin")
    end
    redirect_to(inbox_user_path(current_user))
  end



  private

    def facility_role_params
      params.permit(:email, :name, :user_id, :confirmed, :facility_id)
    end


end
