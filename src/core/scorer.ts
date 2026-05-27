import fs from "node:fs";
import path from "node:path";

export interface ReadmeScore {
  score: number;
  good: string[];
  missing: string[];
  suggestions: string[];
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
      suggestions: [],
    };
  }

  const content = fs.readFileSync(
    readmePath,
    "utf-8"
  );

  let score = 0;

  const good: string[] = [];
  const missing: string[] = [];
  const suggestions: string[] = [];

  const checks = [
    {
      name: "Installation Section",
      regex: /installation/i,
      points: 15,
      suggestion:
        "Add an Installation section with setup steps",
    },
    {
      name: "Usage Section",
      regex: /usage|run locally/i,
      points: 15,
      suggestion:
        "Explain how to run or use the project",
    },
    {
      name: "License",
      regex: /license/i,
      points: 10,
      suggestion:
        "Add a license badge or license section",
    },
    {
      name: "Screenshots",
      regex:
        /!\[.*?\]\((.*?)\.(png|jpg|jpeg|gif|webp)\)/i,
      points: 20,
      suggestion:
        "Add screenshots inside /screenshots folder",
    },
    {
      name: "Contributing Guide",
      regex: /contributing/i,
      points: 15,
      suggestion:
        "Create a CONTRIBUTING.md guide",
    },
    {
      name: "Tech Stack",
      regex: /tech stack|stack/i,
      points: 10,
      suggestion:
        "Mention technologies used in the project",
    },
    {
      name: "API Documentation",
      regex: /api/i,
      points: 15,
      suggestion:
        "Document APIs or endpoints if applicable",
    },
  ];

  for (const check of checks) {
    if (check.regex.test(content)) {
      score += check.points;
      good.push(check.name);
    } else {
      missing.push(check.name);
      suggestions.push(check.suggestion);
    }
  }

  return {
    score,
    good,
    missing,
    suggestions,
  };
}