class Tick < ActiveRecord::Base

  belongs_to :route
  belongs_to :user
  belongs_to :facility
  accepts_nested_attributes_for :facility
  belongs_to :grade

  # enables rating for routes
    ratyrate_rateable 'tick_route_rating'

  default_scope -> { order(date: :desc) }


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
    self.where(route_id: route.id, user_id: user.id ).count
  end

  def self.send_overall_count(route, user, project)
    self.where(route_id: route.id, user_id: user.id ).where.not(tick_type: project).count
  end

  def self.send_type_count(route, user, tick_type)
    self.where(route_id: route.id, user_id: user.id, tick_type: tick_type ).count
  end








end
