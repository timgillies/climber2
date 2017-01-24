class Drop < ActiveRecord::Migration
  def change
    remove_column :routes, :set_by_id
  end
end
