module TicksHelper

  def tick_types
    [
      ['Flash', 'flash'],
      ['Redpoint', 'redpoint'],
      ['Project attempt', 'project']
    ]
  end

  def rope_tick_types
    [
      ['Lead', 1],
    ]
  end

  def tick_date_filters
    [
      [1.year.ago.beginning_of_month.to_date.strftime('%b %Y'), 1.year.ago],
      [11.months.ago.beginning_of_month.to_date.strftime('%b %Y'), 11.months.ago],
      [10.months.ago.beginning_of_month.to_date.strftime('%b %Y'), 10.months.ago],
      [9.months.ago.beginning_of_month.to_date.strftime('%b %Y'), 9.months.ago],
      [8.months.ago.beginning_of_month.to_date.strftime('%b %Y'), 8.months.ago],
      [7.months.ago.beginning_of_month.to_date.strftime('%b %Y'), 7.months.ago],
      [6.months.ago.beginning_of_month.to_date.strftime('%b %Y'), 6.months.ago],
      [5.months.ago.beginning_of_month.to_date.strftime('%b %Y'), 5.months.ago],
      [4.months.ago.beginning_of_month.to_date.strftime('%b %Y'), 4.months.ago],
      [3.months.ago.beginning_of_month.to_date.strftime('%b %Y'), 3.months.ago],
      [2.months.ago.beginning_of_month.to_date.strftime('%b %Y'), 2.months.ago],
      [1.month.ago.beginning_of_month.to_date.strftime('%b %Y'), 1.month.ago],
      [0.months.ago.beginning_of_month.to_date.strftime('%b %Y'), 0.months.ago],


    ]
  end


# optimizes tick chart on daily summary page
  def user_ticks_chart_series(ticks, start_time)

    ticks_by_day = ticks.ascent.where(:date => start_time..Date.current).
                group("DATE_TRUNC('week', date)").
                select("DATE_TRUNC('week', date) as tick_month, count(id) as tick_count")
      (start_time.to_date..Date.current).map {|d| Date.new(d.year, d.month, d.day).beginning_of_week }.uniq.map do |date|
        tick = ticks_by_day.detect { |tick| tick.tick_month.to_date == date }
        tick && tick.tick_count.to_f || 0
      end.inspect

  end

  def user_ticks_value_chart_series(ticks, start_time)

    sends_by_day = ticks.ascent.where(:date => start_time..Date.current).
                group("DATE_TRUNC('week', date)").
                select("DATE_TRUNC('week', date) as tick_month, SUM(grades.rank) as tick_count").joins('LEFT OUTER JOIN grades ON ticks.grade_id = grades.id')
    attempts_by_day = ticks.where(tick_type: 'project').where(:date => start_time..Date.current).
                group("DATE_TRUNC('week', date)").
                select("DATE_TRUNC('week', date) as tick_month, SUM(grades.rank * 0.5) as tick_count").joins('LEFT OUTER JOIN grades ON ticks.grade_id = grades.id')
      (start_time.to_date..Date.current).map {|d| Date.new(d.year, d.month, d.day).beginning_of_week }.uniq.map do |date|
        tick = (sends_by_day + attempts_by_day).detect { |tick| tick.tick_month.to_date == date }
        tick && tick.tick_count.to_f || 0
      end

  end

  def user_projects_value_chart_series(ticks, start_time)
    attempts_by_day = ticks.where(tick_type: 'project').where(:date => start_time..Date.current).
                group("DATE_TRUNC('week', date)").
                select("DATE_TRUNC('week', date) as tick_month, SUM(grades.rank * 0.5) as tick_count").joins('LEFT OUTER JOIN grades ON ticks.grade_id = grades.id')
      (start_time.to_date..Date.current).map {|d| Date.new(d.year, d.month, d.day).beginning_of_week }.uniq.map do |date|
        tick = (attempts_by_day).detect { |tick| tick.tick_month.to_date == date }
        tick && tick.tick_count.to_f || 0
      end

  end

  def user_daily_ticks_chart_series(ticks, start_time)

    ticks_by_day = ticks.ascent.where(:date => start_time..Date.current).
                group("DATE_TRUNC('day', date)").
                select("DATE_TRUNC('day', date) as tick_day, count(id) as tick_count")
      (start_time.to_date..Date.current).map {|d| Date.new(d.year, d.month, d.day)}.uniq.map do |date|
        tick = ticks_by_day.detect { |tick| tick.tick_day.to_date == date }
        tick && tick.tick_count.to_f || 0
      end.inspect

  end

  def user_daily_ticks_chart_series(ticks, start_time)

    ticks_by_day = ticks.ascent.where(:date => start_time..Date.current).
                group("DATE_TRUNC('day', date)").
                select("DATE_TRUNC('day', date) as tick_day, count(id) as tick_count")
      (start_time.to_date..Date.current).map {|d| Date.new(d.year, d.month, d.day)}.uniq.map do |date|
        tick = ticks_by_day.detect { |tick| tick.tick_day.to_date == date }
        tick && tick.tick_count.to_f || 0
      end.inspect

  end

  def user_daily_ticks_value_chart_series(ticks, start_time)

    sends_by_day = ticks.ascent.where(:date => start_time..Date.current).
                group("DATE_TRUNC('day', date)").
                select("DATE_TRUNC('day', date) as tick_day, SUM(grades.rank) as tick_count").joins('LEFT OUTER JOIN grades ON ticks.grade_id = grades.id')
    attempts_by_day = ticks.where(tick_type: 'project').where(:date => start_time..Date.current).
                group("DATE_TRUNC('day', date)").
                select("DATE_TRUNC('day', date) as tick_day, SUM(grades.rank * 0.5) as tick_count").joins('LEFT OUTER JOIN grades ON ticks.grade_id = grades.id')
      (start_time.to_date..Date.current).map {|d| Date.new(d.year, d.month, d.day)}.uniq.map do |date|
        tick = (sends_by_day + attempts_by_day).detect { |tick| tick.tick_day.to_date == date }
        tick && tick.tick_count.to_f || 0
      end

  end

  def user_daily_projects_value_chart_series(ticks, start_time)
    attempts_by_day = ticks.where(tick_type: 'project').where(:date => start_time..Date.current).
                group("DATE_TRUNC('day', date)").
                select("DATE_TRUNC('day', date) as tick_day, SUM(grades.rank * 0.5) as tick_count").joins('LEFT OUTER JOIN grades ON ticks.grade_id = grades.id')
      (start_time.to_date..Date.current).map {|d| Date.new(d.year, d.month, d.day)}.uniq.map do |date|
        tick = (attempts_by_day).detect { |tick| tick.tick_day.to_date == date }
        tick && tick.tick_count.to_f || 0
      end

  end

def top_three_ascent_score(competition, user)
  array = Array.new
  Tick.ascent.top_three_routes(competition, user).each do |t|
    array.push(t.grade.rank.to_f)
  end
  array.inject(:+)
end

def top_three_flash_score(competition, user)
  array = Array.new
  Tick.where(tick_type: 'flash').top_three_routes(competition, user).each do |t|
    array.push(t.grade.rank.to_f)
  end
  array.inject(:+)
end

# returns boolean
  def controller_check?(action)
    params[:action] == action
  end

end
