class AddStripeColumns < ActiveRecord::Migration
  def change

    add_column :subscriptions, :stripe_subscription_id, :string
    add_column :subscriptions, :stripe_last_four, :string

  end
end
