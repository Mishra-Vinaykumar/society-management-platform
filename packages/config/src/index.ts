export const approvedToolchain = Object.freeze({
  node: "26.13.1",
  pnpm: "12.23.0",
});

export const defaultPorts = Object.freeze({
  web: 3000,
  api: 4000,
});

export const runtimeEnvironments = ["development", "test", "production"] as const;

export type RuntimeEnvironment = (typeof runtimeEnvironments)[number];

export function isRuntimeEnvironment(value: string): value is RuntimeEnvironment {
  return runtimeEnvironments.includes(value as RuntimeEnvironment);
}
