class AddPlanIdToFacilities < ActiveRecord::Migration
  def change
    add_reference :facilities, :plan, foreign_key: {on_delete: :nullify}
  end
end
