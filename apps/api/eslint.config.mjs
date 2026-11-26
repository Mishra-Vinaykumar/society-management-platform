import { baseConfig, nodeGlobals } from "@society/config/eslint/base";

export default [
  ...baseConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: nodeGlobals,
    },
  },
  {
    files: ["**/*.cjs"],
    languageOptions: {
      globals: nodeGlobals,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
