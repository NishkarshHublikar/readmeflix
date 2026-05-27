import { ProjectData } from "../types.js";
import { netflixBanner } from "../banners/netflix.js";
import { generateBadges } from "../generators/badges.js";

export function netflixTheme(data: ProjectData) {
  return `
${netflixBanner(data.projectName)}

${generateBadges(
  data.framework,
  data.language,
  data.license
)}

<div align="center">

### Cinematic README Experience

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

${
  data.hasContributingGuide
    ? `
# 🤝 Contributing

Contributions are welcome!
`
    : ""
}

<div align="center">

### ⭐ Generated using ReadmeFlix

</div>
`;
}