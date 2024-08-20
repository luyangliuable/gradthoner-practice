import { Octokit } from "octokit";
import { getGitHubToken } from "./getGitHubToken";

export function initGitHubClient(useEnterpriseServer: boolean): Octokit {
  if (useEnterpriseServer) {
    return new Octokit({
      auth: getGitHubToken(true),
      baseUrl: "https://github.source.internal.cba/api/v3",
    });
  }
  return new Octokit({
    auth: getGitHubToken(false),
  });
}
