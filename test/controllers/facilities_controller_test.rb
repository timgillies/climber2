require 'test_helper'

class FacilitiesControllerTest < ActionController::TestCase
  test "should get new" do
    get :new
    assert_response :success
  end

  test "should redirect create when not logged in" do
    assert_no_difference 'Facility.count' do
      post :create, facility: {                   name:               "Test",
                                                  addressline1:       "1558 Fairfax St",
                                                  city:               "foo",
                                                  state:              "CO",
                                                  zipcode:            "84345"}
    end
    assert_redirected_to login_url
  end
end
