'use strict';
const {dialog, BrowserWindow } = require('electron');
// 3rd-party modules.
const eDialog = require('electron-dialogbox');


module.exports = {
  openWindow: function (url, bwSetting) {
    let win;
    if (bwSetting.parent) { bwSetting.parent.setEnabled(false); }
    if (bwSetting.alwaysOnTop == null) bwSetting.alwaysOnTop = false;
    win = new BrowserWindow({
      width: bwSetting.width,
      height: bwSetting.height,
      frame: false,
      resizable: bwSetting.resizable,
      webPreferences: {
        nodeIntegration: true
      }
    })
    win.loadFile(url);
    win.on('closed', function () {
      if (bwSetting.parent) { 
        bwSetting.parent.setEnabled(true); 
        bwSetting.parent.focus();
      }
      win = null;
    })
    win.setMenu(null);
    return win;
  },
  showDialog: function(url, opt, input) {
    let parent = opt.parent;
    if (parent) { parent.setEnabled(false); }
    if (typeof opt.webPreferences !== 'object') opt.webPreferences = {};
    if (opt.alwaysOnTop == null) opt.alwaysOnTop = false;
    // opt.webPreferences.preload = path.join(__dirname, '../contents/initial/preload.js');
  
    let dialog = eDialog.showDialog(url, opt, input);
    
    // start of fixing error parent lost focus and flashing when closing dialog, ref #9855
    const Dialog = Object.getPrototypeOf(dialog);
    Dialog.exitSuccess = function (result) {
      this.isSuccess = true;
      this.result = result;
      if (this.options.parent) {
        this.options.parent.focus();
      }
      this.window.close();
    }
  
    Dialog.exitFailure = function (result) {
      this.isSuccess = false;
      this.result = result;
      if (this.options.parent) {
        this.options.parent.focus();
      }
      this.window.close();
    }
    // end of fixing error parent lost focus and flashing when closing dialog, ref #9855
  
    let p = dialog.resultPromise.then(r => { if (parent) parent.setEnabled(true); return r;});
    p.window = dialog.browserWindow;
    return p;
  },

  showAddWindow: async function (parent) {
    return this.showDialog(
      'contents/emp-create-form/index.html',
      { width: 520, height: 700, parent: parent, resizable: false, show: false, modal: true });
  },
  showShareSelectionWindow: async function (parent) {
    return this.openWindow(
      'contents/share_selection_window/index.html',
      { width: 285, height: 156, parent: parent, resizable: false, show: false });
  },
  showShareWindow: async function (parent) {
    return this.openWindow(
      'contents/share_window/index.html',
      { width: 228, height: 156, parent: parent, resizable: false, show: false });
  },

};
