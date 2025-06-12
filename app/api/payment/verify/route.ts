import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/payment-service';

export async function POST(request: NextRequest) {
  try {
    const { transactionId } = await request.json();
    
    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    const result = await verifyPayment(transactionId);
    
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
    const result = await verifyPayment(transactionId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Payment verification API error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed', message: error.message },
      { status: 500 }
    );
  }
}
