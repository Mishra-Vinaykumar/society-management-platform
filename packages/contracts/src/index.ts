import { z } from "zod";

export const apiVersion = "1" as const;

export const healthResponseSchema = z
  .object({
    status: z.literal("ok"),
    service: z.literal("society-management-api"),
    version: z.string().min(1),
    timestamp: z.iso.datetime(),
  })
  .strict();

export type HealthResponse = z.infer<typeof healthResponseSchema>;

export const problemDetailIssueSchema = z
  .object({
    field: z.string().min(1).optional(),
    code: z.string().min(1),
    message: z.string().min(1),
  })
  .strict();

export const problemDetailsSchema = z
  .object({
    type: z.string().min(1),
    title: z.string().min(1),
    status: z.number().int().min(400).max(599),
    code: z.string().min(1),
    detail: z.string().min(1),
    instance: z.string().min(1),
    requestId: z.string().min(1),
    errors: z.array(problemDetailIssueSchema).optional(),
  })
  .strict();

export type ProblemDetails = z.infer<typeof problemDetailsSchema>;
