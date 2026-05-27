import chalk from "chalk";
import ora from "ora";
import boxen from "boxen";

import { analyzeRepository } from "../core/analyzer.js";

export async function analyzeProject() {
  const spinner = ora(
    "Scanning repository..."
  ).start();

  await new Promise((resolve) =>
    setTimeout(resolve, 1200)
  );

  const analysis = analyzeRepository();

  if (!analysis) {
    spinner.fail(
      "No package.json found in current or parent folders"
    );
    return;
  }

  spinner.succeed(
    "Repository analyzed successfully!"
  );

  const output = `
${chalk.cyanBright("Framework")}       : ${analysis.framework}
${chalk.greenBright("Language")}       : ${analysis.language}
${chalk.magentaBright("Styling")}        : ${analysis.styling}
${chalk.yellowBright("Backend")}        : ${analysis.backend}
${chalk.blueBright("Package Manager")} : ${analysis.packageManager}

${
  analysis.features.length > 0
    ? `
${chalk.whiteBright("Features")}
${analysis.features
  .map((f) => `• ${f}`)
  .join("\n")}
`
    : ""
}
`;

  console.log(
    boxen(output, {
      padding: 1,
      margin: 1,
      borderStyle: "single",
      borderColor: "cyan",
      width: 60,
    })
  );
}