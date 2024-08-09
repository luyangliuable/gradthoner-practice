import { Repo } from "@shared/item/data";

export async function addTeamToRepos(
  org: string,
  teamSlug: string,
  permission: string,
  items: Repo[],
): Promise<boolean> {
  await new Promise((t) => setTimeout(t, 1000));
  return true;
}
