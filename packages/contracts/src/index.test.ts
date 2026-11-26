import { describe, expect, it } from "vitest";

import { healthResponseSchema, problemDetailsSchema } from "./index.js";

describe("API contracts", () => {
  it("accepts a valid health response", () => {
    expect(
      healthResponseSchema.parse({
        status: "ok",
        service: "society-management-api",
        version: "0.1.0",
        timestamp: "2026-11-26T12:00:00.000Z",
      }),
    ).toBeDefined();
  });

  it("rejects an incomplete problem response", () => {
    expect(() => problemDetailsSchema.parse({ status: 500 })).toThrow();
  });
});
