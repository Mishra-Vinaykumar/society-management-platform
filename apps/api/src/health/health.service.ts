import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { HealthResponse } from "@society/contracts";

import type { Environment } from "../config/environment.js";

@Injectable()
export class HealthService {
  public constructor(private readonly configService: ConfigService<Environment, true>) {}

  public getStatus(): HealthResponse {
    return {
      status: "ok",
      service: "society-management-api",
      version: this.configService.getOrThrow("APP_VERSION", { infer: true }),
      timestamp: new Date().toISOString(),
    };
  }
}
