class RatingCache < ApplicationRecord
  belongs_to :cacheable, :polymorphic => true
  has_many :routes
end
