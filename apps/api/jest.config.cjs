module.exports = {
  collectCoverageFrom: ["src/**/*.ts", "!src/main.ts"],
  coverageDirectory: "coverage",
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".*\\.(spec|e2e-spec)\\.ts$",
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        useESM: true,
      },
    ],
  },
};
