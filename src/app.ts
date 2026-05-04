import Fastify from "fastify";
import { analysisRoutes } from "./modules/analyses/analysis.routes.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.get("/health", async () => {
    return {
      status: "ok",
      service: "ai-call-analysis-api-node",
      timestamp: new Date().toISOString(),
    };
  });

  app.register(analysisRoutes, {
    prefix: "/api/analyses",
  });

  return app;
}
