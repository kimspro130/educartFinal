// Uganda Mobile Money Payment Service
// Supports MTN MoMo API, Airtel Money, and Pesapal

export interface UgandaPaymentData {
  amount: number;
  phone_number: string;
  email: string;
  name: string;
  network: 'MTN' | 'AIRTEL' | 'AFRICELL';
  service_type: string;
  external_id: string;
}

export interface PaymentResponse {
  status: 'success' | 'error' | 'pending';
  message: string;
  data?: any;
  transaction_id?: string;
  reference_id?: string;
}

// MTN MoMo API Configuration
export const MTN_MOMO_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://ericssonbasicapi2.azure-api.net' 
    : 'https://sandbox.momodeveloper.mtn.com',
  subscriptionKey: process.env.MTN_MOMO_SUBSCRIPTION_KEY,
  apiUserId: process.env.MTN_MOMO_API_USER_ID,
  apiKey: process.env.MTN_MOMO_API_KEY,
  targetEnvironment: process.env.NODE_ENV === 'production' ? 'mtnuganda' : 'sandbox',
};

// Pesapal Configuration
export const PESAPAL_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://pay.pesapal.com/v3'
    : 'https://cybqa.pesapal.com/pesapalv3',
  consumerKey: process.env.PESAPAL_CONSUMER_KEY,
  consumerSecret: process.env.PESAPAL_CONSUMER_SECRET,
};

// Generate transaction reference
export function generateTxRef(): string {
  return `EDUCART_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Format phone number for Uganda
export function formatUgandaPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('256')) {
    return cleaned;
  } else if (cleaned.startsWith('0')) {
    return '256' + cleaned.substring(1);
  } else if (cleaned.length === 9) {
    return '256' + cleaned;
  }
  
  return cleaned;
}

// Validate Uganda phone number
export function validateUgandaPhone(phone: string): boolean {
  const formatted = formatUgandaPhone(phone);
  
  // MTN: 256 77, 78, 76
  // Airtel: 256 75, 70, 74
  // Africell: 256 79
  const ugandaPattern = /^256(77|78|76|75|70|74|79)\d{7}$/;
  
  return ugandaPattern.test(formatted);
}

// Get network from phone number
export function getNetworkFromPhone(phone: string): 'MTN' | 'AIRTEL' | 'AFRICELL' | 'UNKNOWN' {
  const formatted = formatUgandaPhone(phone);
  
  if (/^256(77|78|76)/.test(formatted)) return 'MTN';
  if (/^256(75|70|74)/.test(formatted)) return 'AIRTEL';
  if (/^256(79)/.test(formatted)) return 'AFRICELL';
  
  return 'UNKNOWN';
}

// Initialize payment using Pesapal for all networks
export async function initializeUgandaPayment(paymentData: UgandaPaymentData): Promise<PaymentResponse> {
  try {
    const formattedPhone = formatUgandaPhone(paymentData.phone_number);

    if (!validateUgandaPhone(formattedPhone)) {
      return {
        status: 'error',
        message: 'Invalid Uganda phone number. Please use format: 077XXXXXXX, 075XXXXXXX, or 079XXXXXXX',
      };
    }

    const detectedNetwork = getNetworkFromPhone(formattedPhone);
    const network = paymentData.network || detectedNetwork;

    if (!['MTN', 'AIRTEL', 'AFRICELL'].includes(network)) {
      return {
        status: 'error',
        message: 'Unsupported network. Please use MTN, Airtel, or Africell.',
      };
    }

    // Use Pesapal for all networks
    return await initializePesapalPayment({
      ...paymentData,
      phone_number: formattedPhone,
      network,
    });
  } catch (error: any) {
    console.error('Uganda payment initialization error:', error);
    return {
      status: 'error',
      message: error.message || 'Payment initialization failed',
    };
  }
}

// Pesapal Payment (for all networks)
async function initializePesapalPayment(paymentData: UgandaPaymentData): Promise<PaymentResponse> {
  try {
    const response = await fetch('/api/payment/pesapal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      status: 'error',
      message: error.message || 'Pesapal payment failed',
    };
  }
}

// Verify payment (Pesapal for all networks)
export async function verifyUgandaPayment(transactionId: string, network: string = 'PESAPAL'): Promise<PaymentResponse> {
  try {
    const response = await fetch(`/api/payment/pesapal?order_tracking_id=${transactionId}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      status: 'error',
      message: error.message || 'Payment verification failed',
    };
  }
}

// Get supported networks with details
export function getUgandaNetworks() {
  return [
    {
      code: 'MTN',
      name: 'MTN Mobile Money',
      description: 'Pay with MTN MoMo',
      prefixes: ['077', '078', '076'],
      color: '#FFCC00',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg',
    },
    {
      code: 'AIRTEL',
      name: 'Airtel Money',
      description: 'Pay with Airtel Money',
      prefixes: ['075', '070', '074'],
      color: '#FF0000',
      logo: 'https://s3-ap-southeast-1.amazonaws.com/bsy/iportal/images/airtel-logo-white-text-vertical.jpg',
    },
    {
      code: 'AFRICELL',
      name: 'Africell Money',
      description: 'Pay with Africell Money',
      prefixes: ['079'],
      color: '#0066CC',
      logo: 'https://images.seeklogo.com/logo-png/40/1/africell-logo-png_seeklogo-402658.png',
    },
  ];
}

// Format currency for Uganda
export function formatUGX(amount: number): string {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    minimumFractionDigits: 0,
  }).format(amount);
}

// Payment status messages
export function getPaymentStatusMessage(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'Payment is being processed. Please check your phone for the payment prompt.';
    case 'SUCCESSFUL':
      return 'Payment completed successfully!';
    case 'FAILED':
      return 'Payment failed. Please try again or contact support.';
    case 'CANCELLED':
      return 'Payment was cancelled.';
    case 'EXPIRED':
      return 'Payment request expired. Please try again.';
    default:
      return 'Unknown payment status.';
  }
}
