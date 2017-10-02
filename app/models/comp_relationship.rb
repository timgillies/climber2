class CompRelationship < ApplicationRecord
  belongs_to :competition
  belongs_to :user
end
