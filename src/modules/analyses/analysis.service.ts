import { desc, eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { analyses } from "../../db/schema.js";
import { analyzeCallTranscript } from "./analysis.engine.js";
import type { CreateAnalysisInput } from "./analysis.schemas.js";

export async function listAnalyses(limit: number) {
  return db
    .select()
    .from(analyses)
    .orderBy(desc(analyses.createdAt))
    .limit(limit);
}

export async function getAnalysisById(id: string) {
  const [record] = await db
    .select()
    .from(analyses)
    .where(eq(analyses.id, id))
    .limit(1);

  return record ?? null;
}

export async function createAnalysis(input: CreateAnalysisInput) {
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

  return createdAnalysis;
}

export async function deleteAnalysisById(id: string) {
  const [deletedAnalysis] = await db
    .delete(analyses)
    .where(eq(analyses.id, id))
    .returning({
      id: analyses.id,
    });

  return deletedAnalysis ?? null;
}
