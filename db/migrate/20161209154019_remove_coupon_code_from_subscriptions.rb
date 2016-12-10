class RemoveCouponCodeFromSubscriptions < ActiveRecord::Migration
  def change
    remove_column :subscriptions, :couponCode
  end
end
