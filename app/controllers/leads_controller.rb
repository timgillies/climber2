class LeadsController < ApplicationController
  def new
    @lead = Lead.new
  end

  def create
    @lead = Lead.create(lead_params)
    if @lead.save
      flash[:success] = "Thanks!  We'll be in touch once we're ready."
      redirect_to root_url
    else
      flash[:error] = "Please enter a valid email address."
      redirect_to root_url
    end
  end

  def lead_params
    params.require(:lead).permit(:email, :source)
  end

end
