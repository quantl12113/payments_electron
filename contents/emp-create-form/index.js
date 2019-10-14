const ipc = require('electron').ipcRenderer;

$('#create-employ-submit').click(async () => {
  ipc.sendSync('create-employee','1111111111111', '1234');
});
