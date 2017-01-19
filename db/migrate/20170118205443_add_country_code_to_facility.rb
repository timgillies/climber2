class AddCountryCodeToFacility < ActiveRecord::Migration
  def change
    add_column :facilities, :country, :string
  end
end
