// EDUCART Uganda - Pesapal Payment Service
// No external dependencies - using Pesapal API directly

export interface PaymentData {
  amount: number;
  currency: string;
  email: string;
  phone_number: string;
  name: string;
  tx_ref: string;
  redirect_url: string;
  payment_type: 'mobile_money_uganda' | 'card' | 'bank_transfer';
  network?: 'MTN' | 'AIRTEL' | 'AFRICELL';
  service_type?: string;
}

export interface PaymentResponse {
  status: 'success' | 'error';
  message: string;
  data?: any;
  payment_link?: string;
}

// Generate unique transaction reference
export function generateTxRef(): string {
  return `EDUCART_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Initialize payment with Pesapal
export async function initializePayment(paymentData: PaymentData): Promise<PaymentResponse> {
  try {
    // Call our Pesapal API endpoint
    const response = await fetch('/api/payment/pesapal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentData.amount,
        phone_number: paymentData.phone_number,
        email: paymentData.email,
        name: paymentData.name,
        service_type: paymentData.service_type || 'tutoring',
        network: paymentData.network,
      }),
    });

    const result = await response.json();

    if (result.status === 'success') {
      return {
        status: 'success',
        message: result.message,
        data: result.data,
        payment_link: result.payment_link,
      };
    } else {
      return {
        status: 'error',
        message: result.message || 'Failed to initialize payment',
      };
    }
  } catch (error: any) {
    console.error('Payment initialization error:', error);
    return {
      status: 'error',
      message: error.message || 'Payment initialization failed',
    };
  }
}

// Verify payment with Pesapal
export async function verifyPayment(transactionId: string): Promise<PaymentResponse> {
  try {
    // Call Pesapal verification endpoint
    const response = await fetch(`/api/payment/pesapal/verify?transaction_id=${transactionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.status === 'success') {
      return {
        status: 'success',
        message: 'Payment verified successfully',
        data: result.data,
      };
    } else {
      return {
        status: 'error',
        message: 'Payment verification failed',
        data: result.data,
      };
    }
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return {
      status: 'error',
      message: error.message || 'Payment verification failed',
    };
  }
}

// Mobile Money specific payment
export async function initializeMobileMoneyPayment(
  amount: number,
  phone: string,
  email: string,
  name: string,
  network: 'MTN' | 'AIRTEL' | 'AFRICELL',
  serviceType: string = 'tutoring'
): Promise<PaymentResponse> {
  const txRef = generateTxRef();
  
  const paymentData: PaymentData = {
    amount,
    currency: 'UGX',
    email,
    phone_number: phone,
    name,
    tx_ref: txRef,
    redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?tx_ref=${txRef}`,
    payment_type: 'mobile_money_uganda',
    network,
    service_type: serviceType,
  };

  return await initializePayment(paymentData);
}

// Get supported networks with official logos
export function getSupportedNetworks() {
  return [
    {
      code: 'MTN',
      name: 'MTN Mobile Money',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg',
      prefixes: ['077', '078', '076'],
      color: '#FFCC00'
    },
    {
      code: 'AIRTEL',
      name: 'Airtel Money',
      logo: 'https://s3-ap-southeast-1.amazonaws.com/bsy/iportal/images/airtel-logo-white-text-vertical.jpg',
      prefixes: ['075', '070', '074'],
      color: '#DC2626'
    },
    {
      code: 'AFRICELL',
      name: 'Africell Money',
      logo: 'https://images.seeklogo.com/logo-png/40/1/africell-logo-png_seeklogo-402658.png',
      prefixes: ['079'],
      color: '#0066CC'
    },
  ];
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'UGX'): string {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
