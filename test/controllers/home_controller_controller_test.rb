require 'test_helper'

class HomeControllerControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get home_controller_home_url
    assert_response :success
  end

end
