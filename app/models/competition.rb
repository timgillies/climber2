class Competition < ActiveRecord::Base

  belongs_to :facility
  belongs_to :user

  has_many :comp_routes
  has_many :routes, through: :comp_routes, source: :route
  has_many :users_as_participants, :class_name => "CompRelationship"
  has_many :participants, through: :comp_relationships, source: :user
  has_many :comp_relationships

  validates :name, presence: true
  validates :description, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true





  has_attached_file :logo_image, styles: { large: "600", medium: "300", thumb: "100x100#" }, default_url: "https://s3-us-west-2.amazonaws.com/climbconnect-assets/logos/cc-white-block.svg"
  validates_attachment_content_type :logo_image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

end
