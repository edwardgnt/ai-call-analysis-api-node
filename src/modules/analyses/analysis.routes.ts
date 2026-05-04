import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../../db/client.js";
import { analyses } from "../../db/schema.js";
import { analyzeCallTranscript } from "./analysis.engine.js";

const createAnalysisSchema = z.object({
  customerName: z.string().trim().min(1).max(100),
  callerPhone: z.string().trim().max(30).optional(),
  transcript: z.string().trim().min(20).max(10000),
});

export async function analysisRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const parsed = createAnalysisSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const input = parsed.data;
    const analysis = analyzeCallTranscript(input.transcript);

    const [createdAnalysis] = await db
      .insert(analyses)
      .values({
        customerName: input.customerName,
        callerPhone: input.callerPhone ?? null,
        transcript: input.transcript,
        summary: analysis.summary,
        sentiment: analysis.sentiment,
        urgency: analysis.urgency,
        riskLevel: analysis.riskLevel,
        recommendedFollowUp: analysis.recommendedFollowUp,
        actionItems: analysis.actionItems,
      })
      .returning();

    return reply.code(201).send({
      analysis: createdAnalysis,
    });
  });
}
