class Subscription < ActiveRecord::Base

  belongs_to :user
  belongs_to :facility
  belongs_to :plan

  def renew
    update_attribute(:end_date, Date.today + 1.month)
  end

end
