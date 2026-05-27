export function generatePreviewSection(
  screenshots: string[]
) {
  if (screenshots.length === 0) {
    return "";
  }

  return `
## 📸 Preview

${screenshots
  .map(
    (shot) => `![Screenshot](${shot})`
  )
  .join("\n\n")}
`;
}