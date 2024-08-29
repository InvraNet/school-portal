const { app, BrowserWindow, ipcMain } = require('electron');
const nativeImage = require('electron').nativeImage;
const path = require('path');
const https = require('https');
const http = require('http');

function checkHttpServer(host, port, callback) {
    const options = {
        method: 'HEAD',
        hostname: host,
        port: port,
        path: '/',
        timeout: 1000,
    };

    const req = (port === 443 ? https : http).request(options, (res) => {
        callback(res.statusCode === 200);
    });

    req.on('error', () => {
        callback(false);
    });

    req.on('timeout', () => {
        req.destroy();
        callback(false);
    });

    req.end();
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        minWidth: 1000,
        height: 650,
        minHeight: 550,
        trafficLightPosition: { x: 8, y: 8 },
        autoHideMenuBar: true,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          contextIsolation: true,
          enableRemoteModule: false,
          nodeIntegration: false
        },
        icon: "./common/win/icon.png"
    });
    mainWindow.loadFile(path.join(__dirname, "www/start.html"));
}

ipcMain.handle('ping-server', async (event, host) => {
    return new Promise((resolve) => {
        const port = host.startsWith('https://') ? 443 : 80;
        const cleanedHost = host.replace(/^https?:\/\//, '');

        checkHttpServer(cleanedHost, port, (isAlive) => {
            resolve(isAlive);
        });
    });
});

app.whenReady().then(() => {
    app.dock.setIcon(nativeImage.createFromPath(path.join(__dirname, "common/win/icon.png")))
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});