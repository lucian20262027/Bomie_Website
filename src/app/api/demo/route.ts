import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const phone = String(body?.phone || '').trim();
    const preferredContact = String(body?.preferredContact || 'either').trim();
    const handle = String(body?.handle || '').trim();
    const city = String(body?.city || '').trim();
    const turnstileToken = String(body?.turnstileToken || '').trim();

    if (!name || !email || !handle || !city) {
      return NextResponse.json(
        { ok: false, error: 'Please fill in your name, email, business/handle, and city.' },
        { status: 400 }
      );
    }

    // Verify Cloudflare Turnstile token server-side when secret key is configured
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      if (!turnstileToken) {
        return NextResponse.json(
          { ok: false, error: 'Please complete the human verification check.' },
          { status: 400 }
        );
      }

      const ipHeader = request.headers.get('x-forwarded-for') || '';
      const remoteIp = ipHeader.split(',')[0]?.trim();

      const verifyBody = new URLSearchParams({
        secret: turnstileSecret,
        response: turnstileToken,
      });
      if (remoteIp) {
        verifyBody.set('remoteip', remoteIp);
      }

      const verifyRes = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: verifyBody.toString(),
        }
      );
      const verifyData = (await verifyRes.json()) as { success?: boolean };
      if (!verifyData?.success) {
        return NextResponse.json(
          { ok: false, error: 'Human verification failed. Please refresh and try again.' },
          { status: 403 }
        );
      }
    }

    const phoneDisplay = phone || 'Not provided';

    const preferredLabel =
      preferredContact === 'phone'
        ? '📞 Phone / Text'
        : preferredContact === 'email'
          ? '✉️ Work Email'
          : '✨ Either (Fastest)';

    const leadId = `BOMIE-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    // Always emit structured lead record to Vercel Runtime Logs
    console.log(
      JSON.stringify({
        event: 'DEMO_REQUEST_LEAD',
        leadId,
        name,
        email,
        phone: phoneDisplay,
        preferredContact,
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
          phone: phoneDisplay,
          preferredContact: preferredLabel,
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
          text: `Lead ID: ${leadId}\nName: ${name}\nEmail: ${email}\nPhone: ${phoneDisplay}\nPreferred Contact: ${preferredLabel}\nBusiness/Handle: ${handle}\nCity: ${city}\nTime: ${timestamp}`,
        }),
      })
        .then((r) => {
          if (r.ok) emailDispatched = true;
        })
        .catch((err) => console.error('Resend forward error:', err));
    }

    // Forward to Discord / Slack / Feishu webhook if DEMO_WEBHOOK_URL is configured
    let webhookDispatched = false;
    const webhookUrl = process.env.DEMO_WEBHOOK_URL;
    if (webhookUrl) {
      const isDiscord =
        webhookUrl.includes('discord.com/api/webhooks') ||
        webhookUrl.includes('discordapp.com/api/webhooks');

      const webhookPayload = isDiscord
        ? {
            username: 'Bomie AI Lead Concierge',
            content: `🚀 **New Demo Request** — **${handle}** (${city})`,
            embeds: [
              {
                title: `New Bomie AI Demo Lead (${leadId})`,
                color: 9127187, // Royal Violet (#8B45D3)
                fields: [
                  { name: '👤 Name', value: name, inline: true },
                  { name: '💬 Preferred Contact', value: preferredLabel, inline: true },
                  { name: '📧 Work Email', value: email, inline: true },
                  { name: '📞 Phone Number', value: phoneDisplay, inline: true },
                  { name: '🏪 Business / Handle', value: handle, inline: true },
                  { name: '📍 City / Region', value: city, inline: true },
                ],
                footer: { text: 'bomie.ai · Book a Demo Lead Capture' },
                timestamp,
              },
            ],
          }
        : {
            text: `🚀 New Bomie AI Demo Request (${leadId})\n• Name: ${name}\n• Email: ${email}\n• Phone: ${phoneDisplay}\n• Preferred: ${preferredLabel}\n• Handle: ${handle}\n• City: ${city}`,
          };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload),
      })
        .then((r) => {
          if (r.ok) webhookDispatched = true;
        })
        .catch((err) => console.error('Webhook forward error:', err));
    }

    return NextResponse.json({
      ok: true,
      leadId,
      emailDispatched,
      webhookDispatched,
      receivedAt: timestamp,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload.' },
      { status: 400 }
    );
  }
}
