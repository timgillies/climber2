# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


  $(document).on "ready turbolinks:load", ->
    grade = $('input[name="tick[grade_system_virtual]"]:checked').val()

    $('.grade-').hide()

    if grade > 0
      $('#grade_system_'+grade).clone().appendTo('#grade_render')
    else

    $('input[name="tick[grade_system_virtual]"]').change ->
      $('#grade_render').html('');
      grade = $('input[name="tick[grade_system_virtual]"]:checked').val()
      $('#grade_system_'+grade).clone().appendTo('#grade_render')
