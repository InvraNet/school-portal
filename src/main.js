const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const configPath = path.join(__dirname, 'config.json');
const defaultConfig = {
    schoolName: null,
    state: null,
    type: null,
    autoHideDETNSW: false
};

function initializeConfig() {
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
    }
}

function loadConfig() {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}

function saveConfig(key, value) {
    try {
        const config = loadConfig();
        config[key] = value;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
        
        console.log(`Config updated: ${key} = ${value}`);
    } catch (error) {
        console.error("Failed to save config", error);
    }
}

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

function startFirstLaunch() {
    const mainWindow = new BrowserWindow({
        maximizable: false,
        minWidth: 600,
        maxWidth: 600,
        width: 600,
        minHeight: 750,
        maxHeight: 750,
        height: 750,
        titleBarStyle: 'hidden',
        trafficLightPosition: { x: 8, y: 8 },
        titleBarOverlay: {
            color: '#2d2d37',
            symbolColor: 'white',
            height: 29,
          },
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        },
        icon: path.join(__dirname, './common/win/icon.png')
    });
    mainWindow.setResizable(false);
    mainWindow.loadFile(path.join(__dirname, 'www/firstStart.html'));
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        minWidth: 600,
        minHeight: 300,
        trafficLightPosition: { x: 8, y: 8 },
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        },
        icon: path.join(__dirname, './common/win/icon.png')
    });

    mainWindow.loadFile(path.join(__dirname, 'www/start.html'));
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

ipcMain.handle('get-config', async () => {
    return loadConfig();
});

ipcMain.handle('write-config', async (event, jsonData, newData) => {
    saveConfig(jsonData, newData);
    return true;
});

app.whenReady().then(() => {
    initializeConfig();
    try {
        const config = loadConfig();
        if (config.schoolName === null) {
            startFirstLaunch();
        } else {
            createWindow();
        }
    } catch (error) {
        console.error("Exiting app... Ran into issue parsing config.", error);
        app.quit();
    }

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