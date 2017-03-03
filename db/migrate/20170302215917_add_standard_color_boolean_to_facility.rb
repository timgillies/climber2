class AddStandardColorBooleanToFacility < ActiveRecord::Migration
  def change
    add_column :facilities, :standard_colors, :boolean
  end
end
