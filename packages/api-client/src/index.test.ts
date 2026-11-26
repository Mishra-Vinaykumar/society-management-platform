import { describe, expect, it, vi } from "vitest";

import { ApiClient, type HttpTransport } from "./index.js";

describe("ApiClient", () => {
  it("uses an injected platform transport and validates the health response", async () => {
    const transport: HttpTransport = vi.fn().mockResolvedValue({
      body: {
        status: "ok",
        service: "society-management-api",
        version: "0.1.0",
        timestamp: "2026-11-26T12:00:00.000Z",
      },
      status: 200,
    });
    const client = new ApiClient({
      baseUrl: "http://localhost:4000/api/v1/",
      transport,
    });

    await expect(client.getHealth()).resolves.toMatchObject({ status: "ok" });
    expect(transport).toHaveBeenCalledWith({
      headers: { accept: "application/json" },
      method: "GET",
      url: "http://localhost:4000/api/v1/health",
    });
  });
});
