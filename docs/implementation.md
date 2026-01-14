# PYGMI Implementation Documentation

## Project Setup

**Tech Stack**: Next.js 16, TypeScript, Tailwind CSS v4, Supabase, Replicate API

**Key Dependencies**:
- `@supabase/ssr` - SSR-compatible Supabase client with cookie handling
- `replicate` - Replicate API client for image generation
- `lucide-react` - Icon library
- `react-hot-toast` - Toast notifications

**Configuration Files**:
- `postcss.config.mjs` - Tailwind CSS v4 with @tailwindcss/postcss
- `app/globals.css` - Custom CSS with gradient theme and animations

## Authentication System

### Supabase Client Setup
**File**: `lib/supabase.ts`
- Uses `createBrowserClient` from `@supabase/ssr` for proper cookie handling
- Fallback values for build-time safety

### Login Flow
**File**: `app/(auth)/login/page.tsx`
- Component: `LoginForm` handles email/password authentication
- Calls `supabase.auth.signInWithPassword()`
- After successful login: `router.refresh()` then `router.push("/imagine")`
- The `refresh()` ensures middleware recognizes the new session

### Registration Flow
**File**: `app/(auth)/register/page.tsx`
- Component: `RegisterForm` handles signup
- Calls `supabase.auth.signUp()` with email, password, and name metadata
- Auto-creates profile via database trigger

### Auth Hook
**File**: `hooks/useAuth.ts`
- Custom hook providing `user`, `loading`, and `signOut` function
- Listens to `onAuthStateChange` for real-time auth updates
- Fetches user profile data including credits

### Route Protection
**File**: `middleware.ts`
- Protects `/imagine` and `/library` routes
- Redirects unauthenticated users to `/login`
- Uses `createServerClient` for server-side auth checking

## Database Schema

**File**: `docs/database.sql`

**Tables**:
1. `profiles` - User profile with credits
2. `generations` - Generation metadata (prompt, settings)
3. `images` - Generated image records

**RLS Policies**: Users can only access their own data

**Trigger**: `on_auth_user_created` auto-creates profile with 10 initial credits

## Image Generation Flow

### Generate API Endpoint
**File**: `app/api/generate/route.ts`

**Flow**:
1. Validates authentication via `createServerClient`
2. Checks user has sufficient credits
3. Deducts 1 credit from user profile
4. Creates generation record in database
5. Calls Replicate API with `flux-schnell` model
6. Converts FileOutput objects to URLs using `String(item)`
7. Saves image records to database
8. Returns image URLs to client

**Key Implementation**: Replicate returns FileOutput objects that need `String()` conversion to extract URLs.

### Imagine Page
**File**: `app/(main)/imagine/page.tsx`

**State Management**:
- `prompt` - User input text
- `settings` - aspectRatio, numOutputs, hdr
- `loading` - Generation state
- `generatedImages` - Array of image URLs
- `showPrompt` - Toggle for prompt visibility

**Flow**:
1. User enters prompt and adjusts settings
2. Clicks Generate button
3. `handleGenerate()` calls `/api/generate`
4. On success: sets images, hides prompt form, shows "Show Prompt" button
5. Images appear with magic animation

**Components Used**:
- `PromptInput` - Textarea for prompt input
- `SettingsPanel` - Aspect ratio, number of outputs, HDR toggle
- `GenerateButton` - Shows loading state and credit cost
- `ImageGrid` - Displays generated images

### Image Grid Component
**File**: `components/gallery/ImageGrid.tsx`

**Features**:
- Shows loading skeletons during generation
- Applies `magic-appear` animation with staggered delays
- Each image has download link on hover

## Library/Gallery System

### Images API Endpoints
**File**: `app/api/images/route.ts` (GET)
- Fetches user's images with generation data
- Joins `images` and `generations` tables

**File**: `app/api/images/[id]/route.ts` (DELETE)
- Deletes specific image by ID
- Protected by RLS policies

### Library Page
**File**: `app/(main)/library/page.tsx`

**Features**:
- Displays all user's generated images
- Grid layout using `ImageCard` component
- Actions: Reuse (copy to imagine page), Rerun (generate again), Delete

**Methods**:
- `fetchImages()` - Loads images from API
- `handleReuse(prompt, settings)` - Navigates to imagine page with query params
- `handleRerun(prompt, settings)` - Calls generate API directly
- `handleDelete(id)` - Removes image via API

