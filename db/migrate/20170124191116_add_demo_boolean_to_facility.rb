class AddDemoBooleanToFacility < ActiveRecord::Migration
  def change
    add_column :facilities, :demo, :boolean
  end
end
