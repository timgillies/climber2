class Route < ActiveRecord::Base
  belongs_to :facility
  belongs_to :zone
  belongs_to :user
  has_many :grades
end
