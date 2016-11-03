class ChargesController < ApplicationController

  protect_from_forgery :except => :webhook

  def new
  end

  def create
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

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end

  def webhook

    require "json"

    # Using Sinatra
    post "/webhook" do
      # Retrieve the request's body and parse it as JSON
      event_json = JSON.parse(request.body.read)

      # Do something with event_json

      status 200
    end

  end

end
