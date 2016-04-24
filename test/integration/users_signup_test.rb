require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest

  test "invalid signuip information" do
    get signup_path
    assert_no_difference 'Account.count' do
      post users_path, account: {   name:                   "",
                                    email:                  "user@invalid",
                                    password:               "foo",
                                    password_confirmation:  "bar" }
    end
    assert_template 'users/new'
  end

  test "valid signup information" do
    get signup_path
    assert_difference 'Account.count', 1 do
      post_via_redirect users_path, account: {  name: "Example User",
                                                email: "user@example.com",
                                                password: "password",
                                                password_confirmation: "password" }
    end
    assert_template 'users/show'
  end
end
