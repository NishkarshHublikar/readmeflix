import { ProjectData } from "../types.js";

export function glassTheme(data: ProjectData) {
  return `
# ✨ ${data.projectName}

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