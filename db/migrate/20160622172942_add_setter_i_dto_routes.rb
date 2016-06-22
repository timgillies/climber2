class AddSetterIDtoRoutes < ActiveRecord::Migration
  def change
    remove_column :routes, :setter
    add_reference :routes, :setter, index: true, foreign_key: {on_delete: :nullify}
  end
end
