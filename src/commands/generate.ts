import fs from "node:fs";
import path from "node:path";

import ora from "ora";
import chalk from "chalk";

/*import { generateHero } from "../generators/hero.js";
import { generateOverview } from "../generators/overview.js";
import { generateTechStack } from "../generators/techstack.js";
import { generateInstallation } from "../generators/installation.js";
import { generateFooter } from "../generators/footer.js";
import { generateScripts } from "../generators/scripts.js";*/
import { ProjectData } from "../types.js";

import { minimalTheme } from "../themes/minimal.js";
import { netflixTheme } from "../themes/netflix.js";
import { glassTheme } from "../themes/glass.js";

function findPackageJson(startDir: string): string | null {
  let currentDir = startDir;

  while (true) {
    const packageJsonPath = path.join(currentDir, "package.json");

    if (fs.existsSync(packageJsonPath)) {
      return packageJsonPath;
    }

    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
      return null;
    }

    currentDir = parentDir;
  }
}

export async function generateReadme(options: any) {
  const spinner = ora("Generating cinematic README...").start();

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const packageJsonPath = findPackageJson(process.cwd());

  if (!packageJsonPath) {
    spinner.fail("No package.json found");
    return;
  }

  const projectRoot = path.dirname(packageJsonPath);

  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, "utf-8")
  );

  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  const scripts = packageJson.scripts || {};

  const projectName = packageJson.name || "My Project";

  const description =
    packageJson.description ||
    "A powerful project built using modern technologies.";

  let framework = "Unknown";
  let language = "JavaScript";

  if (deps.next) framework = "Next.js";
  else if (deps.react) framework = "React";
  else if (deps.vue) framework = "Vue";

  if (deps.typescript) language = "TypeScript";

 const data: ProjectData = {
  projectName,
  description,
  framework,
  language,
  scripts,
};

let markdown = "";

const theme = options.theme || "minimal";

if (theme === "netflix") {
  markdown = netflixTheme(data);
} else if (theme === "glass") {
  markdown = glassTheme(data);
} else {
  markdown = minimalTheme(data);
}

  const readmePath = path.join(projectRoot, "README.md");

  const backupPath = path.join(
    projectRoot,
    "README.backup.md"
  );

  // Backup old README
  if (fs.existsSync(readmePath)) {
    fs.copyFileSync(readmePath, backupPath);
  }

  fs.writeFileSync(readmePath, markdown);

  spinner.succeed("README generated successfully!");

  console.log(
    chalk.green("\n✅ README.md updated successfully!\n")
  );

  if (fs.existsSync(backupPath)) {
    console.log(
      chalk.yellow(
        "📦 Backup created: README.backup.md\n"
      )
    );
  }
}