# PYGMI - Implementation Plan

## Phase 1: Setup

1. Create Next.js project with App Router
2. Install dependencies:
   - `@supabase/supabase-js` - Database, auth, storage
   - `replicate` - AI image generation
   - `tailwindcss`, `postcss`, `autoprefixer` - Styling
   - `react-hot-toast` - Notifications
   - `lucide-react` - Icons
3. Configure Tailwind CSS
4. Create lib/supabase.js client
5. Create lib/replicate.js client
6. Setup database tables in Supabase:
   - profiles (id, name, credits, created_at)
   - generations (id, user_id, prompt, settings, status, created_at)
   - images (id, generation_id, user_id, image_url, created_at)
   - Create indexes

## Phase 2: Auth

1. Create app/(auth)/layout.js - Auth layout (centered form)
2. Create app/(auth)/register/page.js with RegisterForm component
3. Create app/(auth)/login/page.js with LoginForm component
4. Create hooks/useAuth.js for auth state management
5. Create middleware.js for protected routes
6. Implement logout in Header component

## Phase 3: Layout

1. Create app/layout.js - Root layout with providers
2. Create app/page.js - Redirect to /imagine
3. Create app/(main)/layout.js - Main layout with sidebar + header
4. Create components/layout/Sidebar.js
5. Create components/layout/Header.js with credits display

## Phase 4: Imagine Page

1. Create app/(main)/imagine/page.js
2. Create components/generator/PromptInput.js
3. Create components/generator/SettingsPanel.js
4. Create components/generator/GenerateButton.js
5. Create app/api/generate/route.js - POST endpoint
6. Create components/gallery/ImageGrid.js for results display
7. Create hooks/useCredits.js

## Phase 5: Library Page

1. Create app/api/images/route.js - GET endpoint
2. Create app/api/images/[id]/route.js - GET, DELETE endpoints
3. Create components/gallery/ImageCard.js with actions
4. Create app/(main)/library/page.js
5. Implement Copy/Reuse/Rerun/Download actions

## Phase 6: Polish

1. Add loading states to all async operations
2. Add error handling with toast notifications
3. Implement responsive design for mobile
4. Create app/(main)/explore/page.js (placeholder)
