import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { Repo } from "@shared/repo/data";
import { IAPI } from "@shared/api";
import { CommitFile } from "@shared/commit/data";

// Custom APIs for renderer
const api: IAPI = {
  loadReposFromTxt: (): Promise<Repo[]> => {
    return ipcRenderer.invoke("system/loadReposFromTxt");
  },
  selectFilesUnderDirectories: (): Promise<CommitFile[]> => {
    return ipcRenderer.invoke("system/selectFilesUnderDirectories");
  },
  loadCommitFiles: (filePaths: string): Promise<CommitFile[]> => {
    return ipcRenderer.invoke("system/loadCommitFiles", filePaths);
  },
  loadFile: (filepath: string): Promise<string> => {
    return ipcRenderer.invoke("system/loadFile", filepath);
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
