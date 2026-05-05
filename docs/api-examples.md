# API Examples

Base URL for local development:

```txt
http://localhost:4000
```

## Health Check

```bash
curl http://localhost:4000/health
```

Example response:

```json
{
  "status": "ok",
  "service": "ai-call-analysis-api-node",
  "timestamp": "2026-05-05T17:00:00.000Z"
}
```

---

## Create Analysis

```bash
curl -X POST http://localhost:4000/api/analyses \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Jane Smith",
    "callerPhone": "555-123-4567",
    "transcript": "Hi, I called yesterday and nobody called me back. This is urgent and I need help as soon as possible."
  }'
```

Example response:

```json
{
  "analysis": {
    "id": "00000000-0000-0000-0000-000000000000",
    "customerName": "Jane Smith",
    "callerPhone": "555-123-4567",
    "transcript": "Hi, I called yesterday and nobody called me back. This is urgent and I need help as soon as possible.",
    "summary": "Caller may require urgent follow-up due to frustration, urgency, or lack of response.",
    "sentiment": "negative",
    "urgency": "high",
    "riskLevel": "high",
    "recommendedFollowUp": "Prioritize immediate callback and acknowledge the caller's concern.",
    "actionItems": [
      "Return the caller's call as soon as possible",
      "Review prior contact attempts",
      "Escalate if the caller cannot be reached"
    ],
    "createdAt": "2026-05-05T17:00:00.000Z",
    "updatedAt": "2026-05-05T17:00:00.000Z"
  }
}
```

---

## List Analyses

```bash
curl http://localhost:4000/api/analyses
```

With limit:

```bash
curl "http://localhost:4000/api/analyses?limit=10"
```

Example response:

```json
{
  "analyses": [
    {
      "id": "00000000-0000-0000-0000-000000000000",
      "customerName": "Jane Smith",
      "callerPhone": "555-123-4567",
      "transcript": "Hi, I called yesterday and nobody called me back. This is urgent and I need help as soon as possible.",
      "summary": "Caller may require urgent follow-up due to frustration, urgency, or lack of response.",
      "sentiment": "negative",
      "urgency": "high",
      "riskLevel": "high",
      "recommendedFollowUp": "Prioritize immediate callback and acknowledge the caller's concern.",
      "actionItems": [
        "Return the caller's call as soon as possible",
        "Review prior contact attempts",
        "Escalate if the caller cannot be reached"
      ],
      "createdAt": "2026-05-05T17:00:00.000Z",
      "updatedAt": "2026-05-05T17:00:00.000Z"
    }
  ]
}
```

---

## Get Analysis by ID

```bash
curl http://localhost:4000/api/analyses/YOUR_ANALYSIS_ID
```

Example:

```bash
curl http://localhost:4000/api/analyses/00000000-0000-0000-0000-000000000000
```

Example response:

```json
{
  "analysis": {
    "id": "00000000-0000-0000-0000-000000000000",
    "customerName": "Jane Smith",
    "callerPhone": "555-123-4567",
    "transcript": "Hi, I called yesterday and nobody called me back. This is urgent and I need help as soon as possible.",
    "summary": "Caller may require urgent follow-up due to frustration, urgency, or lack of response.",
    "sentiment": "negative",
    "urgency": "high",
    "riskLevel": "high",
    "recommendedFollowUp": "Prioritize immediate callback and acknowledge the caller's concern.",
    "actionItems": [
      "Return the caller's call as soon as possible",
      "Review prior contact attempts",
      "Escalate if the caller cannot be reached"
    ],
    "createdAt": "2026-05-05T17:00:00.000Z",
    "updatedAt": "2026-05-05T17:00:00.000Z"
  }
}
```

---

## Delete Analysis

```bash
curl -i -X DELETE http://localhost:4000/api/analyses/YOUR_ANALYSIS_ID
```

Expected response:

```txt
HTTP/1.1 204 No Content
```

After deleting, listing analyses may return:

```json
{
  "analyses": []
}
```