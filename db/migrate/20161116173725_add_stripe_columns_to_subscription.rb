class AddStripeColumnsToSubscription < ActiveRecord::Migration
  def change
    add_column :subscriptions, :start, :date
    add_column :subscriptions, :status, :string
    add_column :subscriptions, :trial_start, :date
    add_column :subscriptions, :trial_end, :date
    add_column :subscriptions, :current_period_start, :date
    add_column :subscriptions, :current_period_end, :date
    add_column :subscriptions, :ended_at, :date
  end
end
