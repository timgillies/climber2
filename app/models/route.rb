class Route < ActiveRecord::Base
  belongs_to :facility
  belongs_to :zone
  belongs_to :wall
  belongs_to :sub_child_zone
  belongs_to :user
  belongs_to :grade
  has_many :ticks
  has_many :grades
  belongs_to :tick
  belongs_to :tasks
  belongs_to :rating_cache
  has_many :custom_colors, {:through=>:facilities, :source=>:custom_color}
  has_many :grade_systems, :through=>:grades
  belongs_to :competition


  scope :with_ratings, ->{includes(:rate_average_without_dimension).order("rating_caches.avg desc")}
  default_scope -> { order(enddate: :desc) }

  accepts_nested_attributes_for :ticks

  has_attached_file :image, styles: { medium: "600", thumb: "100x100#" }, default_url: "https://s3-us-west-2.amazonaws.com/climbconnect-assets/logos/social-media/default-avatar.png"
  validates_attachment_content_type :image, :content_type => ['image/jpg', 'image/png', 'image/gif', 'image/jpeg']

  validates_presence_of :setdate
  validates_presence_of :grade
  validates_presence_of :color_hex

  validates_presence_of :zone, :if => :wall_id? #if status is blank, it does not validates presence of object
  validates_presence_of :wall, :if => :sub_child_zone_id? #if status is blank, it does not validates presence of object
  validates_presence_of :zone, :if => :sub_child_zone_id? #if status is blank, it does not validates presence of object



# checks if route is active or expired.  true = active
  def active?
    (self.enddate > Date.current if self.enddate) || (self.enddate.nil?)
  end

  def self.current
    where("enddate > ? OR enddate IS ?", Date.current, nil)
  end

# counts number of routes set on given date
  def self.set_on(date)
    where("date(setdate) = ?", date).count(:id)
  end


  def average_age
    current.map {|f| [route_age(f).to_i] }.inject(:+).sum
  end


# allows to call "sport" or "boulder" climb types
  def self.climb_type(discipline)
    self.where(grade_id: Grade.where(grade_system_id: GradeSystem.where(discipline: discipline).all).all)
  end



  def self.facility_system(fs)
    Route.joins(:grade).merge(Grade.where(:grade_system_id => fs))
  end



# enables rating for routes

  filterrific(
  default_filter_params: { sorted_by: 'created_at_desc', with_expired_only: Date.current },
  available_filters: [
    :sorted_by,
    :search_query,
    :with_grade_id,
    :with_zone_id,
    :with_wall_id,
    :with_setter_id,
    :with_status_id,
    :with_setdate_gte,
    :with_setdate_lt,
    :with_facility_id,
    :with_zone_id_checkbox,
    :with_facility_id_checkbox,
    :with_active_only,
    :with_expired_only
  ]
  )

  # define ActiveRecord scopes for
  # :search_query, :sorted_by, :with_country_id, and :with_created_at_gte

scope :search_query, lambda { |query|
  # Searches the students table on the 'first_name' and 'last_name' columns.
  # Matches using LIKE, automatically appends '%' to each term.
  # LIKE is case INsensitive with MySQL, however it is case
  # sensitive with PostGreSQL. To make it work in both worlds,
  # we downcase everything.
  return nil  if query.blank?

  # condition query, parse into individual keywords
  terms = query

  # replace "*" with "%" for wildcard searches,
  # append '%', remove duplicate '%'s

  # configure number of OR conditions for provision
  # of interpolation arguments. Adjust this if you
  # change the number of OR conditions.
  num_or_conds = 1
  where("routes.id = ?", terms)
  }

scope :sorted_by, lambda { |sort_option|
  # extract the sort direction from the param value.
  direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
  case sort_option.to_s
  when /^setdate_/
    # Simple sort on the created_at column.
    # Make sure to include the table name to avoid ambiguous column names.
    # Joining on other tables is quite common in Filterrific, and almost
    # every ActiveRecord table has a 'created_at' column.
    order("routes.setdate #{ direction }")
  when /^created_at_/
    # Simple sort on the created_at column.
    # Make sure to include the table name to avoid ambiguous column names.
    # Joining on other tables is quite common in Filterrific, and almost
    # every ActiveRecord table has a 'created_at' column.
    order("routes.created_at #{ direction }")
  else
    raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
  end
}

  scope :with_grade_id, lambda { |grade_ids|
      where( 'grade_id = ?', grade_ids)
  }

  scope :with_zone_id, lambda { |zone_ids|
      where( 'zone_id = ?', zone_ids)
  }

  scope :with_wall_id, lambda { |wall_ids|
      where( 'wall_id = ?', wall_ids)
  }

  scope :with_setter_id, lambda { |setter_ids|
      where( 'user_id = ?', setter_ids)
  }

  scope :with_status_id, lambda { |status_ids|
      where( 'routes.enddate > ? OR routes.enddate IS ?', status_ids, nil)
  }

  scope :with_active_only, lambda { |flag|
     return [Date.current, nil] if 1 == flag # checkbox unchecked
     where('routes.enddate > ? OR routes.enddate IS ?', Date.current, nil)
   }

   scope :with_expired_only, lambda { |flag|
     return nil if 0 == flag # checkbox unchecked
     where('routes.enddate > ? OR routes.enddate IS ?', Date.current, nil)
   }

  scope :with_facility_id, lambda { |facility_ids|
      where( 'facility_id = ?', facility_ids)
  }

    # always include the lower boundary for semi open intervals
  scope :with_setdate_gte, lambda { |reference_time|
    where('routes.setdate >= ?', reference_time)
  }

  scope :with_setdate_lt, lambda { |reference_time|
    where('routes.setdate <= ?', reference_time)
  }

  scope :with_zone_id_checkbox, lambda { |zone_ids_checkbox|
      where( 'zone_id = ?', zone_ids_checkbox)
  }

  scope :with_facility_id_checkbox, lambda { |facility_ids_checkbox|
      where( 'facility_id = ?', facility_ids_checkbox)
  }

  def self.options_for_sorted_by
    [
      ['Newest first (created date)', 'created_at_desc'],
      ['Oldest first (created date)', 'created_at_asc'],
      ['Newest first (set date)', 'setdate_desc'],
      ['Oldest first (set date)', 'setdate_asc'],

    ]
  end

  def self.options_for_status_select
    [
      ['Active', Date.current ]
    ]
  end

  def self.total_on(date)
    where("date(setdate) = ?", date)
  end

  def grade_system_virtual
  end



# defines what shows up in newsfeed for new routes
  def self.new_route_feed(facility)
    self.where(facility_id: facility).where('routes.created_at > ?', 6.days.ago.to_date).order(created_at: :desc).includes(:zone, :grade, :facility).limit(20)
  end

  def self.user_new_route_feed(facility, user)
    self.where(facility_id: facility).where('routes.created_at > ?', 6.days.ago.to_date).where('grades.rank > ?', Tick.hardest_send(user).rank - 3).references(:grades).order(created_at: :desc).includes(:zone, :grade, :facility).limit(20)
  end

# gets top 10 routes based on ratings cache average
  def self.top_ten(facility)
    Route.current.includes(:grade, :facility, :rating_cache).where(facility_id: facility).where(id: RatingCache.where(cacheable_type: "Route").where('rating_caches.qty > ?', 1).order('rating_caches.avg desc').take(10).map { |rate| [rate.cacheable_id.to_i] } )
  end

  def self.newest_ten(facility)
    Route.current.where(facility_id: facility).includes(:grade, :facility, :zone).order('routes.setdate desc').limit(10)
  end



end
