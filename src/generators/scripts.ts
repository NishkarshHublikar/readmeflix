export function generateScripts(
  scripts: Record<string, string>
) {
  if (!scripts || Object.keys(scripts).length === 0) {
    return "";
  }

  let markdown = `## 📜 Available Scripts

| Script | Command |
|--------|---------|
`;

  for (const [name, command] of Object.entries(scripts)) {
    markdown += `| ${name} | \`${command}\` |\n`;
  }

  return markdown + "\n";
}