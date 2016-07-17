class AddTagsToWalls < ActiveRecord::Migration
  def change
    add_column :routes, :tagged, :boolean
    add_column :ticks, :lead, :boolean
  end
end
