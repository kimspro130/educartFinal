"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileMoneyForm } from '@/components/payment/mobile-money-form';
import { ArrowLeft, Smartphone, CreditCard, Banknote } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'online-classes',
    name: 'Online Classes',
    price: 30000,
    description: '1-hour online tutoring session with subject specialist',
    popular: false,
  },
  {
    id: 'private-tutoring',
    name: 'Private Tutoring',
    price: 50000,
    description: 'Twice weekly, 3-hour intensive sessions at student location',
    popular: true,
  },
  {
    id: 'coursework-assistance',
    name: 'Coursework Assistance',
    price: 40000,
    description: 'Assignment support and research guidance',
    popular: false,
  },
  {
    id: 'holiday-works',
    name: 'Holiday Works',
    price: 30000,
    description: 'Complete holiday assignments per academic level',
    popular: false,
  },
  {
    id: 'exam-assistance',
    name: 'Exam Assistance',
    price: 90000,
    description: 'Professional assistance for exams and assessments',
    popular: false,
  },
];

export default function PaymentPage() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleServiceSelect = (service: typeof services[0]) => {
    setSelectedService(service);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = (data: any) => {
    console.log('Payment successful:', data);
    setShowPaymentForm(false);
    setSelectedService(null);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (showPaymentForm && selectedService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100 dark:from-gray-900 dark:via-amber-900/20 dark:to-gray-800 pt-16">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setShowPaymentForm(false)}
              className="mb-6 text-blue-800 dark:text-amber-300 hover:text-amber-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
            
            <MobileMoneyForm
              amount={selectedService.price}
              serviceType={selectedService.id}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100 dark:from-gray-900 dark:via-amber-900/20 dark:to-gray-800 pt-16">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Smartphone className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-thin text-blue-900 dark:text-amber-400 mb-4">
            Choose Your Service
          </h1>
          <p className="text-xl text-blue-800 dark:text-amber-200 max-w-3xl mx-auto">
            Select a service and pay securely with Mobile Money
          </p>
        </div>

        {/* Payment Methods Info */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg rounded-3xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-blue-900 dark:text-amber-400 mb-6 text-center">
                Supported Payment Methods
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-sm overflow-hidden">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg"
                      alt="MTN Mobile Money logo"
                      className="w-14 h-14 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.style.backgroundColor = '#FFCC00';
                          parent.innerHTML = '<span class="text-black font-bold text-xl">MTN</span>';
                        }
                      }}
                    />
                  </div>
                  <h4 className="font-semibold text-blue-900 dark:text-amber-400 mb-2">MTN Mobile Money</h4>
                  <p className="text-blue-800 dark:text-amber-200 text-sm">Pay with MTN MoMo</p>
                  <p className="text-xs text-blue-600 dark:text-amber-300 mt-1">077, 078, 076</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-sm overflow-hidden">
                    <img
                      src="https://s3-ap-southeast-1.amazonaws.com/bsy/iportal/images/airtel-logo-white-text-vertical.jpg"
                      alt="Airtel Money logo"
                      className="w-12 h-14 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<span class="text-white font-bold text-lg">AIRTEL</span>';
                        }
                      }}
                    />
                  </div>
                  <h4 className="font-semibold text-blue-900 dark:text-amber-400 mb-2">Airtel Money</h4>
                  <p className="text-blue-800 dark:text-amber-200 text-sm">Pay with Airtel Money</p>
                  <p className="text-xs text-blue-600 dark:text-amber-300 mt-1">075, 070, 074</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-sm overflow-hidden">
                    <img
                      src="https://images.seeklogo.com/logo-png/40/1/africell-logo-png_seeklogo-402658.png"
                      alt="Africell Money logo"
                      className="w-14 h-14 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.style.backgroundColor = '#0066CC';
                          parent.innerHTML = '<span class="text-white font-bold text-lg">AFRICELL</span>';
                        }
                      }}
                    />
                  </div>
                  <h4 className="font-semibold text-blue-900 dark:text-amber-400 mb-2">Africell Money</h4>
                  <p className="text-blue-800 dark:text-amber-200 text-sm">Pay with Africell Money</p>
                  <p className="text-xs text-blue-600 dark:text-amber-300 mt-1">079</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`border-0 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer ${
                service.popular
                  ? 'bg-gradient-to-br from-amber-500 to-blue-500 text-white scale-105'
                  : 'bg-white dark:bg-gray-800 hover:scale-105'
              }`}
              onClick={() => handleServiceSelect(service)}
            >
              <CardHeader className="text-center pb-4">
                {service.popular && (
                  <Badge className="bg-white/20 text-white mb-2 mx-auto w-fit">
                    Most Popular
                  </Badge>
                )}
                <CardTitle className={`text-xl font-semibold ${
                  service.popular ? 'text-white' : 'text-blue-900 dark:text-amber-400'
                }`}>
                  {service.name}
                </CardTitle>
                <div className={`text-3xl font-bold mt-4 ${
                  service.popular ? 'text-white' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {formatCurrency(service.price)}
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className={`mb-6 leading-relaxed ${
                  service.popular ? 'text-amber-100' : 'text-blue-800 dark:text-amber-200'
                }`}>
                  {service.description}
                </p>
                <Button
                  className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                    service.popular
                      ? 'bg-white text-amber-600 hover:bg-gray-100'
                      : 'bg-gradient-to-r from-amber-500 to-blue-600 hover:from-amber-600 hover:to-blue-700 text-white'
                  }`}
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  Pay Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back to Pricing */}
        <div className="text-center mt-12">
          <Link href="/pricing">
            <Button variant="outline" className="px-8 py-3 rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              View All Pricing Plans
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
