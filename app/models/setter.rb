class Setter < ActiveRecord::Base

  belongs_to :facility
  belongs_to :user
  has_many :routes

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :nick_name, presence: true

end
