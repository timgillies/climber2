class AddCancelledAtToSubscription < ActiveRecord::Migration
  def change
    add_column :subscriptions, :canceled_at, :date
  end
end
