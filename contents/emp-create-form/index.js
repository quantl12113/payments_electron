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
const costModel = remote.require('./lib/cost-model');
const ipc = require('electron').ipcRenderer;

$('#create-employ-submit').click(async () => {
  const employ = {};
  const code = {};
  employ.code = $("#employee-code").val();
  employ.name = $("#employee-name").val();
  employ.email = $("#employee-email").val();
  employ.date = $("#employee-date").val();
  employ.nameJapan = $("#employee-name-jp").val();
  const employAdded = empModel.addEmployee(employ);
  console.log(employAdded);
  cost.user_id = employAdded.insertId;
  cost.change_cost = $("#change-cost").val();
  cost.travel_cost = $("#travel-cost").val();
  cost.other_id = $("#other-id").val();
  cost.other_cost = $("#other-cost").val();
  costModel.addCost(cost);
  // ipc.sendSync('create-employee','1111111111111', '1234');
});