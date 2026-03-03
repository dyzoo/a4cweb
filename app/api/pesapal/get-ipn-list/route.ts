// app/api/pesapal/get-ipn-list/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const env = process.env.PESAPAL_ENVIRONMENT === 'production' ? 'production' : 'sandbox';

  const baseUrl = env === 'production'
    ? 'https://pay.pesapal.com/v3'
    : 'https://cybqa.pesapal.com/pesapalv3';

  // 1. Get token
  const authRes = await fetch(`${baseUrl}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });
  const { token } = await authRes.json();

  // 2. Fetch IPN list
  const ipnRes = await fetch(`${baseUrl}/api/URLSetup/GetIpnList`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
  });
  const data = await ipnRes.json();

  return NextResponse.json(data);
}