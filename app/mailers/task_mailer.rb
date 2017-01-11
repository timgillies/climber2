class TaskMailer < ApplicationMailer

  default from: "noreply@climbconnect.com"
  layout 'mailer'

  def task_assignment_email(task)
    @task = task
    @assignee = task.assignee
    @url
    mail(to: @task.assignee.email, subject: "You've been assigned a task at #{@task.facility.name} on Climb Connect")
  end


end
