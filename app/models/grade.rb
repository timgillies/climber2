class Grade < ActiveRecord::Base
  belongs_to :route
  belongs_to :grade_system, :foreign_key => :grade_system_id
  has_many :routes
  has_many :grade_systems, :primary_key => :grade_system_id, :foreign_key => :id
  has_many :facility_grade_systems, {:through=>:grade_systems, :source=>:facility_grade_system}
  has_many :facilities, :through => :facility_grade_systems
  belongs_to :user
  has_many    :tasks
  has_many :facility_targets
  has_many :ticks

  validates :grade, presence: true
  validates :grade_system_id, presence: true
  validates :grade, uniqueness: {  scope: [:grade_system_id] }

  default_scope -> { order(grade_system_id: :asc, rank: :asc) }

  scope :desc, ->  { order(rank: :desc) }

  def self.with_grade_nearest_to(grade_rank)
    order("abs(grades.rank - #{grade_rank})")
  end


  scope :boulder, -> {
  where(:discipline => 'boulder')
  }

  scope :sport, -> {
  where(:discipline => 'sport')
  }


  before_save :calculate_rank


  private


  def calculate_rank
    self.rank = (self.range_start.to_f + self.range_end.to_f)/2
  end



  def self.boulder
    Route.joins(:grade).merge(Grade.where(:discipline => 'boulder'))
  end


def self.next(current_route)
    Grade.where(grade_system_id: Grade.where(id: current_route.grade_id).first.grade_system_id ).where("rank > ?", Grade.where(id: current_route.grade_id).first.rank).first
end

def self.actual(current_route)
    Grade.where(grade_system_id: Grade.where(id: current_route.grade_id).first.grade_system_id ).where("rank = ?", Grade.where(id: current_route.grade_id).first.rank).first
end

def self.previous(current_route)
    Grade.where(grade_system_id: Grade.where(id: current_route.grade_id).first.grade_system_id ).where("rank < ?", Grade.where(id: current_route.grade_id).first.rank).last
end




end
