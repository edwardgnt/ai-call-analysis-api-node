type Sentiment = "positive" | "neutral" | "negative";
type Urgency = "low" | "medium" | "high";
type RiskLevel = "low" | "medium" | "high";

type AnalysisResult = {
  summary: string;
  sentiment: Sentiment;
  urgency: Urgency;
  riskLevel: RiskLevel;
  recommendedFollowUp: string;
  actionItems: string[];
};

export function analyzeCallTranscript(transcript: string): AnalysisResult {
  const text = transcript.toLowerCase();

  const hasHighUrgency =
    text.includes("urgent") ||
    text.includes("as soon as possible") ||
    text.includes("asap") ||
    text.includes("emergency") ||
    text.includes("right away");

  const hasFrustration =
    text.includes("frustrated") ||
    text.includes("upset") ||
    text.includes("angry") ||
    text.includes("nobody called") ||
    text.includes("no one called") ||
    text.includes("no response");

  const hasPositiveTone =
    text.includes("thank you") ||
    text.includes("thanks") ||
    text.includes("appreciate") ||
    text.includes("great");

  const sentiment: Sentiment = hasFrustration
    ? "negative"
    : hasPositiveTone
      ? "positive"
      : "neutral";

  const urgency: Urgency = hasHighUrgency
    ? "high"
    : text.includes("call back") ||
        text.includes("follow up") ||
        text.includes("soon")
      ? "medium"
      : "low";

  const riskLevel: RiskLevel =
    hasHighUrgency || hasFrustration
      ? "high"
      : urgency === "medium"
        ? "medium"
        : "low";

  const summary =
    riskLevel === "high"
      ? "Caller may require urgent follow-up due to frustration, urgency, or lack of response."
      : urgency === "medium"
        ? "Caller appears to need timely follow-up related to their request."
        : "Caller request appears routine and can be handled through normal follow-up workflow.";

  const recommendedFollowUp =
    riskLevel === "high"
      ? "Prioritize immediate callback and acknowledge the caller's concern."
      : urgency === "medium"
        ? "Follow up within the next business day."
        : "Handle through the standard follow-up process.";

  const actionItems =
    riskLevel === "high"
      ? [
          "Return the caller's call as soon as possible",
          "Review prior contact attempts",
          "Escalate if the caller cannot be reached",
        ]
      : [
          "Create a follow-up task",
          "Review the caller's request",
          "Document the outcome after contact",
        ];

  return {
    summary,
    sentiment,
    urgency,
    riskLevel,
    recommendedFollowUp,
    actionItems,
  };
}
