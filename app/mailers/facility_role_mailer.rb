class FacilityRoleMailer < ApplicationMailer

  default from: "noreply@climbconnect.com"
  layout 'mailer'

  def role_invite_email(invitee)
    @invitee = invitee
    @url  = 'https://www.climbconnect.com/users/sign_up'
    mail(to: @invitee.email, subject: "You've been invited to join #{@invitee.facility.name} on Climb Connect")
  end


end
