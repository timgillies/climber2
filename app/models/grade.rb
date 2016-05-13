class Grade < ActiveRecord::Base
  belongs_to :route
  belongs_to :facility
  belongs_to :user

  validates :discipline, presence: true
  validates :grade, presence: true,
                    uniqueness: { case_sensitive: false }
  validates :rank,  uniqueness: true,
                    numericality: { only_integer: true }
end
