import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// MTN MoMo API Integration for Uganda
export async function POST(request: NextRequest) {
  try {
    const paymentData = await request.json();
    const { amount, phone_number, email, name, service_type, external_id } = paymentData;

    // Generate unique reference ID
    const referenceId = uuidv4();
    
    // MTN MoMo API Configuration
    const config = {
      baseUrl: process.env.NODE_ENV === 'production' 
        ? 'https://ericssonbasicapi2.azure-api.net' 
        : 'https://sandbox.momodeveloper.mtn.com',
      subscriptionKey: process.env.MTN_MOMO_SUBSCRIPTION_KEY || 'your-subscription-key',
      apiUserId: process.env.MTN_MOMO_API_USER_ID || 'your-api-user-id',
      apiKey: process.env.MTN_MOMO_API_KEY || 'your-api-key',
      targetEnvironment: process.env.NODE_ENV === 'production' ? 'mtnuganda' : 'sandbox',
    };

    // Step 1: Get access token
    const tokenResponse = await fetch(`${config.baseUrl}/collection/token/`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.apiUserId}:${config.apiKey}`).toString('base64')}`,
        'Ocp-Apim-Subscription-Key': config.subscriptionKey,
        'X-Target-Environment': config.targetEnvironment,
        'Content-Type': 'application/json',
      },
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get MTN MoMo access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Step 2: Request payment
    const paymentPayload = {
      amount: amount.toString(),
      currency: 'UGX',
      externalId: external_id || referenceId,
      payer: {
        partyIdType: 'MSISDN',
        partyId: phone_number,
      },
      payerMessage: `Payment for ${service_type} - EDUCART Uganda`,
      payeeNote: `EDUCART Uganda - ${service_type} service payment`,
    };

    const paymentResponse = await fetch(`${config.baseUrl}/collection/v1_0/requesttopay`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Reference-Id': referenceId,
        'X-Target-Environment': config.targetEnvironment,
        'Ocp-Apim-Subscription-Key': config.subscriptionKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentPayload),
    });

    if (paymentResponse.ok) {
      // Payment request successful
      return NextResponse.json({
        status: 'pending',
        message: 'Payment request sent to your phone. Please check your MTN MoMo and approve the payment.',
        transaction_id: referenceId,
        reference_id: referenceId,
        data: {
          amount,
          phone_number,
          service_type,
          network: 'MTN',
        },
      });
    } else {
      const errorData = await paymentResponse.text();
      console.error('MTN MoMo payment error:', errorData);
      
      return NextResponse.json({
        status: 'error',
        message: 'Failed to initiate MTN MoMo payment. Please check your phone number and try again.',
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('MTN MoMo API error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'MTN MoMo payment failed',
    }, { status: 500 });
  }
}

// Check payment status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const referenceId = searchParams.get('reference_id');

    if (!referenceId) {
      return NextResponse.json({
        status: 'error',
        message: 'Reference ID is required',
      }, { status: 400 });
    }

    const config = {
      baseUrl: process.env.NODE_ENV === 'production' 
        ? 'https://ericssonbasicapi2.azure-api.net' 
        : 'https://sandbox.momodeveloper.mtn.com',
      subscriptionKey: process.env.MTN_MOMO_SUBSCRIPTION_KEY || 'your-subscription-key',
      apiUserId: process.env.MTN_MOMO_API_USER_ID || 'your-api-user-id',
      apiKey: process.env.MTN_MOMO_API_KEY || 'your-api-key',
      targetEnvironment: process.env.NODE_ENV === 'production' ? 'mtnuganda' : 'sandbox',
    };

    // Get access token
    const tokenResponse = await fetch(`${config.baseUrl}/collection/token/`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${config.apiUserId}:${config.apiKey}`).toString('base64')}`,
        'Ocp-Apim-Subscription-Key': config.subscriptionKey,
        'X-Target-Environment': config.targetEnvironment,
        'Content-Type': 'application/json',
      },
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Check payment status
    const statusResponse = await fetch(`${config.baseUrl}/collection/v1_0/requesttopay/${referenceId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Target-Environment': config.targetEnvironment,
        'Ocp-Apim-Subscription-Key': config.subscriptionKey,
      },
    });

    if (statusResponse.ok) {
      const statusData = await statusResponse.json();
      
      return NextResponse.json({
        status: statusData.status === 'SUCCESSFUL' ? 'success' : 
               statusData.status === 'PENDING' ? 'pending' : 'error',
        message: getStatusMessage(statusData.status),
        data: statusData,
        transaction_id: referenceId,
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to check payment status',
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('MTN MoMo status check error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'Failed to check payment status',
    }, { status: 500 });
  }
}

function getStatusMessage(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'Payment is being processed. Please check your phone.';
    case 'SUCCESSFUL':
      return 'Payment completed successfully!';
    case 'FAILED':
      return 'Payment failed. Please try again.';
    default:
      return 'Unknown payment status.';
  }
}
