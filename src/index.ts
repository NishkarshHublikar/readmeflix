#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import gradientString from "gradient-string";

import { analyzeProject } from "./commands/analyze.js";

import { generateReadme } from "./commands/generate.js";

import { scoreCommand } from "./commands/score.js";

const program = new Command();

console.log(
  gradientString.pastel.multiline(
    figlet.textSync("ReadmeFlix", {
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  )
);

console.log(
  chalk.gray("\nGenerate cinematic README files automatically.\n")
);

program
  .name("readmeflix")
  .description("AI-powered README generator")
  .version("1.0.0");

program
  .command("analyze")
  .description("Analyze repository")
  .action(analyzeProject);

program
  .command("generate")
  .description("Generate cinematic README")
  .option("-t, --theme <theme>", "README theme")
  .action(generateReadme);

program
  .command("score")
  .description("Score README quality")
  .action(scoreCommand)

program.parse();