# PYGMI - Software System Design (SSD)

---

## 1. System Overview

**App Name:** PYGMI

**Type:** Text-to-Image Generator Web Application

**Developer:** Solo Developer + AI Agent

---

## 2. Tech Stack

| Layer    | Technology                   |
| -------- | ---------------------------- |
| Frontend | Next.js (App Router)         |
| Styling  | Tailwind CSS                 |
| Backend  | Next.js API Routes           |
| Database | Supabase (PostgreSQL)        |
| Auth     | Supabase Auth                |
| Storage  | Supabase Storage             |
| AI Model | Replicate API (flux-schnell) |

---

## 3. Project Structure

```
pygmi/
├── app/
│   ├── page.js                    # Redirect to /imagine
│   ├── layout.js                  # Root layout with providers
│   ├── (auth)/
│   │   ├── login/page.js
│   │   └── register/page.js
│   ├── (main)/
│   │   ├── layout.js              # Main layout with sidebar
│   │   ├── imagine/page.js        # Generate page
│   │   ├── library/page.js        # My Generate page
│   │   └── explore/page.js        # Explore page
│   └── api/
│       ├── auth/
│       │   └── route.js
│       ├── generate/
│       │   └── route.js
│       ├── images/
│       │   └── route.js
│       └── credits/
│           └── route.js
├── components/
│   ├── ui/                        # Reusable UI components
│   ├── auth/
│   │   ├── LoginForm.js
│   │   └── RegisterForm.js
│   ├── generator/
│   │   ├── PromptInput.js
│   │   ├── SettingsPanel.js
│   │   └── GenerateButton.js
│   ├── gallery/
│   │   ├── ImageCard.js
│   │   └── ImageGrid.js
│   └── layout/
│       ├── Sidebar.js
│       └── Header.js
├── lib/
│   ├── supabase.js                # Supabase client
│   └── replicate.js               # Replicate client
├── hooks/
│   ├── useAuth.js
│   └── useCredits.js
└── .env.local
```

---

## 4. Database Schema

### 4.1 Tables

**users** (managed by Supabase Auth)

```sql
-- Extended user profile
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT NOT NULL,
  credits INTEGER DEFAULT 10,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**generations**

```sql
CREATE TABLE generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  prompt TEXT NOT NULL,
  settings JSONB NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**images**

```sql
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  generation_id UUID REFERENCES generations(id) NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4.2 Indexes

```sql
CREATE INDEX idx_generations_user_id ON generations(user_id);
CREATE INDEX idx_images_user_id ON images(user_id);
CREATE INDEX idx_images_generation_id ON images(generation_id);
```

---

## 5. API Endpoints

### 5.1 Auth

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |
| POST   | `/api/auth/logout`   | Logout user       |

### 5.2 Generation

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| POST   | `/api/generate`      | Create new generation |
| GET    | `/api/generate/[id]` | Get generation status |

**POST /api/generate - Request Body:**

```json
{
  "prompt": "string",
  "reference_image": "base64 | null",
  "num_outputs": 1-4,
  "aspect_ratio": "1:1 | 16:9 | 9:16",
  "hdr": true | false
}
```

### 5.3 Images

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/api/images`      | Get user's images |
| GET    | `/api/images/[id]` | Get single image  |
| DELETE | `/api/images/[id]` | Delete image      |

