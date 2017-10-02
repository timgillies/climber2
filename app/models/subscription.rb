class Subscription < ApplicationRecord

  belongs_to :user
  belongs_to :facility
  belongs_to :plan

  def renew
    subscription = Stripe::Subscription.retrieve(stripe_subscription_id)

    update_attribute(:customer_id, subscription.customer)
    update_attribute(:canceled_at, subscription.canceled_at)
    update_attribute(:start, subscription.start)
    update_attribute(:status, subscription.status)
    update_attribute(:trial_start, subscription.trial_start)
    update_attribute(:trial_end, subscription.trial_end)
    update_attribute(:current_period_start, subscription.current_period_start)
    update_attribute(:current_period_end, subscription.current_period_end)
    update_attribute(:ended_at, subscription.ended_at)
    update_attribute(:stripe_plan_id, subscription.plan.id)
    update_attribute(:stripe_plan_amount, subscription.plan.amount)
    update_attribute(:stripe_plan_interval, subscription.plan.interval)
    update_attribute(:stripe_plan_interval_count, subscription.plan.interval_count)
    update_attribute(:stripe_plan_created, subscription.plan.created)
  end

  def cancel
    subscription = Stripe::Subscription.retrieve(stripe_subscription_id)

    update_attribute(:customer_id, subscription.customer)
    update_attribute(:canceled_at, subscription.canceled_at)
    update_attribute(:start, subscription.start)
    update_attribute(:status, subscription.status)
    update_attribute(:trial_start, subscription.trial_start)
    update_attribute(:trial_end, subscription.trial_end)
    update_attribute(:current_period_start, subscription.current_period_start)
    update_attribute(:current_period_end, subscription.current_period_end)
    update_attribute(:ended_at, subscription.ended_at)
    update_attribute(:stripe_plan_id, subscription.plan.id)
    update_attribute(:stripe_plan_amount, subscription.plan.amount)
    update_attribute(:stripe_plan_interval, subscription.plan.interval)
    update_attribute(:stripe_plan_interval_count, subscription.plan.interval_count)
    update_attribute(:stripe_plan_created, subscription.plan.created)
  end



end
