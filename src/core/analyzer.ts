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

function findPackageJson(
  startDir: string
): string | null {
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

export function analyzeRepository():
  | RepositoryAnalysis
  | null {
  const packageJsonPath = findPackageJson(
    process.cwd()
  );

  if (!packageJsonPath) {
    return null;
  }

  const projectRoot = path.dirname(
    packageJsonPath
  );

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
  } else if (deps.angular) {
    framework = "Angular";
  } else if (deps.nuxt) {
    framework = "Nuxt.js";
  } else if (deps.remix) {
    framework = "Remix";
  } else if (deps.astro) {
    framework = "Astro";
  } else if (deps.vite) {
    framework = "Vite";
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
  } else if (deps.bootstrap) {
    styling = "Bootstrap";
    features.push("Bootstrap");
  } else if (deps["styled-components"]) {
    styling = "Styled Components";
    features.push("Styled Components");
  } else if (deps.sass) {
    styling = "Sass";
    features.push("Sass");
  } else if (
    deps.materialui ||
    deps["@mui/material"]
  ) {
    styling = "Material UI";
    features.push("Material UI");
  } else if (
    deps.chakraui ||
    deps["@chakra-ui/react"]
  ) {
    styling = "Chakra UI";
    features.push("Chakra UI");
  }

  // Backend Detection
  if (deps.express) {
    backend = "Express";
    features.push("Express Backend");
  } else if (deps.fastify) {
    backend = "Fastify";
    features.push("Fastify Backend");
  } else if (
    deps.nestjs ||
    deps["@nestjs/core"]
  ) {
    backend = "NestJS";
    features.push("NestJS Backend");
  } else if (
    deps.mongodb ||
    deps.mongoose
  ) {
    backend = "MongoDB";
    features.push("MongoDB Database");
  } else if (deps.firebase) {
    backend = "Firebase";
    features.push("Firebase Backend");
  } else if (deps.supabase) {
    backend = "Supabase";
    features.push("Supabase Backend");
  } else if (deps.prisma) {
    backend = "Prisma";
    features.push("Prisma ORM");
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

  // Payments
  if (deps.stripe) {
    features.push("Stripe Payments");
  }

  // Authentication
  if (
    deps.jwt ||
    deps.jsonwebtoken
  ) {
    features.push("Authentication System");
  }

  // Realtime
  if (
    deps.socketio ||
    deps["socket.io"]
  ) {
    features.push("Realtime Communication");
  }

  // Docker
  if (
    fs.existsSync(
      path.join(projectRoot, "Dockerfile")
    )
  ) {
    features.push("Docker Support");
  }

  // Package Manager
  if (
    fs.existsSync(
      path.join(projectRoot, "pnpm-lock.yaml")
    )
  ) {
    packageManager = "pnpm";
  } else if (
    fs.existsSync(
      path.join(projectRoot, "yarn.lock")
    )
  ) {
    packageManager = "yarn";
  }

  const hasContributingGuide =
    fs.existsSync(
      path.join(
        projectRoot,
        "CONTRIBUTING.md"
      )
    );

  return {
    projectRoot,
    projectName:
      packageJson.name || "My Project",

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

    license:
      packageJson.license || "MIT",

    hasContributingGuide,
  };
}