class AddTaskNumber < ActiveRecord::Migration
  def change
    add_column :tasks, :task_number, :integer
  end
end
