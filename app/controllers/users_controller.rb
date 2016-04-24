class UsersController < ApplicationController

  def show
    @account = Account.find(params[:id])
  end

  def new
    @account = Account.new
  end

  def create
    @account = Account.new(account_params)
    if @account.save
      flash[:success] = "Welcome to Climber.  Track your sends and share with friends"
      redirect_to user_url(@account)
    else
      render 'new'
    end
  end

  private

  def account_params
    params.require(:account).permit(:name, :email, :password,
                                    :password_confirmation)
  end

end
