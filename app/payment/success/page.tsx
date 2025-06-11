"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2, XCircle, Home, Receipt } from 'lucide-react';
import { verifyUgandaPayment, formatUGX } from '@/lib/uganda-payment-service';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [paymentData, setPaymentData] = useState<any>(null);

  const txRef = searchParams.get('tx_ref');
  const transactionId = searchParams.get('transaction_id');
  const network = searchParams.get('network') || 'MTN';

  useEffect(() => {
    const verifyTransaction = async () => {
      if (!transactionId) {
        setVerificationStatus('failed');
        return;
      }

      try {
        const result = await verifyUgandaPayment(transactionId, network);
        
        if (result.status === 'success') {
          setVerificationStatus('success');
          setPaymentData(result.data);
        } else {
          setVerificationStatus('failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('failed');
      }
    };

    verifyTransaction();
  }, [transactionId]);

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-16">
        <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-3xl border-0">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-16 w-16 text-amber-500 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-blue-900 dark:text-amber-400 mb-2">
              Verifying Payment
            </h2>
            <p className="text-blue-800 dark:text-amber-200">
              Please wait while we confirm your payment...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === 'failed') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-16">
        <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-3xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold text-red-600 dark:text-red-400">
              Payment Failed
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-blue-800 dark:text-amber-200">
              We couldn't verify your payment. Please try again or contact support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/pricing" className="flex-1">
                <Button variant="outline" className="w-full">
                  Try Again
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-blue-600">
                  Contact Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100 dark:from-gray-900 dark:via-amber-900/20 dark:to-gray-800 flex items-center justify-center pt-16">
      <div className="container mx-auto px-6">
        <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-3xl border-0 overflow-hidden">
          <CardHeader className="text-center pb-6 bg-gradient-to-r from-amber-500 to-blue-500 text-white">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">
              Payment Successful!
            </CardTitle>
            <p className="text-amber-100 text-lg">
              Thank you for choosing EDUCART Uganda
            </p>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* Payment Details */}
            {paymentData && (
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 space-y-4">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-4">
                  Payment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700 dark:text-amber-300 font-medium">Amount:</span>
                    <p className="text-blue-900 dark:text-amber-200 font-bold text-lg">
                      {formatCurrency(paymentData.amount, paymentData.currency)}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-700 dark:text-amber-300 font-medium">Transaction ID:</span>
                    <p className="text-blue-900 dark:text-amber-200 font-mono text-xs">
                      {paymentData.id}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-700 dark:text-amber-300 font-medium">Payment Method:</span>
                    <p className="text-blue-900 dark:text-amber-200">
                      {paymentData.payment_type || 'Mobile Money'}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-700 dark:text-amber-300 font-medium">Date:</span>
                    <p className="text-blue-900 dark:text-amber-200">
                      {new Date(paymentData.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-4">
                What's Next?
              </h3>
              <ul className="space-y-3 text-blue-800 dark:text-amber-200">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>You will receive a confirmation email shortly</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Our team will contact you within 24 hours to schedule your sessions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>You can track your progress through our student portal</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full py-3 rounded-full">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Button 
                onClick={() => window.print()} 
                className="flex-1 bg-gradient-to-r from-amber-500 to-blue-600 hover:from-amber-600 hover:to-blue-700 py-3 rounded-full"
              >
                <Receipt className="mr-2 h-4 w-4" />
                Print Receipt
              </Button>
            </div>

            {/* Support Contact */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
              <p className="text-blue-700 dark:text-amber-300 text-sm mb-2">
                Need help? Contact our support team
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <a 
                  href="mailto:support@educartuganda.com" 
                  className="text-amber-600 hover:text-amber-700 transition-colors"
                >
                  support@educartuganda.com
                </a>
                <span className="text-gray-400">|</span>
                <a 
                  href="tel:+256700123456" 
                  className="text-amber-600 hover:text-amber-700 transition-colors"
                >
                  +256 700 123 456
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center pt-16">
        <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-3xl border-0">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-16 w-16 text-amber-500 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-blue-900 dark:text-amber-400 mb-2">
              Loading...
            </h2>
            <p className="text-blue-800 dark:text-amber-200">
              Please wait while we load your payment details...
            </p>
          </CardContent>
        </Card>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
