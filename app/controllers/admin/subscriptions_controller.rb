class Admin::SubscriptionsController < ApplicationController
  before_action :authenticate_user!,        except: [:webhook], :unless => :facility_is_demo
  before_action :facility_admin,            except: [:webhook, :new, :create], :unless => :facility_is_demo
  before_action :setter_role,              except: [:new, :create, :webhook], :unless => :facility_is_demo
  before_action :guest_role,                except: [:webhook], :unless => :facility_is_demo
  before_action :marketing_role,            except: [:new, :create, :webhook], :unless => :facility_is_demo
  before_action :demo_facility,              except: [:webhook]


  layout "admin"

  protect_from_forgery :except => :webhook

  def index
    @facility = Facility.find(params[:facility_id])
    @subscriptions = @facility.subscriptions.page(params[:page])
  end

  def new
    @facility = Facility.find(params[:facility_id])
    @subscription = Subscription.new
    @facility.update_plan_choice("1")
  end

  def create
    @facility = Facility.find(params[:facility_id])
    @subscription = Subscription.new subscription_params.merge(email: stripe_params["stripeEmail"], card_token: stripe_params["stripeToken"])


    @amount = @facility.plan.price.to_i * 100
    @final_amount = @amount

    @code = params[:couponCode]

    if !@code.blank?
     @discount = get_discount(@code)

       if @discount.nil?
         flash[:error] = 'Coupon code is not valid or expired.  Your card was not charged.  Please try again.'
         redirect_to new_admin_facility_subscription_path(@facility)
         return
       else
         @discount_amount = @amount * @discount
         @final_amount = @amount - @discount_amount.to_i
       end

       charge_metadata = {
         :coupon_code => @code,
         :coupon_discount => (@discount * 100).to_s + "%"
       }
    end

    charge_metadata ||= {}



  if @code.blank?
    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :plan => @facility.plan.name,
      :source  => params[:stripeToken],
    )
  else
    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :plan => @facility.plan.name,
      :source  => params[:stripeToken],
      :coupon => normalize_code(@code),
      :metadata    => charge_metadata
    )
  end

  if @final_amount > 0
    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @final_amount,
      :description => 'Rails Stripe customer',
      :currency    => 'usd',
      :metadata    => charge_metadata
    )
  end

    @subscription.customer_id = customer.id
    @subscription.plan_id = @facility.plan_id
    @subscription.stripe_subscription_id = customer.subscriptions['data'][0].id
    @subscription.canceled_at = customer.subscriptions['data'][0].canceled_at
    @subscription.start = customer.subscriptions['data'][0].start
    @subscription.status = customer.subscriptions['data'][0].status
    @subscription.trial_start = customer.subscriptions['data'][0].trial_start
    @subscription.trial_end = customer.subscriptions['data'][0].trial_end
    @subscription.current_period_start = customer.subscriptions['data'][0].current_period_start
    @subscription.current_period_end = customer.subscriptions['data'][0].current_period_end
    @subscription.ended_at = customer.subscriptions['data'][0].ended_at


    @subscription.save

    # @subscription.update_attribute(:start, subscription['data'].start)
    # @subscription.update_attribute(:trial_start, subscription['data'].trial_start)
    # @subscription.update_attribute(:trial_end, subscription['data'].trial_end)
    # @subscription.update_attribute(:current_period_start, subscription['data'].current_period_start)
    # @subscription.update_attribute(:current_period_end, subscription['data'].current_period_end)
    # @subscription.update_attribute(:ended_at, subscription['data'].ended_at)

    redirect_to admin_facility_path(@facility), notice: 'Thank you for subscribing!'

    @facility_role = FacilityRole.where(facility_id: @facility, user_id: current_user).first
    if @facility_role
      @facility_role.update_attributes(name: 'facility_management')
    else
      @facility_role = FacilityRole.new(user_id: current_user.id, facility_id: @facility.id, confirmed: true, email: current_user.email, name: 'facility_management')
      @facility_role.save
    end

    unless current_user.role == "site_admin"
      current_user.update_attribute(:role, 'facility_admin')
    end

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_admin_facility_subscription_path(@facility)
  end

  def webhook
    event = Stripe::Event.retrieve(params["id"])

    case event.type
      when "invoice.payment_succeeded" #renew subscription
        Subscription.find_by_customer_id(event.data.object.customer).renew
      when 'invoice.payment_failed' #cancel subscription
        Subscription.find_by_customer_id(event.data.object.customer).cancel
    end
    render status: :ok, json: "success"
  end

  def show
    @facility = Facility.find(params[:facility_id])
    @subscription = Subscription.find(params[:id])

    subscription = Stripe::Subscription.retrieve(@subscription.stripe_subscription_id)
    @subscription.update_attribute(:customer_id, subscription.customer)
    @subscription.update_attribute(:canceled_at, subscription.canceled_at)
    @subscription.update_attribute(:start, subscription.start)
    @subscription.update_attribute(:status, subscription.status)
    @subscription.update_attribute(:trial_start, subscription.trial_start)
    @subscription.update_attribute(:trial_end, subscription.trial_end)
    @subscription.update_attribute(:current_period_start, subscription.current_period_start)
    @subscription.update_attribute(:current_period_end, subscription.current_period_end)
    @subscription.update_attribute(:ended_at, subscription.ended_at)
    @subscription.update_attribute(:stripe_plan_id, subscription.plan.id)
    @subscription.update_attribute(:stripe_plan_amount, subscription.plan.amount)
    @subscription.update_attribute(:stripe_plan_interval, subscription.plan.interval)
    @subscription.update_attribute(:stripe_plan_interval_count, subscription.plan.interval_count)
    @subscription.update_attribute(:stripe_plan_created, subscription.plan.created)

    @invoice_list = Stripe::Invoice.all(:customer => @subscription.customer_id)
    @invoices = @invoice_list[:data]

  end

  def cancel
    @facility = Facility.find(params[:facility_id])
    @subscription = Subscription.find(params[:id])
    subscription = Stripe::Subscription.retrieve(@subscription.stripe_subscription_id)
    subscription.delete(:at_period_end => true)

    redirect_to admin_facility_subscription_path(@facility, @subscription), notice: "Your subscription has been cancelled and will end on #{ Time.at(subscription.current_period_end).strftime("%m/%d/%Y") }"

  end




private

  def stripe_params
    params.permit :stripeToken, :stripeEmail
  end

  def subscription_params
    params.require(:subscription).permit( :start,
                                          :status,
                                          :trial_start,
                                          :trial_end,
                                          :current_period_start,
                                          :current_period_end,
                                          :ended_at,
                                          :user_id,
                                          :email,
                                          :card_token,
                                          :customer_id,
                                          :facility_id,
                                          :end_date,
                                          :plan_id,
                                          :stripe_plan_id,
                                          :stripe_plan_amount,
                                          :stripe_plan_interval,
                                          :stripe_plan_interval_count,
                                          :stripe_plan_created)
  end

  COUPONS = {
    'CLIMBON' => 1.00,
    'LAUNCH50' => 0.5,
    'BETA3' => 1.00,
    'BETA6' => 1.00,
    'PARTNER' => 1.00,
    'PARTNER100' => 1.00,
    'DEMO'    => 1.00,
    'CWASUMMIT' => 1.00
  }

  def get_discount(code)
    # Normalize user input
    code = code.gsub(/\s+/, '')
    code = code.upcase
    COUPONS[code]
  end

  def normalize_code(code)
    # Normalize user input
    code = code.gsub(/\s+/, '')
    code = code.upcase
  end

end
