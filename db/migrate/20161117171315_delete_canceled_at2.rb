class DeleteCanceledAt2 < ActiveRecord::Migration
  def change
    remove_column( :subscriptions, :canceled_at)
  end
end
