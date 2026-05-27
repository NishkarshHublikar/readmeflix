import { ProjectData } from "../types.js";
import { minimalBanner } from "../banners/minimal.js";
import { generateBadges } from "../generators/badges.js";

export function minimalTheme(data: ProjectData) {
  return `
${minimalBanner(data.projectName)}

${generateBadges(
  data.framework,
  data.language,
  data.license
)}

## 📖 Overview

${data.description}

---

## 🛠 Tech Stack

- ${data.framework}
- ${data.language}

---

## 📦 Installation

\`\`\`bash
npm install
\`\`\`

---

## ▶️ Run Locally

\`\`\`bash
npm run dev
\`\`\`
`;
}