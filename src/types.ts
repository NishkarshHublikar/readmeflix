export interface ProjectData {
  projectName: string;
  description: string;
  framework: string;
  language: string;
  scripts: Record<string, string>;
}