class AddCompletedByAndCompletedAtToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :completed_by_id, :integer
    add_column :tasks, :completed_at, :date
    add_column :routes, :task_id, :integer
  end
end
