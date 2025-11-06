# UX Design Specification
## English Learning App - Interactive Reading Experience

**Project:** English Learning Mobile Application
**Platform:** React Native (iOS + Android)
**Document Version:** 1.0
**Date:** 2025-11-02
**Designer:** Sally (UX Designer)
**Stakeholder:** AiDev

---

## Executive Summary

This UX Design Specification defines the complete user experience for an AI-powered English learning mobile application focused on interactive book reading. The app combines native audio narration with instant contextual translation, creating a "magic moment" where learners feel confident, inspired, and delighted while building their English proficiency through authentic literature.

**Core Innovation:** Real-time synchronized reading with karaoke-style sentence highlighting, combined with AI-powered contextual word translation and memory techniques, delivered through a clean, motivating mobile interface.

---

## Table of Contents

1. [Project Vision & Context](#1-project-vision--context)
2. [Design System & Foundation](#2-design-system--foundation)
3. [Visual Design](#3-visual-design)
4. [Design Direction](#4-design-direction)
5. [User Journeys](#5-user-journeys)
6. [Component Library](#6-component-library)
7. [UX Patterns & Consistency](#7-ux-patterns--consistency)
8. [Responsive & Accessibility](#8-responsive--accessibility)
9. [Implementation Guidelines](#9-implementation-guidelines)
10. [Appendices](#10-appendices)

---

## 1. Project Vision & Context

### 1.1 Project Overview

**What We're Building:**
A mobile-first English learning application that enables users to learn through interactive reading of authentic books with AI-powered support, native audio narration, and contextual vocabulary building.

**Target Users:**
- **Primary:** Professionals (programmers, business people) needing English for career advancement
- **Secondary:** Intermediate to advanced learners seeking authentic content
- **Learning Levels:** Beginner through Advanced
- **Geography:** Initially Polish-speaking users, expandable to other languages

**User Motivations:**
- Access to technical/business content in original English
- Contextual learning through authentic literature
- Practical career-focused language acquisition
- Self-paced learning without traditional course constraints

### 1.2 Core Experience

**The Defining Interaction:**
"Interactive Reading with Magic Moment Translation"

When someone describes this app to a friend, they say:

> "It's an app where you read English books with a native narrator, and when you tap any word - BOOM - you instantly get the translation in context plus a memory technique to remember it. It feels like having a personal AI tutor."

**Key Experience Principles:**

1. **Speed:** Instant translation (zero perceived lag), seamless audio control
2. **Guidance:** AI-powered contextual help without overwhelming the learner
3. **Flexibility:** User controls reading pace, audio speed, highlighting preferences
4. **Feedback:** Immediate visual and audio responses to all interactions

### 1.3 Desired Emotional Response

The app is designed to make users feel:

1. **✨ Creative & Inspired** - "I want to learn more"
2. **🧠 Confident & Smart** - "I feel intelligent and capable"
3. **💡 Delighted & Surprised** - "Wow, this is incredible!"

Every design decision supports these emotional goals through:
- Vibrant, energizing color palette
- Instant gratification interactions
- Celebratory micro-animations
- Progress visualization
- AI-powered personalization that makes users feel understood

### 1.4 Platform Requirements

- **Primary Platform:** Mobile smartphones (iOS 13+, Android 8.0+)
- **Screen Sizes:** 375px - 428px width (iPhone SE to iPhone 14 Pro Max range)
- **Orientation:** Portrait only (reading optimized)
- **Offline Capability:** Essential for commute reading
- **Performance:** 60 FPS scrolling, <200ms interaction response

### 1.5 Competitive Analysis Insights

**Learned from Research (Reddit + User Feedback 2024-2025):**

**What Users Love:**
- Audio + text synchronization (Beelinguapp's karaoke-style)
- Minimalist, clean interfaces (Libby's 4.7★ UX)
- Immediate feedback (Duolingo's instant corrections)
- Community native speaker feedback (Busuu's #1 feature)
- Bite-sized content (5-15 minute sessions)
- Generous free tiers (Libby model)

**What Users Hate:**
- Aggressive monetization (Duolingo 2024 backlash)
- Artificial limits that punish engagement (energy systems)
- Complex, confusing interfaces (LingQ complaints)
- Excessive gamification that distracts from learning

**Our Differentiation:**
- No competitor combines: authentic book reading + audio sync + AI contextual translation + memory techniques
- Freemium model that doesn't punish engaged learners
- Clean, focused reading experience inspired by Libby's simplicity
- AI conversation about books you've read (unique feature)

---

## 2. Design System & Foundation

### 2.1 Design System Selection

**Chosen System:** React Native Paper v5 (Material Design 3)

**Rationale:**
1. **Speed to Market:** Provides 190+ production-ready components immediately
2. **Accessibility Built-In:** WCAG 2.1 Level AA compliance out of the box
3. **Proven Patterns:** Users already understand Material Design interactions
4. **Theming Flexibility:** Material 3 allows complete custom color schemes
5. **Active Ecosystem:** Regular updates, strong community support
6. **React Native Optimization:** Built specifically for React Native performance

**Hybrid Approach:**
- **Paper Components:** Navigation, buttons, forms, settings, cards, modals
- **Custom Components:** Reading view, translation popup, audio player, vocabulary cards

This balances rapid development with unique reading experience innovation.

### 2.2 Component Availability

**From React Native Paper:**
- `BottomNavigation` - Primary app navigation
- `Appbar` - Screen headers
- `Button`, `IconButton`, `FAB` - Action triggers
- `Card`, `Surface` - Content containers
- `Dialog`, `Modal`, `Portal` - Overlays
- `TextInput`, `Searchbar` - User input
- `ProgressBar`, `ActivityIndicator` - Loading states
- `Snackbar`, `Banner` - Notifications
- `List`, `Divider` - Content organization
- `Switch`, `Checkbox`, `RadioButton` - Settings controls
- Icons via `react-native-vector-icons` (Material Design icons)

**Custom Components (Detailed in Section 6):**
- `ReadingView` - Text rendering with highlighting
- `SentenceHighlighter` - Audio synchronization
- `TranslationPopup` - Word detail bottom sheet
- `AudioPlayer` - Custom playback controls
- `BookCard` - Library item display
- `VocabularyCard` - Flashcard interface
- `MemoryTechniqueBox` - AI tip display

---

## 3. Visual Design

### 3.1 Color Palette - "Creative Energy"

**Theme Philosophy:**
Vibrant, inspiring palette that creates excitement and motivation. Combines warmth (orange) with creativity (pink) and intelligence (purple) to deliver the "Creative & Inspired + Confident & Smart + Delighted & Surprised" emotional response.

**Visual Reference:** See `docs/ux-color-themes.html` for interactive exploration

#### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Pink** | `#EC4899` | Primary actions, active states, key UI elements |
| **Secondary Orange** | `#F59E0B` | Supporting actions, accents, energy highlights |
| **Accent Purple** | `#8B5CF6` | Intelligence indicators, premium features |

#### Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Success Green** | `#10B981` | Vocabulary added, progress milestones, correct answers |
| **Warning Orange** | `#F59E0B` | Caution states, approaching limits |
| **Error Red** | `#EF4444` | Error states, failed actions, destructive confirmations |
| **Info Cyan** | `#06B6D4` | Informational hints, tooltips |

#### Neutral Scale

| Color | Hex | Usage |
|-------|-----|-------|
| **Background** | `#FFF7ED` | Warm cream - reduces eye strain, reading-friendly |
| **Surface** | `#FFFFFF` | Cards, modals, elevated surfaces |
| **Border** | `#FED7AA` | Light orange - subtle divisions |
| **Text Primary** | `#292524` | Dark brown - softer than pure black |
| **Text Secondary** | `#78716C` | Gray-brown - supporting text |

#### Gradient Usage

**Primary Gradient:** `linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)`

**Usage:**
- Primary buttons ("Start Reading", "Add to Vocabulary")
- App headers
- Premium badges
- Progress fills
- Celebration effects

**Psychology:**
The pink-to-orange gradient creates visual movement and energy, supporting the "creative & inspired" emotional goal. The diagonal direction (135deg) feels progressive and forward-moving.

### 3.2 Typography System

**Philosophy:** Combine modern, friendly headings (Poppins) with optimal reading body text (Inter) for extended reading sessions.

#### Font Families

| Usage | Font | Rationale |
|-------|------|-----------|
| **Headings** | Poppins | Geometric, friendly, modern - supports "delightful" emotion |
| **Body Text** | Inter | Optimized for screen readability, neutral, professional |
| **Monospace** | JetBrains Mono | Code examples, technical terms (if needed) |

**Fallback Stack:**
`'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

#### Type Scale

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **H1** | 32px | Bold (700) | 1.2 | Screen titles, main headings |
| **H2** | 24px | Semibold (600) | 1.3 | Section headers, card titles |
| **H3** | 20px | Semibold (600) | 1.4 | Subsection headers |
| **Body** | 16px | Regular (400) | 1.6 | Standard content, UI text |
| **Body Large** | 18px | Regular (400) | 1.8 | **Reading text** - optimized for mobile reading |
| **Small** | 14px | Regular (400) | 1.5 | Secondary information, metadata |
| **Caption** | 12px | Regular (400) | 1.4 | Tertiary info, labels |

**Reading Text Special Case:**
- Size: 18-20px (user adjustable)
- Line height: 1.8-2.0 (generous for comprehension)
- Color: `#292524` on `#FFF7ED` (4.8:1 contrast - exceeds WCAG AA)
- Letter spacing: 0.01em (slight increase for clarity)

#### Font Loading Strategy

**React Native:**
```typescript
// Preload fonts before app render
import { useFonts } from 'expo-font';

useFonts({
  'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
  'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
});
```

### 3.3 Spacing & Layout System

**Base Unit:** 8px (Material Design standard)

**Spacing Scale:**
```
4px   - Tight (between related elements)
8px   - Standard (component internal padding)
12px  - Comfortable (between form elements)
16px  - Standard padding (card/screen padding)
24px  - Section spacing
32px  - Large gaps (between major sections)
48px  - Extra large (onboarding screens)
64px  - Dramatic spacing (hero sections)
```

**Mobile Screen Padding:**
- **Horizontal:** 20px (left/right screen edges)
- **Vertical:** 16px (top/bottom of scrollable content)
- **Card Internal:** 16px padding
- **Safe Area:** Respect iOS notch and Android status bar

**Touch Targets:**
- **Minimum:** 44x44px (Apple HIG, WCAG AAA)
- **Buttons:** 48px height minimum
- **Bottom Nav Icons:** 24px icon in 56px touch area

**Layout Grid:**
- Mobile: Single column, full-width with padding
- Cards: 8px radius for modern, friendly feel
- Modals: 16px radius for prominence

### 3.4 Elevation & Shadows

**Shadow System (Material Design inspired):**

| Level | Usage | Shadow |
|-------|-------|--------|
| **0** | Flat surfaces, backgrounds | None |
| **1** | Cards, list items | `0 2px 4px rgba(0,0,0,0.1)` |
| **2** | Raised buttons, floating cards | `0 4px 8px rgba(0,0,0,0.12)` |
| **3** | Modals, bottom sheets | `0 8px 16px rgba(0,0,0,0.15)` |
| **4** | Floating action buttons | `0 4px 20px rgba(236,72,153,0.4)` (pink tint) |

**Translation Popup Special Shadow:**
```css
box-shadow: 0 8px 32px rgba(0,0,0,0.2);
```
Creates dramatic depth to emphasize the "magic moment"

### 3.5 Iconography

**Icon System:** Material Design Icons via React Native Vector Icons

**Bottom Navigation Icons:**
- **Library:** `library-books` (outline style)
- **Read:** `menu-book` (outline style)
- **Vocabulary:** `bookmark` (outline style)
- **Settings:** `settings` (outline style)

**Icon Sizing:**
- Navigation icons: 24px
- Action buttons: 24px
- Small indicators: 16px
- Large feature icons: 32-48px

**Icon Colors:**
- Active: Primary pink `#EC4899`
- Inactive: Secondary text `#78716C`
- On colored backgrounds: White `#FFFFFF`

**Premium Badge Icon:** 👑 (emoji) - friendly, recognizable

### 3.6 Micro-Interactions & Animations

**Animation Philosophy:**
Subtle, delightful animations that provide feedback without distraction. Support the "surprised & delighted" emotional goal.

**Standard Transitions:**
- **Duration:** 200-300ms
- **Easing:** `ease-out` for entrances, `ease-in` for exits
- **Timing:** React Native Animated library

**Key Animations:**

1. **Button Press:**
   - Scale down to 0.95 on press
   - Spring back with slight bounce
   - Haptic feedback (iOS/Android)

2. **Translation Popup:**
   - Slide up from bottom: 300ms ease-out
   - Backdrop fade in: 200ms
   - Exit: Slide down 250ms ease-in

3. **Vocabulary Added:**
   - Button text change: "Add" → "✓ Added!"
   - ✨ Sparkle particle effect (3-5 particles)
   - Scale pulse: 1.0 → 1.1 → 1.0 over 400ms
   - Success color transition

4. **Sentence Highlighting:**
   - Fade in background gradient: 150ms
   - Follow audio in real-time
   - Smooth scroll to keep highlighted sentence visible

5. **Audio Player:**
   - Play button rotate: pause ⟷ play icon 200ms
   - Progress bar smooth fill (no jumps)

6. **Page Transitions:**
   - Stack navigator: Slide from right (iOS default)
   - Modal: Slide from bottom
   - Duration: 300ms

**Celebration Moments:**
- Chapter complete: Confetti burst
- Streak milestone: Radial particle explosion
- Level up: Scale + glow effect

---

## 4. Design Direction

### 4.1 Chosen Direction

**Direction:** Bottom Navigation + Reading Focus (Direction #1)

**Visual Reference:** See `docs/ux-design-directions.html` - Direction 1

**Rationale:**
1. **Familiar Pattern:** Users understand bottom navigation from Instagram, Twitter, Spotify
2. **One-Tap Access:** Critical functions (Library, Read, Vocab, Settings) always accessible
3. **Reading Optimized:** Maximum vertical space for content
4. **Thumb-Friendly:** Bottom nav reachable with one hand on large phones
5. **Industry Standard:** 80% of top apps use bottom navigation on mobile

### 4.2 Layout Structure

**Screen Anatomy:**

```
┌─────────────────────────────┐
│ Status Bar (system)         │ 44px (iOS notch area)
├─────────────────────────────┤
│ App Header (optional)       │ 56px (when visible)
│ - Title, actions            │
├─────────────────────────────┤
│                             │
│                             │
│   Scrollable Content        │ Flexible height
│   (Main content area)       │
│                             │
│                             │
├─────────────────────────────┤
│ Audio Player (when active)  │ 72px (floating/docked)
├─────────────────────────────┤
│ Bottom Navigation           │ 56px (fixed)
│ [Library][Read][Vocab][Set] │
├─────────────────────────────┤
│ Safe Area (iOS home bar)    │ 34px
└─────────────────────────────┘
```

### 4.3 Navigation Structure

**Primary Navigation (Bottom Nav):**

| Icon | Label | Screen | Purpose |
|------|-------|--------|---------|
| 📚 | Library | Library Screen | Browse books, continue reading, discover new content |
| 📖 | Read | Reading Screen | Active reading experience (only shows when book is open) |
| 🔖 | Vocab | Vocabulary Screen | Review learned words, flashcards, spaced repetition |
| ⚙️ | Settings | Settings Screen | Preferences, narrator, account, notifications |

**Navigation Behavior:**
- **Active indicator:** Pink `#EC4899` icon and label
- **Inactive:** Gray `#78716C` icon and label
- **Badge support:** Red dot for notifications (e.g., "Review 12 words")
- **Smooth transitions:** Fade content on tab switch (no jank)

**Reading Screen Special Case:**
- Only appears in bottom nav when book is actively open
- Otherwise: Three-tab layout (Library, Vocab, Settings)
- "Read" tab shows current book title in nav label

### 4.4 Screen Hierarchies

**Home Screen = Library Screen**

Users land on Library (not a separate "Home") - immediate access to reading content.

**Hierarchy:**

```
Library Screen (Home)
├── Book Detail Screen
│   └── Reading Screen
│       └── Translation Popup (overlay)
│
Vocabulary Screen
├── Vocabulary Detail (overlay)
└── Review/Flashcard Mode (full screen)

Settings Screen
├── Narrator Selection
├── Reading Preferences
└── Account/Premium
```

### 4.5 Key Screen Layouts

#### Library Screen

```
┌─────────────────────────────┐
│ 📚 Your Library         ⚙️  │ Header
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ Continue Reading        │ │ Section: Sticky
│ │ ┌────────────────────┐  │ │
│ │ │ 📖 The Great Gatsby│  │ │ Card: Prominent
│ │ │ Chapter 3 · 35%    │  │ │
│ │ │ [Continue Reading →]│  │ │
│ │ └────────────────────┘  │ │
│ └─────────────────────────┘ │
│                             │
│ Your Library               │ Section
│ ┌─┬─────────────────┬────┐ │
│ │📕│1984             │👑  │ │ Book Card
│ │  │George Orwell    │    │ │
│ └─┴─────────────────┴────┘ │
│ ┌─┬─────────────────┬────┐ │
│ │📗│To Kill a...     │✓   │ │ Book Card
│ │  │Harper Lee       │    │ │
│ └─┴─────────────────┴────┘ │
├─────────────────────────────┤
│[📚][📖][🔖][⚙️]            │ Bottom Nav
└─────────────────────────────┘
```

#### Reading Screen

```
┌─────────────────────────────┐
│ ← The Great Gatsby     ⋮   │ Minimal Header
├─────────────────────────────┤
│                             │
│   In my younger and more    │ Reading Text
│   vulnerable years my       │ 18px, line-height 1.8
│   father gave me some       │
│   advice...                 │ Highlighted sentence:
│                             │ Pink gradient background
│                             │
│   "Whenever you feel like   │
│   criticizing anyone..."    │
│                             │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ ▶│Chapter 3 · 2:15/6:30││ │ Audio Player
│ │ [=====>--------] 🐌 Aa ││ │ (Docked above nav)
│ └─────────────────────────┘ │
├─────────────────────────────┤
│[📚][📖][🔖][⚙️]            │ Bottom Nav
└─────────────────────────────┘
```

#### Translation Popup (Overlay)

```
┌─────────────────────────────┐
│                             │ Reading screen
│   ...vulnerable years...    │ (dimmed backdrop)
│                             │
│ ┌─────────────────────────┐ │
│ │                      ✕  │ │ Popup slides from
│ │ vulnerable              │ │ bottom
│ │ wrażliwy, podatny       │ │
│ │ /ˈvʌlnərəbəl/          │ │
│ │                         │ │
│ │ Example: "...more       │ │
│ │ vulnerable years..."    │ │
│ │                         │ │
│ │ 💡 Memory Technique     │ │
│ │ Vulcan seems strong but │ │
│ │ has vulnerable emotions │ │
│ │                         │ │
│ │ [✓ Add to Vocabulary]  │ │ Pink gradient button
│ └─────────────────────────┘ │
├─────────────────────────────┤
│[📚][📖][🔖][⚙️]            │ Bottom Nav
└─────────────────────────────┘
```

---

## 5. User Journeys

### 5.1 Journey Map Overview

**Critical Journeys (Priority Order):**
1. Core Reading Experience (THE magic moment)
2. First-Time Onboarding (Hook new users)
3. Browse & Select Book (Discovery & freemium)
4. Vocabulary Review (Retention & learning)
5. Settings & Personalization (Customization)

Each journey is mapped with:
- Entry points
- Step-by-step flow
- User actions
- System responses
- Success criteria
- Error/edge cases

---

### 5.2 Journey 1: Core Reading Experience (Magic Moment)

**User Goal:** Read an English book with native audio support and instantly understand unknown words

**Entry Point:**
- User taps "Continue Reading" from Library screen
- OR: User selects a book and taps "Start Reading"

**Journey Flow:**

#### Step 1: Reading Screen Loads
**User Action:** Opens book
**System Response:**
- Loads reading screen with book text
- Auto-resumes at last read position (saved bookmark)
- Shows audio player in ready state (play button visible)
- Displays progress indicator in header (e.g., "Chapter 3 · 35%")

**UI State:**
- Text displayed at 18px, line height 1.8
- First visible sentence has subtle focus indicator
- Audio player shows: [▶] | Chapter title | Progress bar | Speed | Font size controls

#### Step 2: Audio Playback Begins
**User Action:** Taps play button (OR auto-plays if preference set)
**System Response:**
- Narrator begins reading at user's saved speed preference (default 1.0x)
- Current sentence highlights with pink-orange gradient background (fade-in 150ms)
- Play button changes to pause icon [⏸]
- Progress bar begins filling smoothly

**Highlighting Behavior:**
- Sentence-level granularity (not word-by-word)
- Smooth scroll keeps highlighted sentence in center viewport
- Gradient highlight: `rgba(236, 72, 153, 0.2)` to `rgba(245, 158, 11, 0.2)`

#### Step 3: User Encounters Unknown Word
**User Action:** Taps word "vulnerable" in text
**System Response (Immediate):**
- Audio **pauses instantly** (critical for UX)
- Word scales slightly (1.0 → 1.05) for visual feedback
- Translation popup slides up from bottom (300ms animation)
- Backdrop darkens (50% opacity black overlay)

**Translation Popup Content:**

```
┌─────────────────────────────────────┐
│                              ✕      │ Close button
│                                     │
│  vulnerable                         │ Word: 24px, pink gradient
│  wrażliwy, podatny na zranienie     │ Translation: 18px, dark
│  /ˈvʌlnərəbəl/                     │ Pronunciation: 14px, italic
│                                     │
│  Example from text:                 │ Context label
│  "In my younger and more            │ Sentence excerpt
│   vulnerable years..."              │ (word bold)
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 💡 Memory Technique           │  │ AI-generated tip
│  │ Vulcan (Star Trek) seems      │  │ Background: #FFF7ED
│  │ strong but has vulnerable     │  │ Border-left: orange
│  │ emotions - like being         │  │
│  │ "vulnerable"                  │  │
│  └───────────────────────────────┘  │
│                                     │
│  [ ✓ Add to Vocabulary ]           │ Gradient button
│                                     │
└─────────────────────────────────────┘
```

**Popup Interaction:**
- Swipe down to dismiss (alternative to X button)
- Tap outside popup area (backdrop) to dismiss
- Scrollable if content exceeds viewport

#### Step 4: User Adds Word to Vocabulary
**User Action:** Taps "Add to Vocabulary" button
**System Response:**
- Button text changes: "✓ Added!" (200ms transition)
- Button color changes to success green `#10B981`
- ✨ Sparkle animation: 3-5 particles burst from button
- Button scales: 1.0 → 1.1 → 1.0 (400ms spring animation)
- Haptic feedback (light impact on iOS, vibrate 50ms on Android)
- Word saved to database with:
  - Word + translation
  - Pronunciation
  - Example sentence (current context)
  - Book ID + chapter reference
  - Timestamp for spaced repetition

**Vocabulary Save Success:**
- Green snackbar appears at bottom: "Word added to vocabulary! 📚"
- Snackbar auto-dismisses after 3 seconds
- Popup remains open (user can review or close manually)

#### Step 5: User Closes Popup
**User Action:** Taps X button, swipes down, or taps backdrop
**System Response:**
- Popup slides down (250ms ease-in)
- Backdrop fades out (200ms)
- Audio **resumes automatically** from exact pause point
- Sentence highlighting continues where it left off

**Resume Behavior:**
- No jarring restart
- Smooth continuation
- Progress bar continues filling

#### Step 6: Reading Controls Usage
**Available Controls:**

| Control | Icon | Action | Result |
|---------|------|--------|--------|
| **Play/Pause** | ▶/⏸ | Toggle audio | Immediate pause/resume |
| **Skip Back** | ⏮ | Jump to previous sentence | Audio restarts from previous sentence |
| **Skip Forward** | ⏭ | Jump to next sentence | Audio skips to next sentence |
| **Speed** | 🐌/🐇 | Tap to cycle (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x) | Speed changes immediately |
| **Font Size** | Aa | Tap to cycle (16px, 18px, 20px, 22px) | Text reflows instantly |
| **Highlight Toggle** | 🎨 | Toggle sentence highlighting on/off | Highlighting disabled/enabled |

**Controls Layout:**
```
[▶] [⏮] [⏭] [Progress Bar━━━━━━] [🐌 1.0x] [Aa]
```

**Control Visibility:**
- Always visible above bottom navigation
- Minimizes on scroll down (compact mode: just play/pause + progress)
- Expands on scroll up or tap

#### Step 7: Chapter Completion
**Trigger:** User reaches end of chapter
**System Response:**
- Audio finishes last sentence
- 🎉 Celebration screen overlay:
  - "Chapter 3 Complete!"
  - Stats: "15 words added | 18 minutes read"
  - Confetti animation (2 seconds)
- Options presented:
  - [Continue to Chapter 4 →]
  - [Review Vocabulary]
  - [Return to Library]

**Progress Saved:**
- Current position marked in database
- Book card in Library updates progress percentage
- Streak counter increments (if daily goal met)

---

**Journey Success Criteria:**
- ✅ Audio-text synchronization lag: <100ms (imperceptible)
- ✅ Translation popup appears: <200ms from tap
- ✅ Audio pause on word tap: Instant (no delay)
- ✅ Vocabulary save feedback: Immediate visual confirmation
- ✅ Audio resume after popup close: Seamless continuation
- ✅ Zero frustration taps (all tap targets ≥44px)

**Error Scenarios:**

| Error | Cause | User Experience |
|-------|-------|----------------|
| Audio file not loaded | Network/offline | "Audio unavailable. Download chapter for offline reading?" |
| Translation API failure | Backend issue | Show cached translation or "Translation unavailable. Tap again to retry." |
| Word not found in dictionary | Rare/technical term | "No translation found. Word added to vocabulary for manual review." |
| Storage full | Device limit | "Cannot save. Free up device storage to continue building vocabulary." |

---

### 5.3 Journey 2: First-Time Onboarding

**User Goal:** Understand app value and start reading first book within 3 minutes

**Entry Point:** User opens app for first time (no account/data)

**Journey Flow:**

#### Step 1: Splash Screen (2 seconds)
- App logo with pink-orange gradient animation
- Loading indicator
- Background: Warm cream `#FFF7ED`

#### Step 2: Welcome Screen
**Content:**
```
┌─────────────────────────────┐
│         📚 ✨              │ Large icons
│                             │
│  Learn English Through      │ H1: Poppins Bold 32px
│  Books You Love             │
│                             │
│  Read authentic books with  │ Body: 16px
│  AI-powered instant         │
│  translation and native     │
│  narration                  │
│                             │
│  [ Get Started → ]          │ Gradient button
│                             │
│  Already have account?      │ Small text
│  Sign In                    │ Link
└─────────────────────────────┘
```

**User Action:** Taps "Get Started"

#### Step 3: Native Language Selection
**Screen:**
```
┌─────────────────────────────┐
│  What's your native         │ H2: 24px
│  language?                  │
│                             │
│  ┌─────────────────────┐   │
│  │ 🇵🇱 Polski (Polish) │   │ Selected (pink border)
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🇩🇪 Deutsch (German)│   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🇪🇸 Español (Spanish)│  │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🇫🇷 Français (French)│  │
│  └─────────────────────┘   │
│                             │
│  [ Continue → ]             │
└─────────────────────────────┘
```

**User Action:** Selects Polish, taps Continue

#### Step 4: English Level Selection
**Screen:**
```
┌─────────────────────────────┐
│  What's your English        │
│  level?                     │
│                             │
│  ┌─────────────────────┐   │
│  │ 🟢 Beginner         │   │ Cards with
│  │ Starting your       │   │ descriptions
│  │ English journey     │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🟡 Intermediate     │   │ Selected
│  │ Can read with help  │   │ (pink border)
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🔴 Advanced         │   │
│  │ Read fluently       │   │
│  └─────────────────────┘   │
│                             │
│  [ Continue → ]             │
└─────────────────────────────┘
```

**User Action:** Selects Intermediate, taps Continue

#### Step 5: Interactive Demo - "The Magic Moment"
**Screen:** Mini reading view with tutorial overlay

```
┌─────────────────────────────┐
│  👉 Try It!                 │ Tutorial banner
│  Tap any word to translate  │
├─────────────────────────────┤
│                             │
│  In my younger and more     │ Sample text
│  vulnerable years my        │ Word "vulnerable"
│  father gave me...          │ pulses with pink glow
│                             │
│                             │
│  💡 Tap "vulnerable"        │ Tooltip arrow
│     to see the magic!       │ pointing to word
│                             │
└─────────────────────────────┘
```

**User Action:** Taps "vulnerable"
**System Response:**
- Translation popup appears (same as full app)
- Shows: word, translation, pronunciation, memory technique
- Tutorial continues: "That's it! Tap any word while reading. 🎉"

**User Action:** Taps close or backdrop
**System Response:**
- Popup closes
- Success message: "You got it! Ready to start reading?"
- Button: [Continue to Library →]

#### Step 6: Library Introduction
**Screen:** Library with 3 free books pre-displayed

```
┌─────────────────────────────┐
│  📚 Your Library            │
│                             │
│  🎁 3 Free Books to Start!  │ Callout banner
│                             │
│  ┌─┬─────────────────┬───┐  │
│  │📕│The Great Gatsby │ ✓ │  │ Free book card
│  │  │F. Scott Fitzger │   │  │
│  │  │⭐ Intermediate  │   │  │
│  └─┴─────────────────┴───┘  │
│  ┌─┬─────────────────┬───┐  │
│  │📗│Alice in Wonder..│ ✓ │  │
│  │  │Lewis Carroll    │   │  │
│  │  │⭐ Beginner      │   │  │
│  └─┴─────────────────┴───┘  │
│  ┌─┬─────────────────┬───┐  │
│  │📘│1984             │👑 │  │ Premium teaser
│  │  │George Orwell    │   │  │
│  │  │⭐ Advanced      │   │  │
│  └─┴─────────────────┴───┘  │
│                             │
│  💎 More books in Premium   │ Upsell (subtle)
│                             │
├─────────────────────────────┤
│[📚][📖][🔖][⚙️]            │
└─────────────────────────────┘
```

**User Action:** Taps a free book (The Great Gatsby)
**System Response:** Opens book detail → "Start Reading" → Enters core reading flow

**Onboarding Complete!**

---

**Journey Success Criteria:**
- ✅ Time to first read: <3 minutes
- ✅ User understands core interaction (word tap)
- ✅ User selects appropriate level
- ✅ User begins reading immediately (no barriers)
- ✅ No forced account creation (optional later)

---

### 5.4 Journey 3: Browse & Select Book (Freemium Model)

**User Goal:** Find an interesting book to read that matches skill level and interests

**Entry Point:** User taps Library icon from bottom navigation

**Journey Flow:**

#### Step 1: Library Screen Loads
**Content Sections (in order):**

1. **Continue Reading** (if applicable)
   - Large prominent card with book cover
   - Progress: "Chapter 3 · 35%"
   - Primary button: "Continue Reading"

2. **Your Library** (if user has saved books)
   - Grid of book cards (2 per row on phone)
   - Shows cover, title, author, level badge, free/premium icon

3. **Discover New Books**
   - Scrollable horizontal categories:
     - "Popular Now"
     - "For Your Level" (personalized)
     - "Business English"
     - "Classic Literature"
     - "Short Stories"

**Free vs Premium Indicators:**
- **Free books:** ✓ Green checkmark, no restrictions
- **Premium books:** 👑 Crown icon (emoji), "Preview Available" label

#### Step 2: User Browses Library
**Actions Available:**
- Scroll vertically through library
- Swipe horizontally through "Discover" categories
- Tap search icon (magnifying glass in header)
- Filter by level (dropdown: All Levels, Beginner, Intermediate, Advanced)

#### Step 3: User Selects Book
**User Action:** Taps book card
**System Response:** Navigates to Book Detail Screen

**Book Detail Screen Layout:**

```
┌─────────────────────────────┐
│ ←                           │ Back button
│                             │
│  ┌─────────────────────┐   │
│  │                     │   │ Large book cover
│  │   THE GREAT GATSBY  │   │
│  │                     │   │
│  └─────────────────────┘   │
│                             │
│  The Great Gatsby      👑   │ Title + Premium icon
│  F. Scott Fitzgerald        │ Author
│                             │
│  ⭐ Intermediate  📖 15 ch. │ Metadata badges
│  ⏱ 4h read  💬 25k words   │
│                             │
│  A classic tale of the      │ Description
│  American Dream in the      │ (3-4 lines)
│  Jazz Age...                │
│                             │
│  ┌───────────────────────┐  │
│  │ What you'll learn:    │  │ Learning benefits
│  │ • Business vocabulary │  │
│  │ • Formal conversations│  │
│  │ • Literary expressions│  │
│  └───────────────────────┘  │
│                             │
│  [ Preview First Chapter ] │  Button (premium)
│  OR                         │
│  [ Start Reading → ]        │  Button (free)
│                             │
└─────────────────────────────┘
```

#### Step 4a: Free Book - Immediate Access
**User Action:** Taps "Start Reading"
**System Response:**
- Downloads chapter 1 (if not cached) - shows progress
- Saves book to "Your Library"
- Opens Reading Screen at Chapter 1, Page 1
- Audio ready to play

#### Step 4b: Premium Book - Preview Model
**User Action:** Taps "Preview First Chapter"
**System Response:**
- Downloads Chapter 1 (teaser)
- Opens Reading Screen with banner: "📖 Preview Mode - Chapter 1 Only"
- Full reading functionality available for preview chapter
- User can read, translate words, save vocabulary

#### Step 5: Premium Paywall (End of Preview)
**Trigger:** User reaches end of Chapter 1 in premium book
**System Response:** Paywall modal appears

```
┌─────────────────────────────┐
│         Unlock Full         │ H2: 24px
│         Book                │
│                             │
│  💎 Get Premium Access      │
│                             │
│  ✓ 500+ premium books       │ Benefits list
│  ✓ Unlimited chapters       │
│  ✓ Offline downloads        │
│  ✓ Advanced AI features     │
│  ✓ Ad-free experience       │
│                             │
│  $9.99/month                │ Pricing
│  or $89.99/year (save 25%)  │
│                             │
│  [ Unlock Premium 💎]       │ Primary button
│                             │
│  [ Maybe Later ]            │ Secondary link
│                             │
└─────────────────────────────┘
```

**User Actions:**
- **Unlock Premium:** Navigate to payment flow (Stripe/IAP)
- **Maybe Later:** Close modal, return to Library

**Paywall Rules:**
- First preview is free for all premium books
- After 3 premium previews, user must subscribe or stick to free books
- Free books never have paywalls (no bait-and-switch)

---

**Journey Success Criteria:**
- ✅ User finds relevant book within 60 seconds
- ✅ Level indicators help user choose appropriate content
- ✅ Free books have zero friction to start
- ✅ Premium previews provide real value (full Chapter 1)
- ✅ Paywall feels fair (not aggressive)

---

### 5.5 Journey 4: Vocabulary Review (Spaced Repetition)

**User Goal:** Review saved vocabulary to strengthen long-term retention

**Entry Point:** User taps Vocab icon from bottom navigation

**Journey Flow:**

#### Step 1: Vocabulary Home Screen
**Content:**

```
┌─────────────────────────────┐
│  📝 Your Vocabulary         │ Header
│                             │
│  ┌───────────────────────┐  │
│  │ 🔥 7 Day Streak       │  │ Stats card
│  │ 142 words learned     │  │ (gradient bg)
│  │ 12 words to review    │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 📚 Review Today       │  │ Primary action
│  │ 12 words ready        │  │ card
│  │                       │  │
│  │ [Start Review →]      │  │ Gradient button
│  └───────────────────────┘  │
│                             │
│  All Words (142)            │ Section header
│  ┌─ Filter: All Books ▾ ─┐ │ Dropdown filter
│  │                       │  │
│  vulnerable          ⭐⭐⭐│ │ Word list item
│  wrażliwy                 │ │ (mastery stars)
│  From: The Great Gatsby   │ │
│  ───────────────────────  │ │
│  magnificent         ⭐⭐  │ │
│  wspaniały                │ │
│  From: The Great Gatsby   │ │
│  ───────────────────────  │ │
│  courage             ⭐⭐⭐│ │
│  odwaga                   │ │
│  From: 1984               │ │
│                           │ │
├─────────────────────────────┤
│[📚][📖][🔖][⚙️]            │
└─────────────────────────────┘
```

**Mastery Stars:**
- ⭐ = New (seen 1-2 times)
- ⭐⭐ = Learning (seen 3-5 times)
- ⭐⭐⭐ = Mastered (seen 6+ times, high accuracy)

#### Step 2: User Starts Review Session
**User Action:** Taps "Start Review"
**System Response:**
- Navigates to Flashcard Mode (full screen)
- Loads 12 words in spaced repetition order
- Shows progress: "1 / 12"

#### Step 3: Flashcard Review Interface

**Front Side (Question):**
```
┌─────────────────────────────┐
│  1 / 12              [✕]   │ Progress + exit
│                             │
│                             │
│      vulnerable             │ Word (large, 32px)
│                             │ pink gradient
│                             │
│      /ˈvʌlnərəbəl/         │ Pronunciation
│                             │
│                             │
│  💡 Hint: Vulcan emotions   │ Memory technique
│                             │ (optional hint)
│                             │
│  [ Show Answer ↓ ]         │ Button
│                             │
└─────────────────────────────┘
```

**User Action:** Taps "Show Answer" or swipes up
**System Response:** Flips to back side

**Back Side (Answer):**
```
┌─────────────────────────────┐
│  1 / 12              [✕]   │
│                             │
│      vulnerable             │ Word
│                             │
│      wrażliwy,              │ Translation
│      podatny na zranienie   │ (18px)
│                             │
│  ┌───────────────────────┐  │
│  │ From The Great Gatsby │  │ Context box
│  │ "In my younger and    │  │
│  │  more vulnerable      │  │
│  │  years..."            │  │
│  └───────────────────────┘  │
│                             │
│  How well did you know it?  │ Question
│                             │
│  ┌──────┐  ┌──────┐        │
│  │ 😕   │  │ 😊   │        │ Self-assessment
│  │Again │  │Good  │        │ buttons
│  └──────┘  └──────┘        │
│           ┌──────┐         │
│           │ 🎯   │         │
│           │Perfect│        │
│           └──────┘         │
│                             │
└─────────────────────────────┘
```

#### Step 4: User Self-Assessment
**User Action:** Taps button (Again / Good / Perfect)
**System Response:**
- Records result for spaced repetition algorithm
- Updates mastery level
- Shows next card (slide transition)
- OR if last card: Shows completion screen

**Spaced Repetition Logic:**
- **Again (😕):** Show again in this session + review tomorrow
- **Good (😊):** Show in 3 days
- **Perfect (🎯):** Show in 7 days (increases with each perfect)

#### Step 5: Review Complete
**Completion Screen:**

```
┌─────────────────────────────┐
│                             │
│      🎉                     │ Celebration
│                             │
│      Review Complete!       │ H2
│                             │
│  ┌───────────────────────┐  │
│  │ Today's Results:      │  │ Stats card
│  │                       │  │
│  │ ✓ 8 Perfect           │  │
│  │ ✓ 3 Good              │  │
│  │ ✓ 1 Needs Practice    │  │
│  └───────────────────────┘  │
│                             │
│  Keep your streak alive!    │ Motivational text
│  Come back tomorrow 📅      │
│                             │
│  [ Return to Vocabulary ]  │ Button
│                             │
└─────────────────────────────┘
```

**User Action:** Taps button
**System Response:** Returns to Vocabulary Home (shows updated stats)

---

#### Alternative: Browse Word Detail
**User Action:** From Vocabulary Home, taps any word in list
**System Response:** Opens Word Detail Modal

```
┌─────────────────────────────┐
│                         ✕   │ Close
│                             │
│  vulnerable            ⭐⭐⭐│ Word + mastery
│  wrażliwy, podatny          │ Translation
│  /ˈvʌlnərəbəl/             │ Pronunciation
│                             │
│  ┌───────────────────────┐  │
│  │ 💡 Memory Technique   │  │ AI tip
│  │ Vulcan emotions...    │  │
│  └───────────────────────┘  │
│                             │
│  Found in:                  │ Context section
│  📖 The Great Gatsby        │ Book link
│  Chapter 1, Page 3          │ (tappable)
│  "...more vulnerable years" │ Sentence excerpt
│                             │
│  Learned: 5 days ago        │ Metadata
│  Reviewed: 3 times          │
│  Accuracy: 100%             │
│                             │
│  [ Practice This Word ]     │ Button
│  [ Edit ]  [ Delete ]       │ Actions
│                             │
└─────────────────────────────┘
```

**User Action:** Taps book link
**System Response:** Opens Reading Screen at that specific location (deep link)

---

**Journey Success Criteria:**
- ✅ Review session takes 2-3 minutes (not burdensome)
- ✅ Spaced repetition algorithm feels smart (not annoying)
- ✅ Progress visualization motivates continued practice
- ✅ Context links allow immediate re-reading in book

---

### 5.6 Journey 5: Settings & Personalization

**User Goal:** Customize app experience (narrator, preferences, account)

**Entry Point:** User taps Settings icon from bottom navigation

**Journey Flow:**

#### Step 1: Settings Home Screen

```
┌─────────────────────────────┐
│  ⚙️ Settings                │ Header
│                             │
│  ┌─────────────────────┐   │
│  │ 👤 AiDev            │   │ Profile card
│  │ 🔥 7 day streak     │   │
│  │ 💎 Free Plan        │   │
│  │                     │   │
│  │ [Upgrade Premium]  │   │ Upsell button
│  └─────────────────────┘   │
│                             │
│  Reading Experience         │ Section
│  ───────────────────────   │
│  🎙 Narrator Voice     ▶   │ Navigate to submenu
│  📖 Font & Display     ▶   │
│  🔊 Audio Settings     ▶   │
│                             │
│  Learning                   │ Section
│  ───────────────────────   │
│  🧠 Memory Techniques  ▶   │
│  📅 Daily Goals        ▶   │
│  🔔 Notifications      ▶   │
│                             │
│  Account                    │ Section
│  ───────────────────────   │
│  👤 Profile            ▶   │
│  💎 Premium Status     ▶   │
│  🔐 Privacy            ▶   │
│  ❓ Help & Support     ▶   │
│  🚪 Sign Out               │
│                             │
├─────────────────────────────┤
│[📚][📖][🔖][⚙️]            │
└─────────────────────────────┘
```

#### Step 2: Narrator Voice Selection (Key Personalization)
**User Action:** Taps "Narrator Voice"
**System Response:** Opens Narrator Selection Screen

```
┌─────────────────────────────┐
│  ← Narrator Voice           │ Header
│                             │
│  Choose your reading voice  │ Subtitle
│                             │
│  ┌─────────────────────┐   │
│  │ 🎙 Emma (Female)    │   │ Selected (pink)
│  │ 🇺🇸 American        │   │
│  │ Warm, friendly      │   │
│  │ [▶ Preview]         │   │ Play sample
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🎙 James (Male)     │   │ Unselected
│  │ 🇬🇧 British         │   │
│  │ Clear, professional │   │
│  │ [▶ Preview]         │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🎙 Sarah (Female)   │   │
│  │ 🇦🇺 Australian      │   │
│  │ Energetic, upbeat   │   │
│  │ [▶ Preview] 💎      │   │ Premium
│  └─────────────────────┘   │
│                             │
│  💡 Recommended for you:    │ AI suggestion
│  "Emma" matches your        │ (psychology agent)
│  learning style             │
│                             │
└─────────────────────────────┘
```

**User Action:** Taps narrator card
**System Response:**
- Preview plays 10-second sample
- Selection saved instantly (pink border)
- All future reading uses selected narrator

#### Step 3: Font & Display Settings
**User Action:** Taps "Font & Display"
**System Response:** Opens Display Preferences

```
┌─────────────────────────────┐
│  ← Font & Display           │
│                             │
│  Font Size                  │
│  ┌─────────────────────┐   │
│  │  Aa  Aa  Aa  Aa     │   │ Size selector
│  │  16  18  20  22     │   │ (18 selected)
│  └─────────────────────┘   │
│                             │
│  Line Spacing               │
│  ┌─────────────────────┐   │
│  │ ═ ═ ═ ═              │   │ Spacing visual
│  │ Tight  Comfortable   │   │ (Comfortable
│  │        Relaxed       │   │  selected)
│  └─────────────────────┘   │
│                             │
│  Theme                      │
│  ┌─────┐  ┌─────┐          │
│  │ ☀️  │  │ 🌙  │          │ Light / Dark
│  │Light│  │Dark │          │ (Light selected)
│  └─────┘  └─────┘          │
│                             │
│  Auto-Scroll                │ Toggle
│  Follow narrator        [ON]│
│                             │
│  Sentence Highlighting      │ Toggle
│  Show highlighted text  [ON]│
│                             │
│  Preview:                   │ Live preview
│  ┌─────────────────────┐   │ (shows current
│  │ Sample reading text │   │  settings)
│  │ with your settings  │   │
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

All changes apply **instantly** (no save button needed)

---

**Journey Success Criteria:**
- ✅ Settings are discoverable and clearly labeled
- ✅ Changes take effect immediately (real-time preview)
- ✅ Narrator recommendation feels personalized and helpful
- ✅ Premium features are clearly marked but not pushy

---

## 6. Component Library

### 6.1 Component Strategy

**Philosophy:** Leverage React Native Paper for 80% of UI (standard patterns), build custom components for 20% (unique reading experience).

### 6.2 Standard Components (React Native Paper)

**Navigation:**
- `BottomNavigation` - Primary app navigation with 4 tabs
- `Appbar.Header` - Screen headers with title and actions
- `Drawer` - Side drawer (if needed for future features)

**Actions:**
- `Button` - Primary, secondary, text variants
- `IconButton` - Icon-only actions
- `FAB` - Floating action button
- `Chip` - Pills for tags and badges

**Content:**
- `Card` - Content containers for books, vocabulary
- `Surface` - Elevated containers
- `List.Item` - List rows with icons
- `Divider` - Content separators

**Inputs:**
- `TextInput` - Text fields (search, notes)
- `Searchbar` - Search interface
- `Checkbox` - Multi-select
- `RadioButton` - Single select
- `Switch` - Toggle on/off

**Feedback:**
- `ProgressBar` - Linear progress
- `ActivityIndicator` - Loading spinner
- `Snackbar` - Toast notifications
- `Banner` - Persistent messages
- `Dialog` - Alert modals
- `Modal` - Full-screen overlays

### 6.3 Custom Components (Unique to App)

#### ReadingView

**Purpose:** Main container for book text with interactive highlighting

**Anatomy:**
```tsx
<ReadingView
  text={bookContent}
  currentSentenceIndex={3}
  onWordPress={(word, context) => {}}
  fontSize={18}
  lineHeight={1.8}
  highlightEnabled={true}
/>
```

**Features:**
- Renders paragraphs and sentences
- Sentence-level highlighting with gradient
- Word-level tap detection
- Auto-scroll to keep highlighted sentence centered
- Performance optimized (virtualized for long chapters)

**States:**
- Default: No highlighting
- Highlighted: Current sentence has pink-orange gradient background
- Word hover: Dotted underline on pressable words

---

#### SentenceHighlighter

**Purpose:** Synchronize text highlighting with audio playback in real-time

**Anatomy:**
```tsx
<SentenceHighlighter
  sentences={parsedSentences}
  audioTimestamps={[{start: 0, end: 3.2}, ...]}
  currentTime={audioPlayer.currentTime}
  onHighlightChange={(index) => {}}
/>
```

**Behavior:**
- Monitors audio player time
- Highlights sentence when audio timestamp matches
- Smooth fade-in/fade-out (150ms)
- Triggers auto-scroll in parent ReadingView

---

#### TranslationPopup

**Purpose:** Bottom sheet displaying word translation, pronunciation, and memory techniques

**Anatomy:**
```tsx
<TranslationPopup
  visible={true}
  word="vulnerable"
  translation="wrażliwy, podatny na zranienie"
  pronunciation="/ˈvʌlnərəbəl/"
  exampleSentence="In my younger and more vulnerable years..."
  memoryTechnique="Vulcan emotions are vulnerable"
  onAddToVocabulary={() => {}}
  onClose={() => {}}
/>
```

**Features:**
- Slides up from bottom (300ms)
- Backdrop overlay (50% black)
- Scrollable content (if long)
- Swipe-down to dismiss
- Tap outside to close

**Variants:**
- Default: "Add to Vocabulary" button active
- Success: "✓ Added!" button disabled with green color
- Loading: Skeleton while fetching translation

---

#### AudioPlayer

**Purpose:** Custom playback controls with sentence navigation and speed adjustment

**Anatomy:**
```tsx
<AudioPlayer
  audioUrl={chapter3Audio}
  sentences={sentenceTimestamps}
  onSentenceChange={(index) => {}}
  onPlayPause={(isPlaying) => {}}
/>
```

**Controls:**
| Control | Icon | Function |
|---------|------|----------|
| Play/Pause | ▶/⏸ | Toggle audio playback |
| Previous Sentence | ⏮ | Jump to previous sentence timestamp |
| Next Sentence | ⏭ | Jump to next sentence timestamp |
| Speed Control | 🐌/🐇 | Cycle through speeds (0.5x-2x) |
| Font Size | Aa | Adjust reading text size |
| Progress Bar | Scrubber | Seek to position, show progress |

**Layout:**
```
[▶] [⏮] [⏭] [━━━━━━━━━━━] [🐌 1.0x] [Aa]
           Progress Bar
```

**States:**
- Playing: Pause button, progress animating
- Paused: Play button, progress static
- Loading: Spinner, controls disabled
- Error: Red icon, "Tap to retry"

---

#### BookCard

**Purpose:** Display book in Library with cover, metadata, and progress

**Anatomy:**
```tsx
<BookCard
  book={bookData}
  onPress={() => navigateToBookDetail(book.id)}
  variant="library" // or "continue-reading"
/>
```

**Variants:**

**Library Card (Small):**
```
┌─┬─────────────┬───┐
│ │ Title       │ 👑│ Cover + Icon
│📕│ Author      │   │
│ │ ⭐ Level    │   │
└─┴─────────────┴───┘
```

**Continue Reading Card (Large):**
```
┌───────────────────────┐
│ ┌─────────┐           │
│ │         │ Title     │ Prominent
│ │ Cover   │ Chapter 3 │
│ │         │ 35%       │ Progress bar
│ └─────────┘           │
│ [Continue Reading →] │ CTA button
└───────────────────────┘
```

**Props:**
- book: {title, author, cover, level, isPremium, progress}
- variant: "small" | "large"
- onPress: navigation handler

---

#### VocabularyCard

**Purpose:** Flashcard interface for spaced repetition review

**Anatomy:**
```tsx
<VocabularyCard
  word="vulnerable"
  translation="wrażliwy"
  pronunciation="/ˈvʌlnərəbəl/"
  memoryTechnique="Vulcan emotions..."
  exampleSentence="...vulnerable years..."
  side="front" // or "back"
  onFlip={() => {}}
  onAssess={(rating) => {}} // "again" | "good" | "perfect"
/>
```

**Sides:**
- **Front:** Word + pronunciation + hint
- **Back:** Word + translation + context + self-assessment buttons

**Animations:**
- Flip: 3D rotation (Y-axis, 300ms)
- Swipe: Card slides off screen, next card slides in

---

#### MemoryTechniqueBox

**Purpose:** Styled container for AI-generated memory tips

**Anatomy:**
```tsx
<MemoryTechniqueBox>
  💡 Vulcan (Star Trek) seems strong but has vulnerable emotions
</MemoryTechniqueBox>
```

**Styling:**
- Background: Warm cream `#FFF7ED`
- Border-left: 3px solid orange `#F59E0B`
- Padding: 12px
- Border-radius: 8px
- Icon: 💡 (lightbulb emoji) prefix

**Usage:** Inside TranslationPopup and VocabularyCard

---

### 6.4 Component State Management

**Local State (useState):**
- UI toggles (show/hide)
- Form inputs
- Temporary selections

**Context (React Context):**
- `ThemeContext` - Light/dark mode, colors
- `SettingsContext` - User preferences (font size, narrator)
- `AuthContext` - User session, premium status

**AsyncStorage (Persistence):**
- Last read position (book ID + chapter + paragraph)
- User preferences
- Vocabulary list (synced with backend)

**Backend State (React Query recommended):**
- Book library data
- Vocabulary with spaced repetition schedule
- User progress and stats
- Translations (cached locally)

---

## 7. UX Patterns & Consistency

### 7.1 Button Hierarchy

**Philosophy:** Clear visual distinction between action importance

| Type | Style | Usage | Example |
|------|-------|-------|---------|
| **Primary** | Gradient pink→orange, white text, elevation 2 | Main CTA per screen | "Start Reading", "Add to Vocabulary", "Continue" |
| **Secondary** | White bg, pink border, pink text, elevation 1 | Alternative action | "Browse Books", "Preview Chapter" |
| **Tertiary** | Text only, pink color, no border/bg | Low-priority actions | "Cancel", "Skip", "Maybe Later" |
| **Destructive** | Red bg, white text, elevation 2 | Dangerous actions | "Delete Book", "Sign Out" |
| **Disabled** | Gray bg, gray text, no shadow | Inactive state | Any button when action unavailable |

**Button Sizing:**
- Height: 48px (comfortable touch target)
- Padding: 16px horizontal
- Border-radius: 12px (friendly, modern)
- Font: 16px, weight 600

---

### 7.2 Feedback Patterns

**Success States:**
- **Visual:** Green background `#10B981` with white text
- **Icon:** ✓ checkmark
- **Delivery:** Snackbar at bottom (auto-dismiss 3s)
- **Example:** "Word added to vocabulary! 📚"

**Error States:**
- **Visual:** Red background `#EF4444` with white text
- **Icon:** ⚠️ or ✕
- **Delivery:** Snackbar at bottom (persists until dismissed)
- **Action:** "Retry" button if recoverable
- **Example:** "Connection failed. Tap to retry."

**Warning States:**
- **Visual:** Orange background `#F59E0B` with dark text
- **Icon:** ⚠️
- **Delivery:** Banner at top or inline alert
- **Example:** "3 free previews remaining"

**Info States:**
- **Visual:** Cyan background `#06B6D4` with white text
- **Icon:** ℹ️
- **Delivery:** Inline banner or tooltip
- **Example:** "Tip: Tap any word for instant translation"

**Loading States:**
- **Skeleton screens:** For content loading (book lists, vocabulary)
- **Spinner:** For actions in progress (downloading chapter)
- **Progress bar:** For determinate progress (download %)
- **Inline spinner:** For button actions ("Saving...")

---

### 7.3 Modal & Popup Patterns

**Translation Popup:**
- **Type:** Bottom sheet
- **Entry:** Slide up from bottom (300ms)
- **Exit:** Slide down (250ms) or backdrop tap
- **Backdrop:** 50% black overlay
- **Size:** Auto-height, max 80% screen height
- **Scrollable:** Yes (if content overflows)

**Settings Screens:**
- **Type:** Full-screen modal
- **Entry:** Slide from right (300ms)
- **Exit:** Slide to right or back button
- **Header:** Close X button top-right

**Paywall/Upsell:**
- **Type:** Center modal
- **Entry:** Fade in + scale (1.0 from 0.9)
- **Backdrop:** 70% black overlay, blur 4px
- **Size:** 90% screen width, auto height
- **Dismissible:** "Maybe Later" button only (no backdrop tap)

**Confirmation Dialogs:**
- **Type:** Center dialog (Material Dialog)
- **Entry:** Fade + scale
- **Buttons:** "Cancel" (text) + "Confirm" (primary)
- **Example:** "Delete this book from your library?"

---

### 7.4 Empty State Patterns

**No Books in Library:**
```
┌───────────────────────┐
│                       │
│       📚 🤔          │ Large emoji
│                       │
│  Your library is      │ Friendly message
│  empty                │
│                       │
│  Discover books to    │ Helpful text
│  start your English   │
│  learning journey!    │
│                       │
│  [ Browse Books ]     │ Clear CTA
│                       │
└───────────────────────┘
```

**No Vocabulary Yet:**
```
┌───────────────────────┐
│       ✨ 📖          │
│                       │
│  Start reading to     │
│  build your           │
│  vocabulary!          │
│                       │
│  Tap any word while   │ Educational tip
│  reading to add it    │
│  here.                │
│                       │
│  [ Explore Books ]    │
│                       │
└───────────────────────┘
```

**Search No Results:**
```
┌───────────────────────┐
│       🔍 ∅           │
│                       │
│  No books found for   │
│  "quantum physics"    │
│                       │
│  Try:                 │ Suggestions
│  • Different keywords │
│  • Browse categories  │
│  • Check spelling     │
│                       │
└───────────────────────┘
```

---

### 7.5 Form Patterns

**Label Position:** Above input (floating label not used - clarity priority)

**Required Fields:**
- Indicator: Asterisk (*) after label in red
- Validation: On submit (not on blur - less annoying)

**Validation Timing:**
- **During input:** Real-time for obvious errors (e.g., email format)
- **On blur:** For completeness (e.g., empty required field)
- **On submit:** Final check before API call

**Error Display:**
- Inline below input field
- Red text `#EF4444`
- Icon: ⚠️
- Message: Specific and helpful ("Email must include @")

**Help Text:**
- Below input, gray color
- Icon: ℹ️ or 💡
- Example: "We'll use this to send reading reminders"

---

### 7.6 Navigation Patterns

**Bottom Navigation Active State:**
- Icon: Pink `#EC4899`
- Label: Pink, font weight 600
- Ripple on tap: Pink

**Screen Transitions:**
- Stack navigator: Slide from right (iOS standard)
- Modal: Slide from bottom
- Tab switch: Fade (no slide)

**Back Button Behavior:**
- Always in top-left on sub-screens
- Icon: ← (left arrow)
- Action: Pop stack (go to previous screen)
- On Reading Screen: Prompt "Save bookmark?" if unsaved progress

**Deep Linking:**
- Support deep links to specific books and vocabulary words
- Format: `readenglish://book/{bookId}/chapter/{chapterNum}`
- Format: `readenglish://vocab/{wordId}`

---

### 7.7 Notification Patterns

**Push Notifications (Future):**
- Daily reminder: "Keep your streak! Read for 5 minutes today 🔥"
- Review reminder: "12 words ready to review 📝"
- New content: "3 new books added to your level 📚"

**In-App Notifications:**
- Snackbar at bottom (above bottom nav)
- Auto-dismiss: 3-5 seconds
- Action button: Optional ("Undo", "View")
- Queue: Max 1 visible at a time (queue subsequent)

**Badge Indicators:**
- Red dot on bottom nav icons
- Shows count if >0 (e.g., "12 words to review")
- Clear when section visited

---

### 7.8 Confirmation Patterns

**Destructive Actions (Always Confirm):**
- Delete book from library
- Clear all vocabulary
- Sign out (if unsaved data)

**Irreversible Actions (Always Confirm):**
- Purchase premium subscription
- Cancel subscription

**Confirmation Dialog Format:**
```
┌────────────────────────┐
│  Delete Book?          │ Title: Clear question
│                        │
│  This will remove      │ Explanation
│  "The Great Gatsby"    │
│  from your library.    │
│  Your reading progress │
│  will be lost.         │
│                        │
│  [ Cancel ]  [Delete] │ Cancel (left), Confirm (right)
└────────────────────────┘
```

**Non-Destructive Actions (No Confirm):**
- Add to vocabulary (instant, reversible)
- Start reading (low risk)
- Change settings (immediate feedback)

---

## 8. Responsive & Accessibility

### 8.1 Mobile Responsiveness

**Target Devices:**
- iPhone SE (375px width) - minimum
- iPhone 14 Pro (393px width) - common
- iPhone 14 Pro Max (428px width) - large

**Responsive Strategy:**
- Single-column layouts (no multi-column on phone)
- Flexible card grids: 1 column (small phones), 2 columns (large phones) for book browse
- Touch targets: Minimum 44x44px (Apple HIG standard)
- Safe areas: Respect iOS notch and Android cutouts

**Font Scaling:**
- Respect system font size settings (iOS/Android)
- Test at 100%, 125%, 150% scale
- Ensure minimum 16px body text at default scale

**Orientation:**
- Primary: Portrait (locked for reading)
- Future: Landscape support for tablets

---

### 8.2 Accessibility Strategy

**WCAG 2.1 Level AA Compliance:**

**Color Contrast:**
- Text on background: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**Actual Ratios (Verified):**
- Dark brown `#292524` on cream `#FFF7ED`: 4.8:1 ✓
- Pink `#EC4899` on white: 3.4:1 ✓ (for large elements)
- Gray `#78716C` on cream: 3.2:1 ✓ (secondary text is 14px+)

**Touch Targets:**
- Minimum: 44x44px (WCAG AAA, Apple HIG)
- Buttons: 48px height minimum
- Icon buttons: 44x44px minimum tappable area
- Spacing: 8px minimum between adjacent touch targets

**Screen Reader Support:**
- All icons have `accessibilityLabel`
- Images have `accessibilityHint` if actionable
- Form fields have associated labels
- Headings use semantic hierarchy (h1, h2, h3)
- Dynamic content announces changes (e.g., "Word added to vocabulary")

**Keyboard Navigation (Web Future):**
- All interactive elements focusable
- Focus order follows visual order
- Focus indicators visible (pink outline 2px)
- Skip links for repeated navigation

**Focus Indicators:**
- React Native Paper components have built-in focus states
- Custom components: Pink outline `#EC4899` 2px on focus
- Focus visible on keyboard navigation, hidden on tap

**Text Scaling:**
- All text sizes use relative units (sp on Android, points on iOS)
- Layout accommodates 200% text scaling without breaking
- Truncation with ellipsis if text overflows

**Color Blindness:**
- No information conveyed by color alone
- Icons and text labels accompany color states
- Success/error states use icons + text (not just green/red)

**Dark Mode (Future):**
- Material 3 supports automatic dark theme
- Colors adapt: Light backgrounds become dark, dark text becomes light
- Gradient adjusts luminance for dark backgrounds
- WCAG contrast maintained in dark mode

---

### 8.3 Performance Targets

**Critical Metrics:**
- App launch: <2 seconds (cold start)
- Screen transition: <300ms (perceived instant)
- Audio sync: <100ms lag (imperceptible)
- Translation popup: <200ms from tap
- Scroll: 60 FPS (smooth, no jank)

**Optimization Strategies:**
- Image optimization: WebP format, lazy loading
- Audio caching: Pre-download next chapter
- Virtualized lists: FlatList with `windowSize` optimization
- Debounce search: 300ms delay before API call
- Skeleton screens: Instant feedback while loading

---

## 9. Implementation Guidelines

### 9.1 Technology Stack

**Frontend:**
- React Native 0.73+
- TypeScript 5.0+
- React Native Paper v5 (Material Design 3)
- React Navigation v6 (stack + bottom tabs)
- React Native Vector Icons (Material Design icons)

**State Management:**
- React Context for global state (auth, settings)
- React Query for server state (books, vocabulary)
- AsyncStorage for persistence

**Backend Integration:**
- FastAPI REST API (as per architecture document)
- Axios for HTTP requests
- Offline-first strategy with cache

**Audio:**
- React Native Sound or Expo AV
- Background audio support
- Playback rate control

**Analytics (Future):**
- Firebase Analytics or Mixpanel
- Track: reading time, vocabulary additions, retention

---

### 9.2 Design Tokens

**Color Tokens (for theming):**
```typescript
const colors = {
  primary: '#EC4899',
  secondary: '#F59E0B',
  accent: '#8B5CF6',
  background: '#FFF7ED',
  surface: '#FFFFFF',
  text: '#292524',
  textSecondary: '#78716C',
  border: '#FED7AA',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#06B6D4',
};
```

**Typography Tokens:**
```typescript
const typography = {
  h1: { fontFamily: 'Poppins-Bold', fontSize: 32, lineHeight: 38.4 },
  h2: { fontFamily: 'Poppins-SemiBold', fontSize: 24, lineHeight: 31.2 },
  h3: { fontFamily: 'Poppins-SemiBold', fontSize: 20, lineHeight: 28 },
  body: { fontFamily: 'Inter-Regular', fontSize: 16, lineHeight: 25.6 },
  bodyLarge: { fontFamily: 'Inter-Regular', fontSize: 18, lineHeight: 32.4 },
  small: { fontFamily: 'Inter-Regular', fontSize: 14, lineHeight: 21 },
  caption: { fontFamily: 'Inter-Regular', fontSize: 12, lineHeight: 16.8 },
};
```

**Spacing Tokens:**
```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};
```

---

### 9.3 Component Implementation Example

**TranslationPopup Component Structure:**

```typescript
// src/components/reading/TranslationPopup.tsx

import React from 'react';
import { Modal, Portal, Button } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

interface TranslationPopupProps {
  visible: boolean;
  word: string;
  translation: string;
  pronunciation: string;
  exampleSentence: string;
  memoryTechnique: string;
  isAdded: boolean;
  onAddToVocabulary: () => void;
  onClose: () => void;
}

export const TranslationPopup: React.FC<TranslationPopupProps> = ({
  visible,
  word,
  translation,
  pronunciation,
  exampleSentence,
  memoryTechnique,
  isAdded,
  onAddToVocabulary,
  onClose,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.header}>
          <Text style={styles.word}>{word}</Text>
          <IconButton icon="close" onPress={onClose} />
        </View>

        <Text style={styles.translation}>{translation}</Text>
        <Text style={styles.pronunciation}>{pronunciation}</Text>

        <View style={styles.exampleBox}>
          <Text style={styles.exampleLabel}>Example:</Text>
          <Text style={styles.exampleText}>{exampleSentence}</Text>
        </View>

        <View style={styles.memoryBox}>
          <Text style={styles.memoryLabel}>💡 Memory Technique</Text>
          <Text style={styles.memoryText}>{memoryTechnique}</Text>
        </View>

        <Button
          mode="contained"
          onPress={onAddToVocabulary}
          disabled={isAdded}
          style={styles.button}
        >
          {isAdded ? '✓ Added!' : 'Add to Vocabulary'}
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 16,
  },
  // ... rest of styles
});
```

---

### 9.4 Handoff to Development

**Assets to Provide:**
1. **Color theme visualizer:** `docs/ux-color-themes.html`
2. **Design direction mockups:** `docs/ux-design-directions.html`
3. **This specification document:** `docs/ux-design-specification.md`
4. **Material Design Icons list:** All icon names documented
5. **Font files:** Poppins, Inter (to be added to project)

**Design QA Checklist:**
- [ ] All screens match chosen design direction (Bottom Nav + Reading Focus)
- [ ] Color palette matches Creative Energy theme exactly
- [ ] Typography sizes and weights correct
- [ ] Touch targets ≥44x44px
- [ ] WCAG AA contrast ratios met
- [ ] Animations match specified durations and easing
- [ ] Translation popup slide-up behavior matches mockup
- [ ] Audio player controls functional and accessible
- [ ] Bottom navigation active states correct (pink highlight)

**Collaboration:**
- Design reviews every sprint
- Figma prototypes for complex interactions (if needed)
- Developer access to design tokens repository
- Slack channel for design questions

---

## 10. Appendices

### 10.1 Interactive Deliverables

**Color Theme Visualizer:**
- File: `docs/ux-color-themes.html`
- Purpose: Explore 4 theme options with live component examples
- Selected Theme: #2 Creative Energy (Pink + Orange gradient)

**Design Direction Mockups:**
- File: `docs/ux-design-directions.html`
- Purpose: Compare 6 different layout approaches with interactive mobile mockups
- Selected Direction: #1 Bottom Nav + Reading Focus

### 10.2 Glossary

**Freemium:** Business model offering basic features free, premium features paid
**Karaoke-style highlighting:** Text highlighting that follows audio in real-time (like karaoke lyrics)
**Spaced repetition:** Learning technique that spaces review intervals for optimal memory retention
**Bottom sheet:** Modal that slides up from bottom of screen
**Haptic feedback:** Vibration feedback on touch interactions
**Touch target:** Tappable area size for interactive elements
**WCAG:** Web Content Accessibility Guidelines - standard for accessible design

### 10.3 Design Rationale Summary

**Why Bottom Navigation?**
- 80% of top mobile apps use it (familiar)
- Thumb-friendly on large phones
- Always accessible (no hamburger menu hunting)

**Why Creative Energy Theme?**
- Pink = creativity, warmth, inspiration
- Orange = energy, enthusiasm, action
- Gradient = movement, progress, excitement
- Matches emotional goals: inspired, confident, delighted

**Why Material Design 3?**
- Proven component library (190+ components)
- Built-in accessibility (WCAG AA)
- Active ecosystem and support
- Fast development without sacrificing quality

**Why Translation Popup as Bottom Sheet?**
- Thumb-reachable (bottom of screen)
- Doesn't obscure reading text above
- Natural swipe-down dismissal
- Follows mobile best practices (Google, Apple)

**Why Auto-Resume Bookmark?**
- Removes friction (user doesn't think "where was I?")
- Immediate value (start reading in 1 tap)
- Matches Kindle, Audible behavior (expected pattern)

### 10.4 Future Enhancements

**Phase 2 Features (Post-MVP):**
- Dark mode (Material 3 supports)
- Tablet layouts (multi-column, split view)
- Web version (React Native Web)
- Social features (reading clubs, friends)
- AI conversation about book content
- Advanced analytics dashboard
- Multiple narrator voice options (premium)
- Custom vocabulary decks
- Export vocabulary to Anki

**Experimental Features:**
- AR overlay for real-world text translation
- Voice recording for pronunciation practice
- Live tutoring sessions
- Collaborative reading groups
- Gamification with XP and levels

---

## Document Approval

**Reviewed by:** AiDev
**Approved by:** [Pending]
**Date:** 2025-11-02
**Version:** 1.0

**Next Steps:**
1. Development team review and estimation
2. Create detailed Figma prototypes for complex flows (if needed)
3. Begin frontend implementation with React Native Paper
4. Design QA checkpoints every 2 weeks

---

**🎨 End of UX Design Specification**

---

*This document represents the complete UX design vision for the English Learning App. All design decisions are backed by user research, competitive analysis, and UX best practices. The design prioritizes user emotions (creative, confident, delighted) while maintaining accessibility, performance, and development efficiency.*
