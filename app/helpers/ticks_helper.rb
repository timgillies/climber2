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

end
