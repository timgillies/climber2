require 'rails_helper'

RSpec.describe Admin::FacilitiesController, :type => :controller do

  describe "anonymous user" do
    before :each do
      # This simulates an anonymous user
      login_with nil
    end

    it "should be redirected to signin" do
      get :new
      expect( response ).to redirect_to( new_user_session_path )
    end

    it "should let a user view the new facility form" do
      login_with create(:user)
      get :new
      facility_attrs = attributes_for(:facility)
      facility = Facility.build(facility_attrs)
      expect( response ).to render_template( :show)

    end
  end
end