### Image Card Component
**File**: `components/gallery/ImageCard.tsx`
- Shows image with prompt and settings
- Dropdown menu with Reuse, Rerun, Delete actions
- Uses `useRef` for outside-click detection

## Layout System

### Main Layout
**File**: `app/(main)/layout.tsx`

**Structure**:
- Client component managing sidebar state
- Sidebar (desktop: always visible, mobile: toggle with hamburger)
- Header with credits display and user menu
- Main content area with white background

### Sidebar Component
**File**: `components/layout/Sidebar.tsx`

**Features**:
- Navigation links: Imagine, Library
- Displays app logo and name
- Mobile: slide-in animation with dark overlay
- Desktop: fixed sidebar
- Gradient background with animation

### Header Component
**File**: `components/layout/Header.tsx`

**Elements**:
1. Hamburger menu (mobile only)
2. Credits badge with coin icon
3. Buy Credits button (desktop only)
4. User menu dropdown

**User Dropdown**:
- Shows "Signed in as" with email (truncated)
- Logout button
- Outside-click detection using `useRef` and `useEffect`
- High z-index (`z-[9999]`) to appear above all content

## Credits System

### Credits Hook
**File**: `hooks/useCredits.ts`
- Fetches user's credit balance
- Real-time updates on auth state change
- Used in Header component

### Cost Calculation
- Each generation costs 1 credit
- Cost multiplied by `numOutputs` setting
- Validated server-side before generation

## UI Theme Implementation

### Gradient Mesh Theme
**File**: `app/globals.css`

**Custom Classes**:
- `.gradient-button` - Purple gradient with hover effects
- `.gradient-sidebar` - Animated gradient for sidebar
- `.gradient-card` - White frosted glass effect
- `.glass-effect` - Transparent backdrop blur
- `.magic-appear` - Image reveal animation

**Animation**: `gradientShift` keyframe for smooth color transitions

### Magic Appear Animation
**Keyframes** (`app/globals.css:14-32`):
1. Start: opacity 0, scale 0.8, rotated -5deg, blurred
2. Middle: scale 1.05, rotated 2deg (bounce effect)
3. End: opacity 1, scale 1, rotation 0, no blur

**Applied**: Each image in ImageGrid with `0.15s` stagger delay

## Responsive Design

**Breakpoints**: Tailwind's default (sm, md, lg)

**Mobile Adaptations**:
- Hamburger menu for navigation
- Sidebar slides in from left
- Reduced padding and font sizes
- Stacked layout for form elements
- Touch-friendly button sizes

**Implementation**:
- `md:` prefix for desktop styles
- Sidebar: `translate-x-full md:translate-x-0`
- Header: Conditional rendering for mobile/desktop elements

## Key User Flows

### First-Time User
1. Visit app → Redirected to `/login`
2. Click "Sign up" → Register with email/password
3. Database trigger creates profile with 10 credits
4. Redirected to `/imagine` page
5. Enter prompt, adjust settings, generate images
6. Images saved to `/library`

### Generating Images
1. User on `/imagine` page
2. Enters prompt and adjusts settings
3. Clicks "Generate" button
4. API deducts credits and calls Replicate
5. Images return and animate into view
6. Prompt form hides, "Show Prompt" button appears
7. User can download images or go to library

### Reusing Previous Generations
1. User navigates to `/library`
2. Clicks "Reuse" on an image
3. Navigates to `/imagine` with pre-filled prompt and settings
4. User can modify and regenerate

## API Integration

### Replicate API
**Model**: `black-forest-labs/flux-schnell`

**Parameters**:
- `prompt` - Text description
- `aspect_ratio` - "1:1", "16:9", or "9:16"
- `num_outputs` - 1-4 images
- `output_format` - "webp"
- `output_quality` - 80

**Response Handling**: Convert FileOutput objects to URL strings

### Supabase Features Used
1. **Auth** - Email/password authentication
2. **Database** - PostgreSQL with RLS policies
3. **Storage** - URLs stored in database (images hosted by Replicate)

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `REPLICATE_API_TOKEN`

## Deployment Considerations

**Platform**: Vercel (recommended)

**Environment Setup**:
1. Add all environment variables in Vercel dashboard
2. Configure Supabase redirect URLs
3. Deploy from Git repository

**Build**: Next.js 16 with App Router
- Static pages: login, register
- Dynamic pages: imagine, library
- API routes: generate, images
