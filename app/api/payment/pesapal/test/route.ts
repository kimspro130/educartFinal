import { NextRequest, NextResponse } from 'next/server';

// Test Pesapal authentication
export async function GET(request: NextRequest) {
  try {
    console.log('Testing Pesapal authentication...');
    
    // Pesapal Configuration - Use production environment
    const config = {
      baseUrl: 'https://pay.pesapal.com/v3',
      consumerKey: process.env.PESAPAL_CONSUMER_KEY,
      consumerSecret: process.env.PESAPAL_CONSUMER_SECRET,
    };

    console.log('Config:', {
      baseUrl: config.baseUrl,
      consumerKey: config.consumerKey ? `${config.consumerKey.substring(0, 10)}...` : 'Missing',
      consumerSecret: config.consumerSecret ? `${config.consumerSecret.substring(0, 10)}...` : 'Missing',
    });

    if (!config.consumerKey || !config.consumerSecret) {
      return NextResponse.json({
        status: 'error',
        message: 'Pesapal credentials not configured',
        config: {
          consumerKey: config.consumerKey ? 'Present' : 'Missing',
          consumerSecret: config.consumerSecret ? 'Present' : 'Missing',
        }
      }, { status: 400 });
    }

    // Test authentication
    const tokenPayload = {
      consumer_key: config.consumerKey,
      consumer_secret: config.consumerSecret,
    };

    console.log('Requesting token from:', `${config.baseUrl}/api/Auth/RequestToken`);

    const tokenResponse = await fetch(`${config.baseUrl}/api/Auth/RequestToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(tokenPayload),
    });

    console.log('Token response status:', tokenResponse.status);
    console.log('Token response headers:', Object.fromEntries(tokenResponse.headers.entries()));

    const responseText = await tokenResponse.text();
    console.log('Token response body:', responseText);

    if (!tokenResponse.ok) {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to authenticate with Pesapal',
        details: {
          status: tokenResponse.status,
          statusText: tokenResponse.statusText,
          response: responseText,
        }
      }, { status: 400 });
    }

    let tokenData;
    try {
      tokenData = JSON.parse(responseText);
    } catch (parseError) {
      return NextResponse.json({
        status: 'error',
        message: 'Invalid JSON response from Pesapal',
        details: {
          response: responseText,
          parseError: parseError.message,
        }
      }, { status: 400 });
    }

    if (!tokenData.token) {
      return NextResponse.json({
        status: 'error',
        message: 'No token in Pesapal response',
        details: tokenData,
      }, { status: 400 });
    }

    // Test if we can use the token to get merchant details or something
    const testResponse = await fetch(`${config.baseUrl}/api/Transactions/GetTransactionStatus?orderTrackingId=test`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenData.token}`,
        'Accept': 'application/json',
      },
    });

    console.log('Test API call status:', testResponse.status);

    return NextResponse.json({
      status: 'success',
      message: 'Pesapal authentication successful',
      details: {
        tokenReceived: !!tokenData.token,
        tokenType: tokenData.token_type,
        expiresIn: tokenData.expires_in,
        scope: tokenData.scope,
        testApiStatus: testResponse.status,
      }
    });

  } catch (error: any) {
    console.error('Pesapal test error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Pesapal test failed',
      error: error.message,
    }, { status: 500 });
  }
}
