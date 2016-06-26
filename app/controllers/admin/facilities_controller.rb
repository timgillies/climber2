class Admin::FacilitiesController < ApplicationController
  before_action :logged_in_user,    only: [:index, :show, :edit, :update, :destroy]
  before_action :facility_admin,      only: [:show, :edit, :update, :destroy]

  layout "admin", except: [:index, :new]

  def index
    @facilities = current_user.facilities.page(params[:page])
  end

  def show
    @facility = current_user.facilities.find(params[:id])
    @routes = @facility.routes.page(params[:page])
    @activeroutes = @facility.routes.where("enddate >= ?", Date.today)

    @gradechart = LazyHighCharts::HighChart.new('chart') do |f|
      f.title(text: "Routes by Grade")
      f.xAxis(categories: @facility.grades.map{|f| [f.grade]})
      f.series(name: "Routes by grade", categories: @facility.grades.map{|f| [f.grade]}, yAxis: 0, data: @facility.grades.all.map{|f| @activeroutes.where("grade_id = ?", f).count } )

      f.yAxis [
        {title: {text: "Routes by Grade", margin: 0, tickInterval: 10} }
      ]

      f.chart({defaultSeriesType: "pie"})
    end

    @setterchart = LazyHighCharts::HighChart.new('chart') do |f|
      f.title(text: "Routes by Setter")
      f.xAxis(categories: @facility.setters.map{|f| [f.last_name + ", " + f.first_name]})
      f.series(name: "Routes by setter", categories: @facility.setters.map{|f| [f.last_name]}, yAxis: 0, data: @facility.setters.all.map{|f| @activeroutes.where("setter_id = ?", f).count } )

      f.yAxis [
        {title: {text: "Routes by Setter", margin: 0} }
      ]

      f.chart({defaultSeriesType: "bar"})
    end

    @chart_globals = LazyHighCharts::HighChartGlobals.new do |f|
      f.global(useUTC: false)
      f.chart(
        borderWidth: 0,
        plotBackgroundColor: "rgba(255, 255, 255, .9)",
        plotShadow: true,
        plotBorderWidth: 1
      )
      f.lang(thousandsSep: ",")
      f.colors(["#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354"])
    end
  end

  def new
    @facility = current_user.facilities.new
  end

  def create
    @facility = current_user.facilities.build(facility_params)
    if @facility.save
      flash[:success] = "Thank you for registering!"
      redirect_to admin_facilities_url
    else
      render 'new'
    end
  end

  def edit
    @facility = Facility.find(params[:id])
  end

  def update
    @facility = Facility.find(params[:facility])
    if @facility.update_attributes(facility_params)
      flash[:success] = "Info updated!"
      redirect_to(admin_facility_path(@facility))
      # Handle a successful update.
    else
      render 'edit'
    end
  end



  def destroy
    Facility.find(params[:id]).destroy
    flash[:success] = "Facility deleted"
    redirect_to admin_facilities_url
  end



  private

    def facility_params
      params.require(:facility).permit(:name, :location, :addressline1, :addressline2, :city, :state, :zipcode, :custom, :user_id)
    end

    # Before filters

    # Confirms an admin user.
    def admin_user
      redirect_to root_url unless current_user.admin?
    end
end
