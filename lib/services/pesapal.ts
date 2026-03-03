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
  details?: any;
}

// PesaPal API endpoints for Tanzania
const PESAPAL_URLS = {
  sandbox: {
    auth: 'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken',
    submit: 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest',
    status: 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus',
    ipn: 'https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN'
  },
  production: {
    auth: 'https://pay.pesapal.com/v3/api/Auth/RequestToken',
    submit: 'https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest',
    status: 'https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus',
    ipn: 'https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN'
  }
};

export class PesaPalService {
  private config: PesaPalConfig;
  private baseUrl: string;

  constructor() {
    this.config = {
      consumerKey: process.env.PESAPAL_CONSUMER_KEY || '',
      consumerSecret: process.env.PESAPAL_CONSUMER_SECRET || '',
      environment: (process.env.PESAPAL_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/donation/callback`,
      ipnUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/donation/ipn`
    };
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    // Log config (without sensitive data)
    console.log('PesaPal Service initialized with:', {
      environment: this.config.environment,
      callbackUrl: this.config.callbackUrl,
      ipnUrl: this.config.ipnUrl,
      hasConsumerKey: !!this.config.consumerKey,
      hasConsumerSecret: !!this.config.consumerSecret
    });
  }

  async initializePayment(donationData: DonationData): Promise<PesaPalResponse> {
    try {
      // Validate config first
      if (!this.config.consumerKey || !this.config.consumerSecret) {
        throw new Error('PesaPal consumer key and secret are required');
      }

      // Get auth token
      console.log('Getting PesaPal token...');
      const token = await this.getPesaPalToken();
      console.log('Token obtained successfully');

      // Register IPN
      console.log('Registering IPN...');
      const ipnId = await this.registerIPN(token);
      console.log('IPN registered with ID:', ipnId);
      
      // Prepare order data for Tanzania
      const orderData: OrderData = {
        id: donationData.reference,
        currency: 'TZS',
        amount: donationData.amount,
        description: `Donation for ${donationData.cause} - ${donationData.reference}`,
        callback_url: this.config.callbackUrl,
        notification_id: ipnId,
        branch: 'NGO Donations',
        billing_address: {
          email_address: donationData.donor?.email || 'anonymous@example.com',
          phone_number: donationData.donor?.phone || '0712345678',
          country_code: 'TZ',
          first_name: donationData.donor?.firstName || 'Anonymous',
          last_name: donationData.donor?.lastName || 'Donor',
          line_1: 'Dar es Salaam',
          city: 'Dar es Salaam',
          state: 'Dar es Salaam',
          postal_code: '00100',
          zip_code: '00100'
        }
      };

      console.log('Submitting order to PesaPal...');
      const response = await this.submitOrder(token, orderData);
      console.log('Order submission response:', response);
      
      // Check different possible success indicators
      if (response.status === '200' || response.status === 200 || response.status === '1' || response.status === 1) {
        return {
          success: true,
          redirectUrl: response.redirect_url,
          orderTrackingId: response.order_tracking_id,
          merchantReference: response.merchant_reference
        };
      } else {
        return {
          success: false,
          error: response.error || response.message || 'Payment initialization failed',
          details: response
        };
      }
    } catch (error) {
      console.error('PesaPal initialization error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error
      };
    }
  }

 private async getPesaPalToken(): Promise<string> {
  const url = PESAPAL_URLS[this.config.environment].auth;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      consumer_key: this.config.consumerKey,
      consumer_secret: this.config.consumerSecret
    })
  });

  const data = await response.json();

  if (data.token) {
    return data.token;
  }

  throw new Error(JSON.stringify(data));
}

  private async registerIPN(token: string): Promise<string> {
    try {
      const url = PESAPAL_URLS[this.config.environment].ipn;
      
      console.log('Registering IPN at:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          url: this.config.ipnUrl,
          ipn_notification_type: 'POST'
        })
      });

      const responseText = await response.text();
      console.log('IPN registration response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.log('IPN registration returned non-JSON response, might be using default IPN');
        return ''; // Return empty if can't parse, PesaPal might still work with callback
      }

      // Check different possible response formats
      if (data.ipn_id) {
        return data.ipn_id;
      } else if (data.id) {
        return data.id;
      } else if (data.notification_id) {
        return data.notification_id;
      }
      
      console.log('No IPN ID in response, using default');
      return ''; // Return empty if no ID, PesaPal might still work
    } catch (error) {
      console.error('IPN registration error:', error);
      return ''; // Return empty on error, try to proceed without IPN
    }
  }

  private async submitOrder(token: string, orderData: OrderData): Promise<any> {
    const url = PESAPAL_URLS[this.config.environment].submit;
    
    try {
      console.log('Submitting order to:', url);
      console.log('Order data:', JSON.stringify(orderData, null, 2));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const responseText = await response.text();
      console.log('Order submission response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse order response as JSON:', responseText);
        throw new Error(`Invalid order response: ${responseText.substring(0, 100)}`);
      }

      return data;
    } catch (error) {
      console.error('Order submission error:', error);
      throw error;
    }
  }

  async verifyPaymentStatus(orderTrackingId: string): Promise<string> {
    try {
      const token = await this.getPesaPalToken();
      const url = `${PESAPAL_URLS[this.config.environment].status}?orderTrackingId=${orderTrackingId}`;
      
      console.log('Verifying payment status for:', orderTrackingId);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const responseText = await response.text();
      console.log('Status response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse status response as JSON:', responseText);
        return 'PENDING';
      }

      // Check different possible status fields
      return data.payment_status_description || 
             data.status_description || 
             data.status || 
             'PENDING';
    } catch (error) {
      console.error('Payment verification error:', error);
      return 'ERROR';
    }
  }
}

// Export a singleton instance
export const pesapalService = new PesaPalService();