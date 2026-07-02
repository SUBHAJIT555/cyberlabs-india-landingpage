import { mainSiteUrl } from "@/data/main-site";

export function resolveMainSiteAsset(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return mainSiteUrl(path);
  return path;
}

export function resolveCatalogAsset(path: string): string {
  if (!path) return "";
  if (path.startsWith("/synced-from-main-site/")) return path;
  return resolveMainSiteAsset(path);
}
