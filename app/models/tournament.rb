class Tournament < ApplicationRecord
  validates :name, presence: true
  validates :team, presence: true
  validates :description, presence: true
end
