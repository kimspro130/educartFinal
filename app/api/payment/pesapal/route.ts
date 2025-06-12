import { NextRequest, NextResponse } from 'next/server';

// Pesapal Payment API Route
export async function POST(request: NextRequest) {
  try {
    const { amount, phone_number, email, name, service_type, network } = await request.json();

    // Validate required fields
    if (!amount || !phone_number || !email || !name) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing required fields: amount, phone_number, email, name',
      }, { status: 400 });
    }

    // Pesapal Configuration - Use production environment
    const config = {
      baseUrl: 'https://pay.pesapal.com/v3',
      consumerKey: process.env.PESAPAL_CONSUMER_KEY,
      consumerSecret: process.env.PESAPAL_CONSUMER_SECRET,
    };

    if (!config.consumerKey || !config.consumerSecret) {
      return NextResponse.json({
        status: 'error',
        message: 'Pesapal credentials not configured',
      }, { status: 500 });
    }

    // Step 1: Get access token
    const tokenPayload = {
      consumer_key: config.consumerKey,
      consumer_secret: config.consumerSecret,
    };

    console.log('Requesting Pesapal token with:', {
      baseUrl: config.baseUrl,
      consumerKey: config.consumerKey ? 'Present' : 'Missing',
      consumerSecret: config.consumerSecret ? 'Present' : 'Missing',
    });

    const tokenResponse = await fetch(`${config.baseUrl}/api/Auth/RequestToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(tokenPayload),
    });

    console.log('Token response status:', tokenResponse.status);

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token request failed:', errorText);
      throw new Error(`Failed to get Pesapal access token: ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    console.log('Token response:', tokenData);
    
    if (!tokenData.token) {
      throw new Error('No token received from Pesapal');
    }
    
    const accessToken = tokenData.token;

    // Step 2: Create order
    const orderTrackingId = `EDUCART_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    const orderPayload = {
      id: orderTrackingId,
      currency: 'UGX',
      amount: amount,
      description: `EDUCART Uganda - ${service_type || 'Educational Service'}`,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/pesapal/callback`,
      notification_id: process.env.PESAPAL_IPN_ID || 'default-ipn-id',
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
        zip_code: '00000'
      }
    };

    console.log('Submitting order with payload:', JSON.stringify(orderPayload, null, 2));

    const orderResponse = await fetch(`${config.baseUrl}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    console.log('Order response status:', orderResponse.status);

    if (orderResponse.ok) {
      const orderData = await orderResponse.json();
      console.log('Order response data:', orderData);
      
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
        message: `Failed to initiate ${network} payment. Error: ${errorData}`,
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Pesapal payment error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'Payment initialization failed',
    }, { status: 500 });
  }
}
