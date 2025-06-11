import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Pesapal API Integration for Airtel and Africell
export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json();
    const { amount, phone_number, email, name, service_type, network } = paymentData;

    // Generate unique order tracking ID
    const orderTrackingId = `EDUCART_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Pesapal Configuration
    const config = {
      baseUrl: process.env.NODE_ENV === 'production'
        ? 'https://pay.pesapal.com/v3'
        : 'https://cybqa.pesapal.com/pesapalv3',
      consumerKey: process.env.PESAPAL_CONSUMER_KEY || 'your-consumer-key',
      consumerSecret: process.env.PESAPAL_CONSUMER_SECRET || 'your-consumer-secret',
    };

    // Step 1: Get access token
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
      throw new Error('Failed to get Pesapal access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.token;

    // Step 2: Submit order request
    const orderPayload = {
      id: orderTrackingId,
      currency: 'UGX',
      amount: amount,
      description: `${service_type} - EDUCART Uganda (${network} Mobile Money)`,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?transaction_id=${orderTrackingId}&network=${network}`,
      notification_id: process.env.PESAPAL_IPN_ID || '',
      billing_address: {
        email_address: email,
        phone_number: phone_number,
        country_code: 'UG',
        first_name: name.split(' ')[0] || name,
        last_name: name.split(' ').slice(1).join(' ') || '',
        line_1: 'Kampala',
        line_2: '',
        city: 'Kampala',
        state: 'Central',
        postal_code: '00000',
        zip_code: '00000',
      },
    };

    const orderResponse = await fetch(`${config.baseUrl}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    if (orderResponse.ok) {
      const orderData = await orderResponse.json();
      
      return NextResponse.json({
        status: 'success',
        message: `Payment request created successfully! You will be redirected to complete your ${network} Mobile Money payment.`,
        transaction_id: orderTrackingId,
        reference_id: orderData.order_tracking_id,
        payment_link: orderData.redirect_url,
        data: {
          amount,
          phone_number,
          service_type,
          network,
          order_tracking_id: orderData.order_tracking_id,
          pesapal_merchant_reference: orderData.merchant_reference,
        },
      });
    } else {
      const errorData = await orderResponse.text();
      console.error('Pesapal order error:', errorData);
      
      return NextResponse.json({
        status: 'error',
        message: `Failed to initiate ${network} payment. Please try again.`,
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Pesapal API error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'Payment initialization failed',
    }, { status: 500 });
  }
}

// Check payment status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderTrackingId = searchParams.get('order_tracking_id');

    if (!orderTrackingId) {
      return NextResponse.json({
        status: 'error',
        message: 'Order tracking ID is required',
      }, { status: 400 });
    }

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
        data: statusData,
        transaction_id: orderTrackingId,
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to check payment status',
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Pesapal status check error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'Failed to check payment status',
    }, { status: 500 });
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
