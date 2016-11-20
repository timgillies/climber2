class AddStripeColumns3 < ActiveRecord::Migration
  def change
    add_column :subscriptions, :stripe_plan_id, :string
    add_column :subscriptions, :stripe_plan_amount, :integer
    add_column :subscriptions, :stripe_plan_interval, :string
    add_column :subscriptions, :stripe_plan_interval_count, :integer
    add_column :subscriptions, :stripe_plan_created, :integer
  end
end
