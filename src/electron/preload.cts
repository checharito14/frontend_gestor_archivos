import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
	send: (channel: string, data: any) => ipcRenderer.send(channel, data),
	receive: (channel: string, callback: (data: any) => void) => {
		ipcRenderer.on(channel, (_, data) => callback(data));
	},

  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  close: () => ipcRenderer.send("window:close"),
  isMaximized: () => ipcRenderer.invoke("window:isMaximized")
});

