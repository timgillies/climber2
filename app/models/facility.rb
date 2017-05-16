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

  # creates a facility role as climber when the facility is created
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


  filterrific(
  default_filter_params: {  },
  available_filters: [
    :facility_search_query,
    :with_state,
  ]
  )

  # define ActiveRecord scopes for
  # :search_query, :sorted_by, :with_country_id, and :with_created_at_gte

  scope :facility_search_query, lambda { |query|
    # Searches the students table on the 'first_name' and 'last_name' columns.
    # Matches using LIKE, automatically appends '%' to each term.
    # LIKE is case INsensitive with MySQL, however it is case
    # sensitive with PostGreSQL. To make it work in both worlds,
    # we downcase everything.
    return nil  if query.blank?

    # condition query, parse into individual keywords
    terms = query.downcase.split(/\s+/)

    # replace "*" with "%" for wildcard searches,
    # append '%', remove duplicate '%'s

    terms = terms.map { |e| ('%'+e.gsub('*','%')+'%').gsub(/%+/, '%') }
    # configure number of OR conditions for provision
    # of interpolation arguments. Adjust this if you
    # change the number of OR conditions.
    num_or_conds = 3
    where(
      terms.map { |term|
        "(LOWER(facilities.name) LIKE ? OR LOWER(facilities.city) LIKE ? OR LOWER(facilities.state) LIKE ?)"
      }.join(' AND '),
      *terms.map { |e| [e] * num_or_conds }.flatten
    )
  }



  scope :with_state, lambda { |state|
      where( 'state = ?', state)
  }





  private

  # (after_create) - Creates relationship in FacilityRole table between facility_owner and facility
  def create_facility_role
    self.facility_roles.create!(user_id: user.id, name: 'climber', email: user.email, confirmed: true )
  end

end
