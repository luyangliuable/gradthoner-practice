export function getGitHubToken(useEnterpriseServer: boolean): string {
  if (useEnterpriseServer) {
    return import.meta.env.RENDERER_VITE_GITHUB_ENTERPRISE_SERVER_TOKEN;
  }
  return import.meta.env.RENDERER_VITE_GITHUB_TOKEN;
}
