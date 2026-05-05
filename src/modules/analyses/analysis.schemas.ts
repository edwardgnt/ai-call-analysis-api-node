import { z } from "zod";

export const createAnalysisSchema = z.object({
  customerName: z.string().trim().min(1).max(100),
  callerPhone: z.string().trim().max(30).optional(),
  transcript: z.string().trim().min(20).max(10000),
});

export const listAnalysesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

export const getAnalysisParamsSchema = z.object({
  id: z.uuid(),
});

export type CreateAnalysisInput = z.infer<typeof createAnalysisSchema>;
export type ListAnalysesQuery = z.infer<typeof listAnalysesQuerySchema>;
export type GetAnalysisParams = z.infer<typeof getAnalysisParamsSchema>;
