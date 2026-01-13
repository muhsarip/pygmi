# Quick Reference - AI Image Generator Stack

## 📦 Essential Libraries

```bash
# Core dependencies
npm install @supabase/supabase-js    # Database, auth, storage
npm install replicate                # AI image generation

# UI (recommended)
npm install -D tailwindcss postcss autoprefixer

# Optional but useful
npm install react-hot-toast          # Notifications
npm install lucide-react            # Icons
npm install date-fns                # Date formatting
```

---

## 🔑 Environment Variables

```bash
# .env.local
REPLICATE_API_TOKEN=r8_your_token
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

---

## 🚀 Quick Start

```bash
# Create project
npx create-next-app@latest my-ai-app

# Install dependencies
cd my-ai-app
npm install @supabase/supabase-js replicate

# Create structure
mkdir lib components
mkdir -p app/api/generate app/api/images

# Run dev server
npm run dev
```

---

## 📝 Common Code Patterns

### Supabase Client

```javascript
// lib/supabase.js
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
```

### Replicate Client

```javascript
// lib/replicate.js
import Replicate from 'replicate'
export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
})
```

### API Route Structure

```javascript
// app/api/*/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  const data = await request.json()
  // Process...
  return NextResponse.json({ result })
}
```

### Frontend Fetch

```javascript
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data })
})
const result = await response.json()
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_images_user_id ON images(user_id);
CREATE INDEX idx_images_created_at ON images(created_at DESC);
```

---

## 🤖 AI Models (Replicate)

| Model        | Speed  | Cost    | Best For     |
| ------------ | ------ | ------- | ------------ |
| flux-schnell | Fast   | ~$0.003 | Free tier ✅ |
| flux-dev     | Medium | ~$0.005 | Production   |
| flux-pro     | Slow   | ~$0.055 | Premium      |
| sdxl         | Medium | ~$0.004 | Alternative  |

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Check code

# Deployment
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
vercel logs              # View logs

# Git
git add .
git commit -m "message"
git push
```

---

## 📊 Free Tier Limits

 **Replicate** : $5/month = ~500-2500 images
 **Vercel** : 100GB bandwidth = ~10,000 visits
 **Supabase** : 500MB DB, 1GB storage

 **Capacity** : 500-1000 users/month

---

## 🔒 Security Checklist

* [ ] API keys in environment variables only
* [ ] Never use NEXT_PUBLIC_ for Replicate token
* [ ] Implement rate limiting
* [ ] Validate all user input
* [ ] Use Row Level Security (Supabase)
* [ ] Add error handling everywhere

---

## 🚨 Common Errors & Fixes

**"Replicate API error"**
→ Check REPLICATE_API_TOKEN in .env.local

**"Supabase connection failed"**
→ Verify NEXT_PUBLIC_SUPABASE_URL and KEY

**"Module not found"**
→ Run `npm install`

**"Image not displaying"**
→ Check CORS, verify URL is accessible

**"Vercel deploy failed"**
→ Check environment variables in dashboard

---

## 💡 Quick Tips

1. Start with flux-schnell (fastest, cheapest)
2. Store image URLs only (not actual images)
3. Use hybrid storage (Replicate → Supabase)
4. Implement loading states
5. Add error messages
6. Rate limit API routes
7. Use Next.js Image component
8. Enable TypeScript for better DX
9. Test locally before deploying
10. Monitor costs regularly

---

## 📱 Project Structure

```
my-ai-app/
├── app/
│   ├── page.js                  # Home
│   ├── gallery/page.js          # Gallery
│   └── api/
│       ├── generate/route.js    # Generate image
│       └── images/route.js      # Get images
├── components/
│   ├── ImageGenerator.js
│   └── ImageCard.js
├── lib/
│   ├── supabase.js
│   └── replicate.js
└── .env.local                   # Secrets
```

---

## 🔗 Important Links

* Next.js: https://nextjs.org/docs
* Vercel: https://vercel.com/docs
* Replicate: https://replicate.com/docs
* Supabase: https://supabase.com/docs
* Tailwind: https://tailwindcss.com/docs

---

## 📈 Next Steps After MVP

1. Add user authentication (Supabase Auth)
2. Implement favorites feature
3. Create public gallery
4. Add image variations
5. Support multiple AI models
6. Add batch generation
7. Implement credits/pricing
8. Mobile optimization
9. SEO optimization
10. Analytics integration

---

 **Remember** : Start simple, launch fast, iterate based on feedback!
