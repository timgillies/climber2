# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

jQuery ->

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
