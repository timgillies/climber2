class AddUserIdToGrades < ActiveRecord::Migration
  def change
    add_reference :grades, :user, index: true, foreign_key: true
    rename_column :grades, :style, :discipline
  end
end
