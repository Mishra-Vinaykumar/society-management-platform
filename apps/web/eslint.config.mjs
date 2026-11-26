import { baseConfig } from "@society/config/eslint/base";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...baseConfig,
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "next-env.d.ts"],
  },
];

export default config;
