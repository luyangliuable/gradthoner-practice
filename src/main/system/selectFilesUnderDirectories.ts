import { CommitFile } from "@shared/commit/data";
import { dialog } from "electron";

/**
 * Prompts to select directories.
 * Returns all local file paths under the selected directories.
 * @todo Complete this function.
 * @returns
 */
export function selectFilesUnderDirectories(): CommitFile[] {
  const data: string[] | undefined = dialog.showOpenDialogSync({
    properties: ["openDirectory", "multiSelections"],
  });
  if (data === undefined) return [];
  for (var i = 0; i < data.length; i++) {
    console.log("Selected directory: " + data[i]);
  }
  // TODO: Recursively get all file paths under the selected directories.
  // For each file, use a CommitFile instance to preserve:
  // - Actual path: absolute path of the local file, will be used to load file for upload - e.g. "User/abc/Documnets/Works/SelectedDirectory/File"
  // - Path in repo: where you want the file to end up in repos - e.g. "SelectedDirectory/File"
  return [];
}
