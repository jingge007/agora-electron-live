const {app, BrowserWindow} = require("electron");

const path = require('path')
const {formatUrl} = require('url')

const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 650,
        minHeight: 500,
        webPreferences: {
            nodeIntegration: true,
            plugins: true
        },
        center: true,
        closable: true,
        autoHideMenuBar: true

    });

    if (isDevelopment) {
        mainWindow.loadURL("http://localhost:3000/");
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadURL(formatUrl({
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }

    mainWindow.on("closed", function (event) {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        event.preventDefault();
        mainWindow = null;
    });
}


// create main BrowserWindow when electron is ready
app.on('ready', createMainWindow);

// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        createMainWindow()
    }
})