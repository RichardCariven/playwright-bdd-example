import path from "path";

import { distributionHash } from "../../config";
import { type PageId } from "../../types";
import { buildCrowdinManifestUrl } from "../urls/urls";

export interface Manifest {
  files: string[];
  timestamp: number;
}

export async function fetchCrowdinManifest() {
  const url = buildCrowdinManifestUrl(distributionHash);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unsuccessful fetch status (${response.status}) on ${url}`);
  }
  const manifest = (await response.json()) as Manifest;
  const { files } = manifest;
  return {
    pageIds: getPageIdsFromManifest(files),
    timestamp: manifest.timestamp,
  };
}

function getPageIdsFromManifest(files: Manifest["files"]) {
  return files.map((pathname) => {
    const { name } = path.parse(pathname);
    return name as PageId;
  });
}
