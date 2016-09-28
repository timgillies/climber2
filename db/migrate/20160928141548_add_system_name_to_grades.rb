class AddSystemNameToGrades < ActiveRecord::Migration
  def change
    add_column :grades, :system_name, :string
  end
end
