// app/api/pesapal/get-ipn-list/route.ts
export async function GET() {
  const env = process.env.PESAPAL_ENVIRONMENT === 'production' ? 'production' : 'sandbox';
  const baseUrl = env === 'production'
    ? 'https://pay.pesapal.com/v3'
    : 'https://cybqa.pesapal.com/pesapalv3';

  const authRes = await fetch(`${baseUrl}/api/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });

  const authData = await authRes.json();

  // Return auth response directly so you can see what's happening
  if (!authData.token) {
    return Response.json({ 
      step: 'auth_failed', 
      environment: env,
      baseUrl,
      authResponse: authData,
      // Confirm which keys are loaded (never log actual values)
      hasKey: !!process.env.PESAPAL_CONSUMER_KEY,
      hasSecret: !!process.env.PESAPAL_CONSUMER_SECRET,
      keyLength: process.env.PESAPAL_CONSUMER_KEY?.length,
      secretLength: process.env.PESAPAL_CONSUMER_SECRET?.length,
    });
  }

  const ipnRes = await fetch(`${baseUrl}/api/URLSetup/GetIpnList`, {
    headers: { 'Authorization': `Bearer ${authData.token}`, 'Accept': 'application/json' },
  });

  return Response.json({ step: 'success', ipnList: await ipnRes.json() });
}