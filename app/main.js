const { app, BrowserWindow } = require('electron');
const path = require('path');
const util = require('util');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.resolve(path.join(__dirname, '../resources/icon.ico')),
    titleBarStyle: 'hidden',
    frame: false,
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true,
      contextIsolation: false,
      affinity: 'main-window'
    }
  });

  win.setMenu(null);

  if(process.env.NODE_ENV == 'production') {
    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.once('dom-ready', () => win.webContents.openDevTools());
  } else {
    //win.loadURL(`http://localhost:9090/webpack-dev-server.js`);
    win.loadURL(`http://localhost:9090/index.html`);
    // Open the DevTools.
    win.webContents.once('dom-ready', () => win.webContents.openDevTools());
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });

  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {

    if (frameName.substring(0, 5) == 'modal') {
        // open window as modal
        event.preventDefault()
        Object.assign(options, {
            //modal: true,
            modal: false,
            frame: true,
            parent: win,
            //center: true,
            //width: 100,
            //height: 100,
            webPreferences: {
              //sandbox: true,
              affinity: 'main-window',
              // nativeWindowOpen: false,
              nodeIntegration: false,
              // contextIsolation: false
            }
        });

        console.log('New Modal', util.inspect(options));

        event.newGuest = new BrowserWindow(options);
        event.newGuest.setMenuBarVisibility(false);
        event.newGuest.focus();
        //event.newGuest.webContents.openDevTools();

        //popups.push(event.newGuest);
        //return event.newGuest;
    }
  });
}

// Single instance app
const gotTheLock = app.requestSingleInstanceLock();

if(!gotTheLock) {
  app.quit()
} else {
  if(process.env.NODE_ENV == 'development') {
    require('electron-reload')(__dirname, {
      //electron: path.join(__dirname, '../node_modules', '.bin', 'electron'),
      //hardResetMethod: 'exit',
      //forceHardReset: true
    });
  }

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if(win) {
      if(win.isMinimized()) win.restore();
      win.focus();
    }
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if(process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if(win === null) {
      createWindow()
    }
  })

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

  
}
