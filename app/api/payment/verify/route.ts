import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { transactionId } = await request.json();

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    const result = await verifyPaymentDirect(transactionId);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Payment verification API error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed', message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const transactionId = searchParams.get('transaction_id');

  if (!transactionId) {
    return NextResponse.json(
      { error: 'Transaction ID is required' },
      { status: 400 }
    );
  }

  try {
    const result = await verifyPaymentDirect(transactionId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Payment verification API error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed', message: error.message },
      { status: 500 }
    );
  }
}

// Direct Flutterwave API verification
async function verifyPaymentDirect(transactionId: string) {
  try {
    const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.status === 'success' && result.data.status === 'successful') {
      return {
        status: 'success',
        message: 'Payment verified successfully',
        data: result.data,
      };
    } else {
      return {
        status: 'error',
        message: 'Payment verification failed',
        data: result.data,
      };
    }
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return {
      status: 'error',
      message: error.message || 'Payment verification failed',
    };
  }
}
