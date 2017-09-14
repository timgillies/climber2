(function() {
  jQuery(function() {
    var walls;
    $('#task_wall_id').parent().show();
    $('#task_sub_child_zone_id').parent().show();
    walls = $('#task_wall_id').html();
    $('#task_zone_id').change(function() {
      var options, zone;
      zone = $('#task_zone_id :selected').text();
      options = $(walls).filter("optgroup[label='" + zone + "']").html();
      if (options) {
        $('#task_wall_id').html(options);
        return $('#task_wall_id').parent().show();
      } else {
        $('#task_wall_id').empty;
        return $('#task_wall_id').parent().hide();
      }
    });
    return jQuery(function() {
      var sub_child_zones;
      $('#task_sub_child_zone_id').parent().show();
      sub_child_zones = $('#task_sub_child_zone_id').html();
      $('#task_zone_id').select(function() {
        $('#task_sub_child_zone_id').empty;
        return $('#task_sub_child_zone_id').parent().hide();
      });
      $('#task_wall_id').change(function() {
        var options, wall;
        wall = $('#task_wall_id :selected').text();
        options = $(sub_child_zones).filter("optgroup[label='" + wall + "']").html();
        if (options) {
          $('#task_sub_child_zone_id').html(options);
          return $('#task_sub_child_zone_id').parent().show();
        } else {
          $('#task_sub_child_zone_id').empty;
          return $('#task_sub_child_zone_id').parent().hide();
        }
      });
      jQuery(function() {
        var zone;
        zone = $('input[name="task[zone_id]"]:checked').val();
        $('.walls').hide();
        if (zone > 0) {
          $('#zone_wall_' + zone).clone().appendTo('#wall_render');
        } else {

        }
        return $('input[name="task[zone_id]"]').change(function() {
          $('#wall_render').html('');
          zone = $('input[name="task[zone_id]"]:checked').val();
          return $('#zone_wall_' + zone).clone().appendTo('#wall_render');
        });
      });
      return jQuery(function() {
        var grade;
        grade = $('input[name="task[grade_system_virtual]"]:checked').val();
        $('.grade-').hide();
        if (grade > 0) {
          $('#grade_system_' + grade).clone().appendTo('#grade_render');
        } else {

        }
        return $('input[name="task[grade_system_virtual]"]').change(function() {
          $('#grade_render').html('');
          grade = $('input[name="task[grade_system_virtual]"]:checked').val();
          return $('#grade_system_' + grade).clone().appendTo('#grade_render');
        });
      });
    });
  });

}).call(this);
