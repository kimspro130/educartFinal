# 🇺🇬 Uganda Mobile Money Integration Guide

## 🎯 Overview
This guide helps you set up mobile money payments for EDUCART Uganda using **MTN MoMo API** and **Pesapal** - both easily accessible in Uganda.

## 📱 Supported Networks
- **MTN Mobile Money** (Direct API integration)
- **Airtel Money** (via Pesapal)
- **Africell Money** (via Pesapal)

## 🔧 Setup Requirements

### **Option 1: MTN MoMo API (Recommended for MTN)**

#### **Why MTN MoMo API?**
- ✅ Direct integration with Uganda's largest mobile money provider
- ✅ No complex business verification required
- ✅ Sandbox environment for testing
- ✅ Well-documented API
- ✅ Local support in Uganda

#### **Getting Started with MTN MoMo**
1. **Visit**: https://momodeveloper.mtn.com
2. **Sign Up**: Create a developer account
3. **Subscribe**: Subscribe to Collections API
4. **Get Credentials**: 
   - Subscription Key
   - API User ID
   - API Key

#### **MTN MoMo Setup Steps**
```bash
# 1. Create API User (Sandbox)
curl -X POST \
  https://sandbox.momodeveloper.mtn.com/v1_0/apiuser \
  -H 'X-Reference-Id: your-reference-id' \
  -H 'Ocp-Apim-Subscription-Key: your-subscription-key' \
  -d '{"providerCallbackHost": "your-callback-url"}'

# 2. Create API Key
curl -X POST \
  https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/your-api-user-id/apikey \
  -H 'Ocp-Apim-Subscription-Key: your-subscription-key'
```

### **Option 2: Pesapal (For Airtel & Africell)**

#### **Why Pesapal?**
- ✅ Uganda-based payment gateway
- ✅ Supports multiple mobile money providers
- ✅ Easy merchant registration
- ✅ Local customer support
- ✅ Established in East Africa

#### **Getting Started with Pesapal**
1. **Visit**: https://www.pesapal.com
2. **Register**: Create a merchant account
3. **Verification**: Complete business verification
4. **Get Credentials**:
   - Consumer Key
   - Consumer Secret
   - IPN ID

## 🔑 Environment Variables

Create a `.env.local` file with:

