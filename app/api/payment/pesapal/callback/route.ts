import { NextRequest, NextResponse } from 'next/server';

// Pesapal callback handler
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderTrackingId = searchParams.get('OrderTrackingId');
    const orderMerchantReference = searchParams.get('OrderMerchantReference');
    
    console.log('Pesapal callback received:', {
      orderTrackingId,
      orderMerchantReference,
      allParams: Object.fromEntries(searchParams.entries())
    });

    if (!orderTrackingId) {
      console.error('No OrderTrackingId in callback');
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment/error?message=Invalid callback`);
    }

    // Verify the payment status with Pesapal
    const config = {
      baseUrl: 'https://pay.pesapal.com/v3',
      consumerKey: process.env.PESAPAL_CONSUMER_KEY,
      consumerSecret: process.env.PESAPAL_CONSUMER_SECRET,
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

    if (!tokenResponse.ok) {
      console.error('Failed to get token for verification');
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment/error?message=Verification failed`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.token;

    // Get transaction status
    const statusResponse = await fetch(`${config.baseUrl}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (statusResponse.ok) {
      const statusData = await statusResponse.json();
      console.log('Payment status:', statusData);

      // Check if payment was successful
      if (statusData.payment_status_description === 'Completed' || statusData.status_code === 1) {
        // Payment successful - redirect to success page
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment/success?transaction_id=${orderTrackingId}&amount=${statusData.amount}&status=success`);
      } else {
        // Payment failed or pending
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment/error?transaction_id=${orderTrackingId}&status=${statusData.payment_status_description}`);
      }
    } else {
      console.error('Failed to get transaction status');
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment/error?message=Status check failed`);
    }

  } catch (error: any) {
    console.error('Callback error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/payment/error?message=Callback processing failed`);
  }
}

// Handle POST callbacks (IPN notifications)
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    console.log('Pesapal IPN notification received:', body);

    // Parse the notification
    const { searchParams } = new URL(`http://localhost?${body}`);
    const orderTrackingId = searchParams.get('OrderTrackingId');
    const orderNotificationType = searchParams.get('OrderNotificationType');

    console.log('IPN details:', {
      orderTrackingId,
      orderNotificationType,
      body
    });

    // Here you would typically:
    // 1. Verify the payment status
    // 2. Update your database
    // 3. Send confirmation emails
    // 4. Update user access/subscription

    return NextResponse.json({ 
      status: 'success',
      message: 'IPN processed successfully' 
    });

  } catch (error: any) {
    console.error('IPN processing error:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'IPN processing failed' 
    }, { status: 500 });
  }
}
