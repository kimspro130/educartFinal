import { NextRequest, NextResponse } from 'next/server';

// Pesapal payment callback handler
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderTrackingId = searchParams.get('OrderTrackingId');
    const orderMerchantReference = searchParams.get('OrderMerchantReference');
    const orderNotificationType = searchParams.get('OrderNotificationType');

    console.log('Pesapal callback received:', {
      orderTrackingId,
      orderMerchantReference,
      orderNotificationType,
    });

    if (!orderTrackingId) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?status=error&message=Missing order tracking ID`
      );
    }

    // Verify the payment status with Pesapal
    const verificationResult = await verifyPesapalPayment(orderTrackingId);

    if (verificationResult.status === 'success') {
      // Redirect to success page with transaction details
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?transaction_id=${orderTrackingId}&status=success&network=PESAPAL`
      );
    } else {
      // Redirect to success page with error status
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?transaction_id=${orderTrackingId}&status=error&message=Payment verification failed`
      );
    }

  } catch (error: any) {
    console.error('Pesapal callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?status=error&message=Payment callback failed`
    );
  }
}

// Handle POST requests (IPN notifications)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Pesapal IPN received:', body);

    const { OrderTrackingId, OrderNotificationType, OrderMerchantReference } = body;

    if (OrderTrackingId) {
      // Verify payment status
      const verificationResult = await verifyPesapalPayment(OrderTrackingId);
      
      // Here you can update your database with the payment status
      console.log('Payment verification result:', verificationResult);
      
      // You can add database updates here
      // await updatePaymentStatus(OrderTrackingId, verificationResult.status);
    }

    // Respond with success to acknowledge receipt
    return NextResponse.json({ status: 'success', message: 'IPN received' });

  } catch (error: any) {
    console.error('Pesapal IPN error:', error);
    return NextResponse.json(
      { status: 'error', message: 'IPN processing failed' },
      { status: 500 }
    );
  }
}

// Verify payment with Pesapal
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
      
      return {
        status: statusData.payment_status_description === 'Completed' ? 'success' : 
               statusData.payment_status_description === 'Pending' ? 'pending' : 'error',
        message: getPesapalStatusMessage(statusData.payment_status_description),
        data: statusData,
      };
    } else {
      return {
        status: 'error',
        message: 'Failed to verify payment status',
      };
    }

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return {
      status: 'error',
      message: 'Payment verification failed',
    };
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
