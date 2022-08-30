const path = require("path");
const { app, BrowserWindow, shell, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");

let mainWindow = BrowserWindow || null;

const createWindow = async () => {
  const assetsPath = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../public/assets");

  const getAssetPath = (...paths) => {
    return path.join(assetsPath, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    width: 1920,
    height: 1080,
    icon: getAssetPath("logo192.png"),
    webPreferences: {
      sandbox: false,
    },
  });

  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(url);

  mainWindow.on("ready-to-show", () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
    process.exit(0);
  });

  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });
};

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on("activate", () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