### 5.4 Credits

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/credits` | Get user credit balance |

---

## 6. Page Specifications

### 6.1 Register Page (`/register`)

**Components:** RegisterForm

**Fields:** Name, Email, Password, Confirm Password

**Actions:** Submit → Create account → Redirect to /imagine

**Validation:** Email format, password min 6 chars, password match

### 6.2 Login Page (`/login`)

**Components:** LoginForm

**Fields:** Email, Password

**Actions:** Submit → Login → Redirect to /imagine

**Links:** "Don't have account? Register"

### 6.3 Imagine Page (`/imagine`)

**Components:** PromptInput, SettingsPanel, GenerateButton, ImageGrid

**Layout:**

```
┌─────────────────────────────────────────────┐
│ Header (Logo, Credits, User Menu)           │
├──────────┬──────────────────────────────────┤
│          │  Prompt Input                    │
│          │  ┌────────────────────────────┐  │
│ Sidebar  │  │ Text Area                  │  │
│          │  │ [Upload Reference]         │  │
│ - Explore│  └────────────────────────────┘  │
│ - Imagine│                                  │
│ - Library│  Settings Panel                  │
│ - Organize │ [1:1] [16:9] [9:16]  [HDR]    │
│          │  Outputs: [1] [2] [3] [4]        │
│          │  Model: Seedream 4.5             │
│          │                                  │
│          │  [Generate - 1 Credit]           │
│          │                                  │
│          │  ─────────────────────────────   │
│          │  Generated Images Grid           │
│          │  (Latest generation results)     │
└──────────┴──────────────────────────────────┘
```

**Generation Flow:**

1. User enters prompt
2. User sets options (aspect ratio, num outputs, HDR)
3. Click Generate
4. Deduct credits
5. Call Replicate API
6. Save to database
7. Display results

### 6.4 Library Page (`/library`)

**Components:** ImageGrid, ImageCard

**Layout:** Grid of all user's generated images

**Features per Image Card:**

* Preview image
* Show prompt
* Copy prompt button
* Re-use button (load to /imagine)
* Rerun button (generate again)
* Download button

**Grouping:** By generation task (batch)

### 6.5 Explore Page (`/explore`)

**Components:** ImageGrid

**Content:** Public/featured images (placeholder for MVP)

---

## 7. Component Specifications

### 7.1 PromptInput

```
Props: value, onChange, onSubmit
State: text, referenceImage
Features:
  - Textarea for prompt
  - Upload button for reference image
  - Character count
```

### 7.2 SettingsPanel

```
Props: settings, onSettingsChange
State: aspectRatio, numOutputs, hdr
Options:
  - Aspect Ratio: 1:1 (default), 16:9, 9:16
  - Num Outputs: 1 (default), 2, 3, 4
  - HDR: off (default), on
```

### 7.3 GenerateButton

```
Props: onClick, credits, cost, loading
Display: "Generate - {cost} Credit"
States: Default, Loading, Disabled (no credits)
```

### 7.4 ImageCard

```
Props: image, onCopy, onReuse, onRerun, onDownload
Display: 
  - Image thumbnail
  - Prompt text (truncated)
  - Action buttons
```

### 7.5 Sidebar

```
Props: currentPath
Links:
  - Explore (/explore)
  - Imagine (/imagine) 
  - My Generate (/library)
  - Organize (/organize) - disabled for MVP
```

### 7.6 Header

```
Props: user, credits
Display:
  - Logo
  - Credit balance
  - Buy Credits button
  - User avatar + dropdown (logout)
```

---

## 8. Auth Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  /register  │ ──► │   /login    │ ──► │  /imagine   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   /library  │
                    └─────────────┘
```

**Protected Routes:** /imagine, /library, /explore

**Public Routes:** /login, /register

---

## 9. Generation Flow

```
1. User Input
   └─► Prompt + Settings

2. Frontend Validation
   └─► Check credits >= cost
   └─► Validate inputs

3. API Call (POST /api/generate)
   └─► Deduct credits
   └─► Create generation record (status: pending)
   └─► Call Replicate API

4. Replicate Processing
   └─► Wait for completion
   └─► Get image URLs

5. Save Results
   └─► Update generation (status: completed)
   └─► Save images to database

6. Return Response
   └─► Return image URLs to frontend
   └─► Display in ImageGrid
```

---

## 10. Credit System

**Initial Credits:** 10 (on registration)

**Cost per Generation:** 1 credit (regardless of num_outputs)

**Buy Credits:** Button only (no payment integration for MVP)

---

## 11. Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# Replicate
REPLICATE_API_TOKEN=r8_xxx
```

---

## 12. Development Phases

### Phase 1: Setup

* [ ] Create Next.js project
* [ ] Install dependencies
* [ ] Setup Tailwind CSS
* [ ] Configure Supabase client
* [ ] Configure Replicate client
* [ ] Create database tables

### Phase 2: Auth

* [ ] Register page + form
* [ ] Login page + form
* [ ] Auth middleware (protected routes)
* [ ] Logout functionality

### Phase 3: Layout

* [ ] Root layout
* [ ] Main layout (sidebar + header)
* [ ] Sidebar component
* [ ] Header component

### Phase 4: Imagine Page

* [ ] PromptInput component
* [ ] SettingsPanel component
* [ ] GenerateButton component
* [ ] POST /api/generate endpoint
* [ ] ImageGrid for results

### Phase 5: Library Page

* [ ] GET /api/images endpoint
* [ ] ImageCard component
* [ ] ImageGrid component
* [ ] Copy/Reuse/Rerun/Download actions

### Phase 6: Polish

* [ ] Loading states
* [ ] Error handling
* [ ] Toast notifications
* [ ] Responsive design

---

*End of Document*
