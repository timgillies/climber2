class WallsController < ApplicationController
  def index
    @walls = Wall.paginate(page: params[:page])
  end

  def show
    @wall = Wall.find(params[:id])
  end
  
end
