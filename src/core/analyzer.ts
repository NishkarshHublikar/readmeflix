import fs from "node:fs";
import path from "node:path";

export interface RepositoryAnalysis {
  projectRoot: string;
  projectName: string;
  description: string;

  framework: string;
  language: string;
  styling: string;
  backend: string;
  packageManager: string;

  scripts: Record<string, string>;
  features: string[];
  
  license: string;
}

function findPackageJson(startDir: string): string | null {
  let currentDir = startDir;

  while (true) {
    const packageJsonPath = path.join(
      currentDir,
      "package.json"
    );

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

export function analyzeRepository(): RepositoryAnalysis | null {
  const packageJsonPath = findPackageJson(process.cwd());

  if (!packageJsonPath) {
    return null;
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

  let framework = "Unknown";
  let language = "JavaScript";
  let styling = "None";
  let backend = "None";
  let packageManager = "npm";

  const features: string[] = [];

  // Framework
  if (deps.next) framework = "Next.js";
  else if (deps.react) framework = "React";
  else if (deps.vue) framework = "Vue";
  else if (deps.svelte) framework = "Svelte";

  // Language
  if (deps.typescript) language = "TypeScript";

  // Styling
  if (deps.tailwindcss) {
    styling = "Tailwind CSS";
    features.push("Tailwind CSS");
  }

  // Backend
  if (deps.express) {
    backend = "Express";
    features.push("Express Backend");
  }

  // AI
  if (
    deps.openai ||
    deps.langchain ||
    deps["@google/generative-ai"]
  ) {
    features.push("AI Integration");
  }

  // Database
  if (deps.mongodb || deps.mongoose) {
    features.push("MongoDB Database");
  }

  if (deps.firebase) {
    features.push("Firebase Backend");
  }

  // Payments
  if (deps.stripe) {
    features.push("Stripe Payments");
  }

  // Package manager
  if (
    fs.existsSync(path.join(projectRoot, "pnpm-lock.yaml"))
  ) {
    packageManager = "pnpm";
  } else if (
    fs.existsSync(path.join(projectRoot, "yarn.lock"))
  ) {
    packageManager = "yarn";
  }

  return {
    projectRoot,
    projectName: packageJson.name || "My Project",
    description:
      packageJson.description ||
      "A modern software project.",

    framework,
    language,
    styling,
    backend,
    packageManager,

    scripts,
    features,

    license: packageJson.license || "MIT",
  };
}