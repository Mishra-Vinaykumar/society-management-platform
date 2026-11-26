import { spawn } from "node:child_process";
import { resolve } from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";

const repositoryRoot = process.cwd();
const startupTimeoutMilliseconds = 120_000;

function startNodeProcess(argumentsList) {
  return spawn(process.execPath, argumentsList, {
    cwd: repositoryRoot,
    env: process.env,
    stdio: ["ignore", "inherit", "inherit"],
  });
}

async function waitForUrl(url, childProcess) {
  const deadline = Date.now() + startupTimeoutMilliseconds;

  while (Date.now() < deadline) {
    if (childProcess.exitCode !== null) {
      throw new Error(`Server exited before becoming ready: ${url}`);
    }

    try {
      const response = await fetch(url);

      if (response.ok) {
        return;
      }
    } catch {
      // The server may still be starting.
    }

    await delay(250);
  }

  throw new Error(`Timed out waiting for server: ${url}`);
}

async function runPlaywright() {
  const cliPath = resolve(repositoryRoot, "node_modules", "@playwright", "test", "cli.js");
  const childProcess = startNodeProcess([cliPath, "test"]);

  return new Promise((resolveExitCode, reject) => {
    childProcess.once("error", reject);
    childProcess.once("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`Playwright exited after signal ${signal}.`));
        return;
      }

      resolveExitCode(code ?? 1);
    });
  });
}

async function stopProcess(childProcess) {
  if (childProcess.exitCode !== null) {
    return;
  }

  const closed = new Promise((resolveClose) => {
    childProcess.once("close", resolveClose);
  });

  childProcess.kill();
  await Promise.race([closed, delay(2_000)]);

  if (childProcess.exitCode === null) {
    childProcess.kill("SIGKILL");
    await closed;
  }
}

const apiProcess = startNodeProcess(["apps/api/dist/main.js"]);
const webProcess = startNodeProcess([
  resolve(repositoryRoot, "apps", "web", "node_modules", "next", "dist", "bin", "next"),
  "start",
  "apps/web",
  "--hostname",
  "127.0.0.1",
  "--port",
  "3000",
]);

try {
  await Promise.all([
    waitForUrl("http://127.0.0.1:4000/api/v1/health", apiProcess),
    waitForUrl("http://127.0.0.1:3000", webProcess),
  ]);

  process.exitCode = await runPlaywright();
} finally {
  await Promise.all([stopProcess(apiProcess), stopProcess(webProcess)]);
}
