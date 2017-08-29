class AddCompIdToTicks < ActiveRecord::Migration
  def change
    add_reference :ticks, :competition, foreign_key: {on_delete: :nullify}
  end
end
