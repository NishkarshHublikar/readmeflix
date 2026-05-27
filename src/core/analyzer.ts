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
  hasContributingGuide: boolean;
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

  // Framework Detection
  if (packageJson.bin) {
    framework = "Node.js CLI";
  } else if (deps.next) {
    framework = "Next.js";
  } else if (deps.react) {
    framework = "React";
  } else if (deps.vue) {
    framework = "Vue";
  } else if (deps.svelte) {
    framework = "Svelte";
  } else if (deps.express) {
    framework = "Express";
  }

  // Language Detection
  if (deps.typescript) {
    language = "TypeScript";
  }

  // Styling Detection
  if (deps.tailwindcss) {
    styling = "Tailwind CSS";
    features.push("Tailwind CSS");
  } else if (deps["styled-components"]) {
    styling = "Styled Components";
    features.push("Styled Components");
  }

  // Backend Detection
  if (deps.express) {
    backend = "Express";
    features.push("Express Backend");
  } else if (deps.fastify) {
    backend = "Fastify";
    features.push("Fastify Backend");
  }

  // CLI Features
  if (deps.chalk) {
    features.push("Colorful CLI Output");
  }

  if (deps.ora) {
    features.push("Spinner Loader");
  }

  if (deps.boxen) {
    features.push("Terminal UI Boxes");
  }

  if (deps.commander) {
    features.push("CLI Commands");
  }

  if (deps.figlet) {
    features.push("ASCII Art Banner");
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

  const hasContributingGuide =
    fs.existsSync(
      path.join(projectRoot, "CONTRIBUTING.md")
   );

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

    hasContributingGuide,
  };
}