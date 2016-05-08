class Route < ActiveRecord::Base
  belongs_to :facility
  belongs_to :user
  has_one :grade
end
