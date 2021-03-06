class Tick < ApplicationRecord

  belongs_to :route
  belongs_to :user
  belongs_to :facility
  accepts_nested_attributes_for :facility
  belongs_to :grade


  has_attached_file :image, styles: { medium: "600", thumb: "100x100#" }, default_url: "https://s3-us-west-2.amazonaws.com/climbconnect-assets/logos/social-media/default-avatar.png"
  validates_attachment_content_type :image, :content_type => ['image/jpg', 'image/png', 'image/gif', 'image/jpeg']

  validates_presence_of :date
  validates_presence_of :grade
  validates_presence_of :tick_type

  scope :grade_desc, -> { joins(:grade).order('grades.rank desc') }


  scope :onsight, -> {
  where(:tick_type => "onsight")
  }

  scope :flash, -> {
  where(:tick_type => "flash")
  }

  scope :redpoint, -> {
  where(:tick_type => "redpoint")
  }

  scope :project, -> {
  where(:tick_type => "project")
  }

  filterrific(
    default_filter_params: { with_date_gte: 0.months.ago },
    available_filters: [
      :search_query,
      :with_date_gte,
      :with_date_lt,
      :with_date_eq
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
    where("ticks.id = ?", terms)
    }


      # always include the lower boundary for semi open intervals
    scope :with_date_gte, lambda { |reference_time|
      where('ticks.date >= ? AND ticks.date <= ?', reference_time.to_date.beginning_of_month.to_date, reference_time.to_date.end_of_month.to_date)
    }

    scope :with_date_lt, lambda { |reference_time|
      where('ticks.date <= ?', reference_time)
    }

    scope :with_date_eq, lambda { |reference_time|
      where('ticks.date = ?', reference_time)
    }

  def self.lead?
    where(lead: true)
  end


  def self.total_on(date)
    where("date(date) = ?", date).count(:id)
  end

  def rope_climb_type_in_words
    if self.lead?
      "Lead"
    else
      "Top-rope"
    end
  end

  def self.ascent
    where.not(tick_type: 'project')
  end

  def self.current
    where('extract(month from date) = ?', Date.current.strftime("%m"))
  end

  def start_date(user)
    self.where(user_id: user.id).first.created_at
  end

  def self.attempt_overall_count(route, user)
    self.where(route_id: route.id, user_id: user.id ).length
  end

  def self.send_overall_count(route, user, project)
    self.where(route_id: route.id, user_id: user.id ).where.not(tick_type: project).length
  end

  #counts number of ticks for route list buttons for any date and any route
  def self.send_type_any_count(user, tick_type)
    self.where(user: user, tick_type: tick_type).length
  end

  #counts number of ticks for route list buttons for today's date
  def self.send_type_count(route, user, tick_type)
    self.where(route_id: route.id, user_id: user.id, tick_type: tick_type).length
  end

  def self.send_type_count_current(route, user, tick_type)
    self.where(route_id: route.id, user_id: user.id, tick_type: tick_type, date: Date.current).length
  end

  def self.total_send_overall_count(user, project)
    self.where(user_id: user.id ).where.not(tick_type: project)
  end


  def self.tick_feed(facility)
    self.ascent.where('ticks.created_at > ?', 6.days.ago.to_date).joins(:route).merge(Route.where(facility_id: facility)).includes(:user, :grade, :route, :facility).order(created_at: :desc).limit(30)
  end

  def self.user_tick_feed(facility, user)
    self.ascent.where('ticks.created_at > ?', 6.days.ago.to_date).where('grades.rank > ?', Tick.hardest_send(user).rank - 5).joins(:route).merge(Route.where(facility_id: facility)).includes(:user, :grade, :route, :facility).order(created_at: :desc).limit(30)
  end

  def self.no_route_tick_feed(facility)
    self.ascent.where('ticks.created_at > ?', 6.days.ago.to_date).where(facility_id: facility).includes(:user, :grade, :facility).limit(20)
  end

  def self.top_ten(facility)
    self.includes(:grade, :user).where(route_id: Route.where(facility_id: facility)).ascent.grade_desc.take(10)
  end

  def self.top_ten_climbers(facility)
    self.ascent.where(route_id: Route.where(facility_id: facility)).where('ticks.created_at > ?', 6.days.ago.to_date).includes(:grade).order('grades.rank DESC').take(1000).uniq { |u| u.user_id}.take(10)
  end

  def self.top_three_routes(competition, user)
    self.ascent.where(competition_id: competition.id, user_id: user.id).includes(:grade).order('grades.rank DESC').take(1000).uniq { |u| u.route_id}.take(3).to_a
  end

  def self.hardest_send(user)
    if self.ascent.where(user_id: user.id).where.not(grade_id: nil)
      self.ascent.where(user_id: user.id).grade_desc.first.grade if self.ascent.where(user_id: user.id).grade_desc.first
    end
  end

  def self.days_hardest_send(user, days)
    if self.ascent.where(user_id: user.id).where.not(grade_id: nil)
      self.ascent.where(user_id: user.id).where('ticks.created_at > ?', days.days.ago.to_date).grade_desc.first.grade if self.ascent.where(user_id: user.id).grade_desc.first
    end
  end

  def self.tryhard_send
    self.ascent.includes(:grade).sum(:rank)
  end

  def self.tryhard_project
     self.where(tick_type: "project").includes(:grade).sum(:rank) * 0.5
  end

  def self.tryhard_score
    (tryhard_send + tryhard_project).to_i
  end

  def week
    self.date.strftime('%W')
  end








end
