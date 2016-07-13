class Tick < ActiveRecord::Base

  belongs_to :route
  belongs_to :user
  belongs_to :facility
  accepts_nested_attributes_for :facility

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


  def self.total_on(date)
    where("date(date) = ?", date).count(:id)
  end

end
