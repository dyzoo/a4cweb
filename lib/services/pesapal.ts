// lib/services/pesapal.ts

interface PesaPalConfig {
  consumerKey: string;
  consumerSecret: string;
  environment: 'sandbox' | 'production';
  callbackUrl: string;
  ipnUrl: string;
}

interface DonationData {
  amount: number;
  cause: string;
  donor: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  } | null;
  reference: string;
}

interface OrderData {
  id: string;
  currency: string;
  amount: number;
  description: string;
  callback_url: string;
  notification_id: string;
  branch: string;
  billing_address: {
    email_address: string;
    phone_number: string;
    country_code: string;
    first_name: string;
    last_name: string;
    line_1: string;
    city: string;
    state: string;
    postal_code: string;
    zip_code: string;
  };
}

interface PesaPalResponse {
  success: boolean;
  redirectUrl?: string;
  orderTrackingId?: string;
  merchantReference?: string;
  error?: string;
  details?: unknown;
}

const PESAPAL_URLS = {
  sandbox: {
    auth:   'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken',
    submit: 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest',
    status: 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus',
    ipn:    'https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN',
  },
  production: {
    auth:   'https://pay.pesapal.com/v3/api/Auth/RequestToken',
    submit: 'https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest',
    status: 'https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus',
    ipn:    'https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN',
  },
};

// Cache the IPN ID in memory for the lifetime of the server process.
// This avoids re-registering on every payment request.
let cachedIpnId: string | null = null;

export class PesaPalService {
  private config: PesaPalConfig;

  constructor() {
    // Validate all required env vars up front — fail loudly rather than
    // silently using empty strings or localhost in production.
    const consumerKey     = process.env.PESAPAL_CONSUMER_KEY;
    const consumerSecret  = process.env.PESAPAL_CONSUMER_SECRET;
    const baseUrl         = process.env.NEXT_PUBLIC_BASE_URL;
    const environment     = process.env.PESAPAL_ENVIRONMENT as 'sandbox' | 'production' | undefined;

    if (!consumerKey)    throw new Error('Missing env var: PESAPAL_CONSUMER_KEY');
    if (!consumerSecret) throw new Error('Missing env var: PESAPAL_CONSUMER_SECRET');
    if (!baseUrl)        throw new Error('Missing env var: NEXT_PUBLIC_BASE_URL');
    if (environment && environment !== 'sandbox' && environment !== 'production') {
      throw new Error(`Invalid PESAPAL_ENVIRONMENT value: "${environment}". Must be "sandbox" or "production".`);
    }

    this.config = {
      consumerKey,
      consumerSecret,
      environment: environment ?? 'sandbox',
      callbackUrl: `${baseUrl}/api/donation/callback`,
      ipnUrl:      `${baseUrl}/api/donation/ipn`,
    };

    console.log('[PesaPal] Service initialised:', {
      environment:    this.config.environment,
      callbackUrl:    this.config.callbackUrl,
      ipnUrl:         this.config.ipnUrl,
      hasConsumerKey: true,
    });
  }

  // ─── Public ────────────────────────────────────────────────────────────────

  async initializePayment(donationData: DonationData): Promise<PesaPalResponse> {
    try {
      const token = await this.getToken();

      // Re-use cached IPN ID; register only when necessary.
      const ipnId = await this.getOrRegisterIPN(token);

      const orderData: OrderData = {
        id:              donationData.reference,
        currency:        'TZS',
        amount:          donationData.amount,
        description:     `Donation – ${donationData.cause} (${donationData.reference})`,
        callback_url:    this.config.callbackUrl,
        notification_id: ipnId,
        branch:          'NGO Donations',
        billing_address: {
          email_address: donationData.donor?.email     ?? 'anonymous@example.com',
          phone_number:  this.normalisePhone(donationData.donor?.phone ?? ''),
          country_code:  'TZ',
          first_name:    donationData.donor?.firstName ?? 'Anonymous',
          last_name:     donationData.donor?.lastName  ?? 'Donor',
          line_1:        'Dar es Salaam',
          city:          'Dar es Salaam',
          state:         'Dar es Salaam',
          postal_code:   '00100',
          zip_code:      '00100',
        },
      };

      console.log('[PesaPal] Submitting order:', {
        id:              orderData.id,
        amount:          orderData.amount,
        currency:        orderData.currency,
        notification_id: orderData.notification_id,
      });

      const response = await this.submitOrder(token, orderData);

      // PesaPal returns status 200 (number or string) on success.
      const statusCode = Number(response.status);
      if (statusCode === 200) {
        if (!response.redirect_url) {
          throw new Error('PesaPal returned status 200 but no redirect_url');
        }
        return {
          success:           true,
          redirectUrl:       response.redirect_url,
          orderTrackingId:   response.order_tracking_id,
          merchantReference: response.merchant_reference,
        };
      }

      // Surface the actual PesaPal error message when available.
      const errorMessage =
        response.error?.message ??
        response.message ??
        `Unexpected status: ${response.status}`;

      console.error('[PesaPal] Order submission failed:', response);
      return { success: false, error: errorMessage, details: response };

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('[PesaPal] initializePayment error:', message);
      return { success: false, error: message };
    }
  }

