import { ProjectData } from "../types.js";

export function minimalTheme(data: ProjectData) {
  return `
# 🚀 ${data.projectName}

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