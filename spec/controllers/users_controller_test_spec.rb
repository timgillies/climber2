require 'rails_helper'

RSpec.describe UsersController, :type => :controller do

    it "new signup registration path" do

        get :new
        User.create(name:  "hello",
                                   email: "user@invalid",
                                   password:              "password",
                                   password_confirmation: "password")
    end

end
