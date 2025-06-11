"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Smartphone, CreditCard } from 'lucide-react';
import {
  initializeUgandaPayment,
  formatUGX,
  getUgandaNetworks,
  validateUgandaPhone,
  getNetworkFromPhone,
  generateTxRef
} from '@/lib/uganda-payment-service';
import { toast } from 'sonner';

interface MobileMoneyFormProps {
  amount: number;
  serviceType: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function MobileMoneyForm({ amount, serviceType, onSuccess, onError }: MobileMoneyFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<'MTN' | 'AIRTEL' | 'AFRICELL'>('MTN');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const networks = getUgandaNetworks();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!validateUgandaPhone(formData.phone)) {
      toast.error('Please enter a valid Uganda phone number (e.g., 077XXXXXXX, 075XXXXXXX, 079XXXXXXX)');
      return false;
    }
    return true;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const paymentData = {
        amount,
        phone_number: formData.phone,
        email: formData.email,
        name: formData.name,
        network: selectedNetwork,
        service_type: serviceType,
        external_id: generateTxRef(),
      };

      const response = await initializeUgandaPayment(paymentData);

      if (response.status === 'success' && response.payment_link) {
        toast.success(`Redirecting to ${selectedNetwork} Mobile Money payment...`);
        // Redirect to Pesapal payment page
        window.location.href = response.payment_link;
        onSuccess?.(response.data);
      } else if (response.status === 'success') {
        toast.success(response.message);
        // Direct success without redirect
        window.location.href = `/payment/success?transaction_id=${response.transaction_id}&network=${selectedNetwork}`;
        onSuccess?.(response.data);
      } else {
        toast.error(response.message || 'Payment initialization failed');
        onError?.(response.message || 'Payment failed');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error('Payment initialization failed. Please try again.');
      onError?.(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-3xl border-0">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Smartphone className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-semibold text-blue-900 dark:text-amber-400">
          Mobile Money Payment
        </CardTitle>
        <p className="text-blue-800 dark:text-amber-200">
          Pay {formatUGX(amount)} for {serviceType}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handlePayment} className="space-y-4">
          {/* Network Selection */}
          <div className="space-y-3">
            <Label className="text-blue-800 dark:text-amber-300 font-medium">
              Select Mobile Money Provider
            </Label>
            <RadioGroup
              value={selectedNetwork}
              onValueChange={(value) => setSelectedNetwork(value as 'MTN' | 'AIRTEL' | 'AFRICELL')}
              className="grid grid-cols-1 gap-3"
            >
              {networks.map((network) => (
                <div key={network.code} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={network.code}
                    id={network.code}
                    className="border-amber-500 text-amber-500"
                  />
                  <Label
                    htmlFor={network.code}
                    className="flex items-center space-x-3 cursor-pointer flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-blue-800 dark:text-amber-200 font-medium">
                      {network.name}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-blue-800 dark:text-amber-300 font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 border-gray-300 dark:border-gray-600 focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-blue-800 dark:text-amber-300 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 border-gray-300 dark:border-gray-600 focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-blue-800 dark:text-amber-300 font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g., 0700123456"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 border-gray-300 dark:border-gray-600 focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          {/* Payment Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-blue-600 hover:from-amber-600 hover:to-blue-700 text-white py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                Pay {formatUGX(amount)}
                <Smartphone className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Security Notice */}
        <div className="text-center text-sm text-blue-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
          🔒 Your payment is secured by Pesapal - Uganda's trusted payment gateway
        </div>
      </CardContent>
    </Card>
  );
}
