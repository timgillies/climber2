class AddFacilityToSubscription < ActiveRecord::Migration
  def change
    add_reference :subscriptions, :facility, foreign_key: {on_delete: :nullify}
  end
end
