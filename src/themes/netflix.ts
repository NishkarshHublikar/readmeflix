import { ProjectData } from "../types.js";
import { netflixBanner } from "../banners/netflix.js";

export function netflixTheme(data: ProjectData) {
  return `
${netflixBanner(data.projectName)}

<div align="center">

### Cinematic README Experience

![License](https://img.shields.io/badge/license-MIT-red)

</div>

---

# 🍿 Overview

${data.description}

---

# 🎥 Tech Stack

| Technology | Usage |
|------------|-------|
| ${data.framework} | Frontend Framework |
| ${data.language} | Main Language |

---

# 🚀 Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

---

# 📜 Scripts

${Object.entries(data.scripts)
  .map(([key, value]) => `- \`${key}\` → ${value}`)
  .join("\n")}

---

<div align="center">

### ⭐ Generated using ReadmeFlix

</div>
`;
}