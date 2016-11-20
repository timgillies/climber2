class DeleteCanceledAt3 < ActiveRecord::Migration
  def change
    add_column :subscriptions, :canceled_at, :integer
  end
end
