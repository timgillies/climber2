class StaticPagesController < ApplicationController



  def home
    @facility = current_user.facilities.build if user_signed_in?
    @user = User.new

    @lead = Lead.new
  end

  def help
  end

  def about
  end

  def contact
  end

end