  async verifyPaymentStatus(orderTrackingId: string): Promise<string> {
    try {
      const token = await this.getToken();
      const url   = `${PESAPAL_URLS[this.config.environment].status}?orderTrackingId=${orderTrackingId}`;

      const response = await fetch(url, {
        headers: this.jsonHeaders(token),
      });

      const data = await this.parseJson(response, 'status check');

      // PesaPal v3 uses payment_status_description for the human-readable status.
      return (
        data.payment_status_description ??
        data.status_description ??
        data.payment_status ??
        'PENDING'
      );
    } catch (error) {
      console.error('[PesaPal] verifyPaymentStatus error:', error);
      return 'ERROR';
    }
  }

  // ─── Private ───────────────────────────────────────────────────────────────

  private async getToken(): Promise<string> {
    const url = PESAPAL_URLS[this.config.environment].auth;

    const response = await fetch(url, {
      method:  'POST',
      headers: this.jsonHeaders(),
      body:    JSON.stringify({
        consumer_key:    this.config.consumerKey,
        consumer_secret: this.config.consumerSecret,
      }),
    });

    const data = await this.parseJson(response, 'auth');

    if (!data.token) {
      throw new Error(`PesaPal auth failed: ${JSON.stringify(data)}`);
    }

    return data.token as string;
  }

  private async getOrRegisterIPN(token: string): Promise<string> {
    // Return the env-provided IPN ID first (most reliable for production).
    if (process.env.PESAPAL_IPN_ID) {
      return process.env.PESAPAL_IPN_ID;
    }

    // Fall back to the in-process cache.
    if (cachedIpnId) {
      console.log('[PesaPal] Using cached IPN ID:', cachedIpnId);
      return cachedIpnId;
    }

    // Register fresh and cache the result.
    cachedIpnId = await this.registerIPN(token);
    return cachedIpnId;
  }

  private async registerIPN(token: string): Promise<string> {
    const url = PESAPAL_URLS[this.config.environment].ipn;

    console.log('[PesaPal] Registering IPN URL:', this.config.ipnUrl);

    const response = await fetch(url, {
      method:  'POST',
      headers: this.jsonHeaders(token),
      body:    JSON.stringify({
        url:                   this.config.ipnUrl,
        ipn_notification_type: 'POST',
      }),
    });

    const data = await this.parseJson(response, 'IPN registration');

    const ipnId = data.ipn_id ?? data.id ?? data.notification_id;

    if (!ipnId) {
      // In production this is fatal — an order without a valid notification_id
      // will be rejected by PesaPal with a 400.
      throw new Error(
        `IPN registration succeeded but returned no ID. Full response: ${JSON.stringify(data)}`
      );
    }

    console.log('[PesaPal] IPN registered. ID:', ipnId);
    console.log('[PesaPal] Tip: set PESAPAL_IPN_ID=' + ipnId + ' in your env to skip re-registration.');

    return ipnId as string;
  }

  private async submitOrder(token: string, orderData: OrderData): Promise<any> {
    const url = PESAPAL_URLS[this.config.environment].submit;

    const response = await fetch(url, {
      method:  'POST',
      headers: this.jsonHeaders(token),
      body:    JSON.stringify(orderData),
    });

    return this.parseJson(response, 'submit order');
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private jsonHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  private async parseJson(response: Response, context: string): Promise<any> {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(
        `[PesaPal] ${context}: expected JSON but got (HTTP ${response.status}): ${text.substring(0, 200)}`
      );
    }
  }

  /** Ensures phone numbers are in international format for PesaPal (e.g. +255712345678) */
  private normalisePhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');

    // Already has country code
    if (digits.startsWith('255') && digits.length === 12) return `+${digits}`;
    if (digits.startsWith('254') && digits.length === 12) return `+${digits}`;

    // Local Tanzanian format: 07xxxxxxxx or 06xxxxxxxx
    if ((digits.startsWith('07') || digits.startsWith('06')) && digits.length === 10) {
      return `+255${digits.slice(1)}`;
    }

    // Return as-is if format is unrecognised — PesaPal will validate
    return phone;
  }
}

// ─── Singleton ──────────────────────────────────────────────────────────────
// Lazily instantiated so the constructor validation runs at request time
// (when env vars are guaranteed to be loaded) rather than at module parse time.

let _instance: PesaPalService | null = null;

export function getPesaPalService(): PesaPalService {
  if (!_instance) {
    _instance = new PesaPalService();
  }
  return _instance;
}

// Named export for convenience — use getPesaPalService() instead of the old
// `pesapalService` singleton to ensure env vars are loaded first.
export const pesapalService = {
  initializePayment:   (data: DonationData)    => getPesaPalService().initializePayment(data),
  verifyPaymentStatus: (trackingId: string)     => getPesaPalService().verifyPaymentStatus(trackingId),
};