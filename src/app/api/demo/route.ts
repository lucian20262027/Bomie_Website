import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const handle = String(body?.handle || '').trim();
    const city = String(body?.city || '').trim();

    if (!name || !email || !handle || !city) {
      return NextResponse.json(
        { ok: false, error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const leadId = `BOMIE-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    // Always emit structured lead record to Vercel Runtime Logs
    console.log(
      JSON.stringify({
        event: 'DEMO_REQUEST_LEAD',
        leadId,
        name,
        email,
        handle,
        city,
        timestamp,
      })
    );

    // Optional: forward to Resend if RESEND_API_KEY is configured in Vercel
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Bomie AI Leads <onboarding@resend.dev>',
          to: ['lucian.wang@bomie.ai'],
          subject: `[Bomie AI Demo Lead] ${handle} (${city}) — ${name}`,
          text: `Lead ID: ${leadId}\nName: ${name}\nEmail: ${email}\nBusiness/Handle: ${handle}\nCity: ${city}\nTime: ${timestamp}`,
        }),
      }).catch((err) => console.error('Resend forward error:', err));
    }

    // Optional: forward to Slack / Discord / Zapier webhook if DEMO_WEBHOOK_URL is configured
    const webhookUrl = process.env.DEMO_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚀 New Bomie AI Demo Request (${leadId})\n• Name: ${name}\n• Email: ${email}\n• Handle: ${handle}\n• City: ${city}`,
        }),
      }).catch((err) => console.error('Webhook forward error:', err));
    }

    return NextResponse.json({
      ok: true,
      leadId,
      receivedAt: timestamp,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload.' },
      { status: 400 }
    );
  }
}
