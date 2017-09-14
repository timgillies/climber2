//= require jquery
//= require jquery.minicolors
//= require jquery_ujs
//= require filterrific/filterrific-jquery
//= require bootstrap

//= require_tree .

//= require moment

//= require highcharts/highcharts
//= require highcharts/modules/exporting
//= require parsley
//= require toastr


$(document).ready(function() {


 toastr.options = {
                  "closeButton": false,
                  "debug": false,
                  "positionClass": "toast-bottom-right",
                  "onclick": null,
                  "showDuration": "300",
                  "hideDuration": "1000",
                  "timeOut": "3000",
                  "extendedTimeOut": "500",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut"
              }

});
