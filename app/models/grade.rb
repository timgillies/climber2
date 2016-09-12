class Grade < ActiveRecord::Base
  belongs_to :route
  has_many :routes
  belongs_to :facility
  belongs_to :user

  validates :discipline, presence: true
  validates :grade, presence: true
  validates :grade, uniqueness: {  scope: [:facility_id, :discipline] }


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



end
