class AddTaskAttributesToRoutes < ActiveRecord::Migration
  def change

    add_column :routes, :task_number, :integer
    add_column :routes, :task_type, :string
    add_column :routes, :assigner_id, :integer
    add_column :routes, :assignee_id, :integer

  end
end
