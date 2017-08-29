module CompetitionsHelper
  def comp_formats
    [
      ['Onsight', 'onsight'],
      ['Flash', 'flash'],
      ['Redpoint', 'redpoint'],
      ['Other', 'other'],
    ]
  end

  def false_true
    [
      ['Public', false],
      ['Private', true]
    ]
  end
end
