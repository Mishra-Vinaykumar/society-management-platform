import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { HealthResponse } from "@society/contracts";

import { HealthService } from "./health.service.js";

@ApiTags("health")
@Controller({ path: "health", version: "1" })
export class HealthController {
  public constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: "Report API health" })
  @ApiOkResponse({
    description: "The API process is healthy.",
    schema: {
      example: {
        status: "ok",
        service: "society-management-api",
        version: "0.1.0",
        timestamp: "2026-11-26T12:00:00.000Z",
      },
      required: ["status", "service", "version", "timestamp"],
      type: "object",
    },
  })
  public getHealth(): HealthResponse {
    return this.healthService.getStatus();
  }
}
