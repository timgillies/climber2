class RatingCache < ActiveRecord::Base
  belongs_to :cacheable, :polymorphic => true
  has_many :routes
end
