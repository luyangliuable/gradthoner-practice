import { Repo } from "@shared/repo/data";
import { Octokit } from "octokit";
import { getGitHubToken } from "./getGitHubToken";
import { initGitHubClient } from "./initGitHubClient";

/**
 * Fetches an array of {@link Repo} objects.
 * @param org Organization name.
 * @param team Team slug.
 * @returns
 */
export async function listTeamRepos(
  org: string,
  team: string,
): Promise<Repo[]> {
  const octo = initGitHubClient(globalThis.useEnterpriseServer);
  console.log("Using: " + getGitHubToken(globalThis.useEnterpriseServer));
  // Fetch response data.
  const { data: reposData } = await octo.rest.teams.listReposInOrg({
    org: org,
    team_slug: team,
  });
  // Convert the repsponse to array of repos.
  const repos: Repo[] = reposData.map((item, index: number) => {
    console.log("Parsing repo: " + index + " name: " + item.full_name);
    return {
      key: index,
      owner: item.owner.login,
      name: item.name,
      url: item.url,
    };
  });
  return repos;
}
