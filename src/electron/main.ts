import { app, BrowserWindow, globalShortcut, Menu } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { getPreloadPath } from "./pathResolver.js";


app.on("ready", () => {
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		icon: path.resolve(process.cwd(), "src/electron/assets/icon.ico"),
		roundedCorners: true,
		webPreferences: {
			preload: getPreloadPath(),
		},
	});


	Menu.setApplicationMenu(null);


app.whenReady().then(() => {
  globalShortcut.register('Control+Shift+I', () => {
    const win = BrowserWindow.getFocusedWindow();
    win?.webContents.toggleDevTools();
  });
});


	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
	});

	if (isDev()) {
		mainWindow.loadURL("http://localhost:5123");
	} else {
		mainWindow.loadFile(
			path.join(app.getAppPath(), "/dist-react/index.html")
		);
	}
});
