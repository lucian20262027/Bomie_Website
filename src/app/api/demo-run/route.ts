import { NextResponse } from 'next/server';
import { evaluateCampaignDemo } from '../../../lib/demoEngine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const businessName = String(body?.businessName || 'Local Storefront').trim();
    const city = String(body?.city || 'San Francisco, CA').trim();
    const category = String(body?.category || 'Local Business').trim();
    const budget = Number(body?.budget || 1800);
    const timelineDays = Number(body?.timelineDays || 5);
    const targetTier = String(body?.targetTier || '2K–50K Local Creators').trim();
    const brief = String(body?.brief || '').trim();

    if (!brief) {
      return NextResponse.json(
        { ok: false, error: 'Campaign brief is required.' },
        { status: 400 }
      );
    }

    const fallback = evaluateCampaignDemo({
      businessName,
      city,
      category,
      budget,
      timelineDays,
      targetTier,
      brief,
    });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: true, result: fallback });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3800);

    try {
      const systemInstruction = `You are Bomie AI's Pre-Flight Governance & Campaign Orchestration Engine for local U.S. small businesses.
Evaluate the merchant campaign strictly for:
1) FTC 16 CFR Part 255 (§ 255.5) #ad disclosure violations or unsubstantiated medical/efficacy claims -> if violated, gateStatus MUST be "FLAGGED" and riskScore >= 75.
2) Severe budget-to-creator-tier mismatch (e.g., <$300 for 500K+ macro creators or multi-minute documentaries) -> gateStatus MUST be "MISMATCH" and riskScore 55-74.
3) Compliant realistic hyper-local campaigns -> gateStatus "PASS" and riskScore <= 25.

Return valid JSON only with fields:
{
  "gateStatus": "PASS" | "FLAGGED" | "MISMATCH",
  "riskScore": number,
  "readinessScore": number,
  "verdictTitle": "short uppercase status title",
  "verdictSummary": "1-2 sentence audit rationale",
  "scriptHook": "concise 30s Reel hook including #Ad and {QR}",
  "projectedRoas": "e.g. 3.6×"
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `Business: ${businessName}\nCity: ${city}\nCategory: ${category}\nBudget: $${budget}\nTimeline: ${timelineDays} days\nTarget Tier: ${targetTier}\nBrief: ${brief}`,
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          }),
        }
      );

      clearTimeout(timeout);
      if (!res.ok) {
        return NextResponse.json({ ok: true, result: fallback });
      }

      const json = await res.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        return NextResponse.json({ ok: true, result: fallback });
      }

      const parsed = JSON.parse(rawText);
      const validGate =
        parsed.gateStatus === 'PASS' ||
        parsed.gateStatus === 'FLAGGED' ||
        parsed.gateStatus === 'MISMATCH'
          ? parsed.gateStatus
          : fallback.gateStatus;

      return NextResponse.json({
        ok: true,
        result: {
          ...fallback,
          gateStatus: validGate,
          riskScore: Number.isFinite(Number(parsed.riskScore))
            ? Math.max(5, Math.min(99, Number(parsed.riskScore)))
            : fallback.riskScore,
          readinessScore: Number.isFinite(Number(parsed.readinessScore))
            ? Math.max(10, Math.min(99, Number(parsed.readinessScore)))
            : fallback.readinessScore,
          verdictTitle: String(parsed.verdictTitle || fallback.verdictTitle),
          verdictSummary: String(parsed.verdictSummary || fallback.verdictSummary),
          scriptHook: String(parsed.scriptHook || fallback.scriptHook),
          projectedRoas: String(parsed.projectedRoas || fallback.projectedRoas),
          aiEngine: 'gemini-live',
        },
      });
    } catch {
      clearTimeout(timeout);
      return NextResponse.json({ ok: true, result: fallback });
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
