class Route < ActiveRecord::Base
  belongs_to :facility
  belongs_to :zone
  belongs_to :user
  has_many :grades

  validates :color, presence: true
  validates :setter, presence: true
  validates :setdate, presence: true

end
