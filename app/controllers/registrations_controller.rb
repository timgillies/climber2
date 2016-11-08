class RegistrationsController < ApplicationController


  def new
    @registration = Registration.new
    @plans = Plan.all.map{ |f| ["#{f.name.capitalize.humanize}", f.id] }
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


  private

  def stripe_params
    params.permit :stripeEmail, :stripeToken
  end

  def registration_params
    params.require(:registration).permit(:user_id, :plan_id, :email)
  end





end
