export function generateBadges(
  framework: string,
  language: string,
  license: string
) {
  const badges: string[] = [];

  // Language
  if (language === "TypeScript") {
    badges.push(
      "![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)"
    );
  }

  // Framework
  if (framework === "React") {
    badges.push(
      "![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)"
    );
  }

  if (framework === "Next.js") {
    badges.push(
      "![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)"
    );
  }

  // License
  badges.push(
    `![License](https://img.shields.io/badge/license-${license}-blue)`
  );

  return badges.join(" ");
}