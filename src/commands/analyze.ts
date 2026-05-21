import fs from "node:fs";
import path from "node:path";

import chalk from "chalk";
import ora from "ora";
import boxen from "boxen";

function findPackageJson(startDir: string): string | null {
  let currentDir = startDir;

  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, "package.json");

    if (fs.existsSync(packageJsonPath)) {
      return packageJsonPath;
    }

    currentDir = path.dirname(currentDir);
  }

  return null;
}

export async function analyzeProject() {
  const spinner = ora("Scanning repository...").start();

  await new Promise((resolve) => setTimeout(resolve, 1200));

  const packageJsonPath = findPackageJson(process.cwd());

  if (!packageJsonPath) {
    spinner.fail("No package.json found in current or parent folders");
    return;
  }

  spinner.succeed("Repository analyzed successfully!");

  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, "utf-8")
  );

  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  let framework = "Unknown";
  let language = "JavaScript";
  let styling = "None";
  let backend = "None";
  let packageManager = "npm";

  // Framework detection
  if (deps.next) framework = "Next.js";
  else if (deps.react) framework = "React";
  else if (deps.vue) framework = "Vue";
  else if (deps.svelte) framework = "Svelte";

  // Language
  if (deps.typescript) language = "TypeScript";

  // Styling
  if (deps.tailwindcss) styling = "Tailwind CSS";

  // Backend
  if (deps.express) backend = "Express";

  // Package manager
  const projectRoot = path.dirname(packageJsonPath);

  if (fs.existsSync(path.join(projectRoot, "pnpm-lock.yaml"))) {
    packageManager = "pnpm";
  } else if (fs.existsSync(path.join(projectRoot, "yarn.lock"))) {
    packageManager = "yarn";
  }

  const output = `
${chalk.cyanBright("Framework")}       : ${framework}
${chalk.greenBright("Language")}       : ${language}
${chalk.magentaBright("Styling")}        : ${styling}
${chalk.yellowBright("Backend")}        : ${backend}
${chalk.blueBright("Package Manager")} : ${packageManager}
${chalk.whiteBright("Project Root")}   : ${projectRoot}
`;

  console.log(
    boxen(output, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "cyan",
    })
  );
}