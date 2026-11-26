const approvedNodeVersion = "v26.13.1";
const approvedPnpmVersion = "12.23.0";

if (process.version !== approvedNodeVersion) {
  throw new Error(
    `Node.js ${approvedNodeVersion.slice(1)} is required; received ${process.version.slice(1)}.`,
  );
}

const userAgent = process.env.npm_config_user_agent ?? "";
const pnpmMatch = userAgent.match(/pnpm\/([^\s]+)/u);

if (!pnpmMatch || pnpmMatch[1] !== approvedPnpmVersion) {
  throw new Error(`pnpm ${approvedPnpmVersion} is required for dependency installation.`);
}

console.log(`Verified Node.js ${process.version.slice(1)} and pnpm ${approvedPnpmVersion}.`);
