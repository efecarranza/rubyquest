class Article < ActiveRecord::Base
  validates :title, presence: true,
                    length: { minimum: 2 }
end
