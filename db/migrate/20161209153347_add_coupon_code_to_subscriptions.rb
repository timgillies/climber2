class AddCouponCodeToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :couponCode, :string
  end
end
