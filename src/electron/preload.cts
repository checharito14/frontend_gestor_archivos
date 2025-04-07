import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  send: (channel: string, data: any) => ipcRenderer.send(channel, data),
  receive: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
  token: {
    save: (token: string) => ipcRenderer.send("save-token", token),
    load: () => ipcRenderer.invoke("load-token"),
    clear: () => ipcRenderer.send("clear-token"),
  }
});
