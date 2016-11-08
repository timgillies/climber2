class ChargesController < ApplicationController

  protect_from_forgery :except => :webhook

  def new
    @charge = Charge.new
  end

  def create

    @charge = Charge.new charge_params.merge(email: stripe_params["stripeEmail"],
                                                               card_token: stripe_params["stripeToken"])

    raise "Please, check registration errors" unless @registration.valid?
    # Amount in cents
    @amount = 500

    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :plan => "basic_monthly",
      :source  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => 'Rails Stripe customer',
      :currency    => 'usd'
    )

    @charge.save
    redirect_to @charge, notice: 'Registration was successfully created.'

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

private

  def stripe_params
    params.permit :stripeEmail, :stripeToken
  end

  def charge_params
    params.require(:charge).permit(:user_id, :email, :card_token)
  end

end
