class ChangeDataTypesInSubscriptions < ActiveRecord::Migration
  def change
    remove_column( :subscriptions, :start)
    remove_column( :subscriptions, :status)
    remove_column( :subscriptions, :trial_start)
    remove_column( :subscriptions, :trial_end)
    remove_column( :subscriptions, :current_period_start)
    remove_column( :subscriptions, :current_period_end)
    remove_column( :subscriptions, :ended_at)
  end
end
