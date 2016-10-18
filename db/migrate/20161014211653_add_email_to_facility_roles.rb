class AddEmailToFacilityRoles < ActiveRecord::Migration
  def change
    add_column :facility_roles, :email, :string
  end
end
