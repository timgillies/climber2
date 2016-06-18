class Admin::DashboardController < ApplicationController

  def index
    @facilities = Facility.page(params[:page])
  end

  def show
    @user = User.find(params[:id])
    @facilities = @user.facilities.page(params[:page])
  end
end
