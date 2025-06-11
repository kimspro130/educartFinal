"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react"
import { useState } from "react"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would handle form submission here
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-blue-50 to-amber-100 dark:from-gray-900 dark:via-amber-900/20 dark:to-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-thin text-blue-900 dark:text-amber-400 mb-6 transition-colors duration-300">Contact Us</h1>
            <p className="text-xl text-blue-800 dark:text-amber-200 leading-relaxed font-light transition-colors duration-300">
              Have questions or need assistance? Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-semibold text-blue-900 dark:text-amber-400 mb-8 transition-colors duration-300">Get in Touch</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-2 transition-colors duration-300">Our Location</h3>
                    <p className="text-blue-800 dark:text-amber-200 transition-colors duration-300">
                      123 Education Street
                      <br />
                      Kampala, Uganda
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-2 transition-colors duration-300">Phone Number</h3>
                    <p className="text-blue-800 dark:text-amber-200 transition-colors duration-300">+256 700 123 456</p>
                    <p className="text-blue-800 dark:text-amber-200 transition-colors duration-300">+256 780 987 654</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-2 transition-colors duration-300">Email Address</h3>
                    <p className="text-blue-800 dark:text-amber-200 transition-colors duration-300">info@educartuganda.com</p>
                    <p className="text-blue-800 dark:text-amber-200 transition-colors duration-300">support@educartuganda.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-2 transition-colors duration-300">Working Hours</h3>
                    <p className="text-blue-800 dark:text-amber-200 transition-colors duration-300">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-blue-800 dark:text-amber-200 transition-colors duration-300">Saturday: 9:00 AM - 1:00 PM</p>
                    <p className="text-blue-800 dark:text-amber-200 transition-colors duration-300">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-4 transition-colors duration-300">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-600 dark:bg-amber-600 rounded-full flex items-center justify-center hover:bg-blue-700 dark:hover:bg-amber-700 transition-colors duration-300"
                  >
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-400 dark:bg-amber-500 rounded-full flex items-center justify-center hover:bg-blue-500 dark:hover:bg-amber-600 transition-colors duration-300"
                  >
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-pink-600 dark:bg-amber-700 rounded-full flex items-center justify-center hover:bg-pink-700 dark:hover:bg-amber-800 transition-colors duration-300"
                  >
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-800 dark:bg-amber-800 rounded-full flex items-center justify-center hover:bg-blue-900 dark:hover:bg-amber-900 transition-colors duration-300"
                  >
                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg rounded-3xl overflow-hidden bg-white dark:bg-gray-800 transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-blue-900 dark:text-amber-400 transition-colors duration-300">Send Us a Message</h2>
                  </div>

                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-2 transition-colors duration-300">Message Sent!</h3>
                      <p className="text-blue-800 dark:text-amber-200 transition-colors duration-300">Thank you for contacting us. We'll get back to you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-blue-800 dark:text-amber-300 mb-1 transition-colors duration-300">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-amber-500 focus:ring-amber-500 transition-colors duration-300"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-blue-800 dark:text-amber-300 mb-1 transition-colors duration-300">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-amber-500 focus:ring-amber-500 transition-colors duration-300"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-blue-800 dark:text-amber-300 mb-1 transition-colors duration-300">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          placeholder="How can we help you?"
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-amber-500 focus:ring-amber-500 transition-colors duration-300"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-blue-800 dark:text-amber-300 mb-1 transition-colors duration-300">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Your message"
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-amber-500 focus:ring-amber-500 min-h-[150px] transition-colors duration-300"
                          required
                        />
                      </div>

                      <AnimatedButton
                        variant="gradient"
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-blue-600 hover:from-amber-600 hover:to-blue-700 text-white font-medium transition-all duration-300"
                      >
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </AnimatedButton>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-amber-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-blue-900 dark:text-amber-400 mb-4 transition-colors duration-300">Our Location</h2>
            <p className="text-blue-800 dark:text-amber-200 max-w-2xl mx-auto transition-colors duration-300">
              Visit our office in Kampala, Uganda. We're conveniently located in the heart of the city.
            </p>
          </div>

          <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-lg h-[400px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-colors duration-300">
            {/* In a real application, you would embed a Google Map or other map service here */}
            <div className="text-center">
              <MapPin className="h-12 w-12 text-amber-600 dark:text-amber-400 mx-auto mb-4 transition-colors duration-300" />
              <p className="text-blue-800 dark:text-amber-300 font-medium transition-colors duration-300">Interactive Map Placeholder</p>
              <p className="text-blue-700 dark:text-amber-200 transition-colors duration-300">123 Education Street, Kampala, Uganda</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-amber-100 via-blue-50 to-amber-50 dark:from-amber-900/30 dark:via-blue-900/20 dark:to-amber-800/30 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:scale-110 hover:rotate-12 transition-all duration-300">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-thin text-blue-900 dark:text-amber-400 mb-6 transition-colors duration-300">Frequently Asked Questions</h2>
            <p className="text-xl text-blue-800 dark:text-amber-200 max-w-3xl mx-auto font-light transition-colors duration-300">
              Find answers to common questions about our services and support.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "What are your operating hours?",
                answer:
                  "Our office is open Monday through Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 1:00 PM. We are closed on Sundays and public holidays.",
              },
              {
                question: "How quickly can I expect a response to my inquiry?",
                answer:
                  "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, we recommend calling our customer support line.",
              },
              {
                question: "Do you offer services outside of Kampala?",
                answer:
                  "Yes, we offer our services throughout Uganda. While our physical office is in Kampala, we provide online tutoring, remote assistance, and can arrange for in-person services in other major cities.",
              },
              {
                question: "How can I schedule a consultation?",
                answer:
                  "You can schedule a consultation by filling out the contact form on this page, calling our office, or sending us an email. Our team will get back to you to arrange a convenient time.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept mobile money payments (MTN, Airtel), bank transfers, and cash payments at our office. For international clients, we also accept PayPal and credit card payments.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="border-0 bg-gradient-to-r from-white to-amber-50 dark:from-gray-800 dark:to-amber-900/20 shadow-lg rounded-3xl hover:shadow-2xl dark:hover:shadow-amber-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group"
                style={{
                  background: index % 2 === 0
                    ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)'
                }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      index % 2 === 0
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                    } shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-blue-900 dark:text-amber-400 mb-4 transition-colors duration-300 group-hover:text-amber-600 dark:group-hover:text-amber-300">{faq.question}</h3>
                      <p className="text-blue-800 dark:text-amber-200 leading-relaxed transition-colors duration-300">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-amber-500 to-blue-700 dark:from-amber-600 dark:via-blue-600 dark:to-amber-700 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-blue-500/20 to-amber-600/20 animate-pulse"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-6 animate-bounce-in">Ready to Transform Your Educational Journey?</h2>
          <p className="text-xl text-amber-100 dark:text-blue-100 mb-12 max-w-3xl mx-auto font-light transition-colors duration-300">
            Contact us today and take the first step towards academic excellence with EDUCART Uganda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-amber-600 hover:bg-amber-50 dark:bg-gray-100 dark:text-amber-700 dark:hover:bg-gray-200 px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300 animate-pulse-slow hover:animate-none"
            >
              Call Us Now
              <Phone className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-amber-600 dark:hover:text-amber-700 px-8 py-4 text-lg rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-rotate-1"
            >
              Email Us
              <Mail className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
