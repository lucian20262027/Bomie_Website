import { NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid work email address.' },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Bomie AI <onboarding@resend.dev>',
          to: ['lucian.wang@bomie.ai'],
          subject: `New Bomie AI Industry Insights Subscriber: ${email}`,
          text: `New footer newsletter subscriber:\n\nEmail: ${email}\nTimestamp: ${new Date().toISOString()}`,
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true, email });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unable to subscribe right now. Please try again.' },
      { status: 500 }
    );
  }
}
