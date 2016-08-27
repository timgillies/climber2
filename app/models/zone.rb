class Zone < ActiveRecord::Base
  belongs_to  :facility
  belongs_to  :user
  has_many    :walls
  has_many    :routes

  validates :name, presence: true, uniqueness: {scope: :facility_id}, length: { maximum: 50}

end
