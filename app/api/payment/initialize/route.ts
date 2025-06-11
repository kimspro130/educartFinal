import { NextRequest, NextResponse } from 'next/server';

// Payment initialization using Flutterwave Standard API
export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json();
    
    const payload = {
      tx_ref: paymentData.tx_ref,
      amount: paymentData.amount,
      currency: paymentData.currency,
      redirect_url: paymentData.redirect_url,
      payment_options: paymentData.payment_type,
      customer: {
        email: paymentData.email,
        phone_number: paymentData.phone_number,
        name: paymentData.name,
      },
      customizations: {
        title: 'EDUCART Uganda Payment',
        description: 'Payment for educational services',
        logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
      },
      meta: {
        service_type: paymentData.service_type || 'tutoring',
        payment_method: paymentData.payment_type,
        network: paymentData.network,
      },
    };

    // Call Flutterwave API directly
    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (result.status === 'success') {
      return NextResponse.json({
        status: 'success',
        message: 'Payment initialized successfully',
        data: result.data,
        payment_link: result.data.link,
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: result.message || 'Failed to initialize payment',
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Payment initialization error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'Payment initialization failed',
    }, { status: 500 });
  }
}
