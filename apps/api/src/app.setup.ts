import { ValidationPipe, VersioningType, type INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiVersion } from "@society/contracts";

import { ProblemDetailsFilter } from "./common/http/problem-details.filter.js";
import type { Environment } from "./config/environment.js";

export function configureApplication(app: INestApplication): void {
  const configService = app.get(ConfigService<Environment, true>);

  app.setGlobalPrefix("api");
  app.enableVersioning({
    defaultVersion: apiVersion,
    type: VersioningType.URI,
  });
  app.enableCors({
    credentials: true,
    origin: configService.getOrThrow("WEB_ORIGIN", { infer: true }),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new ProblemDetailsFilter());
  app.enableShutdownHooks();
}

export function configureOpenApi(app: INestApplication): void {
  const openApiConfig = new DocumentBuilder()
    .setTitle("Society Management Platform API")
    .setDescription("REST API foundation for the Society Management Platform.")
    .setVersion("0.1.0")
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);

  SwaggerModule.setup("docs", app, document, {
    jsonDocumentUrl: "docs-json",
  });
}
