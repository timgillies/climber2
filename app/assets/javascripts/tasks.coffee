# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

jQuery ->
  $('#task_wall_id').parent().show()
  $('#task_sub_child_zone_id').parent().show()
  walls = $('#task_wall_id').html()
  $('#task_zone_id').change ->
    zone = $('#task_zone_id :selected').text()
    options = $(walls).filter("optgroup[label='#{zone}']").html()
    if options
      $('#task_wall_id').html(options)
      $('#task_wall_id').parent().show()
    else
      $('#task_wall_id').empty
      $('#task_wall_id').parent().hide()

  jQuery ->
      $('#task_sub_child_zone_id').parent().show()
      sub_child_zones = $('#task_sub_child_zone_id').html()
      $('#task_zone_id').select ->
          $('#task_sub_child_zone_id').empty
          $('#task_sub_child_zone_id').parent().hide()
      $('#task_wall_id').change ->
        wall = $('#task_wall_id :selected').text()
        options = $(sub_child_zones).filter("optgroup[label='#{wall}']").html()
        if options
          $('#task_sub_child_zone_id').html(options)
          $('#task_sub_child_zone_id').parent().show()
        else
          $('#task_sub_child_zone_id').empty
          $('#task_sub_child_zone_id').parent().hide()
