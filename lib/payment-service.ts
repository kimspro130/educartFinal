// Client-side payment service (no server dependencies)

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
  return `EDUCART_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Initialize payment via API route
export async function initializePayment(paymentData: PaymentData): Promise<PaymentResponse> {
  try {
    const response = await fetch('/api/payment/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Payment initialization error:', error);
    return {
      status: 'error',
      message: error.message || 'Payment initialization failed',
    };
  }
}

// Verify payment via API route
export async function verifyPayment(transactionId: string): Promise<PaymentResponse> {
  try {
    const response = await fetch(`/api/payment/verify?transaction_id=${transactionId}`);
    const result = await response.json();
    return result;
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

// Get supported networks
export function getSupportedNetworks() {
  return [
    { code: 'MTN', name: 'MTN Mobile Money', logo: '/images/mtn-logo.png' },
    { code: 'AIRTEL', name: 'Airtel Money', logo: '/images/airtel-logo.png' },
    { code: 'AFRICELL', name: 'Africell Money', logo: '/images/africell-logo.png' },
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
