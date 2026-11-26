import { describe, expect, it } from "vitest";

import { approvedToolchain, defaultPorts, isRuntimeEnvironment } from "./index.js";

describe("shared configuration", () => {
  it("exposes the approved toolchain and local ports", () => {
    expect(approvedToolchain).toEqual({ node: "26.13.1", pnpm: "12.23.0" });
    expect(defaultPorts).toEqual({ web: 3000, api: 4000 });
  });

  it("recognises supported runtime environments", () => {
    expect(isRuntimeEnvironment("development")).toBe(true);
    expect(isRuntimeEnvironment("preview")).toBe(false);
  });
});
