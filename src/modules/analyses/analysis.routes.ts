import type { FastifyInstance } from "fastify";
import {
  createAnalysisSchema,
  getAnalysisParamsSchema,
  listAnalysesQuerySchema,
} from "./analysis.schemas.js";
import {
  createAnalysis,
  deleteAnalysisById,
  getAnalysisById,
  listAnalyses,
} from "./analysis.service.js";

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

    const records = await listAnalyses(parsed.data.limit);

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

    const record = await getAnalysisById(parsed.data.id);

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

    const createdAnalysis = await createAnalysis(parsed.data);

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

    const deletedAnalysis = await deleteAnalysisById(parsed.data.id);

    if (!deletedAnalysis) {
      return reply.code(404).send({
        message: "Analysis not found",
      });
    }

    return reply.code(204).send();
  });
}
