class User < ActiveRecord::Base
	has_secure_password
	has_many :posts
	has_many :comments

	validates :name, presence: true
	validates :username, presence: true, uniqueness: true
  validates :email, uniqueness: true, presence: true, format: { with: /\A[^@]+@[^@]+\z/, message: 'Invalid e-mail. Please make sure your e-mail is in the format: name@example.com' }

end
