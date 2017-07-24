class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable,
         :omniauthable, :omniauth_providers => [:facebook, :google_oauth2]

  has_many :facility_relationships, :through => :facility_roles, source: :facility
  has_many :facilities
  has_many :routes
  has_many :grades
  has_many :zones
  has_many :walls
  has_many :ticks
  has_many :facility_targets
  has_many :sub_child_zones
  has_many :grade_systems
  has_many :custom_colors
  has_many :tasks_as_assigner, :class_name => "Task", :foreign_key => "assigner_id"
  has_many :tasks_as_assignee, :class_name => "Task", :foreign_key => "assignee_id"
  has_many :tasks_as_completer, :class_name => "Task", :foreign_key => "completed_by_id"
  belongs_to :admin
  belongs_to :facility_role
  has_many :facility_roles
  has_many :subscriptions

  attr_accessor :remember_token, :activation_token, :reset_token

  has_attached_file :avatar, styles: { medium: "300x300#", thumb: "100x100#" }, default_url: "default-avatar.png"
  validates_attachment_content_type :avatar, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]


  def remember_me
    true
  end

  ratyrate_rater

  def self.from_omniauth(auth)
    data = auth.info
    user = User.where(:email => data["email"]).first

      unless user
        user = where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
          user.provider = auth.provider
          user.uid = auth.uid
          user.first_name = auth.extra.raw_info.first_name
          user.last_name = auth.extra.raw_info.last_name
          user.first_name = auth.info.first_name
          user.last_name = auth.info.last_name
          user.gender = auth.extra.raw_info.gender
          user.image = auth.info.image
          user.name = auth.info.name
          user.email = auth.info.email
          user.password = Devise.friendly_token[0,20]
          user.confirmed_at = DateTime.now.to_date
        end
      end
    user
  end


  def self.top_ten_climbers(facility)
    User.where(id: Tick.ascent.where('ticks.created_at > ?', 6.days.ago.to_date).where(route_id: Route.where(facility_id: facility)).includes(:grade).grade_desc.map { |t| t.user_id}).limit(10)
  end

  filterrific(
  default_filter_params: {  },
  available_filters: [
    :user_search_query,
    :with_facility,
  ]
  )

  # define ActiveRecord scopes for
  # :search_query, :sorted_by, :with_country_id, and :with_created_at_gte

  scope :user_search_query, lambda { |query|
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
    num_or_conds = 1
    where(
      terms.map { |term|
        "(LOWER(users.name) LIKE ?)"
      }.join(' AND '),
      *terms.map { |e| [e] * num_or_conds }.flatten
    )
  }



  scope :with_facility, lambda { |facility|
      joins(:facility_roles).where( 'facility_roles.facility_id = ?', facility)
  }


  private

    # Converts email to all lower-case
    def downcase_email
      self.email = email.downcase
    end

    # Create and assigns the activation token and digest
    def create_activation_digest
      self.activation_token = User.new_token
      self.activation_digest = User.digest(activation_token)
    end
end
