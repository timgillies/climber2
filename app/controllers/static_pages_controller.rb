class StaticPagesController < ApplicationController



  def home
    if user_signed_in?

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
