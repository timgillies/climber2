class Tick < ActiveRecord::Base

  belongs_to :route
  belongs_to :user
  belongs_to :facility
  accepts_nested_attributes_for :facility

end
