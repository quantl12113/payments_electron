const {remote} = require('electron');
const {BrowserWindow} = remote;
const empModel = remote.require('./lib/employee-model');
const otherModel = remote.require('./lib/other-model');

let empData = new Array;
let otherData = new Array;

$(document).ready(function () {
  $.each(empModel.employee, function (index, value) {
    var tempArray = new Array;
    tempArray.push(value.code);
    tempArray.push(value.name);
    tempArray.push(value.email);
    tempArray.push(value.change_cost);
    tempArray.push(value.travel_cost);
    tempArray.push(value.otherName);
    tempArray.push(value.other_cost);
    tempArray.push(value.attach_file);
    tempArray.push(formatYYYYMM(value.date));
    empData.push(tempArray);
  })
  $.each(otherModel.otherItems, function (index, value) {
    var tempArray = new Array;
    tempArray.push(value.id);
    tempArray.push(value.value);
    otherData.push(tempArray);
  });
  let empTable = $('#employee').DataTable({
    // data: empData,
    "iDisplayLength": 25,
    "bProcessing": true,
    "bDestroy": true,
    "bAutoWidth": true,
    "sScrollY": "500px",
    "bScrollCollapse": false,
    "bSort": true,
    "select": true,
    "sPaginationType": "full_numbers",
    "initComplete": function( settings, json ) {
      $('#other').DataTable({
        // data: otherData,
        "iDisplayLength": 25,
        "bProcessing": true,
        "bDestroy": true,
        "bAutoWidth": true,
        "sScrollY": "500px",
        "bScrollCollapse": false,
        "bSort": true,
        "select": true,
        "sPaginationType": "full_numbers",
        "initComplete": function( settings, json ) {
          $('#loading').remove();
        }
      });
    }
  });

  var quill = new Quill('#editor', {
    theme: 'snow'
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

function formatYYYYMM(date) {
  var mm = date.getMonth() + 1;

  return [date.getFullYear(),
          (mm>9 ? '' : '0') + mm,
         ].join('-');
};

async function createFormEdit() {
  // Create the browser window.
  editForm = new BrowserWindow({parent: remote.getCurrentWindow(), width: 700, height: 600, modal: true, show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  editForm.loadFile('./contents/emp-edit-form/index.html')
  editForm.once('ready-to-show', () => {
    editForm.show()
  })
  // Open the DevTools.
  editForm.webContents.openDevTools()

  // Emitted when the window is closed.
  editForm.on('closed', function () {
    editForm = null
  });
}

$('#add').click(async ()=>{
  let result = await createFormEdit();
  console.log(result);
  
})