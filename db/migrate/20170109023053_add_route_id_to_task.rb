class AddRouteIdToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :route_id, :integer
  end
end
