class RemoveFacilityIdFromGrades < ActiveRecord::Migration
  def change
    remove_column :grades, :facility_id
  end
end
