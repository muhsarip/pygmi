# Third-Party Setup Guide

## Replicate

1. Go to https://replicate.com and sign up/login
2. Navigate to **Account Settings** → **API tokens**
3. Click **Create token**
4. Copy the token (starts with `r8_`)
5. Add to `.env.local`:
   ```
   REPLICATE_API_TOKEN=r8_your_token_here
   ```

**Pricing:** Free tier includes $5/month credits (~500-2500 images with flux-schnell)

## Supabase

### Create Project

1. Go to https://supabase.com and sign up/login
2. Click **New Project**
3. Fill in:
   - **Name:** pygmi
   - **Database Password:** (save this somewhere safe)
   - **Region:** choose closest to your users
4. Click **Create new project** and wait for setup

### Get API Credentials

1. Navigate to **Project Settings** (gear icon) → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key (under Project API keys) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### Setup Database

1. Go to **SQL Editor** in the sidebar
2. Click **New query**
3. Copy and paste the contents of `docs/database.sql`
4. Click **Run** (or Cmd/Ctrl + Enter)
5. Verify tables created: go to **Table Editor** and check for `profiles`, `generations`, `images`

### Configure Auth

1. Go to **Authentication** → **Providers**
2. Ensure **Email** provider is enabled
3. Optional: Go to **Authentication** → **URL Configuration**
   - Set **Site URL** to `http://localhost:3000` (dev) or your production URL

**Pricing:** Free tier includes 500MB database, 1GB storage, 50,000 monthly active users

## Complete .env.local

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
REPLICATE_API_TOKEN=r8_your_token
```
