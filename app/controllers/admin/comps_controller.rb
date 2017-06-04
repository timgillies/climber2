class Admin::CompsController < ApplicationController

  layout "admin"

  def index
    @facility = Facility.find(params[:facility_id])
  end
end
