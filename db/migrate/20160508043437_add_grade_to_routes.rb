class AddGradeToRoutes < ActiveRecord::Migration
  def change
    add_reference :routes, :grade, index: true, foreign_key: true
  end
end
