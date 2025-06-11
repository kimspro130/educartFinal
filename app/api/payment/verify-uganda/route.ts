import { NextRequest, NextResponse } from 'next/server';

// Unified payment verification for Uganda mobile money
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transaction_id');
    const network = searchParams.get('network');

    if (!transactionId) {
      return NextResponse.json({
        status: 'error',
        message: 'Transaction ID is required',
      }, { status: 400 });
    }

    if (!network) {
      return NextResponse.json({
        status: 'error',
        message: 'Network is required',
      }, { status: 400 });
    }

    // Route to appropriate verification based on network
    switch (network.toUpperCase()) {
      case 'MTN':
        return await verifyMTNPayment(transactionId);
      
      case 'AIRTEL':
      case 'AFRICELL':
        return await verifyPesapalPayment(transactionId);
      
      default:
        return NextResponse.json({
          status: 'error',
          message: 'Unsupported network',
        }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'Payment verification failed',
    }, { status: 500 });
  }
}

// Verify MTN MoMo payment
async function verifyMTNPayment(referenceId: string) {
  try {
    const config = {
      baseUrl: process.env.NODE_ENV === 'production' 
        ? 'https://ericssonbasicapi2.azure-api.net' 
        : 'https://sandbox.momodeveloper.mtn.com',
      subscriptionKey: process.env.MTN_MOMO_SUBSCRIPTION_KEY || 'your-subscription-key',
      apiUserId: process.env.MTN_MOMO_API_USER_ID || 'your-api-user-id',
      apiKey: process.env.MTN_MOMO_API_KEY || 'your-api-key',
      targetEnvironment: process.env.NODE_ENV === 'production' ? 'mtnuganda' : 'sandbox',
    };

    // Get access token
    const tokenResponse = await fetch(`${config.baseUrl}/collection/token/`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.apiUserId}:${config.apiKey}`).toString('base64')}`,
        'Ocp-Apim-Subscription-Key': config.subscriptionKey,
        'X-Target-Environment': config.targetEnvironment,
        'Content-Type': 'application/json',
      },
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Check payment status
    const statusResponse = await fetch(`${config.baseUrl}/collection/v1_0/requesttopay/${referenceId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Target-Environment': config.targetEnvironment,
        'Ocp-Apim-Subscription-Key': config.subscriptionKey,
      },
    });

    if (statusResponse.ok) {
      const statusData = await statusResponse.json();
      
      return NextResponse.json({
        status: statusData.status === 'SUCCESSFUL' ? 'success' : 
               statusData.status === 'PENDING' ? 'pending' : 'error',
        message: getMTNStatusMessage(statusData.status),
        data: {
          ...statusData,
          network: 'MTN',
          transaction_id: referenceId,
        },
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to verify MTN payment',
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('MTN verification error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'MTN payment verification failed',
    }, { status: 500 });
  }
}

// Verify Pesapal payment
async function verifyPesapalPayment(orderTrackingId: string) {
  try {
    const config = {
      baseUrl: process.env.NODE_ENV === 'production'
        ? 'https://pay.pesapal.com/v3'
        : 'https://cybqa.pesapal.com/pesapalv3',
      consumerKey: process.env.PESAPAL_CONSUMER_KEY || 'your-consumer-key',
      consumerSecret: process.env.PESAPAL_CONSUMER_SECRET || 'your-consumer-secret',
    };

    // Get access token
    const tokenPayload = {
      consumer_key: config.consumerKey,
      consumer_secret: config.consumerSecret,
    };

    const tokenResponse = await fetch(`${config.baseUrl}/api/Auth/RequestToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(tokenPayload),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.token;

    // Check transaction status
    const statusResponse = await fetch(`${config.baseUrl}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (statusResponse.ok) {
      const statusData = await statusResponse.json();
      
      return NextResponse.json({
        status: statusData.payment_status_description === 'Completed' ? 'success' : 
               statusData.payment_status_description === 'Pending' ? 'pending' : 'error',
        message: getPesapalStatusMessage(statusData.payment_status_description),
        data: {
          ...statusData,
          transaction_id: orderTrackingId,
        },
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to verify Pesapal payment',
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Pesapal verification error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Pesapal payment verification failed',
    }, { status: 500 });
  }
}

function getMTNStatusMessage(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'Payment is being processed. Please check your phone.';
    case 'SUCCESSFUL':
      return 'MTN MoMo payment completed successfully!';
    case 'FAILED':
      return 'MTN MoMo payment failed. Please try again.';
    default:
      return 'Unknown MTN payment status.';
  }
}

function getPesapalStatusMessage(status: string): string {
  switch (status?.toLowerCase()) {
    case 'completed':
      return 'Payment completed successfully!';
    case 'pending':
      return 'Payment is being processed. Please wait.';
    case 'failed':
      return 'Payment failed. Please try again.';
    case 'cancelled':
      return 'Payment was cancelled.';
    default:
      return 'Unknown payment status.';
  }
}
