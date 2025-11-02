# Backend Security Guide

## ⚠️ Security Concerns

If your backend is publicly accessible, you need to protect it from:

- Unauthorized access to your database
- API abuse and rate limiting issues
- CORS attacks from untrusted origins
- SQL injection and other attacks

## 🔒 How to Secure Your Backend

### 1. Use Authentication & API Keys

Add API key authentication between your frontend and backend:

**Backend (Keystone):**

```js
// In your keystone.ts config
export default config({
  server: {
    cors: {
      origin: ["http://localhost:7777", "https://sadikbd.vercel.app"],
      credentials: true,
    },
  },
  // Add middleware to check API keys
  extendExpressApp: (app) => {
    app.use((req, res, next) => {
      const apiKey = req.headers["x-api-key"];
      if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      next();
    });
  },
});
```

**Frontend:**
Update your fetch calls to include the API key:

```typescript
// In lib/keystone.ts
const response = await fetch(KEYSTONE_GRAPHQL_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    ...(init?.headers ?? {}),
  },
  credentials: "include",
  body: JSON.stringify({ query, variables }),
  ...init,
});
```

Then add to your `.env` and Vercel:

```
NEXT_PUBLIC_API_KEY=your-secret-key-here
```

### 2. Restrict CORS (Most Important!)

Only allow your frontend domain to access your backend:

**In your backend config:**

```js
server: {
  cors: {
    origin: [
      'https://sadikbd.vercel.app',  // Only your frontend
      'http://localhost:7777'         // For local dev
    ],
    credentials: true,
  }
}
```

### 3. Use Private Networking (Best Solution!)

Deploy both frontend and backend on the same platform:

**Option A: Vercel + Private Backend**

- Deploy backend on Railway/Render with private networking
- Use internal URLs that only your Vercel app can access
- Railway/Render support private networking

**Option B: Use Vercel Functions**
Instead of exposing your backend, proxy requests through Vercel serverless functions:

Create `/app/api/backend/[...path]/route.ts`:

```typescript
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Backend URL is a secret, not exposed to client
  const backendUrl = process.env.BACKEND_URL; // Keep this secret!

  const res = await fetch(`${backendUrl}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.BACKEND_API_KEY, // Secret key
    },
    body: JSON.stringify(body),
  });

  return res;
}
```

Then your frontend calls:

```typescript
// Instead of calling backend directly, call your own API
fetch('/api/backend/graphql', { ... })
```

This way:

- ✅ Backend URL is never exposed to users
- ✅ API keys stay secret
- ✅ You control all access through your API routes

### 4. Rate Limiting

Add rate limiting to prevent abuse:

**Using Vercel:**

```typescript
// app/api/auth/signup/route.ts
import { ratelimit } from "@/lib/ratelimit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  // ... rest of your code
}
```

**Setup ratelimit:**

```typescript
// lib/ratelimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
});
```

### 5. Hide Admin UI in Production

**In your Keystone config:**

```js
export default config({
  ui: {
    isDisabled: process.env.NODE_ENV === "production",
    // Or require authentication:
    isAccessAllowed: (context) => !!context.session?.data.isAdmin,
  },
});
```

### 6. Environment Variables

Keep these SECRET (never expose to client):

```env
# Backend .env (NEVER commit this!)
DATABASE_URL=postgresql://...
SESSION_SECRET=super-secret-random-string
SMTP_PASSWORD=...
API_KEY=your-backend-api-key
```

Keep these public (can be in frontend):

```env
# Frontend .env.local
NEXT_PUBLIC_BACKEND_URL=https://your-backend.com  # Can be public
NEXT_PUBLIC_API_KEY=public-api-key                # Can be public
```

## 🎯 Recommended Setup (Most Secure)

1. **Use Vercel API Routes as proxy** (hide backend URL completely)
2. **Add API key authentication** between frontend and backend
3. **Restrict CORS** to only your domains
4. **Use rate limiting** on all auth endpoints
5. **Deploy backend on private network** if possible
6. **Hide Admin UI** in production

## 📝 Implementation Steps

1. Add CORS restrictions to backend now
2. Create Vercel API proxy routes (recommended)
3. Add API key authentication
4. Add rate limiting
5. Test everything locally
6. Deploy and verify security

Would you like me to implement the Vercel API proxy approach? It's the most secure as it completely hides your backend URL from users.
