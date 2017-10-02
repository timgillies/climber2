class Admin < ApplicationRecord

  has_many :users
  belongs_to :facility

end
