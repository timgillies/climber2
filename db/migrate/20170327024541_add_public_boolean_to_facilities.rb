class AddPublicBooleanToFacilities < ActiveRecord::Migration
  def change
    add_column :facilities, :public, :boolean
  end
end
