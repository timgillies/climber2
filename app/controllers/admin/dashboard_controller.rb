class Admin::DashboardController < ApplicationController

  def index
    @facilities = Facility.paginate(page: params[:page])
  end

  def show
    @user = User.find(params[:id])
    @facilities = @user.facilities.paginate(page: params[:page])
  end
end
