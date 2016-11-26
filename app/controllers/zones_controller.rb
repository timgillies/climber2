class ZonesController < ApplicationController
  def index
    @facility = Facility.find(params[:facility_id])
    @zones = @facility.zones.page(params[:page])
    @wall = Wall.new
    @facilityzones = @facility.zones.all.map{|fw| [fw.name, fw.id ] }
  end

  def show
    @zones = Zone.find(params[:id])
  end
end
