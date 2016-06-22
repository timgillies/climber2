class Setter < ActiveRecord::Base

  belongs_to :facility
  belongs_to :user
  has_many :routes

end
