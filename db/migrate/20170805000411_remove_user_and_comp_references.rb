class RemoveUserAndCompReferences < ActiveRecord::Migration
  def change
    remove_column( :comp_routes, :routes_id)
    remove_column( :comp_routes, :competitions_id)
    add_reference :comp_routes, :route, foreign_key: {on_delete: :nullify}
    add_reference :comp_routes, :competition, foreign_key: {on_delete: :nullify}

  end
end
