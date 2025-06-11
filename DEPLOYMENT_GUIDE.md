# 🚀 EDUCART Uganda Deployment Guide

## 🌟 Option 1: Vercel (Recommended)

### **Why Vercel?**
- ✅ Built for Next.js applications
- ✅ Automatic deployments from Git
- ✅ Global CDN and edge functions
- ✅ Free tier with generous limits
- ✅ Custom domains included
- ✅ Automatic HTTPS/SSL

### **Step-by-Step Deployment**

#### **1. Prepare Your Code**
```bash
# Ensure your code is ready
npm run build
npm run lint
```

#### **2. Push to GitHub**
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - EDUCART Uganda with Mobile Money"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/educart-uganda.git
git branch -M main
git push -u origin main
```

#### **3. Deploy to Vercel**
1. Visit https://vercel.com
2. Sign up with GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY`
   - `FLUTTERWAVE_SECRET_KEY`
   - `FLUTTERWAVE_ENCRYPTION_KEY`
   - `NEXT_PUBLIC_APP_URL`
   - `FLUTTERWAVE_WEBHOOK_SECRET`
6. Click "Deploy"

#### **4. Configure Custom Domain (Optional)**
1. Go to Project Settings > Domains
2. Add your custom domain (e.g., educartuganda.com)
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable

#### **5. Set Up Flutterwave Webhook**
1. Get your Vercel URL (e.g., https://educart-uganda.vercel.app)
2. In Flutterwave Dashboard:
   - Go to Settings > Webhooks
   - Add: `https://your-domain.vercel.app/api/payment/webhook`
   - Set webhook secret

---

## 🔥 Option 2: Netlify

### **Deploy to Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build your project
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

### **Environment Variables**
Add in Netlify Dashboard > Site Settings > Environment Variables:
- `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY`
- `FLUTTERWAVE_SECRET_KEY`
- `FLUTTERWAVE_ENCRYPTION_KEY`
- `NEXT_PUBLIC_APP_URL`
- `FLUTTERWAVE_WEBHOOK_SECRET`

---

## ☁️ Option 3: Railway

### **Deploy to Railway**
1. Visit https://railway.app
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically

---

## 🐳 Option 4: Docker + DigitalOcean

### **Create Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### **Deploy to DigitalOcean**
1. Create DigitalOcean account
2. Use App Platform
3. Connect GitHub repository
4. Configure environment variables
5. Deploy

---

## 🔧 Post-Deployment Checklist

### **1. Test Your Deployment**
- [ ] Homepage loads correctly
- [ ] Dark mode toggle works
- [ ] Payment page accessible
- [ ] Mobile money form displays
- [ ] All navigation links work
- [ ] Contact form functions
- [ ] Responsive design on mobile

### **2. Configure Flutterwave**
- [ ] Switch to live API keys
- [ ] Update webhook URL to production
- [ ] Test payment flow with small amounts
- [ ] Verify webhook receives events

### **3. SEO & Performance**
- [ ] Add Google Analytics
- [ ] Set up Google Search Console
- [ ] Configure meta tags
- [ ] Test page speed
- [ ] Verify mobile responsiveness

### **4. Security**
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables secured
- [ ] API keys not exposed in client
- [ ] Webhook signature verification working

### **5. Monitoring**
- [ ] Set up error tracking (Sentry)
- [ ] Monitor payment success rates
- [ ] Track user analytics
- [ ] Set up uptime monitoring

---

## 🌍 Custom Domain Setup

### **1. Purchase Domain**
- Namecheap, GoDaddy, or Google Domains
- Recommended: `educartuganda.com`

### **2. Configure DNS**
For Vercel:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

### **3. Update Environment Variables**
```env
NEXT_PUBLIC_APP_URL=https://educartuganda.com
```

---

## 📊 Analytics & Monitoring

### **Google Analytics Setup**
1. Create Google Analytics account
2. Add tracking code to `app/layout.tsx`
3. Monitor user behavior and conversions

### **Payment Analytics**
- Track payment success rates
- Monitor popular services
- Analyze user drop-off points

---

## 🚨 Troubleshooting

### **Common Issues**

#### **Build Errors**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

#### **Environment Variables Not Working**
- Ensure variables are set in hosting platform
- Check variable names match exactly
- Restart deployment after changes

#### **Payment Issues**
- Verify Flutterwave API keys are live (not test)
- Check webhook URL is correct
- Ensure HTTPS is enabled

#### **Mobile Money Not Working**
- Confirm business verification with Flutterwave
- Test with different networks (MTN, Airtel)
- Check transaction logs in Flutterwave dashboard

---

## 🎉 Go Live Checklist

### **Before Launch**
- [ ] All tests passing
- [ ] Payment flow tested end-to-end
- [ ] Mobile responsiveness verified
- [ ] Performance optimized
- [ ] SEO configured
- [ ] Analytics set up
- [ ] Error monitoring enabled

### **Launch Day**
- [ ] Deploy to production
- [ ] Update DNS records
- [ ] Test all functionality
- [ ] Monitor for errors
- [ ] Announce launch

### **Post-Launch**
- [ ] Monitor payment success rates
- [ ] Track user engagement
- [ ] Gather user feedback
- [ ] Plan feature updates

---

## 📞 Support

### **Hosting Support**
- **Vercel**: https://vercel.com/support
- **Netlify**: https://netlify.com/support
- **Railway**: https://railway.app/help

### **Payment Support**
- **Flutterwave**: support@flutterwave.com
- **Documentation**: https://developer.flutterwave.com

### **EDUCART Support**
- **Email**: support@educartuganda.com
- **Phone**: +256 700 123 456

---

## 🎯 Success Metrics

Track these KPIs after deployment:
- **Payment Conversion Rate**: % of users who complete payments
- **Popular Services**: Which services are most purchased
- **User Engagement**: Time spent on site, pages visited
- **Mobile Usage**: % of mobile vs desktop users
- **Geographic Distribution**: Where users are located

Your EDUCART Uganda application is now ready for production deployment! 🚀
