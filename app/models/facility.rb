class Facility < ActiveRecord::Base

  def to_param
   [id, name.parameterize].join("-")
  end

  has_many :users, :through => :facility_roles
  belongs_to :user
  has_many :routes
  has_many :zones
  has_many :walls
  has_many :setters
  has_many :admins
  has_many :ticks
  has_many :sub_child_zones
  has_many :facility_targets
  has_many :facility_grade_systems
  has_many :grade_systems, :through => :facility_grade_systems
  has_many :grades, :through => :grade_systems
  has_many :tasks
  has_many :custom_colors
  belongs_to :facility_grade_system
  belongs_to :tick
  has_many :facility_roles
  belongs_to :plan
  has_many :subscriptions

  default_scope -> { order(created_at: :asc) }
  validates :name, presence: true
  validates :addressline1, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zipcode, presence: true

  after_create :create_facility_role

  has_attached_file :logo_image, styles: { large: "600", medium: "300", thumb: "100x100#" }, default_url: "default-avatar.png"
  validates_attachment_content_type :logo_image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  has_attached_file :header_image, styles: { large: "1000", medium: "300", thumb: "75x75#" }, default_url: "white_vector_banner.jpg"
  validates_attachment_content_type :header_image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  def self.yds?
    where(yds: true)
  end

  def self.vscale?
    where(vscale: true)
  end

  def self.custom?
    where(custom: true)
  end

  def self.name_location
    if self.location?
      self.name + "-" + self.location
    else
      self.name
    end
  end

  def update_plan_choice(plan_id)
    self.update_attribute(:plan_id, plan_id)
  end



  private

  # (after_create) - Creates relationship in FacilityRole table between facility_owner and facility
  def create_facility_role
    self.facility_roles.create!(user_id: user.id, name: 'facility_management', email: user.email, confirmed: true )
  end

end
