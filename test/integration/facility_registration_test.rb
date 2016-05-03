require 'test_helper'

class FacilitiyRegistrationTest < ActionDispatch::IntegrationTest

  test "invalid registration information" do
    get register_path
    assert_no_difference 'Facility.count' do
      post facilities_path, facility: {  name:  "",
                                addressline1: "",
                                city:              "foo",
                                state: "",
                                zipcode: "843"}
    end
    assert_template 'facilities/new'
  end

  test "valid signup information" do
    get register_path
    assert_difference 'Facility.count', 1 do
      post_via_redirect facilities_path, facility: {   name:  "Test",
                                                  addressline1: "1558 Fairfax St",
                                                  city:              "foo",
                                                  state: "CO",
                                                  zipcode: "84345"}
    end
    assert_template 'facilities/show'
  end
end
