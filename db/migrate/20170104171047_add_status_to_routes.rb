class AddStatusToRoutes < ActiveRecord::Migration
  def change
    add_column :routes, :status, :string
  end
end
