class Admin < ActiveRecord::Base

  has_many :users
  belongs_to :facility

end
