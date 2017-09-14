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
      ['1 week', 6.days.ago.beginning_of_day.to_date],
      ['1 month', 1.month.ago.to_date],
      ['6 months', 6.months.ago.to_date],
      ['1 year', 1.year.ago.to_date],
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
