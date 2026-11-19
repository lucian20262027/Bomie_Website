import { NextResponse } from 'next/server';
import {
  buildCreatorPlan,
  buildCustomMerchantPlan,
  scoreCreatorCandidate,
} from '../../../lib/sandboxEngine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mode = body?.mode === 'creator' ? 'creator' : 'merchant';
    const prompt = String(body?.prompt || '').trim();

    if (!prompt) {
      return NextResponse.json({ ok: false, error: 'Prompt is required.' }, { status: 400 });
    }

    const merchantFallback =
      mode === 'merchant'
        ? { ...buildCustomMerchantPlan(prompt), aiSource: 'scientific-engine' as const }
        : null;
    const creatorFallback = mode === 'creator' ? buildCreatorPlan(prompt) : null;
    const fallback = merchantFallback ?? creatorFallback!;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: true, source: 'scientific-engine', plan: fallback });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    try {
      const systemInstruction =
        mode === 'merchant'
          ? `You are Bomie AI Commerce OS. Given a local business prompt, return valid JSON matching this exact structure:
{
  "title": "Category · City Campaign",
  "city": "City, State or Country",
  "category": "Short Vertical Name",
  "baseBudget": number (between 200 and 5000),
  "baseRoas": number (between 2.8 and 4.6),
  "creators": [
    { "id": "c1", "handle": "@realistic_handle", "niche": "Niche", "distance": "0.7 mi away", "distanceMiles": 0.7, "followers": "32.4K", "localAudiencePct": 76, "engagementRate": "5.3%", "authenticityScore": 97, "semanticFit": 0.97, "weight": 0.40 },
    { "id": "c2", "handle": "@realistic_handle2", "niche": "Niche", "distance": "1.3 mi away", "distanceMiles": 1.3, "followers": "21.8K", "localAudiencePct": 72, "engagementRate": "4.9%", "authenticityScore": 95, "semanticFit": 0.94, "weight": 0.33 },
    { "id": "c3", "handle": "@realistic_handle3", "niche": "Niche", "distance": "1.9 mi away", "distanceMiles": 1.9, "followers": "15.6K", "localAudiencePct": 69, "engagementRate": "5.1%", "authenticityScore": 94, "semanticFit": 0.92, "weight": 0.27 }
  ],
  "hookTemplate": "Engaging 30s Reel hook mentioning {PROMO}",
  "shots": ["0-3s: ...", "3-18s: ...", "18-30s: ... {PROMO} ..."]
}`
          : `You are Bomie AI Creator Copilot. Given a creator prompt, return valid JSON matching this exact structure:
{
  "handle": "@handle · City",
  "city": "City",
  "nicheLabel": "Short Niche Name",
  "offers": [
    { "id": "o1", "merchant": "Realistic Local Business 1", "distance": "0.8 mi away", "pay": 480, "perk": "+ Free Perk", "deliverable": "1x 30s Reel" },
    { "id": "o2", "merchant": "Realistic Local Business 2", "distance": "1.4 mi away", "pay": 390, "perk": "+ Guest Experience", "deliverable": "1x 25s Vlog" }
  ],
  "hooks": {
    "vlog": "30s vlog hook",
    "asmr": "ASMR hook",
    "top3": "Top 3 local spots hook"
  }
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.4,
            },
          }),
        }
      );

      clearTimeout(timeout);

      if (!res.ok) {
        return NextResponse.json({ ok: true, source: 'scientific-engine', plan: fallback });
      }

      const json = await res.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        return NextResponse.json({ ok: true, source: 'scientific-engine', plan: fallback });
      }

      const parsed = JSON.parse(rawText);

      if (mode === 'merchant' && merchantFallback && Array.isArray(parsed?.creators)) {
        const scoredCreators = parsed.creators.slice(0, 3).map((c: Record<string, unknown>, idx: number) => {
          const distMiles = Number(c.distanceMiles ?? 1.2);
          const localPct = Number(c.localAudiencePct ?? 72);
          const authScore = Number(c.authenticityScore ?? 96);
          const semFit = Number(c.semanticFit ?? 0.94);
          return {
            id: String(c.id || `c${idx + 1}`),
            handle: String(c.handle || '@local_creator'),
            niche: String(c.niche || 'Local Storytelling'),
            distance: String(c.distance || `${distMiles} mi away`),
            distanceMiles: distMiles,
            followers: String(c.followers || '24.5K'),
            localAudiencePct: localPct,
            engagementRate: String(c.engagementRate || '5.0%'),
            authenticityScore: authScore,
            match: scoreCreatorCandidate(semFit, distMiles, localPct, authScore),
            weight: Number(c.weight ?? (idx === 0 ? 0.39 : idx === 1 ? 0.33 : 0.28)),
          };
        });

        return NextResponse.json({
          ok: true,
          source: 'gemini-live',
          plan: {
            title: String(parsed.title || merchantFallback.title),
            city: String(parsed.city || merchantFallback.city),
            category: String(parsed.category || merchantFallback.category),
            baseBudget: Math.max(200, Math.min(5000, Number(parsed.baseBudget || merchantFallback.baseBudget))),
            baseRoas: Math.max(2.6, Math.min(4.6, Number(parsed.baseRoas || merchantFallback.baseRoas))),
            creators: scoredCreators,
            hookTemplate: String(parsed.hookTemplate || merchantFallback.hookTemplate),
            shots: Array.isArray(parsed.shots) ? parsed.shots.map(String) : merchantFallback.shots,
            aiSource: 'gemini-live',
          },
        });
      }

      if (mode === 'creator' && Array.isArray(parsed?.offers)) {
        return NextResponse.json({
          ok: true,
          source: 'gemini-live',
          plan: {
            handle: String(parsed.handle || (fallback as ReturnType<typeof buildCreatorPlan>).handle),
            city: String(parsed.city || fallback.city),
            nicheLabel: String(parsed.nicheLabel || 'Local Creator'),
            offers: parsed.offers.slice(0, 2).map((o: Record<string, unknown>, idx: number) => ({
              id: String(o.id || `o${idx + 1}`),
              merchant: String(o.merchant || 'Local Business'),
              distance: String(o.distance || '1.1 mi away'),
              pay: Math.max(150, Math.min(2000, Number(o.pay || 420))),
              perk: String(o.perk || '+ Free Experience'),
              deliverable: String(o.deliverable || '1x 30s Reel'),
            })),
            hooks: parsed.hooks || (fallback as ReturnType<typeof buildCreatorPlan>).hooks,
          },
        });
      }

      return NextResponse.json({ ok: true, source: 'scientific-engine', plan: fallback });
    } catch {
      clearTimeout(timeout);
      return NextResponse.json({ ok: true, source: 'scientific-engine', plan: fallback });
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
