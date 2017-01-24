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

    it "should let a user see all the posts" do
      login_with create( :user )
      get :new
      expect( response ).to render_template( :new )
    end
  end
end
