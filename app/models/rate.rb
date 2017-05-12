class Rate < ActiveRecord::Base
  belongs_to :rater, :class_name => "User"
  belongs_to :rateable, :polymorphic => true

  #attr_accessible :rate, :dimension

  def self.average_rating(object)
    where(rateable_id: object).average(:stars)
  end

  def self.rating_count(object)
    where(rateable_id: object).count(:stars)
  end

end
