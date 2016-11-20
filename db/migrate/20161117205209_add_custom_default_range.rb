class AddCustomDefaultRange < ActiveRecord::Migration
  def change
    add_column :facilities, :days_from_start_date, :integer
  end
end
