import fs from "node:fs";
import path from "node:path";

import ora from "ora";
import chalk from "chalk";

import { minimalTheme } from "../themes/minimal.js";
import { netflixTheme } from "../themes/netflix.js";
import { glassTheme } from "../themes/glass.js";

import { analyzeRepository } from "../core/analyzer.js";

import { detectScreenshots } from "../core/assets.js";
import { generatePreviewSection } from "../generators/preview.js";

export async function generateReadme(options: any) {
  const spinner = ora(
    "Generating cinematic README..."
  ).start();

  await new Promise((resolve) =>
    setTimeout(resolve, 1500)
  );

  const analysis = analyzeRepository();

  if (!analysis) {
    spinner.fail("No package.json found");
    return;
  }

  const screenshots = detectScreenshots(
    analysis.projectRoot
  );

  let markdown = "";

  const theme = options.theme || "minimal";

  if (theme === "netflix") {
    markdown = netflixTheme(analysis);
  } else if (theme === "glass") {
    markdown = glassTheme(analysis);
  } else {
    markdown = minimalTheme(analysis);
  }

  // Add preview section
  markdown += generatePreviewSection(
    screenshots
  );

  const readmePath = path.join(
    analysis.projectRoot,
    "README.md"
  );

  const backupPath = path.join(
    analysis.projectRoot,
    "README.backup.md"
  );

  // Backup existing README
  if (fs.existsSync(readmePath)) {
    fs.copyFileSync(readmePath, backupPath);
  }

  // Write new README
  fs.writeFileSync(readmePath, markdown);

  spinner.succeed(
    "README generated successfully!"
  );

  console.log(
    chalk.green(
      "\n✅ README.md updated successfully!\n"
    )
  );

  if (fs.existsSync(backupPath)) {
    console.log(
      chalk.yellow(
        "📦 Backup created: README.backup.md\n"
      )
    );
  }

  if (screenshots.length > 0) {
    console.log(
      chalk.cyan(
        `📸 Detected ${screenshots.length} screenshot(s)\n`
      )
    );
  }
}