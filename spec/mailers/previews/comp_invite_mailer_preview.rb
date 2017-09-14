# Preview all emails at http://localhost:3000/rails/mailers/facility_role_mailer
class CompInviteMailerPreview < ActionMailer::Preview


  def comp_invite_user
    @facility = Facility.first
    @competition = Competition.first
    @user = User.first
    @inviter = User.second
    CompInviteMailer.comp_invite_user_email(@competition.facility, @competition, @user, @inviter)
  end

end
