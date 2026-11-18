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

    // Always attempt zero-config email delivery to lucian.wang@bomie.ai via FormSubmit AJAX
    let emailDispatched = false;
    try {
      const formSubmitRes = await fetch('https://formsubmit.co/ajax/lucian.wang@bomie.ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Referer: 'https://www.bomie.ai/',
        },
        body: JSON.stringify({
          _subject: `[Bomie AI Demo Lead] ${handle} (${city}) — ${name}`,
          _template: 'table',
          leadId,
          name,
          email,
          businessOrCreator: handle,
          city,
          submittedAt: timestamp,
        }),
      });
      if (formSubmitRes.ok) {
        emailDispatched = true;
      }
    } catch (err) {
      console.error('FormSubmit forward error:', err);
    }

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
      })
        .then((r) => {
          if (r.ok) emailDispatched = true;
        })
        .catch((err) => console.error('Resend forward error:', err));
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
      emailDispatched,
      receivedAt: timestamp,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload.' },
      { status: 400 }
    );
  }
}
