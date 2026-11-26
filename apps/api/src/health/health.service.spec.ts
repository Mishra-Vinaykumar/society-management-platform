import { ConfigModule } from "@nestjs/config";
import { Test, type TestingModule } from "@nestjs/testing";

import { HealthService } from "./health.service.js";

describe("HealthService", () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          isGlobal: true,
          load: [() => ({ APP_VERSION: "0.1.0" })],
        }),
      ],
      providers: [HealthService],
    }).compile();

    service = module.get(HealthService);
  });

  it("returns a contract-compatible healthy status", () => {
    expect(service.getStatus()).toMatchObject({
      status: "ok",
      service: "society-management-api",
      version: "0.1.0",
    });
  });
});
