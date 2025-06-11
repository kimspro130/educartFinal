import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Webhook to handle Flutterwave payment notifications
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('verif-hash');
    
    // Verify webhook signature
    const expectedSignature = process.env.FLUTTERWAVE_WEBHOOK_SECRET;
    
    if (!signature || signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);
    
    // Handle different event types
    switch (payload.event) {
      case 'charge.completed':
        await handlePaymentCompleted(payload.data);
        break;
      case 'charge.failed':
        await handlePaymentFailed(payload.data);
        break;
      default:
        console.log('Unhandled webhook event:', payload.event);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handlePaymentCompleted(data: any) {
  console.log('Payment completed:', data);
  
  // Here you would typically:
  // 1. Update your database with payment status
  // 2. Send confirmation email to customer
  // 3. Trigger any post-payment workflows
  // 4. Update user's subscription/access status
  
  try {
    // Example: Update payment status in database
    // await updatePaymentStatus(data.tx_ref, 'completed', data);
    
    // Example: Send confirmation email
    // await sendPaymentConfirmationEmail(data.customer.email, data);
    
    console.log('Payment processing completed for:', data.tx_ref);
  } catch (error) {
    console.error('Error processing completed payment:', error);
  }
}

async function handlePaymentFailed(data: any) {
  console.log('Payment failed:', data);
  
  try {
    // Example: Update payment status in database
    // await updatePaymentStatus(data.tx_ref, 'failed', data);
    
    // Example: Send failure notification
    // await sendPaymentFailureEmail(data.customer.email, data);
    
    console.log('Payment failure processed for:', data.tx_ref);
  } catch (error) {
    console.error('Error processing failed payment:', error);
  }
}

// GET method for webhook verification (if needed)
export async function GET() {
  return NextResponse.json({ message: 'Webhook endpoint is active' });
}
