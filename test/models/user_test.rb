require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "should not create user without email" do
    user = User.create(name: "frank", username: "franko", password: "wyncode", password_confirmation: "wyncode")
    assert user.save
  end
end
