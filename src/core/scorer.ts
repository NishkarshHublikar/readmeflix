import fs from "node:fs";
import path from "node:path";

export interface ReadmeScore {
  score: number;
  good: string[];
  missing: string[];
}

export function scoreReadme(
  projectRoot: string
): ReadmeScore {
  const readmePath = path.join(projectRoot, "README.md");

  if (!fs.existsSync(readmePath)) {
    return {
      score: 0,
      good: [],
      missing: ["README.md not found"],
    };
  }

  const content = fs.readFileSync(
    readmePath,
    "utf-8"
  );

  let score = 0;

  const good: string[] = [];
  const missing: string[] = [];

  const checks = [
    {
      name: "Installation Section",
      regex: /installation/i,
      points: 15,
    },
    {
      name: "Usage Section",
      regex: /usage|run locally/i,
      points: 15,
    },
    {
      name: "License",
      regex: /license/i,
      points: 10,
    },
    {
      name: "Screenshots",
      regex: /!\[(screenshot|preview|demo).*?\]\(.*?\)/i,
      points: 20,
    },
    {
      name: "Contributing Guide",
      regex: /contributing/i,
      points: 15,
    },
    {
      name: "Tech Stack",
      regex: /tech stack|stack/i,
      points: 10,
    },
    {
      name: "API Documentation",
      regex: /api/i,
      points: 15,
    },
  ];

  for (const check of checks) {
    if (check.regex.test(content)) {
      score += check.points;
      good.push(check.name);
    } else {
      missing.push(check.name);
    }
  }

  return {
    score,
    good,
    missing,
  };
}