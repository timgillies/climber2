(function() {
  jQuery(function() {
    var grade;
    grade = $('input[name="tick[grade_system_virtual]"]:checked').val();
    $('.grade-').hide();
    if (grade > 0) {
      $('#grade_system_' + grade).clone().appendTo('#grade_render');
    } else {

    }
    return $('input[name="tick[grade_system_virtual]"]').change(function() {
      $('#grade_render').html('');
      grade = $('input[name="tick[grade_system_virtual]"]:checked').val();
      return $('#grade_system_' + grade).clone().appendTo('#grade_render');
    });
  });

}).call(this);
