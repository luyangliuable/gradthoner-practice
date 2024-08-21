import { Repo } from "@shared/repo/data";
import { Octokit } from "octokit";
import { readFile } from "fs-extra";

/**
 * TODO: Complete this function.
 * @param repos
 * @param org
 * @param filePaths
 * @returns
 */
export async function addFilesToRepos(
  repos: Repo[],
  org: string,
  filePaths: string[],
): Promise<boolean> {
  const octo = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  for (const repo of repos) {
    const currentCommit = await getCurrentCommit(
      octo,
      org,
      repo.name,
      "master",
    );
  }

  return new Promise(() => true);
}

export async function getCurrentCommit(
  octo: Octokit,
  org: string,
  repo: string,
  branch: string,
): Promise<{
  commitSha: string;
  treeSha: string;
}> {
  const { data: refData } = await octo.rest.git.getRef({
    owner: org,
    repo,
    ref: `heads/${branch}`,
  });
  const commitSha = refData.object.sha;
  const { data: commitData } = await octo.rest.git.getCommit({
    owner: org,
    repo,
    commit_sha: commitSha,
  });
  return {
    commitSha,
    treeSha: commitData.tree.sha,
  };
}

export async function createFileBlob(
  octo: Octokit,
  org: string,
  repo: string,
  filePath: string,
): Promise<void> {
  const content = await readFile(filePath, "utf-8");
}
