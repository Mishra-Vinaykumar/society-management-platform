import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { validateEnvironment } from "./config/environment.js";
import { HealthModule } from "./health/health.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [".env.local", "../../.env.local"],
      isGlobal: true,
      validate: validateEnvironment,
    }),
    HealthModule,
  ],
})
export class AppModule {}
