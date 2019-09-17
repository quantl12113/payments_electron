const { remote } = require('electron');

setTimeout(()=>{
  createMainWindow();
}, 2000)

function createMainWindow () {
  const BrowserWindow = remote.BrowserWindow;
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 730,
    webPreferences: {
      modal: true,
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./contents/main-page/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  });
  remote.getCurrentWindow().close();
}