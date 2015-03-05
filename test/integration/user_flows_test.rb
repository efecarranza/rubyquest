require 'test_helper'

class UserFlowsTest < ActionDispatch::IntegrationTest
  test "login and browse site" do
    get '/login'
    assert_response :success

    post_via_redirect '/login', email: "fer@gmail.com", password: "wyncode"
    assert_equal "/", path
  end
end
