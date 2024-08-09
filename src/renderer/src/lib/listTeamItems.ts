import { Repo } from "@shared/item/data";

export async function listTeamRepos(
  org: string,
  team: string,
): Promise<Repo[]> {
  console.log("Generating fake data.");
  // Fake data.
  const items: Repo[] = Array.from<Repo>({ length: 552 }).map<Repo>((_, i) => ({
    key: i,
    owner: i < 200 ? `ExampleOwner` : `TestOwner`,
    name: `Item ${i}`,
    url: "https://github.com/",
  }));
  await new Promise((t) => setTimeout(t, 1000));
  return items;
}
