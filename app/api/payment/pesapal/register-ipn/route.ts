import { NextRequest, NextResponse } from 'next/server';

// Register IPN with Pesapal
export async function POST(request: NextRequest) {
  try {
    console.log('Registering IPN with Pesapal...');
    
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
      }, { status: 400 });
    }

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
      const errorText = await tokenResponse.text();
      throw new Error(`Failed to get Pesapal access token: ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.token;

    // Step 2: Register IPN
    const ipnPayload = {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/pesapal/callback`,
      ipn_notification_type: 'GET'
    };

    console.log('Registering IPN with payload:', ipnPayload);

    const ipnResponse = await fetch(`${config.baseUrl}/api/URLSetup/RegisterIPN`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(ipnPayload),
    });

    console.log('IPN registration response status:', ipnResponse.status);

    if (ipnResponse.ok) {
      const ipnData = await ipnResponse.json();
      console.log('IPN registration successful:', ipnData);
      
      return NextResponse.json({
        status: 'success',
        message: 'IPN registered successfully',
        data: ipnData,
        ipn_id: ipnData.ipn_id,
      });
    } else {
      const errorData = await ipnResponse.text();
      console.error('IPN registration error:', errorData);
      
      return NextResponse.json({
        status: 'error',
        message: 'Failed to register IPN',
        error: errorData,
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('IPN registration error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'IPN registration failed',
    }, { status: 500 });
  }
}

// Get registered IPNs
export async function GET(request: NextRequest) {
  try {
    console.log('Getting registered IPNs...');
    
    // Pesapal Configuration - Use production environment
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

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.token;

    // Get registered IPNs
    const ipnResponse = await fetch(`${config.baseUrl}/api/URLSetup/GetIpnList`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (ipnResponse.ok) {
      const ipnData = await ipnResponse.json();
      console.log('Registered IPNs:', ipnData);
      
      return NextResponse.json({
        status: 'success',
        message: 'IPNs retrieved successfully',
        data: ipnData,
      });
    } else {
      const errorData = await ipnResponse.text();
      console.error('Get IPNs error:', errorData);
      
      return NextResponse.json({
        status: 'error',
        message: 'Failed to get IPNs',
        error: errorData,
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Get IPNs error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'Failed to get IPNs',
    }, { status: 500 });
  }
}
