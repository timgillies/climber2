class SettersController < ApplicationController

  def index
    @setters = Setter.page(params[:page])
  end

  def show
    @setter = Setter.find(params[:id])
  end

end
