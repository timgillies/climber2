class ZonesController < ApplicationController

  layout :check_layout

  def check_layout
    if params[:facility_id].present?
      'admin'
    else
      'user'
    end
  end

  include FacilitiesHelper
  include GradesHelper



  def index
    @facility = Facility.find(params[:facility_id])
    @zones = @facility.zones.page(params[:page])
    @facilityzones = @facility.zones.all.map{|fw| [fw.name, fw.id ] }
    @facility_systems = facility_systems.page(params[:page])
  end

  def show
    @facility = Facility.find(params[:facility_id])
    @zone = Zone.find(params[:id])
    @zones = @facility.zones.page(params[:page])
    @facility_systems = facility_systems.page(params[:page])
    @zone_routes = @facility.routes.current.where(zone_id: @zone).page(params[:page]).per(500)
  end
end
