class Zone < ActiveRecord::Base
  belongs_to  :facility
  belongs_to  :user
  has_many    :walls
  has_many    :routes
  has_many    :tasks
  has_many    :sub_child_zones, :through => :walls
  has_many :facility_targets

  validates :name, presence: true, uniqueness: {scope: :facility_id}, length: { maximum: 50}

  has_attached_file :image, styles: { medium: "600", thumb: "100x100#", square: "300x300#" }
  validates_attachment_content_type :image, :content_type => ['image/jpg', 'image/png', 'image/gif', 'image/jpeg']

end
