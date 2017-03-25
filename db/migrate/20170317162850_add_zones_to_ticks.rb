class AddZonesToTicks < ActiveRecord::Migration
  def change
    add_reference :ticks, :zone, foreign_key: {on_delete: :nullify}
    add_reference :ticks, :wall, foreign_key: {on_delete: :nullify}
  end
end
