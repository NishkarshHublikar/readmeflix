import ora from "ora";
import chalk from "chalk";
import boxen from "boxen";

import { analyzeRepository } from "../core/analyzer.js";
import { scoreReadme } from "../core/scorer.js";

export async function scoreCommand() {
  const spinner = ora("Analyzing README quality...").start();

  await new Promise((resolve) => setTimeout(resolve, 1200));

  const analysis = analyzeRepository();

  if (!analysis) {
    spinner.fail("No repository found");
    return;
  }

  const result = scoreReadme(
    analysis.projectRoot
  );

  spinner.succeed("README analyzed successfully!");

  const output = `
${chalk.cyanBright("README Score")} : ${result.score}/100

${chalk.greenBright("Good")}
${result.good.map((g) => `✔ ${g}`).join("\n")}

${chalk.redBright("Missing")}
${result.missing.map((m) => `✘ ${m}`).join("\n")}
`;

  console.log(
    boxen(output, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "yellow",
    })
  );
}