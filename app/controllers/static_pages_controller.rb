class StaticPagesController < ApplicationController



  def home
    if user_signed_in?
      if @userfacilities.count > 0
        redirect_to admin_facility_path(@userfacilities.first)
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
