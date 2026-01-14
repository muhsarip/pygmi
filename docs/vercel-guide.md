# Deploy to Vercel

## Prerequisites

- GitHub account
- Vercel account (https://vercel.com)
- Project pushed to GitHub

## Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/pygmi.git
git push -u origin main
```

## Step 2: Import to Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your **pygmi** repository
4. Click **Import**

## Step 3: Configure Environment Variables

Before deploying, add environment variables:

1. Expand **Environment Variables** section
2. Add each variable:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your_anon_key` |
| `REPLICATE_API_TOKEN` | `r8_your_token` |

3. Click **Deploy**

## Step 4: Update Supabase URL Config

After deployment:

1. Copy your Vercel URL (e.g., `https://pygmi.vercel.app`)
2. Go to Supabase → **Authentication** → **URL Configuration**
3. Set **Site URL** to your Vercel URL
4. Add to **Redirect URLs**: `https://pygmi.vercel.app/**`

## Redeploy After Changes

### Option 1: Auto Deploy
Push to GitHub → Vercel auto deploys

```bash
git add .
git commit -m "Update feature"
git push
```

### Option 2: Manual Deploy (CLI)

```bash
npm i -g vercel
vercel          # Preview deploy
vercel --prod   # Production deploy
```

## Useful Commands

```bash
vercel logs             # View logs
vercel env pull         # Pull env vars to .env.local
vercel --help           # Help
```

## Troubleshooting

**Build fails**
- Check environment variables are set in Vercel dashboard
- Run `npm run build` locally first

**Auth not working**
- Verify Supabase Site URL matches Vercel URL
- Check redirect URLs in Supabase

**API errors**
- Check `vercel logs` for error details
- Verify all env vars are set correctly
