# 🚀 Vercel Deployment Guide - Codex Neural

## ✅ Pre-Deployment Checklist

### 1. Environment Variables

Configure the following environment variables in Vercel Dashboard:

**Required:**
- `NODE_ENV` = `production`

**Optional (but recommended):**
- `NEXT_PUBLIC_SITE_URL` = `https://www.codexneural.com`
- `NEXT_PUBLIC_GA_ID` = Your Google Analytics ID (e.g., `G-XXXXXXXXXX`)

**Email Configuration (for Contact Form):**
- `SMTP_HOST` = `smtp.gmail.com` (or your SMTP server)
- `SMTP_PORT` = `587`
- `SMTP_USER` = Your email address
- `SMTP_PASSWORD` = Your app-specific password (not regular password)
- `CONTACT_EMAIL` = Email where contact form submissions are sent

**Twilio WhatsApp Bot (Optional):**
- `TWILIO_ACCOUNT_SID` = Your Twilio Account SID
- `TWILIO_AUTH_TOKEN` = Your Twilio Auth Token
- `TWILIO_WHATSAPP_NUMBER` = Your Twilio WhatsApp number (e.g., `whatsapp:+14155238886`)

### 2. Vercel Project Settings

**Framework Preset:** Next.js  
**Root Directory:** `./`  
**Build Command:** `npm run build`  
**Output Directory:** (leave default)  
**Install Command:** `npm install`  
**Node.js Version:** 20.x or higher

### 3. Build Configuration

The project uses:
- Next.js 16.0.10 (App Router)
- React 19.2.1
- TypeScript 5
- Tailwind CSS v4
- Three.js / React Three Fiber (for 3D backgrounds)

### 4. Security Headers

The following security headers are automatically configured in `next.config.ts`:
- Strict-Transport-Security
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

### 5. Performance Optimizations

- ✅ React Strict Mode enabled
- ✅ Dynamic imports for heavy components (WebGL)
- ✅ Client-side only rendering for 3D components
- ✅ Quality mode adaptation for low-end devices
- ✅ Image optimization configured

### 6. Known Considerations

**WebGL Components:**
- 3D backgrounds automatically disable on low-end devices
- Uses dynamic imports with `ssr: false` to prevent SSR issues
- Graceful fallbacks implemented

**Environment Variables:**
- All optional variables have safe defaults
- Production build will not crash if optional vars are missing
- Validation errors are logged but don't block deployment

## 🚀 Deployment Steps

1. **Connect Repository:**
   - Go to Vercel Dashboard
   - Import your GitHub repository
   - Select the repository: `Manoharaya/codex-neural`

2. **Configure Environment Variables:**
   - Add all required environment variables in Vercel Dashboard
   - Use `.env.example` as reference

3. **Deploy:**
   - Vercel will automatically detect Next.js
   - Build will run: `npm run build`
   - Deployment will be live after successful build

4. **Verify:**
   - Check build logs for any errors
   - Test the live site
   - Verify contact form works (if email configured)
   - Test WhatsApp bot (if configured)

## 🔧 Troubleshooting

**Build Fails:**
- Check Node.js version (must be 20+)
- Verify all dependencies are in `package.json`
- Check for TypeScript errors: `npm run build` locally

**Runtime Errors:**
- Check environment variables are set correctly
- Verify API routes are working
- Check browser console for client-side errors

**WebGL Issues:**
- 3D backgrounds automatically disable on unsupported devices
- Check browser WebGL support
- Verify Three.js dependencies are installed

## 📊 Post-Deployment

After successful deployment:
1. Test all pages
2. Verify contact form submissions
3. Check Google Analytics (if configured)
4. Test WhatsApp bot (if configured)
5. Monitor Vercel Analytics for performance

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Next.js Documentation: https://nextjs.org/docs
- Project Repository: https://github.com/Manoharaya/codex-neural

---

**Last Updated:** 2025-01-27  
**Status:** ✅ Production Ready

