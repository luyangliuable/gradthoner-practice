import { Repo } from "@shared/repo/data";
import { FileFilter, dialog } from "electron";
import * as fs from "fs";

const filters: FileFilter[] = [{ name: "Text", extensions: ["txt"] }];

/**
 * Prompts to select a txt file and
 * loads an array of {@link Repo} instances from it.
 * @returns
 */
export function loadReposFromTxt(): Repo[] {
  const data: string[] | undefined = dialog.showOpenDialogSync({
    filters: filters,
    properties: ["openFile"],
  });
  if (data === undefined) return [];
  console.log("Selected file: " + data[0]);
  const content: string = fs.readFileSync(data[0], "utf-8");
  return parseRepoListTxt(content);
}

/**
 *
 *
 * Converts txt file content to an array of {@link Repo} instances.
 *
 * The content is expected to contain lines separated by "\n",
 * where each line is a repo full name in the format "Owner/Name".
 * @todo Complete this function.
 * @param content
 * @returns
 */
function parseRepoListTxt(content: string): Repo[] {
  const lines: string[] = content.split("\n");
  const repos: Repo[] = [];
  // TODO: Map each line into a Repo to fill the repos array.
  return repos;
}
