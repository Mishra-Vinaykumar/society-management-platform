import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { healthResponseSchema, problemDetailsSchema } from "@society/contracts";
import request from "supertest";

import { AppModule } from "../src/app.module.js";
import { configureApplication, configureOpenApi } from "../src/app.setup.js";

describe("API foundation", () => {
  let app: INestApplication;

  function getHttpServer(): Server {
    return app.getHttpServer() as Server;
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApplication(app);
    configureOpenApi(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns a successful versioned health response", async () => {
    const response = await request(getHttpServer()).get("/api/v1/health").expect(200);

    expect(healthResponseSchema.parse(response.body)).toMatchObject({ status: "ok" });
  });

  it("publishes the OpenAPI document", async () => {
    const response = await request(getHttpServer()).get("/docs-json").expect(200);

    const document = response.body as { info?: { title?: unknown } };
    expect(document.info?.title).toBe("Society Management Platform API");
  });

  it("returns consistent problem details for missing routes", async () => {
    const response = await request(getHttpServer()).get("/api/v1/missing").expect(404);

    expect(problemDetailsSchema.parse(response.body)).toMatchObject({
      code: "HTTP_404",
      status: 404,
    });
  });
});
import type { Server } from "node:http";
