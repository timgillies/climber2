class ZonesController < ApplicationController
  def index
    @zones = Zone.order('discipline ASC', 'rank ASC').paginate(page: params[:page])
  end

  def show
    @zones = Zone.find(params[:id])
  end
end
