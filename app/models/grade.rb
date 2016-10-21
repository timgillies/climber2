class Grade < ActiveRecord::Base
  belongs_to :route
  belongs_to :grade_system, :foreign_key => :grade_system_id
  has_many :routes
  has_many :grade_systems, :primary_key => :grade_system_id, :foreign_key => :id
  has_many :facility_grade_systems, :through => :grade_systems
  has_many :facilities, :through => :facility_grade_systems
  belongs_to :user

  validates :grade, presence: true
  validates :grade_system_id, presence: true
  validates :grade, uniqueness: {  scope: [:grade_system_id] }

  default_scope -> { order(rank: :asc, grade_system_id: :desc) }


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



end
