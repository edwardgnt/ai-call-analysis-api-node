![CI](https://github.com/edwardgnt/ai-call-analysis-api-node/actions/workflows/ci.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-API-000000?logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

## Overview

AI Call Analysis API is a production-style Node.js and TypeScript backend for analyzing call transcripts and returning structured business insights.

The API accepts call transcript data, runs deterministic mock AI-style analysis logic, stores the result in PostgreSQL, and returns structured insights such as sentiment, urgency, risk level, summary, recommended follow-up, and action items.

The initial version uses mock analysis logic to keep the project cost-free, predictable, and easy to test, while keeping the architecture open for a future OpenAI-powered analysis provider.


## What the App Does

- Accepts call transcript submissions
- Analyzes transcript text for urgency, sentiment, and follow-up risk
- Generates a structured summary and recommended next steps
- Stores analysis results in PostgreSQL
- Provides endpoints to create, list, retrieve, and delete analyses


## Tech Stack

| Area | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| API Framework | Fastify |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Validation | Zod |
| Local Infrastructure | Docker Compose |
| CI | GitHub Actions |
| Development Runtime | tsx |
| Production Build | TypeScript compiler |


## Testing

Run the test suite:

```bash
npm test


## API Examples

See [docs/api-examples.md](docs/api-examples.md) for sample curl requests and response examples.