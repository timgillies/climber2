class CompInviteMailer < ApplicationMailer

  default from: "noreply@climbconnect.com"
  layout 'mailer'

  def comp_invite_user_email(facility, comp, user, inviter)
    @facility = facility
    @competition = comp
    @user = user
    @inviter = inviter
    @url
    mail(to: @user.email, subject: "You've been invited to join #{@competition.name} on Climb Connect")
  end


end
