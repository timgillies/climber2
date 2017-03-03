class AddColorHexToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :color_hex, :string
  end
end
