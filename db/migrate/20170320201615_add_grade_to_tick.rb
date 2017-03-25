class AddGradeToTick < ActiveRecord::Migration
  def change
    add_column :ticks, :grade_vote_id, :integer
  end
end
