import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
];

const SEARCH_FOLDERS = [
  "screenshots",
  "assets",
  "images",
  "public",
];

export function detectScreenshots(
  projectRoot: string
): string[] {
  const screenshots: string[] = [];

  for (const folder of SEARCH_FOLDERS) {
    const folderPath = path.join(projectRoot, folder);

    if (!fs.existsSync(folderPath)) continue;

    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();

      if (IMAGE_EXTENSIONS.includes(ext)) {
        screenshots.push(`./${folder}/${file}`);
      }
    }
  }

  return screenshots;
}