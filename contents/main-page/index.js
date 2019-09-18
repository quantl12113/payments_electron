const fs = require('fs');
const path = require('path');
const $ = require('jquery');
require('jszip');
require('pdfmake');
require('datatables.net-zf')(window, $);
require('datatables.net-autofill-zf')(window, $);
require('datatables.net-buttons-zf')(window, $);
require('datatables.net-buttons/js/buttons.colVis.js')(window, $);
require('datatables.net-buttons/js/buttons.flash.js')(window, $);
require('datatables.net-buttons/js/buttons.html5.js')(window, $);
require('datatables.net-buttons/js/buttons.print.js')(window, $);
require('datatables.net-colreorder-zf')(window, $);
require('datatables.net-fixedcolumns-zf')(window, $);
require('datatables.net-fixedheader-zf')(window, $);
require('datatables.net-keytable-zf')(window, $);
require('datatables.net-responsive-zf')(window, $);
require('datatables.net-rowgroup-zf')(window, $);
require('datatables.net-rowreorder-zf')(window, $);
require('datatables.net-scroller-zf')(window, $);
require('datatables.net-select-zf')(window, $);


let empRawdata = fs.readFileSync(path.join(__dirname, 'emp_data.json'));
let empData = JSON.parse(empRawdata);
let otherRawdata = fs.readFileSync(path.join(__dirname, 'other_data.json'));
let otherData = JSON.parse(otherRawdata);
$(document).ready(function () {
  $('#employee').DataTable({
    data: empData,
    "bProcessing": true,
    "bDestroy": true,
    "bAutoWidth": true,
    "sScrollY": "500px",
    "bScrollCollapse": true,
    "bSort": true,
    "sPaginationType": "full_numbers",
  });

  var quill = new Quill('#editor', {
    theme: 'snow'
  });

  $('#other').DataTable({
    data: otherData,
    "bProcessing": true,
    "bDestroy": true,
    "bAutoWidth": true,
    "sScrollY": "500px",
    "bScrollCollapse": true,
    "bSort": true,
    "sPaginationType": "full_numbers",
  });

  $('#other_wrapper').css('display', 'none');
  $('.ql-toolbar').css('display', 'none');
  $('#editor').css('display', 'none');

  $('#cssmenu>ul>li>').click((e) => {
    $('.active').removeClass('active');
    $(e.target).parent().addClass('active');
    if ($(e.target).parent().attr('id') === 'emp-tab') {
      $('.ql-toolbar').css('display', 'none');
      $('#editor').css('display', 'none');
      $('#other_wrapper').css('display', 'none');
      $('#employee_wrapper').css('display', 'block');
    }
    if ($(e.target).parent().attr('id') === 'mail-tab') {
      $('.ql-toolbar').css('display', 'block');
      $('#editor').css('display', 'block');
      $('#employee_wrapper').css('display', 'none');
      $('#other_wrapper').css('display', 'none');
    }
    if ($(e.target).parent().attr('id') === 'other-tab') {
      $('.ql-toolbar').css('display', 'none');
      $('#editor').css('display', 'none');
      $('#employee_wrapper').css('display', 'none');
      $('#other_wrapper').css('display', 'block');
    }
  })
  
});