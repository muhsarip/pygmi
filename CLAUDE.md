# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PYGMI is a text-to-image generator web application. Users can create images from text prompts using AI models via Replicate API.

## Tech Stack

- **Frontend/Backend**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **AI Model**: Replicate API (flux-schnell)

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run linter
```

## Architecture

### Route Groups
- `(auth)/` - Public auth pages (login, register)
- `(main)/` - Protected pages with sidebar layout (imagine, library, explore)

### Key Directories
- `app/api/` - API routes for auth, generate, images, credits
- `components/` - UI components organized by feature (auth, generator, gallery, layout)
- `lib/` - Client configurations (supabase.ts, replicate.ts)
- `hooks/` - Custom React hooks (useAuth, useCredits)

### Database Tables
- `profiles` - User data with credit balance (extends Supabase auth.users)
- `generations` - Generation tasks with prompt and settings
- `images` - Generated images linked to generations

### Protected Routes
All routes under `(main)/` require authentication. Public routes: `/login`, `/register`.

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
REPLICATE_API_TOKEN=          # Server-side only, never use NEXT_PUBLIC_
```

## Key Patterns

### Generation Flow
1. Validate credits >= cost
2. Create generation record (status: pending)
3. Call Replicate API
4. Update generation (status: completed)
5. Save image URLs to database

### Credit System
- Initial credits: 10 (on registration)
- Cost per generation: 1 credit (regardless of num_outputs)

## Important Guidelines

### Documentation
- Never include testing, performance, security, or future enhancements sections
- When updating docs, write as current state - avoid historical language like "updated", "enhanced", "version X date"

### Development
- Do not write tests
- Validate code using `npm run lint` (eslint)
