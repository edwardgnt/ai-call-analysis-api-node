import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../../db/client.js";
import { analyses } from "../../db/schema.js";
import { analyzeCallTranscript } from "./analysis.engine.js";
import { desc, eq } from "drizzle-orm";

const createAnalysisSchema = z.object({
  customerName: z.string().trim().min(1).max(100),
  callerPhone: z.string().trim().max(30).optional(),
  transcript: z.string().trim().min(20).max(10000),
});

const listAnalysesQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

const getAnalysisParamsSchema = z.object({
  id: z.uuid(),
});

export async function analysisRoutes(app: FastifyInstance) {
  // GET /api/analyses
  app.get("/", async (request, reply) => {
    const parsed = listAnalysesQuerySchema.safeParse(request.query);

    if (!parsed.success) {
      return reply.code(400).send({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const records = await db
      .select()
      .from(analyses)
      .orderBy(desc(analyses.createdAt))
      .limit(parsed.data.limit);

    return reply.send({
      analyses: records,
    });
  });

  // GET /api/analyses/:id
  app.get("/:id", async (request, reply) => {
    const parsed = getAnalysisParamsSchema.safeParse(request.params);

    if (!parsed.success) {
      return reply.code(400).send({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const [record] = await db
      .select()
      .from(analyses)
      .where(eq(analyses.id, parsed.data.id))
      .limit(1);

    if (!record) {
      return reply.code(404).send({
        message: "Analysis not found",
      });
    }

    return reply.send({
      analysis: record,
    });
  });

  // POST /api/analyses
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

  // DELETE /api/analyses/:id
  app.delete("/:id", async (request, reply) => {
    const parsed = getAnalysisParamsSchema.safeParse(request.params);

    if (!parsed.success) {
      return reply.code(400).send({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const [deletedAnalysis] = await db
      .delete(analyses)
      .where(eq(analyses.id, parsed.data.id))
      .returning({
        id: analyses.id,
      });

    if (!deletedAnalysis) {
      return reply.code(404).send({
        message: "Analysis not found",
      });
    }

    return reply.code(204).send();
  });
}
