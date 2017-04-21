module TicksHelper

  def tick_types
    [
      ['Onsight', 'onsight'],
      ['Flash', 'flash'],
      ['Redpoint', 'redpoint'],
      ['Project attempt', 'project']
    ]
  end

  def rope_tick_types
    [
      ['Top Rope', 0],
      ['Lead', 1],
      ['Boulder', 0]
    ]
  end

  def tick_date_filters
    [
      ['1 week', 6.days.ago.beginning_of_day.to_date],
      ['1 month', 1.month.ago.to_date],
      ['6 months', 6.months.ago.to_date],
      ['1 year', 1.year.ago.to_date],
    ]
  end


# optimizes tick chart on daily summary page
  def user_ticks_chart_series(ticks, start_time)

    ticks_by_day = ticks.where(:date => start_time..Date.current).
                group("date(date)").
                select("date, count(id) as tick_count")
      (start_time.to_date..Date.current).map do |date|
        tick = ticks_by_day.detect { |tick| tick.date.to_date == date }
        tick && tick.tick_count.to_f || 0
      end.inspect

  end

end
