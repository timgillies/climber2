require 'test_helper'

class FacilityTest < ActiveSupport::TestCase

  def setup
    @facility = Facility.new( name: "Movement Climbing & Fitness",
                              addressline1: "4323 Fake St." ,
                              city: "Denver",
                              state: "CO",
                              zipcode: "80220-4545")
  end

  test "should be valid" do
    assert @facility.valid?
  end

  test "name should be present" do
    @facility.name = ""
    assert_not @facility.valid?
  end

  test "zip code should be present" do
    @facility.zipcode = "  "
    assert_not @facility.valid?
  end

  test "zipcode should match zipcode format" do
    @facility.zipcode = "8033"
    assert_not @facility.valid?
  end
end
