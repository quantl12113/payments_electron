const {
  remote
} = require('electron');
const {
  dialog
} = remote;
const {
  BrowserWindow
} = remote;
const fs = require('fs');
const path = require('path');
const empModel = remote.require('./lib/employee-model');
const otherModel = remote.require('./lib/other-model');
const ipc = require('electron').ipcRenderer;

let empData = new Array;
let otherData = new Array;
let empTable, otherTable;

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
  empTable = $('#employee').DataTable({
    data: empData,
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
      otherTable = $('#other').DataTable({
        data: otherData,
        "iDisplayLength": 25,
        "bProcessing": true,
        "bDestroy": true,
        "bAutoWidth": true,
        "sScrollY": "500px",
        "bScrollCollapse": false,
        "bSort": true,
        "select": true,
        "sPaginationType": "full_numbers",
        "initComplete": function (settings, json) {
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
  $('#footer-other-item').css('display', 'none');
  $('#footer-mail').css('display', 'none');

  $('#cssmenu>ul>li>').click((e) => {
    $('.active').removeClass('active');
    $(e.target).parent().addClass('active');
    if ($(e.target).parent().attr('id') === 'emp-tab') {
      $('.ql-toolbar').css('display', 'none');
      $('#editor').css('display', 'none');
      $('#other_wrapper').css('display', 'none');
      $('#employee_wrapper').css('display', 'block');
      $('#footer-emp').css('display', 'block');
      $('#footer-other-item').css('display', 'none');
      $('#footer-mail').css('display', 'none');
    }
    if ($(e.target).parent().attr('id') === 'mail-tab') {
      $('.ql-toolbar').css('display', 'block');
      $('#editor').css('display', 'block');
      $('#employee_wrapper').css('display', 'none');
      $('#other_wrapper').css('display', 'none');
      $('#footer-emp').css('display', 'none');
      $('#footer-other-item').css('display', 'none');
      $('#footer-mail').css('display', 'block');
    }
    if ($(e.target).parent().attr('id') === 'other-tab') {
      $('.ql-toolbar').css('display', 'none');
      $('#editor').css('display', 'none');
      $('#employee_wrapper').css('display', 'none');
      $('#other_wrapper').css('display', 'block');
      $('#footer-emp').css('display', 'none');
      $('#footer-other-item').css('display', 'block');
      $('#footer-mail').css('display', 'none');
    }
  })

});

function formatYYYYMM(date) {
  var mm = date.getMonth() + 1;

  return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
  ].join('-');
};

async function createFormEdit() {
  // Create the browser window.
  editForm = new BrowserWindow({
    parent: remote.getCurrentWindow(),
    width: 520,
    height: 700,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  editForm.loadFile('./contents/emp-create-form/index.html')
  editForm.once('ready-to-show', () => {
    editForm.show();
  })

  // Open the DevTools.
  editForm.webContents.openDevTools()

  // Emitted when the window is closed.
  editForm.on('closed', function () {
    editForm = null
  });
}

$('#footer-emp #add').click(async ()=>{
  let result = await createFormEdit();
})

$('#footer-emp #delete').click(async () => {
  let selectedRows = empTable.rows('.selected');
  let selectedRowsData = selectedRows.data();
  if (selectedRowsData.length == 0) {
    let options  = {
      buttons: ["OK"],
      message: "Please choose an Employee to delete !!"
    }
    dialog.showMessageBox(remote.getCurrentWindow(), options)
  } else {
    let options  = {
      buttons: ["Yes", "No"],
      message: "Are you sure to delete these employees !!"
    }
    let result = await dialog.showMessageBox(remote.getCurrentWindow(), options);
    if ( result.response === 0 ) {
      for (let i = 0; i < selectedRowsData.length; i += 1) {
        let employeeCode = selectedRowsData[i][0];
        try {
          empModel.deleteEmployee(employeeCode);
        } catch (error) {
          dialog.showMessageBox(remote.getCurrentWindow(), {type: 'warning', message: "Can't delete " + employeeCode})
        }
      }
      selectedRows.remove().draw();
    }
  }
});

$('#footer-other-item #delete').click(async () => {
  let selectedRows = otherTable.rows('.selected');
  let selectedRowsData = selectedRows.data();
  if (selectedRowsData.length == 0) {
    let options  = {
      buttons: ["OK"],
      message: "Please choose an Item to delete !!"
    }
    dialog.showMessageBox(remote.getCurrentWindow(), options)
  } else {
    let options  = {
      buttons: ["Yes", "No"],
      message: "Are you sure to delete these Items !!"
    }
    let result = await dialog.showMessageBox(remote.getCurrentWindow(), options);
    if ( result.response === 0 ) {
      for (let i = 0; i < selectedRowsData.length; i += 1) {
        let id = selectedRowsData[i][0];
        try {
          otherModel.deleteOtherItem(id);
        } catch (error) {
          dialog.showMessageBox(remote.getCurrentWindow(), {type: 'warning', message: "Can't delete " + id})
        }
      }
      selectedRows.remove().draw();
    }
  }
});

$('#attach').click(async () => {
  let result = await dialog.showOpenDialog(remote.getCurrentWindow(), {
    properties: ['openDirectory']
  })
  if (result.filePaths.length > 0) {
    let dirPath = result.filePaths[0];
    let files = [];
    await getListFilesFromDir(dirPath, '.pdf', files);
  }
})

async function getListFilesFromDir(startPath, filter, output) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  let files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      return await getListFilesFromDir(filename, filter);
    } else if (filename.indexOf(filter) >= 0) {
      output.push(filename);
    };
  };
  return output;
};

ipc.on('create-employee-reply',async function (event, args) {
  $(document).ready(function() {
    var t = $('#employee').DataTable();
    t.row.add( [
        args.employ.code,
        args.employ.name,
        args.employ.email,
        args.cost.change_cost,
        args.cost.travel_cost,
        args.cost.other,
        args.cost.other_cost,
        "",
        args.employ.date
    ] ).draw( false );
} );  
});