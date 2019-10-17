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
const makeDb = require('../../config/db');
const ipc = require('electron').ipcRenderer;

$(document).ready(function () {
  $.each(otherModel.otherItems, function (value) {
    $("#other-id").append(`<option value="${value.id}">${value.value}</option>`)
  })
});

$('#create-employ-submit').click(async () => {
  const employ = {};
  const cost = {};
  employ.code = $("#employee-code").val();
  employ.name = $("#employee-name").val();
  employ.email = $("#employee-email").val();
  employ.date = $("#employee-date").val();
  employ.nameJapan = $("#employee-name-jp").val();
  cost.change_cost = $("#change-cost").val();
  cost.travel_cost = $("#travel-cost").val();
  cost.other_id = $("#other-id").val();
  cost.other_cost = $("#other-cost").val();

  let db = makeDb();
  try {
    const employAdded = await empModel.addEmployee(employ);
    cost.user_id = employAdded.insertId;
    await costModel.addCost(cost);
    await db.commit();
    const currentWindow = remote.getCurrentWindow();
    currentWindow.close();
    let data = {
      status: 'success',
      employee: employ,
      cost: cost,
    }
    ipc.sendSync('create-employee', data);
  } catch (error) {
    await db.rollback();
    let data = {
      status: 'false',
    }
    ipc.sendSync('create-employee', data);
  } finally {
    await db.close();
  }
});