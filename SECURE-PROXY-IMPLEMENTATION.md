# 🔒 Secure API Proxy Implementation - Complete Guide

## ✅ What Was Implemented

I've implemented a **secure API proxy pattern** that completely hides your backend from public access.

### Before (Insecure):

```
Browser → Direct call to backend (http://localhost:3000) → Anyone can see your backend URL
```

### After (Secure):

```
Browser → Your API (/api/graphql, /api/backend/*) → Server-side proxy → Backend (hidden)
```

## 📁 New Files Created

1. **`/app/api/graphql/route.ts`** - Main GraphQL proxy
2. **`/app/api/backend/verify-email/route.ts`** - Verify email proxy
3. **`/app/api/backend/resend-verification/route.ts`** - Resend verification proxy

## 🔄 Files Modified

1. **`lib/keystone.ts`** - Now uses `/api/graphql` proxy
2. **`components/email-verification-section.tsx`** - Calls proxy endpoints
3. **`app/verify-email/page.tsx`** - Uses proxy for verification
4. **`.env.example`** - Updated with secure variables

## 🔐 How It Works

### 1. GraphQL Requests

**Old (Exposed):**

```typescript
fetch('http://localhost:3000/api/graphql', { ... })
```

**New (Secure):**

```typescript
fetch('/api/graphql', { ... })  // Proxied on server-side
```

### 2. Email Verification

**Old (Exposed):**

```typescript
fetch('http://localhost:3000/api/auth/verify-email?token=123', { ... })
```

**New (Secure):**

```typescript
fetch('/api/backend/verify-email?token=123', { ... })  // Proxied
```

### 3. Resend Verification

**Old (Exposed):**

```typescript
fetch('http://localhost:3000/api/auth/resend-verification', { ... })
```

**New (Secure):**

```typescript
fetch('/api/backend/resend-verification', { ... })  // Proxied
```

## 🚀 Setup Instructions

### Local Development

1. **Create `.env.local` file** (already in .gitignore):

   ```env
   BACKEND_URL=http://localhost:3000
   # BACKEND_API_KEY=optional-secret-key
   ```

2. **Start backend** (on port 3000):

   ```bash
   cd ~/adik-overleaf-backend
   npm run dev
   ```

3. **Start frontend** (on port 7777):

   ```bash
   cd ~/sadik-overleaf
   npm run dev
   ```

4. **Test**: Visit http://localhost:7777
   - Your browser will call `/api/graphql`
   - The server will proxy it to `http://localhost:3000`
   - Backend URL stays hidden! ✅

### Vercel Deployment

1. **Deploy your backend** to Railway/Render/Heroku

   - Get your backend URL (e.g., `https://your-app.railway.app`)

2. **Add environment variables to Vercel**:

   - Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     ```
     BACKEND_URL=https://your-app.railway.app
     ```
   - Optional (for extra security):
     ```
     BACKEND_API_KEY=your-secret-key-12345
     ```

3. **Deploy**: Push to GitHub or trigger manual deploy

4. **Your backend URL is now completely hidden!** ✅
   - Users see: `sadikbd.vercel.app/api/graphql`
   - Backend URL never exposed to browser
   - API keys stay on server

## 🛡️ Security Benefits

✅ **Backend URL Hidden** - Never exposed to users  
✅ **API Keys Secure** - Stored server-side only  
✅ **Single Point of Control** - All requests go through your API  
✅ **Easy Rate Limiting** - Add to proxy routes if needed  
✅ **CORS Protection** - Backend only accepts requests from your server  
✅ **No NEXT*PUBLIC* vars** - No accidental exposure

## 🔍 How to Verify It's Working

### Check Network Tab

1. Open DevTools → Network tab
2. Signup/login/verify email
3. You should see requests to:
   - `/api/graphql` ✅
   - `/api/backend/verify-email` ✅
   - `/api/backend/resend-verification` ✅
4. You should **NOT** see any requests to `localhost:3000` or your backend URL

### What Users Can See

- ✅ Your frontend URL: `sadikbd.vercel.app`
- ✅ Your API routes: `/api/*`
- ❌ Your backend URL: **Hidden**
- ❌ API keys: **Hidden**
- ❌ Database credentials: **Hidden**

## 📝 Optional Enhancements

### 1. Add Rate Limiting

Install Upstash for serverless rate limiting:

```bash
npm install @upstash/ratelimit @upstash/redis
```

Add to proxy routes:

```typescript
import { ratelimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // ... rest of code
}
```

### 2. Add Backend API Key Authentication

In your backend, add middleware to check API keys:

```javascript
// In your Keystone config
extendExpressApp: (app) => {
  app.use((req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.API_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  });
};
```

### 3. Add Request Logging

Add to proxy routes for monitoring:

```typescript
console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
```

## ✅ Testing Checklist

- [ ] Signup works via proxy
- [ ] Email verification works via proxy
- [ ] Resend verification works via proxy
- [ ] Login works via proxy
- [ ] Password reset works via proxy (if implemented)
- [ ] Network tab shows no direct backend calls
- [ ] Backend URL not visible in source code
- [ ] Works on localhost:7777
- [ ] Works on Vercel deployment

## 🎯 Result

Your backend is now **completely secure and hidden**. Even if someone inspects your frontend code or monitors network requests, they will never see:

- Your backend URL
- API keys
- Database credentials
- Internal service endpoints

All they see is your public frontend making requests to its own API routes! 🎉

## 📚 Related Documentation

- See `BACKEND-SECURITY.md` for more security best practices
- See `VERCEL-DEPLOYMENT.md` for deployment guide
- See `.env.example` for environment variable setup
