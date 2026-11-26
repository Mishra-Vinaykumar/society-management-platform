import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module.js";
import { configureApplication, configureOpenApi } from "./app.setup.js";
import type { Environment } from "./config/environment.js";

const logger = new Logger("Bootstrap");

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { abortOnError: true });

  configureApplication(app);
  configureOpenApi(app);

  const configService = app.get(ConfigService<Environment, true>);
  const port = configService.getOrThrow("API_PORT", { infer: true });

  await app.listen(port, "127.0.0.1");
  logger.log(`API listening on http://127.0.0.1:${port}`);
}

bootstrap().catch((error: unknown) => {
  logger.error("API failed to start.", error instanceof Error ? error.stack : undefined);
  process.exitCode = 1;
});
