class StaticPagesController < ApplicationController



  def home
    if user_signed_in?
      if @userfacilities.count > 0 #facilities where role is not climber
        if FacilityRole.where(email: current_user.email, user_id: nil).count > 0 #checks if user has any pending invites
          redirect_to inbox_user_url(current_user) #redirects to root where they will be asked to confirm invite.
        else
          redirect_to home_user_path(current_user)
        end
      else
        if FacilityRole.where(email: current_user.email, user_id: nil).count > 0 #checks if user has any pending invites
          redirect_to inbox_user_url(current_user) #redirects to root where they will be asked to confirm invite.
        else
        redirect_to home_user_path(current_user)
        end
      end
    end
    @user = User.new

    @lead = Lead.new

    @demo_facility = Facility.where(demo: true).first
    @random_number = rand(1..15)
  end

  def help
  end

  def about
  end

  def contact
  end

end
