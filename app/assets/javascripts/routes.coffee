# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


jQuery ->
  $('#route_wall_id').parent().show()
  $('#route_sub_child_zone_id').parent().show()
  walls = $('#route_wall_id').html()
  $('#route_zone_id').change ->
    zone = $('#route_zone_id :seleced').text()
    options = $(walls).filter("optgroup[label='#{zone}']").html()
    if options
      $('#route_wall_id').html(options)
      $('#route_wall_id').parent().show()
    else
      $('#route_wall_id').empty
      $('#route_wall_id').parent().hide()


  jQuery ->
    zone = $('input[name="route[zone_id]"]:checked').val()

    $('.walls').hide()

    if zone > 0
      $('#zone_wall_'+zone).clone().appendTo('#wall_render')

    else
    $('input[name="route[zone_id]"]').change ->
      $('#wall_render').html('');
      zone = $('input[name="route[zone_id]"]:checked').val()
      $('#zone_wall_'+zone).clone().appendTo('#wall_render')



  jQuery ->
    grade = $('input[name="route[grade_system_virtual]"]:checked').val()

    $('.grade-').hide()

    if grade > 0
      $('#grade_system_'+grade).clone().appendTo('#grade_render')
    else

    $('input[name="route[grade_system_virtual]"]').change ->
      $('#grade_render').html('');
      grade = $('input[name="route[grade_system_virtual]"]:checked').val()
      $('#grade_system_'+grade).clone().appendTo('#grade_render')

  $ ->
  $.rails.allowAction = (link) ->
    return true unless link.attr('data-confirm')
    $.rails.showConfirmDialog(link)
    false

  $.rails.confirmed = (link) ->
    link.removeAttr('data-confirm')
    link.trigger('click.rails')

  $.rails.showConfirmDialog = (link) ->
    message = link.attr 'data-confirm'
    html = """
           <div class="modal" id="confirmationDialog">
             <div class="modal-dialog">
               <div class="modal-content">
                 <div class="modal-header">
                   <a class="close" data-dismiss="modal">×</a>
                   <h1>#{message}</h1>
                 </div>
                 <div class="modal-footer">
                   <a data-dismiss="modal" class="btn">Cancel</a>
                   <a data-dismiss="modal" class="btn btn-primary confirm">Confirm</a>
                 </div>
               </div>
             </div>
           </div>
           """
    $(html).modal()
    $('#confirmationDialog .confirm').on 'click', -> $.rails.confirmed(link)
