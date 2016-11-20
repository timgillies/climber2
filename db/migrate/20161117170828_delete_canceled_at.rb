class DeleteCanceledAt < ActiveRecord::Migration
  def change
    remove_column( :subscriptions, :canceled_at)
    add_column :subscriptions, :canceled_at, :integer

  end
end
