# 🇺🇬 Pesapal Integration Guide for EDUCART Uganda

## 🎯 Overview
This guide helps you set up **Pesapal** for all mobile money payments in Uganda. Pesapal is a Uganda-based payment gateway that supports **MTN Mobile Money**, **Airtel Money**, and **Africell Money** through a single integration.

## 🌟 Why Pesapal?

### ✅ **Perfect for Uganda**
- **Local Company** - Based in Uganda with local support
- **All Networks** - MTN, Airtel, Africell in one integration
- **Easy Setup** - Simple merchant registration
- **Trusted** - Used by major businesses in Uganda
- **Reliable** - Established payment infrastructure

### ✅ **Business Benefits**
- **Single Integration** - One API for all mobile money networks
- **Local Support** - Customer service in Uganda
- **Competitive Rates** - Fair transaction fees
- **Fast Settlement** - Quick payment processing
- **Compliance** - Meets Uganda financial regulations

## 🚀 Getting Started

### **Step 1: Create Pesapal Account**
1. **Visit**: https://www.pesapal.com
2. **Click**: "Get Started" or "Register"
3. **Choose**: "Merchant Account"
4. **Fill**: Business registration details

### **Step 2: Business Verification**
1. **Business License** - Upload valid business license
2. **Tax ID** - Provide URA tax identification
3. **Bank Details** - Add business bank account
4. **Contact Info** - Verify phone and email

### **Step 3: Get API Credentials**
After approval, you'll receive:
- **Consumer Key** - Your unique identifier
- **Consumer Secret** - Your secret key
- **IPN ID** - Instant Payment Notification ID

## 🔧 Technical Setup

### **Environment Variables**
Add these to your `.env.local` file:

```env
# Pesapal Configuration
PESAPAL_CONSUMER_KEY=your-consumer-key-here
PESAPAL_CONSUMER_SECRET=your-consumer-secret-here
PESAPAL_IPN_ID=your-ipn-id-here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **For Production (Vercel)**
Add these environment variables in Vercel Dashboard:

```env
PESAPAL_CONSUMER_KEY=your-live-consumer-key
PESAPAL_CONSUMER_SECRET=your-live-consumer-secret
PESAPAL_IPN_ID=your-live-ipn-id
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## 📱 Supported Mobile Money Networks

### **MTN Mobile Money**
- **Prefixes**: 077, 078, 076
- **Coverage**: Nationwide
- **Users**: Largest mobile money network in Uganda

### **Airtel Money**
- **Prefixes**: 075, 070, 074
- **Coverage**: Major cities and towns
- **Users**: Second largest network

### **Africell Money**
- **Prefixes**: 079
- **Coverage**: Growing network
- **Users**: Emerging mobile money service

## 🔄 Payment Flow

### **For Students**
1. **Select Service** - Choose tutoring, coursework help, etc.
2. **Enter Details** - Name, email, phone number
3. **Auto-Detection** - System detects network from phone
4. **Click Pay** - Redirected to Pesapal payment page
5. **Choose Network** - Select MTN, Airtel, or Africell
6. **Enter PIN** - Complete payment with mobile money PIN
7. **Confirmation** - Instant payment confirmation

### **Technical Flow**
1. **Payment Request** → Pesapal API
2. **Redirect** → Pesapal payment page
3. **User Payment** → Mobile money network
4. **Callback** → Your application
5. **Verification** → Payment status check
6. **Success Page** → Payment confirmation

## 🛠️ API Endpoints

### **Payment Initialization**
- **Endpoint**: `/api/payment/pesapal`
- **Method**: POST
- **Purpose**: Create payment request

### **Payment Verification**
- **Endpoint**: `/api/payment/pesapal`
- **Method**: GET
- **Purpose**: Check payment status

### **Payment Callback**
- **Endpoint**: `/api/payment/pesapal/callback`
- **Method**: GET/POST
- **Purpose**: Handle payment completion

## 🧪 Testing

### **Demo Environment**
- **URL**: https://cybqa.pesapal.com/pesapalv3
- **Credentials**: Use demo consumer key/secret
- **Test Cards**: Provided by Pesapal

### **Test Phone Numbers**
Use any valid Uganda phone number format:
- MTN: 077XXXXXXX, 078XXXXXXX, 076XXXXXXX
- Airtel: 075XXXXXXX, 070XXXXXXX, 074XXXXXXX
- Africell: 079XXXXXXX

