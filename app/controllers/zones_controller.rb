class ZonesController < ApplicationController
  def index
    @zones = Zone.paginate(page: params[:page])
  end

  def show
    @zones = Zone.find(params[:id])
  end
end
