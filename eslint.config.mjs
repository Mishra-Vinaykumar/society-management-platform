import { baseConfig } from "@society/config/eslint/base";

export default [
  ...baseConfig,
  {
    ignores: [
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/.turbo/**",
      "**/playwright-report/**",
      "**/test-results/**",
    ],
  },
];
