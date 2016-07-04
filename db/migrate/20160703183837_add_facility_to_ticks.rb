class AddFacilityToTicks < ActiveRecord::Migration
  def change
    add_reference :ticks, :facility, index: true, foreign_key: {on_delete: :nullify}
  end
end
