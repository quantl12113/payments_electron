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

$('#create-employ-submit').click(async () => {
  const employ = {};
  employ.code = $("#employee-code").val();
  employ.name = $("#employee-name").val();
  employ.email = $("#employee-email").val();
  employ.date = $("#employee-date").val();
  employ.nameJapan = $("#employee-name-jp").val();
  empModel.addEmployee(employ);
  // ipc.sendSync('create-employee','1111111111111', '1234');
});
