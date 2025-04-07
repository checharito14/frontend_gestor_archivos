import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import keytar from "keytar";
import { isDev } from "./utils.js";
import { getPreloadPath } from "./pathResolver.js";

app.on("ready", () => {
	const SERVICE_NAME = "DocVault";

	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		webPreferences: {
			preload: getPreloadPath(),
		},
	});
	if (isDev()) {
		mainWindow.loadURL("http://localhost:5123");
	} else {
		mainWindow.loadFile(
			path.join(app.getAppPath(), "/dist-react/index.html")
		);
	}
	
	ipcMain.on("save-token", async (_event, token: string) => {
		await keytar.setPassword(SERVICE_NAME, "user-token", token);
	});
	
	ipcMain.handle("load-token", async () => {
		return await keytar.getPassword(SERVICE_NAME, "user-token");
	});
	
	ipcMain.on("clear-token", async () => {
		await keytar.deletePassword(SERVICE_NAME, "user-token");
	});
});
