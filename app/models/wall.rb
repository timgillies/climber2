class Wall < ActiveRecord::Base
  belongs_to  :facility
  belongs_to  :user
  belongs_to  :zone
  has_many    :routes

  validates :name, presence: true, uniqueness: {scope: :facility_id}, length: { maximum: 50}

end
