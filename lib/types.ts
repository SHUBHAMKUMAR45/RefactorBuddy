export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

export type SupportedLanguage =
  | "typescript"
  | "javascript"
  | "python"
  | "java"
  | "rust"
  | "go"
  | "cpp"
  | "csharp"
  | "php"
  | "ruby"
  | "auto";

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  auto: "Auto-detect",
  typescript: "TypeScript",
  javascript: "JavaScript",
  python: "Python",
  java: "Java",
  rust: "Rust",
  go: "Go",
  cpp: "C++",
  csharp: "C#",
  php: "PHP",
  ruby: "Ruby",
};

export interface ReviewSection {
  type: "critique" | "refactor" | "principle" | "other";
  content: string;
}
