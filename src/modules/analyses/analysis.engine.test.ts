import { describe, expect, it } from "vitest";
import { analyzeCallTranscript } from "./analysis.engine.js";

describe("analyzeCallTranscript", () => {
  it("returns high urgency and high risk for urgent frustrated callers", () => {
    const transcript =
      "Hi, I called yesterday and nobody called me back. This is urgent and I need help as soon as possible.";

    const result = analyzeCallTranscript(transcript);

    expect(result.sentiment).toBe("negative");
    expect(result.urgency).toBe("high");
    expect(result.riskLevel).toBe("high");
    expect(result.summary).toContain("urgent follow-up");
    expect(result.actionItems).toContain(
      "Return the caller's call as soon as possible",
    );
  });

  it("returns positive sentiment when the caller uses appreciative language", () => {
    const transcript =
      "Thank you for calling me back. I appreciate the help and everything has been great.";

    const result = analyzeCallTranscript(transcript);

    expect(result.sentiment).toBe("positive");
    expect(result.riskLevel).toBe("low");
  });

  it("returns low urgency and low risk for routine calls", () => {
    const transcript =
      "I am calling to ask a general question about my account and would like someone to contact me when available.";

    const result = analyzeCallTranscript(transcript);

    expect(result.sentiment).toBe("neutral");
    expect(result.urgency).toBe("low");
    expect(result.riskLevel).toBe("low");
  });
});
