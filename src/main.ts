import { app, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,  // For Node.js integration
      contextIsolation: false // Allows Node.js in renderer process (required for Electron 12+)
    }
  });

  // Load an HTML file or URL in the window
  mainWindow.loadFile('./src/index.html'); // Change this to your app's URL or HTML file path
  // Or, if using an HTML file:
  // mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // For macOS, this is needed to re-create the window if the app is reopened
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (except for macOS where it's common to keep running)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
