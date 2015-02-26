class User < ActiveRecord::Base
	has_secure_password
	has_many :posts

	validates :name, :email, uniqueness: true, presence: true
	validates :username, presence: true, uniqueness: true
    	validates :email, uniqueness: true, presence: true, format: { with: /\A[^@]+@[^@]+\z/, message: 'looks jacked-up. Are you sure this is right?' }

	def is_admin?
		self.admin
	end
end