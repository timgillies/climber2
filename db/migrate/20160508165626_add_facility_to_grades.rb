class AddFacilityToGrades < ActiveRecord::Migration
  def change
    add_reference :grades, :facility, index: true, foreign_key: true
  end
end
