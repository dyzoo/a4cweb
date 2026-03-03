// app/api/pesapal/register-ipn/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://pay.pesapal.com/v3';
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Auth
  const authRes = await fetch(`${baseUrl}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });
  const { token } = await authRes.json();

  // Register IPN
  const ipnRes = await fetch(`${baseUrl}/api/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: `${siteUrl}/api/donation/ipn`,
      ipn_notification_type: 'POST',
    }),
  });

  const data = await ipnRes.json();
  return NextResponse.json({ 
    ipn_id: data.ipn_id, 
    full_response: data,
    ipnUrl: `${siteUrl}/api/donation/ipn`
  });
}