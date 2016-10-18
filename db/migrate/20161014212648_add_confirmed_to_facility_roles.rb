class AddConfirmedToFacilityRoles < ActiveRecord::Migration
  def change
    add_column :facility_roles, :confirmed, :boolean
  end
end
