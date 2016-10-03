class AddGradeSystemToGrades < ActiveRecord::Migration
  def change
    add_reference :grades, :grade_system, index: true, foreign_key: {on_delete: :nullify}
  end
end
