class ChangeSetByIdtoSet < ActiveRecord::Migration
  def change
    rename_column(:routes, :set_by, :set_by_id)
  end
end
