class AddStatusDescriptionToRoutes < ActiveRecord::Migration
  def change
    add_column :routes, :task_description, :text
  end
end
