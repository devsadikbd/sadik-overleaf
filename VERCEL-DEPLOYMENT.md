# Deploying to Vercel - Backend Connection Guide

## Problem

Your Vercel app (`sadikbd.vercel.app`) can't connect to `localhost:3000` because:

- Vercel runs in the cloud
- `localhost` only exists on your local machine
- The deployed app needs a publicly accessible backend URL

## Solution: Deploy Your Backend

### Option 1: Railway (Recommended - Easy & Free Tier)

1. **Sign up at [railway.app](https://railway.app)**

2. **Deploy your backend:**

   ```bash
   cd ~/adik-overleaf-backend
   # Initialize git if not already
   git init
   git add .
   git commit -m "Initial commit"

   # Push to Railway (follow Railway's deployment guide)
   ```

3. **Get your Railway URL** (e.g., `https://your-app.railway.app`)

4. **Update Vercel environment variables:**

   - Go to your Vercel project → Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_BACKEND_URL=https://your-app.railway.app
     NEXT_PUBLIC_KEYSTONE_URL=https://your-app.railway.app/api/graphql
     ```

5. **Redeploy Vercel** (push to GitHub or trigger manual deploy)

### Option 2: Render

1. Sign up at [render.com](https://render.com)
2. Create a new Web Service
3. Connect your backend repo
4. Add environment variables for database
5. Get your Render URL
6. Update Vercel env variables (same as above)

### Option 3: Heroku

1. Sign up at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Deploy:
   ```bash
   cd ~/adik-overleaf-backend
   heroku create your-app-name
   git push heroku main
   ```
4. Get your Heroku URL
5. Update Vercel env variables

## Quick Fix for Testing (Tunnel - Not for Production)
Your Vercel app at sadikbd.vercel.app won't work with your local backend because:
If you just want to test quickly, use ngrok to expose your local backend:

```bash
# Install ngrok
# Download from https://ngrok.com

# Expose your local backend
ngrok http 3000

# You'll get a URL like: https://abc123.ngrok.io
# Add this to Vercel env:
NEXT_PUBLIC_BACKEND_URL=https://abc123.ngrok.io
```

**Warning:** Ngrok URLs change every time you restart. Not suitable for production.

## After Deploying Backend

1. **Update Vercel Environment Variables:**

   - `NEXT_PUBLIC_BACKEND_URL` = Your deployed backend URL
   - `NEXT_PUBLIC_KEYSTONE_URL` = Your deployed backend URL + `/api/graphql`

2. **Redeploy your Vercel app** (push to GitHub)

3. **Test:** Visit `sadikbd.vercel.app` and try signup/verification

## Database Note

Your backend needs a production database too (not SQLite):

- **Railway**: Provides free PostgreSQL
- **Render**: Provides free PostgreSQL
- **Heroku**: Provides PostgreSQL add-on
- **Supabase**: Free PostgreSQL hosting

Update your backend's `DATABASE_URL` environment variable to point to the production database.

## Checklist

- [ ] Deploy backend to Railway/Render/Heroku
- [ ] Get production database (PostgreSQL)
- [ ] Run migrations on production DB
- [ ] Get backend public URL
- [ ] Add `NEXT_PUBLIC_BACKEND_URL` to Vercel
- [ ] Add `NEXT_PUBLIC_KEYSTONE_URL` to Vercel
- [ ] Redeploy Vercel app
- [ ] Test signup/verification flow on `sadikbd.vercel.app`
