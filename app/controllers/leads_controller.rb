class LeadsController < ApplicationController
  def new
    @lead = Lead.new
  end

  def create
    @lead = Lead.create(lead_params)
    if @lead.save
      flash[:success] = "Thanks for signing up!  We'll be in touch once CLIMB | CONNECT is ready."
      redirect_to root_url
    else
      redirect_to root_url
    end
  end

  def lead_params
    params.require(:lead).permit(:email)
  end

end
