import { ProjectData } from "../types.js";
import { glassBanner } from "../banners/glass.js";
import { generateBadges } from "../generators/badges.js";

export function glassTheme(data: ProjectData) {
  return `
${glassBanner(data.projectName)}

> Elegant README generation for modern developers.

---

## 📖 About

${data.description}

---

## ⚡ Stack

• ${data.framework}  
• ${data.language}

---

## 🛠 Setup

\`\`\`bash
npm install
npm run dev
\`\`\`

---

## 📜 Scripts

${Object.entries(data.scripts)
  .map(([key, value]) => `- ${key}: \`${value}\``)
  .join("\n")}

---

### 🌌 Crafted with ReadmeFlix
`;
}