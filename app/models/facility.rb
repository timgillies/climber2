class Facility < ActiveRecord::Base
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
  belongs_to :facility_grade_system
  belongs_to :tick
  has_many :facility_roles
  belongs_to :plan

  default_scope -> { order(created_at: :asc) }
  validates :name, presence: true
  validates :addressline1, presence: true
  validates :city, presence: true
  validates :state, presence: true
  VALID_ZIPCODE_REGEX = /\A\d{5}-\d{4}|\A\d{5}\z/
  validates :zipcode, presence: true, format: { with: VALID_ZIPCODE_REGEX }

  after_create :create_facility_role

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
