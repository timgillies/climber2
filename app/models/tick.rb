class Tick < ActiveRecord::Base

  belongs_to :route
  belongs_to :user
  belongs_to :facility
  accepts_nested_attributes_for :facility
  belongs_to :grade

  # enables rating for routes
  ratyrate_rateable 'tick_route_rating'



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
    default_filter_params: { with_date_gte: 6.days.ago.beginning_of_day.to_date },
    available_filters: [
      :search_query,
      :with_date_gte,
      :with_date_lt
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
      where('ticks.date >= ?', reference_time)
    }

    scope :with_date_lt, lambda { |reference_time|
      where('ticks.date <= ?', reference_time)
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

  def start_date(user)
    self.where(user_id: user.id).first.created_at
  end

  def self.attempt_overall_count(route, user)
    self.where(route_id: route.id, user_id: user.id ).length
  end

  def self.send_overall_count(route, user, project)
    self.where(route_id: route.id, user_id: user.id ).where.not(tick_type: project).length
  end

  def self.send_type_count(route, user, tick_type)
    self.where(route_id: route.id, user_id: user.id, tick_type: tick_type ).length
  end

  def self.total_send_overall_count(user, project)
    self.where(user_id: user.id ).where.not(tick_type: project)
  end


  def self.tick_feed(facility)
    self.where('ticks.created_at > ?', 6.days.ago.to_date).joins(:route).merge(Route.where(facility_id: facility)).includes(:user, :grade, :route, :facility)
  end

  def self.top_ten(facility)
    self.includes(:grade, :user).where(route_id: Route.where(facility_id: facility)).where.not(tick_type: "project").grade_desc.take(10)
  end




end