```env
# MTN MoMo Configuration
MTN_MOMO_SUBSCRIPTION_KEY=your-subscription-key
MTN_MOMO_API_USER_ID=your-api-user-id
MTN_MOMO_API_KEY=your-api-key

# Pesapal Configuration
PESAPAL_CONSUMER_KEY=your-consumer-key
PESAPAL_CONSUMER_SECRET=your-consumer-secret
PESAPAL_IPN_ID=your-ipn-id

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Features Implemented

### ✅ **Smart Phone Number Detection**
- Automatically detects network from phone number
- Validates Uganda phone number formats
- Supports all major prefixes:
  - MTN: 077, 078, 076
  - Airtel: 075, 070, 074
  - Africell: 079

### ✅ **Payment Flow**
1. **User enters phone number**
2. **System detects network automatically**
3. **Routes to appropriate API**:
   - MTN → MTN MoMo API
   - Airtel/Africell → Pesapal
4. **User receives payment prompt on phone**
5. **Real-time payment verification**

### ✅ **Security Features**
- Phone number validation
- Transaction reference tracking
- Secure API key handling
- Error handling and retry logic

## 📱 Testing

### **Test Phone Numbers**

#### **MTN MoMo (Sandbox)**
- Format: 256XXXXXXXXX
- Test numbers: Any valid MTN format
- Amount: Any amount (sandbox)

#### **Pesapal (Demo)**
- Use demo credentials for testing
- Test with small amounts first

### **Test Flow**
1. Use test credentials
2. Enter valid Uganda phone number
3. Check payment prompt on phone
4. Verify payment status

## 🔍 API Endpoints

### **MTN MoMo Endpoints**
- **Initialize**: `/api/payment/mtn-momo`
- **Verify**: `/api/payment/verify-uganda?network=MTN`

### **Pesapal Endpoints**
- **Initialize**: `/api/payment/pesapal`
- **Verify**: `/api/payment/verify-uganda?network=AIRTEL`

### **Unified Verification**
- **Endpoint**: `/api/payment/verify-uganda`
- **Parameters**: `transaction_id`, `network`

## 🛠️ Customization

### **Add New Networks**
Edit `lib/uganda-payment-service.ts`:
```typescript
export function getUgandaNetworks() {
  return [
    // Add new network here
    {
      code: 'NEW_NETWORK',
      name: 'New Network Money',
      prefixes: ['073'],
      color: '#00FF00',
    },
  ];
}
```

### **Modify Payment Amounts**
Edit service prices in `app/payment/page.tsx`:
```typescript
const services = [
  {
    id: 'new-service',
    name: 'New Service',
    price: 25000, // UGX
  },
];
```

## 🔐 Security Best Practices

1. **Never expose API keys** in client-side code
2. **Use environment variables** for all credentials
3. **Validate phone numbers** before processing
4. **Implement rate limiting** for API calls
5. **Log all transactions** for audit trails

## 📊 Monitoring & Analytics

### **Payment Tracking**
- Transaction IDs for all payments
- Network-specific success rates
- Payment completion times
- Error rate monitoring

### **User Analytics**
- Most popular networks
- Payment success by network
- Geographic distribution
- Peak usage times

## 🚀 Going Live

### **Pre-Launch Checklist**
- [ ] MTN MoMo production credentials
- [ ] Pesapal live merchant account
- [ ] Environment variables updated
- [ ] Payment flow tested end-to-end
- [ ] Error handling verified
- [ ] Monitoring set up

### **Launch Steps**
1. **Switch to production credentials**
2. **Update environment variables**
3. **Test with real mobile money**
4. **Monitor first transactions**
5. **Scale gradually**

## 📞 Support

### **MTN MoMo Support**
- **Developer Portal**: https://momodeveloper.mtn.com
- **Documentation**: https://momodeveloper.mtn.com/docs
- **Support**: developer@mtn.com

### **Pesapal Support**
- **Website**: https://www.pesapal.com
- **Support**: support@pesapal.com
- **Phone**: +254 20 2606 361

### **EDUCART Support**
- **Email**: support@educartuganda.com
- **Phone**: +256 700 123 456

## 🎉 Success Metrics

Track these KPIs:
- **Payment Success Rate**: % of successful payments
- **Network Performance**: Success rate by network
- **User Adoption**: Most used payment methods
- **Revenue Growth**: Total payments processed
- **Geographic Reach**: Payment distribution

## 💡 Pro Tips

### **For Better Success Rates**
1. **Clear instructions** for users
2. **Network auto-detection** from phone numbers
3. **Real-time status updates**
4. **Retry mechanisms** for failed payments
5. **Customer support** for payment issues

### **For Better User Experience**
1. **Fast payment processing**
2. **Clear error messages**
3. **Mobile-optimized interface**
4. **Multiple payment options**
5. **Payment confirmation receipts**

## 🌟 Advantages Over Flutterwave

### **Accessibility**
- ✅ **Local APIs** - easier to access in Uganda
- ✅ **No complex verification** - faster setup
- ✅ **Local support** - help in your timezone
- ✅ **Better rates** - competitive pricing

### **Integration**
- ✅ **Direct MTN integration** - no middleman
- ✅ **Pesapal local presence** - Uganda office
- ✅ **Faster approvals** - local processes
- ✅ **Better documentation** - clear guides

Your EDUCART Uganda platform now uses **Uganda-friendly mobile money APIs** that are easily accessible and provide excellent user experience! 🇺🇬🎓✨
