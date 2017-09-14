(function() {
  jQuery(function() {
    var walls;
    $('#route_wall_id').parent().show();
    $('#route_sub_child_zone_id').parent().show();
    walls = $('#route_wall_id').html();
    $('#route_zone_id').change(function() {
      var options, zone;
      zone = $('#route_zone_id :seleced').text();
      options = $(walls).filter("optgroup[label='" + zone + "']").html();
      if (options) {
        $('#route_wall_id').html(options);
        return $('#route_wall_id').parent().show();
      } else {
        $('#route_wall_id').empty;
        return $('#route_wall_id').parent().hide();
      }
    });
    jQuery(function() {
      var zone;
      zone = $('input[name="route[zone_id]"]:checked').val();
      $('.walls').hide();
      if (zone > 0) {
        $('#zone_wall_' + zone).clone().appendTo('#wall_render');
      } else {

      }
      return $('input[name="route[zone_id]"]').change(function() {
        $('#wall_render').html('');
        zone = $('input[name="route[zone_id]"]:checked').val();
        return $('#zone_wall_' + zone).clone().appendTo('#wall_render');
      });
    });
    jQuery(function() {
      var grade;
      grade = $('input[name="route[grade_system_virtual]"]:checked').val();
      $('.grade-').hide();
      if (grade > 0) {
        $('#grade_system_' + grade).clone().appendTo('#grade_render');
      } else {

      }
      return $('input[name="route[grade_system_virtual]"]').change(function() {
        $('#grade_render').html('');
        grade = $('input[name="route[grade_system_virtual]"]:checked').val();
        return $('#grade_system_' + grade).clone().appendTo('#grade_render');
      });
    });
    $(function() {});
    $.rails.allowAction = function(link) {
      if (!link.attr('data-confirm')) {
        return true;
      }
      $.rails.showConfirmDialog(link);
      return false;
    };
    $.rails.confirmed = function(link) {
      link.removeAttr('data-confirm');
      return link.trigger('click.rails');
    };
    return $.rails.showConfirmDialog = function(link) {
      var html, message;
      message = link.attr('data-confirm');
      html = "<div class=\"modal\" id=\"confirmationDialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <a class=\"close\" data-dismiss=\"modal\">×</a>\n        <h1>" + message + "</h1>\n      </div>\n      <div class=\"modal-footer\">\n        <a data-dismiss=\"modal\" class=\"btn\">Cancel</a>\n        <a data-dismiss=\"modal\" class=\"btn btn-primary confirm\">Confirm</a>\n      </div>\n    </div>\n  </div>\n</div>";
      $(html).modal();
      return $('#confirmationDialog .confirm').on('click', function() {
        return $.rails.confirmed(link);
      });
    };
  });

}).call(this);
