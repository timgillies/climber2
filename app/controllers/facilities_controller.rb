class FacilitiesController < ApplicationController

  layout "user", except: [:index]

  def index
    @facilities = Facility.page(params[:page])
  end

  def show
    @facility = Facility.find(params[:id])
    @routes = @facility.routes.page(params[:page])
    @activeroutes = @facility.routes.where("enddate >= ?", Date.today)

    @gradechart = LazyHighCharts::HighChart.new('chart') do |f|
      f.chart(  defaultSeriesType: "pie",
                borderWidth: 0,
                plotBackgroundColor: "rgba(255, 255, 255, .9)",
                plotShadow: true,
                plotBorderWidth: 1
              )
      series = {
               type: 'pie',
               name: 'Routes by grade',
               data: @facility.grades.all.map{|f| [f.grade, @activeroutes.where("grade_id = ?", f).count] }
      }
      f.series(series)
      f.legend(enabled: false)
      f.plotOptions(pie:{
        allowPointSelect: true,
        cursor: "pointer" ,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}:</b> {point.percentage:.0f}%',
          color: "black",
          style: {
            font: "13px Trebuchet MS, Verdana, sans-serif"
          }
        }
      })
    end

    @setterchart = LazyHighCharts::HighChart.new('barchart') do |f|
      f.xAxis(categories: @facility.setters.map{|f| [f.nick_name]})
      f.series(name: "Number of routes", yAxis: 0, data: @facility.setters.all.map{|f| @activeroutes.where("setter_id = ?", f).count } )
      f.legend(enabled: false)
      f.colors( ["#6bda8f"])
      f.yAxis [
        {title: {text: "Active Routes", margin: 0} }
      ]
      f.labels(enables: true)
      f.plot_options(bar:{
        allowPointSelect: true,
        cursor: "pointer" ,
        dataLabels: {
          enabled: true,
          format: '{point.y:.0f}'
        }
      })

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
      f.colors(["#b6da6b", "#6bda8f", "#8f6bda", "#da6bb6", "#da8f6b"])
    end
  end

  def leaderboard
  end

  private

    def facility_params
      params.require(:facility).permit(:name, :location, :addressline1, :addressline2, :city, :state, :zipcode, :custom)
    end
end
