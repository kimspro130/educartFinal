"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CheckCircle, Star, BookOpen, PenTool, Calendar, BarChart, Clock, Users, Award, Target, Smartphone } from "lucide-react"
import Link from "next/link"
import { MobileMoneyForm } from "@/components/payment/mobile-money-form"

export default function PricingPage() {
  const [selectedService, setSelectedService] = useState<{
    name: string;
    amount: number;
    type: string;
  } | null>(null);

  const handlePaymentSuccess = (data: any) => {
    console.log('Payment successful:', data);
    setSelectedService(null);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 pt-16">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-600 via-amber-600 to-blue-800 dark:from-blue-800 dark:via-amber-800 dark:to-blue-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-amber-500/20 to-blue-500/20 dark:from-blue-600/30 dark:via-amber-700/30 dark:to-blue-700/30"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="max-w-4xl mx-auto text-center relative">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-thin text-white mb-4 sm:mb-6">Our Pricing</h1>
            <p className="text-lg sm:text-xl text-blue-100 dark:text-blue-200 leading-relaxed font-light mb-6 sm:mb-8 px-4">
              Transparent, affordable pricing for all your educational needs. Choose the service that fits your academic
              goals.
            </p>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium"
            >
              All prices in UGX (Ugandan Shillings)
            </Badge>
          </div>
        </div>
      </section>

      {/* Tutoring & Coursework Assistance */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100 dark:from-amber-900 dark:via-blue-900 dark:to-amber-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-500 to-blue-500 dark:from-amber-400 dark:to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
              Tutoring & Coursework Assistance
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light px-4">
              Personalized learning support with flexible scheduling and expert guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <Card className="border-0 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4 px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  Online Classes
                </CardTitle>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mt-4">UGX 30K</div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">per hour session</p>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    1-hour online tutoring session
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    Subject specialist tutor
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    Interactive learning materials
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Progress tracking</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full mt-6 py-3 text-sm sm:text-base"
                      onClick={() => setSelectedService({
                        name: 'Online Classes',
                        amount: 30000,
                        type: 'online-tutoring'
                      })}
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Pay with Mobile Money
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center text-blue-900 dark:text-amber-400">
                        Pay for Online Classes
                      </DialogTitle>
                    </DialogHeader>
                    {selectedService && (
                      <MobileMoneyForm
                        amount={selectedService.amount}
                        serviceType={selectedService.type}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-amber-600 to-blue-600 dark:from-amber-700 dark:to-blue-700 text-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 lg:scale-105">
              <CardHeader className="text-center pb-4 px-4 sm:px-6">
                <Badge className="bg-white/20 text-white mb-2 text-xs sm:text-sm">Most Popular</Badge>
                <CardTitle className="text-xl sm:text-2xl font-semibold text-white">Private Tutoring</CardTitle>
                <div className="text-3xl sm:text-4xl font-bold text-white mt-4">UGX 50K</div>
                <p className="text-sm sm:text-base text-amber-100 dark:text-amber-200">twice a week, 3 hrs/session</p>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-200 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-amber-100 dark:text-amber-200">At student's location</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-200 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-amber-100 dark:text-amber-200">
                    3-hour intensive sessions
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-200 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-amber-100 dark:text-amber-200">Twice weekly schedule</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-200 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-amber-100 dark:text-amber-200">Personalized curriculum</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-200 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-amber-100 dark:text-amber-200">Dedicated tutor</span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-white text-amber-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-amber-700 dark:hover:bg-gray-200 rounded-full mt-6 py-3 text-sm sm:text-base"
                      onClick={() => setSelectedService({
                        name: 'Private Tutoring',
                        amount: 50000,
                        type: 'tutoring'
                      })}
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Pay with Mobile Money
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center text-blue-900 dark:text-amber-400">
                        Pay for Private Tutoring
                      </DialogTitle>
                    </DialogHeader>
                    {selectedService && (
                      <MobileMoneyForm
                        amount={selectedService.amount}
                        serviceType={selectedService.type}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4 px-4 sm:px-6">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  Coursework Assistance
                </CardTitle>
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mt-4">
                  UGX 30K-50K
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">per assignment</p>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Assignment support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Research guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Quality deliveries</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Timely completion</span>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white rounded-full mt-6 py-3 text-sm sm:text-base">
                  Request Quote
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Writing & Editing Services */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-400 dark:to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <PenTool className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
              Writing & Editing Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light px-4">
              Professional writing and editing services for academic and professional documents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Essay Editing",
                price: "Custom Quote",
                description: "Professional proofreading and editing services",
              },
              {
                title: "Reference & Proofreading",
                price: "UGX 50K-100K",
                description: "Citation formatting and comprehensive proofreading",
              },
              {
                title: "Research Proposals",
                price: "UGX 70K",
                description: "Academic research proposal writing and formatting",
              },
              {
                title: "CV Writing",
                price: "Custom Quote",
                description: "Professional CV and resume writing services",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="border-0 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6 sm:p-8 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mb-4 sm:mb-6">
                    {service.price}
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-full py-3 text-sm sm:text-base">
                    {service.price.includes("Custom") ? "Get Quote" : "Order Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Assistance Services */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 dark:from-red-900 dark:via-pink-900 dark:to-rose-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-400 dark:to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
              Exam Assistance Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light px-4">
              Professional assistance for exams and assessments across all academic levels.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-800 dark:to-pink-800 rounded-3xl shadow-lg">
              <CardContent className="p-8 sm:p-12">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Exam Assistance
                  </h3>
                  <div className="text-4xl sm:text-5xl font-bold text-red-600 dark:text-red-400 mb-2">
                    UGX 50K - 130K
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">per assessment</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                      Types of Assistance:
                    </h4>
                    {[
                      "Online Exams",
                      "Coursework Assessments",
                      "Final Examinations",
                      "Professional Certifications",
                    ].map((type, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{type}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                      Service Features:
                    </h4>
                    {["Confidential service", "Expert subject specialists", "Timely delivery", "Quality assurance"].map(
                      (feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="text-center mt-6 sm:mt-8">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full w-full sm:w-auto"
                  >
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic Holiday Programs */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 dark:from-orange-900 dark:via-amber-900 dark:to-yellow-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
              Academic Holiday Programs
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light px-4">
              Comprehensive holiday work support across all academic levels.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-800 dark:to-red-800 rounded-3xl shadow-lg">
              <CardContent className="p-8 sm:p-12">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Holiday Works (Per Level)
                  </h3>
                  <div className="text-4xl sm:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    UGX 30K
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">per academic level</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                      Available Levels:
                    </h4>
                    {["Kindergarten", "Upper Primary", "Middle Primary", "Secondary Level"].map((level, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 dark:text-orange-400 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{level}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                      What's Included:
                    </h4>
                    {[
                      "Complete holiday assignments",
                      "Subject-specific support",
                      "Quality assurance",
                      "Timely delivery",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 dark:text-orange-400 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-6 sm:mt-8">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full w-full sm:w-auto"
                        onClick={() => setSelectedService({
                          name: 'Holiday Works',
                          amount: 30000,
                          type: 'holiday-program'
                        })}
                      >
                        <Smartphone className="mr-2 h-4 w-4" />
                        Pay with Mobile Money
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-center text-blue-900 dark:text-amber-400">
                          Pay for Holiday Works
                        </DialogTitle>
                      </DialogHeader>
                      {selectedService && (
                        <MobileMoneyForm
                          amount={selectedService.amount}
                          serviceType={selectedService.type}
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reports & Projects */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100 dark:from-purple-900 dark:via-pink-900 dark:to-rose-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <BarChart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
              Reports & Projects
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light px-4">
              Advanced AI tools training and project development services.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="border-0 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 text-white rounded-3xl shadow-lg">
              <CardContent className="p-8 sm:p-12">
                <div className="text-center mb-6 sm:mb-8">
                  <Badge className="bg-white/20 text-white mb-3 sm:mb-4 text-xs sm:text-sm">Premium Service</Badge>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3 sm:mb-4">AI Tools Training</h3>
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">UGX 500K</div>
                  <p className="text-base sm:text-lg text-purple-100 dark:text-purple-200">
                    comprehensive training package
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">AI Tools Covered:</h4>
                    {["ChatGPT Advanced", "Deep Seek", "Gemini", "Perplexity"].map((tool, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-purple-100 dark:text-purple-200">{tool}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Training Features:</h4>
                    {["Hands-on workshops", "Real-world applications", "Certification included", "Ongoing support"].map(
                      (feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-200 flex-shrink-0" />
                          <span className="text-sm sm:text-base text-purple-100 dark:text-purple-200">{feature}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="text-center mt-6 sm:mt-8">
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-purple-700 dark:hover:bg-gray-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full w-full sm:w-auto"
                  >
                    Join Training Program
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 dark:from-indigo-900 dark:via-blue-900 dark:to-cyan-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
              Why Choose EDUCART?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light px-4">
              We deliver quality, reliability, and excellence in every service we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Clock,
                title: "Timely Delivery",
                description: "We guarantee on-time delivery for all our services with consistent quality standards.",
                gradient: "from-blue-500 to-purple-500",
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Our qualified educators and professionals bring years of experience to every project.",
                gradient: "from-green-500 to-teal-500",
              },
              {
                icon: Award,
                title: "Quality Assurance",
                description: "Every deliverable undergoes rigorous quality checks to ensure excellence.",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <CardContent className="p-6 sm:p-8">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.gradient} dark:from-blue-400 dark:to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6`}
                  >
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-700 via-amber-700 to-blue-900 dark:from-blue-800 dark:via-amber-800 dark:to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-amber-600/30 to-blue-600/30 dark:from-blue-600/40 dark:via-amber-700/40 dark:to-blue-700/40 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-white mb-4 sm:mb-6 px-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-amber-100 dark:text-amber-200 mb-8 sm:mb-12 max-w-3xl mx-auto font-light px-4">
            Choose the service that fits your needs and take the next step in your educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100 dark:bg-gray-100 dark:text-amber-700 dark:hover:bg-gray-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full w-full sm:w-auto"
            >
              Contact Us Today
            </Button>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-amber-600 dark:border-gray-300 dark:hover:bg-gray-100 dark:hover:text-amber-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full w-full sm:w-auto"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
