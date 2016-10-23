class FacilityRolesController < ApplicationController


  def destroy
    FacilityRole.find(params[:id]).destroy
    flash[:success] = "Role deleted"
    redirect_to :back
  end

  def confirm
    @facility_role = FacilityRole.find(params[:id])
    @facility_role.update_attributes(confirmed: true, user_id: current_user.id)
    current_user.update_attributes(role: "facility_admin")
    redirect_to(inbox_user_path(current_user))
  end



  private

    def facility_role_params
      params.require(:facility_role).permit(:email, :name, :user_id, :confirmed, :facility_id)
    end


end
