class Admin::SubscriptionsController < ApplicationController

  protect_from_forgery :except => :webhook

  def index
  end

  def new
    @facility = Facility.find(params[:facility_id])
    @subscription = Subscription.new
  end

  def create
    @facility = Facility.find(params[:facility_id])
    @subscription = Subscription.new subscription_params.merge(email: stripe_params["stripeEmail"], card_token: stripe_params["stripeToken"])

    raise "Please, check payment errors" unless @subscription.valid?
    # Amount in cents
    @amount = 500

    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :plan => @facility.plan.name,
      :source  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @facility.plan.price.to_i * 100,
      :description => 'Rails Stripe customer',
      :currency    => 'usd'
    )

    @subscription.customer_id = customer.id

    @subscription.save
    redirect_to admin_facility_subscription_path(@facility, @subscription), notice: 'Thank you for your payment!'

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_admin_subscription_path
  end

  def webhook
    event = Stripe::Event.retrieve(params["id"])

    case event.type
      when "invoice.payment_succeeded" #renew subscription
        Subscription.find_by_customer_id(event.data.object.customer).renew
    end
    render status: :ok, json: "success"
  end

  def show
    @subscription = Subscription.find(params[:id])
  end

private

  def stripe_params
    params.permit :stripeToken, :stripeEmail
  end

  def subscription_params
    params.require(:subscription).permit(:user_id, :email, :card_token, :customer_id, :facility_id, :end_date)
  end

end
