class WallsController < ApplicationController
  before_action :authenticate_user!

  def index
    @walls = Wall.paginate(page: params[:page])
  end

  def show
    @wall = Wall.find(params[:id])
  end

end
