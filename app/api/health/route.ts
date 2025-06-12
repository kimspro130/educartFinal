import { NextRequest, NextResponse } from 'next/server';

// Health check endpoint to diagnose issues
export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const envCheck = {
      pesapalConsumerKey: !!process.env.PESAPAL_CONSUMER_KEY,
      pesapalConsumerSecret: !!process.env.PESAPAL_CONSUMER_SECRET,
      appUrl: !!process.env.NEXT_PUBLIC_APP_URL,
      nodeEnv: process.env.NODE_ENV,
    };

    // Check if we can make a basic fetch request
    let fetchTest = false;
    try {
      const testResponse = await fetch('https://httpbin.org/get', {
        method: 'GET',
        headers: { 'User-Agent': 'EDUCART-Health-Check' }
      });
      fetchTest = testResponse.ok;
    } catch (fetchError) {
      console.error('Fetch test failed:', fetchError);
    }

    // Basic system info
    const systemInfo = {
      timestamp: new Date().toISOString(),
      platform: process.platform,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
    };

    return NextResponse.json({
      status: 'healthy',
      message: 'EDUCART Uganda API is running',
      environment: envCheck,
      network: {
        fetchTest,
      },
      system: systemInfo,
      endpoints: {
        pesapalTest: '/api/payment/pesapal/test',
        pesapalPayment: '/api/payment/pesapal',
        health: '/api/health',
      }
    });

  } catch (error: any) {
    console.error('Health check error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Health check failed',
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
