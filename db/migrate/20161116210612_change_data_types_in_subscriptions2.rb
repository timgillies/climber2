class ChangeDataTypesInSubscriptions2 < ActiveRecord::Migration
  def change
    add_column :subscriptions, :start, :integer
    add_column :subscriptions, :status, :string
    add_column :subscriptions, :trial_start, :integer
    add_column :subscriptions, :trial_end, :integer
    add_column :subscriptions, :current_period_start, :integer
    add_column :subscriptions, :current_period_end, :integer
    add_column :subscriptions, :ended_at, :integer
  end
end
