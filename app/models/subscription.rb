class Subscription < ActiveRecord::Base

  belongs_to :user

  def renew
    update_attribute(:end_date, Date.today + 1.month)
  end

end
