const stripSlashes = (value: string) => value.replace(/\/+$/, "");

export const getDirectusBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_DIRECTUS_URL?.trim() ?? "";
  return url ? stripSlashes(url) : "";
};

export const buildDirectusUrl = (path: string): string => {
  const base = getDirectusBaseUrl();
  if (!base) return "";

  const normalizedPath = path.replace(/^\/+/, "");
  return `${base}/${normalizedPath}`;
};

export const buildDirectusAssetUrl = (fileId: string | null | undefined): string => {
  const base = getDirectusBaseUrl();
  if (!base || !fileId) return "";

  return `${base}/assets/${fileId}`;
};
