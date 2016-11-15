class ChangeSetterColumnName < ActiveRecord::Migration
  def change
    rename_column(:routes, :setter_id, :set_by)
  end
end
