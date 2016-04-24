require 'test_helper'

class AccountTest < ActiveSupport::TestCase

  def setup
    @account = Account.new(name: "Example User", email: "user@example.com",
                            password: "foobar" , password_confirmation: "foobar")
  end

  test "should be valid" do
    assert @account.valid?
  end

  test "name should be present" do
    @account.name = "    "
    assert_not @account.valid?
  end

  test "email should be present" do
    @account.email = "    "
    assert_not @account.valid?
  end

  test "name should not be too long" do
    @account.name = "a" * 51
    assert_not @account.valid?
  end

  test "email should not be too long" do
    @account.email = "a" * 244 + "@example.com"
    assert_not @account.valid?
  end

  test "email validation should accept valid addresses" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
    first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @account.email = valid_address
      assert @account.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test "email validation should reject invalid addresses" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com foo@bar..com]
    invalid_addresses.each do |invalid_address|
      @account.email = invalid_address
      assert_not @account.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end

  test "email address should be unique" do
    duplicate_user = @account.dup
    duplicate_user.email = @account.email.upcase
    @account.save
    assert_not duplicate_user.valid?
  end

  test "email addresses should be saved as lower-case" do
    mixed_case_email = "Foo@ExAmple.CoM"
    @account.email = mixed_case_email
    @account.save
    assert_equal mixed_case_email.downcase, @account.reload.email
  end

  test "password should be present (nonblank)" do
    @account.password = @account.password_confirmation = " " * 6
    assert_not @account.valid?
  end

  test "password should have a minimum length" do
    @account.password = @account.password_confirmation = "a" * 5
    assert_not @account.valid?
  end

end
