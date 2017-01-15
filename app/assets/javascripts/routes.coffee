# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/




jQuery ->
  $('#route_wall_id').parent().show()
  $('#route_sub_child_zone_id').parent().show()
  walls = $('#route_wall_id').html()
  $('#route_zone_id').change ->
    zone = $('#route_zone_id :selected').text()
    options = $(walls).filter("optgroup[label='#{zone}']").html()
    if options
      $('#route_wall_id').html(options)
      $('#route_wall_id').parent().show()
    else
      $('#route_wall_id').empty
      $('#route_wall_id').parent().hide()

  jQuery ->
      $('#route_sub_child_zone_id').parent().show()
      sub_child_zones = $('#route_sub_child_zone_id').html()

      $('#route_wall_id').change ->
        wall = $('#route_wall_id :selected').text()
        options = $(sub_child_zones).filter("optgroup[label='#{wall}']").html()
        if options
          $('#route_sub_child_zone_id').html(options)
          $('#route_sub_child_zone_id').parent().show()
