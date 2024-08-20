export interface Commit {
  authorName: string;
  authorEmail: string;
  message: string;
  treeSha: string;
}

export interface CommitFile {
  /**
   * The actual local path for reading and uploading the local file.
   */
  localPath: string;
  /**
   * Where you want the file to end up in in the repos.
   * Used to create commit tree.
   */
  pathInRepo: string;
}
