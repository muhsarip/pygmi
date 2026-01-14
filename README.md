# PYGMI - AI Image Generator

A modern text-to-image generation web application powered by AI. Create stunning images from text descriptions with an intuitive interface and credit-based system.

## Features

- **AI Image Generation** - Generate high-quality images using Flux-Schnell model via Replicate API
- **User Authentication** - Secure email/password authentication with Supabase
- **Credit System** - Credit-based usage tracking (10 free credits on signup)
- **Image Library** - Save and manage all your generated images
- **Customizable Settings** - Adjust aspect ratio (1:1, 16:9, 9:16), number of outputs (1-4), and HDR mode
- **Reuse & Rerun** - Easily recreate or modify previous generations
- **Responsive Design** - Fully optimized for mobile and desktop devices
- **Gradient Theme** - Beautiful gradient mesh design with glass morphism effects

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI Model**: Replicate API (Flux-Schnell)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 18+ and npm
- Supaase account ([supabase.com](https://supabase.com))
- Replicate API account ([replicate.com](https://replicate.com))

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pygmi
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
REPLICATE_API_TOKEN=your_replicate_api_token
```

4. Set up Supabase database:

Run the SQL schema from `docs/database.sql` in your Supabase SQL editor to create tables, RLS policies, and triggers.

5. Configure Supabase authentication:

In Supabase dashboard:
- Go to Authentication → URL Configuration
- Add your redirect URLs (e.g., `http://localhost:3000`, `https://yourdomain.com`)

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Getting Started

1. **Sign Up** - Create an account to receive 10 free credits
2. **Generate Images** - Navigate to the Imagine page, enter a prompt, and click Generate
3. **Adjust Settings** - Choose aspect ratio, number of images, and enable HDR mode
4. **View Library** - Access all your generated images in the Library page
5. **Reuse Prompts** - Click "Reuse" on any image to recreate with the same settings

### Credit System

- Each generation costs 1 credit
- Initial signup: 10 free credits
- Credits are deducted before image generation

## Project Structure

```
pygmi/
├── app/
│   ├── (auth)/              # Authentication pages (login, register)
│   ├── (main)/              # Protected pages (imagine, library)
│   ├── api/                 # API routes (generate, images)
│   └── globals.css          # Global styles and animations
├── components/
│   ├── auth/                # Login and register forms
│   ├── gallery/             # Image grid and image card
│   ├── generator/           # Prompt input, settings, generate button
│   └── layout/              # Sidebar, header components
├── hooks/                   # Custom React hooks (useAuth, useCredits)
├── lib/                     # Supabase and Replicate clients
├── docs/                    # Documentation files
└── middleware.ts            # Route protection
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel project settings
4. Deploy

See `docs/vercel-guide.md` for detailed deployment instructions.

## Documentation

- **Database Schema**: `docs/database.sql`
- **Third-Party Setup**: `docs/guide-third-party.md`
- **Vercel Deployment**: `docs/vercel-guide.md`
- **Implementation Details**: `docs/implementation.md`

## License

MIT