### **Test Amounts**
- **Minimum**: UGX 1,000
- **Maximum**: UGX 5,000,000 (or your account limit)
- **Recommended**: Start with UGX 1,000 - 10,000

## 💰 Pricing & Fees

### **Transaction Fees**
- **MTN Mobile Money**: ~2.5% + UGX 500
- **Airtel Money**: ~2.5% + UGX 500
- **Africell Money**: ~2.5% + UGX 500

### **Settlement**
- **Frequency**: Daily or weekly
- **Method**: Bank transfer to your account
- **Time**: T+1 or T+2 business days

## 🔐 Security Features

### **Built-in Security**
- **SSL Encryption** - All data encrypted in transit
- **PCI Compliance** - Meets international standards
- **Fraud Detection** - Automatic fraud monitoring
- **3D Secure** - Additional authentication layer

### **Your Implementation**
- **Phone Validation** - Uganda number format checking
- **Transaction Logging** - All payments tracked
- **Error Handling** - Graceful failure management
- **Callback Verification** - Secure payment confirmation

## 📊 Monitoring & Analytics

### **Pesapal Dashboard**
- **Transaction History** - All payment records
- **Success Rates** - Payment completion statistics
- **Revenue Reports** - Daily, weekly, monthly summaries
- **Network Performance** - Success rates by mobile money provider

### **Your Analytics**
- **Popular Networks** - Most used mobile money services
- **Payment Patterns** - Peak usage times
- **Service Popularity** - Most purchased services
- **Geographic Data** - Payment locations

## 🚀 Going Live

### **Pre-Launch Checklist**
- [ ] Pesapal merchant account approved
- [ ] Live API credentials obtained
- [ ] Environment variables updated
- [ ] Payment flow tested end-to-end
- [ ] Callback URL configured
- [ ] IPN notifications working

### **Launch Steps**
1. **Switch Environment** - Update to live Pesapal URLs
2. **Update Credentials** - Use live consumer key/secret
3. **Test Small** - Process small test payments
4. **Monitor Closely** - Watch first transactions
5. **Scale Up** - Increase payment volumes

## 📞 Support

### **Pesapal Support**
- **Website**: https://www.pesapal.com
- **Email**: support@pesapal.com
- **Phone**: +256 414 671 712 (Uganda)
- **Address**: Kampala, Uganda

### **Developer Resources**
- **Documentation**: https://developer.pesapal.com
- **API Reference**: Comprehensive API docs
- **SDKs**: Available for multiple languages
- **Community**: Developer forums and support

### **EDUCART Support**
- **Email**: support@educartuganda.com
- **Phone**: +256 700 123 456

## 🎯 Success Tips

### **For Better Conversion**
1. **Clear Instructions** - Guide users through payment
2. **Network Auto-Detection** - Detect from phone number
3. **Mobile Optimization** - Perfect mobile experience
4. **Fast Loading** - Quick payment page load times
5. **Error Recovery** - Help users retry failed payments

### **For Better Experience**
1. **Instant Confirmation** - Real-time payment status
2. **Professional Receipts** - Branded payment confirmations
3. **Customer Support** - Help with payment issues
4. **Multiple Options** - All major networks supported
5. **Transparent Pricing** - Clear service costs

## 🌟 Advantages of Pesapal

### **vs International Gateways**
- ✅ **Local Presence** - Uganda-based company
- ✅ **Better Rates** - Competitive local pricing
- ✅ **Faster Setup** - Quicker merchant approval
- ✅ **Local Support** - Customer service in Uganda
- ✅ **Regulatory Compliance** - Meets Uganda requirements

### **vs Direct Integrations**
- ✅ **Single Integration** - One API for all networks
- ✅ **Unified Reporting** - All payments in one dashboard
- ✅ **Simplified Settlement** - One payment to your account
- ✅ **Reduced Complexity** - Less technical overhead
- ✅ **Better Support** - Single point of contact

## 🎉 Ready to Launch!

Your **EDUCART Uganda** platform now has:
- 🇺🇬 **Complete Uganda mobile money support**
- 📱 **All major networks** (MTN, Airtel, Africell)
- 🔒 **Secure payment processing** with Pesapal
- 💰 **Competitive transaction fees**
- 🚀 **Easy deployment** and management

**Time to transform education in Uganda with seamless mobile money payments!** 🎓✨

---

**Need help?** Contact Pesapal support or check the comprehensive documentation at https://developer.pesapal.com
