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

    it "should let a user create a new facility" do
      login_with create( :user )
      get :new
      expect( response ).to render_template( :new )
    end

    it "should let a user view a facility" do
      login_with create( :user )
      get 'admin/facility'
      expect( response ).to render_template( :show )
    end
  end
end
