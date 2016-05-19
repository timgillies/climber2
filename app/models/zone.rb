class Zone < ActiveRecord::Base
  belongs_to  :facility
  belongs_to  :user
  has_many    :routes

  validates :name, presence: true, uniqueness: true, length: { maximum: 50}

end
