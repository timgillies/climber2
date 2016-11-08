class AddPlanToRegistration < ActiveRecord::Migration
  def change

    add_reference :registrations, :plan, index: true, foreign_key: {on_delete: :nullify}
  end
end
