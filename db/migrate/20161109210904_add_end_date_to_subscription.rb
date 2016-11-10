class AddEndDateToSubscription < ActiveRecord::Migration
  def change

    add_column :subscriptions, :end_date, :date
    add_column :subscriptions, :customer_id, :string
    
  end
end
