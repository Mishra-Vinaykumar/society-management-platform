import { defaultPorts, runtimeEnvironments } from "@society/config";
import { z } from "zod";

const environmentSchema = z.object({
  API_PORT: z.coerce.number().int().min(1024).max(65_535).default(defaultPorts.api),
  APP_VERSION: z.string().min(1).default("0.1.0"),
  NODE_ENV: z.enum(runtimeEnvironments).default("development"),
  WEB_ORIGIN: z.url().default("http://localhost:3000"),
});

export type Environment = z.infer<typeof environmentSchema>;

export function validateEnvironment(configuration: Record<string, unknown>): Environment {
  const parsed = environmentSchema.safeParse(configuration);

  if (!parsed.success) {
    const fields = Object.keys(parsed.error.flatten().fieldErrors).join(", ");
    throw new Error(`Invalid environment configuration for: ${fields || "unknown fields"}.`);
  }

  return parsed.data;
}
