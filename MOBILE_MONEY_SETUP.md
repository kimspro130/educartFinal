# 📱 Mobile Money Integration Setup Guide

## 🎯 Overview
This guide will help you set up mobile money payments for EDUCART Uganda using Flutterwave API, supporting MTN Mobile Money, Airtel Money, and Africell Money.

## 🔧 Prerequisites
- Flutterwave account (https://flutterwave.com)
- Business verification with Flutterwave
- Uganda business registration

## 📋 Setup Steps

### 1. **Create Flutterwave Account**
1. Visit https://flutterwave.com
2. Sign up for a business account
3. Complete business verification
4. Get approved for Uganda mobile money

### 2. **Get API Keys**
1. Login to Flutterwave Dashboard
2. Go to Settings > API Keys
3. Copy your keys:
   - Public Key (starts with `FLWPUBK_`)
   - Secret Key (starts with `FLWSECK_`)
   - Encryption Key

### 3. **Configure Environment Variables**
Update your `.env.local` file:

```env
# Flutterwave Configuration
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your-public-key-here
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your-secret-key-here
FLUTTERWAVE_ENCRYPTION_KEY=your-encryption-key-here

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Webhook Configuration
FLUTTERWAVE_WEBHOOK_SECRET=your-webhook-secret-here
```

### 4. **Test Mode vs Live Mode**
- **Test Mode**: Use `FLWPUBK_TEST-` and `FLWSECK_TEST-` keys
- **Live Mode**: Use `FLWPUBK-` and `FLWSECK-` keys (after approval)

### 5. **Webhook Setup**
1. In Flutterwave Dashboard, go to Settings > Webhooks
2. Add webhook URL: `https://yourdomain.com/api/payment/webhook`
3. Set webhook secret in environment variables

## 🚀 Features Implemented

### ✅ **Payment Components**
- `MobileMoneyForm` - Payment form with network selection
- `PaymentSuccessPage` - Success page with receipt
- API routes for payment verification

### ✅ **Supported Networks**
- MTN Mobile Money
- Airtel Money  
- Africell Money

### ✅ **Payment Flow**
1. User selects service and amount
2. Chooses mobile money provider
3. Enters payment details
4. Redirected to Flutterwave
5. Completes payment on mobile
6. Redirected back to success page

### ✅ **Security Features**
- Webhook signature verification
- Payment verification
- Secure API key handling
- Transaction reference tracking

## 📱 Usage Examples

### **Direct Payment Page**
Visit: `http://localhost:3000/payment`

### **Integrated in Pricing**
- Online Classes: UGX 30,000
- Private Tutoring: UGX 50,000  
- Holiday Works: UGX 30,000
- Exam Assistance: UGX 90,000

### **Payment Success**
Visit: `http://localhost:3000/payment/success?transaction_id=123`

## 🔍 Testing

### **Test Phone Numbers (Flutterwave)**
- MTN: `+256700000000`
- Airtel: `+256750000000`
- Africell: `+256740000000`

### **Test Amounts**
- Any amount works in test mode
- Use real amounts for live testing

## 🛠️ Customization

### **Add New Services**
Edit `app/payment/page.tsx`:
```typescript
const services = [
  {
    id: 'new-service',
    name: 'New Service',
    price: 25000,
    description: 'Service description',
    popular: false,
  },
  // ... existing services
];
```

### **Modify Payment Form**
Edit `components/payment/mobile-money-form.tsx` to:
- Add custom fields
- Change styling
- Add validation rules

### **Update Success Page**
Edit `app/payment/success/page.tsx` to:
- Add custom messaging
- Include additional information
- Integrate with your database

## 🔐 Security Best Practices

1. **Never expose secret keys** in client-side code
2. **Verify all payments** on your backend
3. **Use HTTPS** in production
4. **Validate webhook signatures**
5. **Log all transactions** for audit

## 📊 Monitoring

### **Payment Tracking**
- All payments logged in Flutterwave dashboard
- Webhook events for real-time updates
- Transaction references for tracking

### **Error Handling**
- Payment failures handled gracefully
- User-friendly error messages
- Automatic retry mechanisms

## 🚀 Going Live

### **Pre-Launch Checklist**
- [ ] Business verification complete
- [ ] Live API keys configured
- [ ] Webhook URL updated
- [ ] SSL certificate installed
- [ ] Payment flow tested
- [ ] Error handling verified

### **Launch Steps**
1. Switch to live API keys
2. Update webhook URL to production
3. Test with small amounts
4. Monitor first transactions
5. Scale up gradually

## 📞 Support

### **Flutterwave Support**
- Email: support@flutterwave.com
- Phone: +234 1 888 5555
- Documentation: https://developer.flutterwave.com

### **EDUCART Support**
- Email: support@educartuganda.com
- Phone: +256 700 123 456

## 🎉 Success!
Your mobile money integration is now ready! Users can pay for educational services using their mobile money accounts across all major networks in Uganda.
