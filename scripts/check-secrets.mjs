import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".turbo",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "playwright-report",
  "test-results",
]);

const ignoredFiles = new Set(["pnpm-lock.yaml"]);
const textExtensions = new Set([
  "",
  ".cjs",
  ".css",
  ".env",
  ".example",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);

const patterns = [
  {
    name: "private key",
    expression: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u,
  },
  {
    name: "GitHub token",
    expression: /(?:ghp|github_pat)_[A-Za-z0-9_]{20,}/u,
  },
  {
    name: "provider secret key",
    expression: /\bsk-[A-Za-z0-9_-]{20,}\b/u,
  },
  {
    name: "assigned secret",
    expression:
      /\b(?:api[_-]?key|client[_-]?secret|password|private[_-]?key|service[_-]?role[_-]?key)\b\s*[:=]\s*["']?[^\s"'<>]{12,}/iu,
  },
];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      if (entry.isDirectory()) {
        return ignoredDirectories.has(entry.name) ? [] : collectFiles(join(directory, entry.name));
      }

      if (!entry.isFile() || ignoredFiles.has(entry.name)) {
        return [];
      }

      return textExtensions.has(extname(entry.name).toLowerCase())
        ? [join(directory, entry.name)]
        : [];
    }),
  );

  return nestedFiles.flat();
}

const repositoryRoot = process.cwd();
const findings = [];

for (const file of await collectFiles(repositoryRoot)) {
  const content = await readFile(file, "utf8");
  const lines = content.split(/\r?\n/u);

  lines.forEach((line, index) => {
    patterns.forEach(({ name, expression }) => {
      if (expression.test(line)) {
        findings.push(`${relative(repositoryRoot, file)}:${index + 1} (${name})`);
      }
    });
  });
}

if (findings.length > 0) {
  console.error("Potential secrets detected:");
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exitCode = 1;
} else {
  console.log("Secret scan passed: no high-confidence secret patterns detected.");
}
