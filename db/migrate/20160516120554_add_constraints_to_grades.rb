class AddConstraintsToGrades < ActiveRecord::Migration
  def change
    remove_foreign_key :routes, :grades
    add_foreign_key :routes, :grades, on_delete: :nullify
  end
end
