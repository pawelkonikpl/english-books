# Product Epics - English Learning App

**Project:** English Learning Mobile Application
**Platform:** React Native (iOS + Android)
**Document Version:** 1.0
**Date:** 2025-11-02
**Status:** MVP Planning

---

## Epic Overview

This document defines 6 core epics for the MVP release of the English Learning App, organized around key user journeys and technical capabilities. Each epic contains multiple user stories that deliver incremental value.

**Epic Prioritization:**
1. **Epic 2: Reading Experience** - Core value proposition
2. **Epic 3: Instant Translation** - Magic moment feature
3. **Epic 1: Book Library & Management** - Content discovery
4. **Epic 4: Vocabulary Building** - Learning retention
5. **Epic 5: Audio & Narration** - Enhanced learning
6. **Epic 6: Settings & Personalization** - User customization

---

## Epic 1: Book Library & Management

**Goal:** Enable users to discover, preview, and access English books matched to their learning level through an intuitive freemium library interface.

**User Value:** Users can browse a curated collection of authentic English literature, preview premium books, and immediately start reading free content without friction.

**Business Value:** Establishes freemium funnel, showcases content quality, drives premium conversions through book previews.

**Technical Components:**
- Frontend: `LibraryScreen.tsx`, `BookCard.tsx`, `BookDetailScreen.tsx`
- Backend: `/api/v1/lessons` endpoints (book CRUD)
- Database: `lessons` table, book metadata storage
- File System: Book content storage, cover images

**Acceptance Criteria:**
- Users can browse library with filtering by level/category
- Free books display immediately accessible
- Premium books show preview chapter + upgrade prompt
- Book cards show: title, author, level, progress, free/premium badge
- Continue Reading card prominently displays current book with progress

---

### Story 1.1: Library Screen with Book Grid

**As a** learner
**I want to** see all available books in a scrollable grid
**So that I can** discover new content to read

**Implementation:**
- Display "Continue Reading" card at top if book in progress
- Grid of `BookCard` components below
- Filter chips: All, Free, Premium, Beginner, Intermediate, Advanced
- Empty state: "No books found. Check back soon!"

**Tech Stack:**
- React Native `FlatList` with `BookCard` items
- SQLite query: `SELECT * FROM lessons WHERE category='book'`
- AsyncStorage for last read book position

**AC:**
- [ ] Grid displays all books from database
- [ ] Continue Reading card shows current book if exists
- [ ] Free/Premium badge visible on each card
- [ ] Tapping card navigates to Book Detail screen

---

### Story 1.2: Book Detail Screen

**As a** learner
**I want to** view detailed information about a book before starting
**So that I can** decide if it matches my learning goals

**Implementation:**
- Full book cover, title, author
- Description, learning level, estimated reading time
- "Key vocabulary" preview (5-10 words user will learn)
- Learning benefits callout
- CTA: "Start Reading" (free) or "Preview First Chapter" (premium)

**Tech Stack:**
- GET `/api/v1/lessons/{id}` for book details
- Display Pydantic `LessonResponse` schema data
- Material Design Card component

**AC:**
- [ ] All book metadata displays correctly
- [ ] Free books show "Start Reading" button
- [ ] Premium books show "Preview First Chapter" + upgrade prompt
- [ ] Navigation to Reading Screen on CTA tap

---

### Story 1.3: Freemium Model Implementation

**As a** business
**I want to** offer preview chapters of premium books
**So that I can** convert free users to paid subscribers

**Implementation:**
- Mark books in database: `is_premium: boolean`
- Preview mode: Show first chapter only
- Paywall trigger at chapter end
- Upgrade modal: Benefits list + pricing + CTA

**Tech Stack:**
- Database column: `lessons.is_premium`
- Backend validation: Check user subscription status
- Frontend: Premium badge 👑 emoji on cards

**AC:**
- [ ] Free books fully accessible
- [ ] Premium books show preview chapter only
- [ ] Paywall appears at preview end with upgrade options
- [ ] Premium badge visible on library cards

---

### Story 1.4: Book Progress Tracking

**As a** learner
**I want to** see my reading progress on each book
**So that I can** feel motivated to continue and track completion

**Implementation:**
- Progress bar on Continue Reading card
- Percentage indicator (e.g., "Chapter 3 · 35%")
- Database: Save `last_chapter_id`, `last_position_offset`
- Update on every chapter change or app background

**Tech Stack:**
- `user_progress` table: `lesson_id`, `progress_percentage`, `last_accessed`
- SQLAlchemy ORM for progress updates
- React Context for progress state management

**AC:**
- [ ] Progress bar shows correct percentage
- [ ] Auto-resume loads exact last position
- [ ] Progress updates save to database every 30 seconds
- [ ] Continue Reading card sorts by `last_accessed`

---

## Epic 2: Reading Experience (Core Magic Moment)

**Goal:** Deliver an immersive, distraction-free reading interface with real-time audio-text synchronization and karaoke-style sentence highlighting.

**User Value:** Users experience authentic English literature with professional narration that keeps them engaged, confident, and progressing at their own pace.

**Business Value:** Core differentiation from competitors, creates emotional "wow" moment that drives retention and word-of-mouth growth.

**Technical Components:**
- Frontend: `ReadingView.tsx`, `SentenceHighlighter.tsx`, `ReadingScreen.tsx`
- Backend: Audio file serving, text-to-speech synchronization metadata
- Audio: React Native Sound library, playback state management
- Database: Reading position persistence

**Acceptance Criteria:**
- Audio-text sync lag: <100ms (imperceptible)
- Sentence highlighting follows audio in real-time
- Smooth auto-scroll keeps highlighted sentence visible
- Reading controls respond immediately (<50ms)
- Reading position persists across app restarts

---

### Story 2.1: Reading View Component

**As a** learner
**I want to** read book text in a clean, comfortable layout
**So that I can** focus on comprehension without distraction

**Implementation:**
- Scrollable text view with generous padding
- Typography: Inter 18px, line-height 1.8
- Background: Warm cream `#FFF7ED`
- Text color: Dark brown `#292524` (4.8:1 contrast)
- Tap any word → trigger translation popup

**Tech Stack:**
- React Native `ScrollView` with `Text` components
- Word-level `<Text>` wrapping for tap detection
- `onPress` handler on each word component

**AC:**
- [ ] Text renders at 18px with 1.8 line height
- [ ] All words are tappable (44x44px minimum touch target)
- [ ] Scroll is smooth at 60 FPS
- [ ] Long-press word shows native copy/paste menu

---

### Story 2.2: Audio-Text Synchronization

**As a** learner
**I want to** hear native audio synchronized with text highlighting
**So that I can** improve pronunciation and listening comprehension

**Implementation:**
- Load audio file with timestamp metadata for each sentence
- Play audio using React Native Sound
- Monitor playback position every 100ms
- Update highlighted sentence based on current timestamp
- Pre-load next chapter audio in background

**Tech Stack:**
- Audio metadata JSON: `[{sentence_id: 1, start_time: 0.0, end_time: 3.5}, ...]`
- React Native Sound for audio playback
- `setInterval` for position polling
- React state for `currentSentenceId`

**AC:**
- [ ] Sentence highlighting follows audio within 100ms
- [ ] Highlighted sentence has pink-orange gradient background
- [ ] Auto-scroll keeps highlighted sentence in center viewport
- [ ] No jarring jumps or lag

---

### Story 2.3: Reading Playback Controls

**As a** learner
**I want to** control audio playback (play, pause, speed, skip)
**So that I can** adapt the reading pace to my comprehension level

**Implementation:**
- Audio player component docked above bottom navigation
- Controls: Play/Pause, Skip Back, Skip Forward, Speed (0.5-2x), Font Size (Aa)
- Progress bar shows current position in chapter
- All controls respond immediately

**Tech Stack:**
- React Native Paper `Button`, `IconButton` components
- Audio library speed control: `sound.setSpeed()`
- State management: `playbackSpeed`, `fontSize`, `isPlaying`

**AC:**
- [ ] Play/Pause toggles immediately
- [ ] Skip Back jumps to previous sentence
- [ ] Skip Forward jumps to next sentence
- [ ] Speed cycles through 6 options: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
- [ ] Font size cycles through 4 options: 16px, 18px, 20px, 22px

---

### Story 2.4: Auto-Resume Last Position

**As a** learner
**I want to** automatically resume where I left off
**So that I can** continue reading without searching for my place

**Implementation:**
- Save reading position to database every 30 seconds
- Save on app background, chapter change, or manual bookmark
- On app launch: Load `last_chapter_id` and `last_sentence_id`
- Scroll to exact position on Reading Screen mount

**Tech Stack:**
- AsyncStorage for quick client-side cache
- SQLite for persistent position: `user_progress` table
- React useEffect hook for auto-save interval

**AC:**
- [ ] Position saves every 30 seconds during reading
- [ ] Position saves immediately on app background
- [ ] Resume loads correct chapter and scrolls to exact sentence
- [ ] Works offline (local SQLite + AsyncStorage)

---

### Story 2.5: Chapter Completion Celebration

**As a** learner
**I want to** see a celebration when I finish a chapter
**So that I can** feel accomplished and motivated to continue

**Implementation:**
- Trigger on last sentence audio completion
- Modal overlay with: "Chapter X Complete!" title
- Stats: Words added, time spent reading
- Confetti animation (2 seconds)
- Options: Continue to Next Chapter, Review Vocabulary, Return to Library

**Tech Stack:**
- React Native Animated for confetti particles
- Lottie for celebration animation (optional)
- Modal component with gradient background

**AC:**
- [ ] Modal appears immediately after last sentence
- [ ] Confetti animation plays for 2 seconds
- [ ] Stats display correctly from session data
- [ ] All three navigation options work correctly

---

## Epic 3: Instant Translation (Magic Moment)

**Goal:** Provide instant, contextual word translation with AI-generated memory techniques through an elegant bottom sheet popup.

**User Value:** Users never feel stuck on unknown words - instant understanding builds confidence and maintains reading flow.

**Business Value:** Core differentiator, drives engagement and retention, showcases AI value.

**Technical Components:**
- Frontend: `TranslationPopup.tsx`, `MemoryTechniqueBox.tsx`
- Backend: `/api/v1/translation/translate` endpoint
- AI: Hugging Face Transformers (Helsinki-NLP translation models)
- Database: Word cache for offline access

**Acceptance Criteria:**
- Translation popup appears <200ms after word tap
- Audio pauses instantly on word tap
- Translation shows: word, target language translation, pronunciation, context example, memory technique
- Popup dismisses with swipe down, backdrop tap, or close button
- Audio resumes on popup close

---

### Story 3.1: Word Tap Detection

**As a** learner
**I want to** tap any word to see its translation
**So that I can** understand vocabulary in context

**Implementation:**
- Wrap each word in `<Text>` component with `onPress` handler
- Extract word text, sentence context, book metadata
- Trigger translation fetch
- Pause audio immediately on tap
- Show loading indicator while fetching (max 200ms)

**Tech Stack:**
- Word-level Text components with touch handlers
- Extract word via regex: `/\b\w+\b/`
- React state for `selectedWord`, `isLoading`

**AC:**
- [ ] All words are tappable with 44px touch targets
- [ ] Word tap pauses audio immediately
- [ ] Loading indicator shows if translation takes >100ms
- [ ] Tap during ongoing translation cancels previous request

---

### Story 3.2: Translation Popup UI

**As a** learner
**I want to** see word details in an attractive, easy-to-read popup
**So that I can** quickly understand and remember new vocabulary

**Implementation:**
- Bottom sheet slides up from bottom (300ms animation)
- Darkened backdrop (50% opacity)
- Content:
  - Word (24px, pink gradient)
  - Translation (18px, dark)
  - Pronunciation IPA (14px, italic)
  - Example sentence from text (word bolded)
  - Memory technique box (AI-generated)
  - "Add to Vocabulary" button (gradient)
- Swipe down or tap backdrop to dismiss

**Tech Stack:**
- React Native Modal or Bottom Sheet library
- Material Design Card component
- Gradient Text via react-native-linear-gradient

**AC:**
- [ ] Popup slides up smoothly (300ms)
- [ ] Backdrop darkens to 50% opacity
- [ ] All content displays correctly
- [ ] Swipe down, backdrop tap, and X button all dismiss
- [ ] Popup is scrollable if content exceeds viewport

---

### Story 3.3: AI Memory Technique Generation

**As a** learner
**I want to** see an AI-generated memory technique for each word
**So that I can** remember vocabulary more effectively

**Implementation:**
- Backend: Call Hugging Face model or GPT API
- Generate mnemonic based on: word, translation, user's native language
- Example: "vulnerable" → "Vulcan (Star Trek) seems strong but has vulnerable emotions"
- Cache generated techniques in database
- Fallback: Show generic learning tip if AI unavailable

**Tech Stack:**
- Backend: `translation_service.py` with HF Transformers
- Model: Text generation (e.g., distilbert or GPT-2 fine-tuned)
- Database: `vocabulary_items.memory_technique` column

**AC:**
- [ ] AI technique generates within 500ms
- [ ] Technique is contextual and helpful
- [ ] Cached techniques load instantly (<50ms)
- [ ] Fallback message shows if AI fails

---

### Story 3.4: Translation API Integration

**As a** system
**I want to** translate words using local Hugging Face models
**So that I can** provide instant, offline-capable translation

**Implementation:**
- Backend endpoint: `POST /api/v1/translation/translate`
- Request: `{text, source_lang: "en", target_lang: "pl"}`
- Use Helsinki-NLP OPUS-MT model for translation
- Cache translations in SQLite
- Response time: <200ms (cached) or <500ms (first translation)

**Tech Stack:**
- FastAPI route: `translation.py`
- Transformers pipeline: `pipeline("translation", model="Helsinki-NLP/opus-mt-en-pl")`
- Model caching in `backend/data/models/`

**AC:**
- [ ] Translation API responds within 500ms
- [ ] Cached translations respond within 100ms
- [ ] Supports multiple source languages (Polish, German, Spanish, French)
- [ ] Graceful error handling with retry option

---

## Epic 4: Vocabulary Building

**Goal:** Enable users to save, review, and master vocabulary through spaced repetition flashcards and progress tracking.

**User Value:** Users build a personalized vocabulary list, review words with spaced repetition, and track mastery progress.

**Business Value:** Increases engagement, provides learning outcomes data, creates habit loop for daily use.

**Technical Components:**
- Frontend: `VocabularyScreen.tsx`, `VocabularyCard.tsx`, `FlashcardView.tsx`
- Backend: `/api/v1/vocabulary` endpoints, spaced repetition algorithm
- Database: `vocabulary_items`, `vocabulary_practice` tables
- Algorithm: SM-2 spaced repetition (SuperMemo)

**Acceptance Criteria:**
- Users can view all saved vocabulary words
- Flashcard review mode with spaced repetition scheduling
- Progress stats: Total words, review streak, mastery levels
- Filter by: All, Reviewing, Mastered, Book source

---

### Story 4.1: Add Word to Vocabulary

**As a** learner
**I want to** save words from translation popup to my vocabulary list
**So that I can** review them later

**Implementation:**
- "Add to Vocabulary" button in translation popup
- On tap: Save to database with metadata
- Feedback: Button changes to "✓ Added!" with sparkle animation
- Data saved: word, translation, pronunciation, example sentence, book ID, timestamp
- Green snackbar: "Word added to vocabulary! 📚"

**Tech Stack:**
- POST `/api/v1/vocabulary` endpoint
- SQLAlchemy model: `VocabularyItem`
- React state update to disable button after add

**AC:**
- [ ] Word saves to database within 100ms
- [ ] Button shows immediate visual feedback
- [ ] Duplicate words prevented (show "Already in vocabulary")
- [ ] Snackbar appears at bottom for 3 seconds

---

### Story 4.2: Vocabulary Screen with Word List

**As a** learner
**I want to** see all my saved vocabulary words
**So that I can** track what I've learned

**Implementation:**
- Grid of vocabulary cards
- Each card shows: word, translation, mastery level (0-5 stars), book source
- Stats header: Total words, review streak, words mastered
- Filter chips: All, Reviewing, Mastered
- Search bar for quick lookup

**Tech Stack:**
- GET `/api/v1/vocabulary?user_id=1` endpoint
- FlatList with `VocabularyCard` components
- SQLite query with filters and search

**AC:**
- [ ] All saved words display in grid
- [ ] Stats show correct counts
- [ ] Filters work correctly
- [ ] Search filters list in real-time
- [ ] Tapping card opens detail view

---

### Story 4.3: Flashcard Review Mode

**As a** learner
**I want to** review vocabulary using flashcards
**So that I can** reinforce learning through active recall

**Implementation:**
- "Review Today" button on Vocabulary Screen
- Flashcard UI: Front (English word) → Tap to flip → Back (translation + example)
- Swipe right (Easy), swipe left (Again), swipe up (Good)
- Spaced repetition scheduling based on performance
- Progress: "5 / 12 cards reviewed"

**Tech Stack:**
- React Native gesture handlers for swipe
- SM-2 algorithm for next review date calculation
- Update `vocabulary_practice` table with results

**AC:**
- [ ] Review queue shows words due today
- [ ] Flashcards flip smoothly with tap
- [ ] Swipe gestures work reliably
- [ ] Spaced repetition schedules next review correctly
- [ ] Progress indicator updates in real-time

---

### Story 4.4: Vocabulary Progress Stats

**As a** learner
**I want to** see my vocabulary learning progress
**So that I can** stay motivated and track improvement

**Implementation:**
- Stats dashboard on Vocabulary Screen:
  - Total words saved
  - 7-day review streak
  - Words mastered (level 5)
  - Books in progress
- Visual progress bars and charts
- Celebration when milestones hit (50, 100, 500 words)

**Tech Stack:**
- Database aggregations: `COUNT(*) WHERE mastery_level = 5`
- Streak calculation from `last_practiced` dates
- React Native SVG for charts (optional)

**AC:**
- [ ] All stats display accurately
- [ ] Streak resets if no review for 24 hours
- [ ] Milestone celebrations trigger correctly
- [ ] Stats update in real-time after review sessions

---

### Story 4.5: Spaced Repetition Algorithm

**As a** system
**I want to** schedule vocabulary reviews using spaced repetition
**So that I can** optimize long-term retention

**Implementation:**
- Implement SM-2 algorithm (SuperMemo)
- Schedule next review based on: ease factor, interval, performance
- Performance ratings: Again (0), Hard (3), Good (4), Easy (5)
- Update `next_review` date in database after each review

**Tech Stack:**
- Backend: `vocabulary_service.py` with SM-2 implementation
- Database: `vocabulary_practice.next_review`, `mastery_level`, `correct_count`
- Cron job or background task for daily queue generation

**AC:**
- [ ] Algorithm schedules reviews correctly (intervals: 1d, 3d, 7d, 14d, 30d)
- [ ] Performance ratings affect next interval appropriately
- [ ] Review queue only shows words due today or overdue
- [ ] Algorithm works offline (local calculation)

---

## Epic 5: Audio & Narration

**Goal:** Deliver high-quality audio narration with flexible playback controls and narrator selection.

**User Value:** Users hear native English pronunciation, adjust speed to their comprehension level, and choose narrators they enjoy.

**Business Value:** Audio quality differentiates from text-only competitors, increases session duration.

**Technical Components:**
- Frontend: `AudioPlayer.tsx`, audio state management
- Backend: Audio file serving, TTS generation (optional)
- Audio: React Native Sound, background audio support
- Storage: Pre-generated audio files or on-demand TTS

**Acceptance Criteria:**
- Audio playback starts within 200ms
- Playback continues in background (app minimized)
- Speed adjustment works without audio restart
- Progress bar shows accurate position
- Audio quality: 128kbps MP3 minimum

---

### Story 5.1: Audio Player Component

**As a** learner
**I want to** see an audio player with playback controls
**So that I can** control narration while reading

**Implementation:**
- Player docked above bottom navigation (always visible during reading)
- Controls: Play/Pause, Skip Back (-10s), Skip Forward (+10s), Speed, Progress Bar
- Display: Chapter title, current time / total time
- Compact mode on scroll down (just play/pause + progress)

**Tech Stack:**
- React Native Sound for audio playback
- Custom component with Material Design buttons
- State: `isPlaying`, `currentTime`, `duration`, `playbackRate`

**AC:**
- [ ] Player displays on Reading Screen load
- [ ] All controls respond within 50ms
- [ ] Progress bar is draggable for seeking
- [ ] Compact mode activates on scroll down

---

### Story 5.2: Playback Speed Control

**As a** learner
**I want to** adjust audio speed (0.5x to 2x)
**So that I can** match narration to my comprehension level

**Implementation:**
- Speed button cycles through: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
- Display current speed (e.g., "1.5x")
- Speed changes apply immediately without restarting audio
- Save preference to AsyncStorage

**Tech Stack:**
- React Native Sound: `sound.setSpeed(playbackRate)`
- AsyncStorage: `preferred_speed` key
- State management for current speed

**AC:**
- [ ] Speed changes take effect immediately
- [ ] Audio quality remains good at all speeds
- [ ] Speed preference persists across app restarts
- [ ] Speed indicator shows current rate

---

### Story 5.3: Background Audio Playback

**As a** learner
**I want to** continue listening when app is in background
**So that I can** multitask while learning

**Implementation:**
- Enable iOS background audio capability
- Android foreground service for audio
- Lock screen controls: Play/Pause, Skip Forward/Back
- Display book title and chapter on lock screen

**Tech Stack:**
- react-native-track-player for background audio
- iOS: Background Modes capability in Xcode
- Android: Foreground Service permission

**AC:**
- [ ] Audio continues when app minimized
- [ ] Lock screen shows playback controls
- [ ] Notification displays book title and chapter
- [ ] Audio pauses on phone call, resumes after

---

### Story 5.4: Audio File Management

**As a** system
**I want to** efficiently load and cache audio files
**So that I can** provide smooth playback without delays

**Implementation:**
- Pre-load current chapter audio on Reading Screen mount
- Pre-load next chapter audio in background
- Cache audio files locally (AsyncStorage or file system)
- Download management for offline access
- Audio format: MP3 128kbps (balance quality/size)

**Tech Stack:**
- React Native FS for file storage
- Audio files served via FastAPI static file endpoint
- Download queue with progress tracking

**AC:**
- [ ] Audio starts within 200ms of play tap
- [ ] Next chapter audio pre-loads in background
- [ ] Offline mode uses cached audio files
- [ ] Download progress indicator shows during fetch

---

### Story 5.5: Narrator Selection (Settings)

**As a** learner
**I want to** choose from different narrator voices
**So that I can** listen to a voice I find engaging

**Implementation:**
- Settings screen option: "Narrator Voice"
- Options: Male (David), Female (Emma), British (James), Australian (Olivia)
- Preview button plays sample sentence for each narrator
- Save preference, apply to all future audio

**Tech Stack:**
- Multiple audio file sets (one per narrator)
- Database: `user_preferences.narrator_id`
- Audio file naming: `{book_id}_{chapter_id}_{narrator_id}.mp3`

**AC:**
- [ ] Settings screen shows narrator options
- [ ] Preview button plays 5-second sample
- [ ] Narrator preference saves and applies globally
- [ ] Changing narrator re-downloads audio if needed

---

## Epic 6: Settings & Personalization

**Goal:** Allow users to customize reading experience, manage account, and adjust app preferences.

**User Value:** Users feel in control, can optimize app for their needs, and manage premium subscription.

**Business Value:** Reduces churn through preference customization, upsell premium features.

**Technical Components:**
- Frontend: `SettingsScreen.tsx`, preferences UI
- Backend: User preferences API endpoints
- Database: `user_preferences` table
- Storage: AsyncStorage for client-side cache

**Acceptance Criteria:**
- All preferences save immediately
- Changes take effect in real-time
- Preferences sync across app sections
- Reset to defaults option available

---

### Story 6.1: Reading Preferences

**As a** learner
**I want to** customize reading display settings
**So that I can** read comfortably for extended periods

**Implementation:**
- Settings options:
  - Font size: Small (16px), Medium (18px), Large (20px), Extra Large (22px)
  - Line spacing: Compact (1.5), Normal (1.8), Comfortable (2.0)
  - Background theme: Cream (default), White, Sepia, Dark
  - Sentence highlighting: On/Off
  - Auto-play audio on book open: On/Off
- Preview pane shows changes in real-time

**Tech Stack:**
- AsyncStorage: `reading_preferences` object
- React Context: `SettingsContext` for global state
- Dynamic styling based on preferences

**AC:**
- [ ] All settings display current values
- [ ] Changes apply immediately to Reading Screen
- [ ] Preferences persist across app restarts
- [ ] Preview pane shows live updates

---

### Story 6.2: Learning Preferences

**As a** learner
**I want to** set learning goals and notification preferences
**So that I can** build consistent learning habits

**Implementation:**
- Settings options:
  - Daily reading goal: 10, 15, 20, 30 minutes
  - Vocabulary review reminder: On/Off, time (e.g., 9:00 AM)
  - Streak notifications: On/Off
  - Native language for translations: Polish, German, Spanish, French
- Notifications require permission prompt

**Tech Stack:**
- Local notifications: react-native-push-notification
- AsyncStorage: `learning_preferences`
- Notification scheduling based on preferences

**AC:**
- [ ] Daily goal tracks reading time accurately
- [ ] Notifications fire at scheduled times
- [ ] Permission prompt appears on first enable
- [ ] Native language change applies to all future translations

---

### Story 6.3: Account & Premium Management

**As a** user
**I want to** view my account details and manage subscription
**So that I can** control my premium access

**Implementation:**
- Account section shows:
  - Username/email
  - Learning level
  - Account created date
  - Premium status (Free or Premium + expiry date)
- Premium users: "Manage Subscription" button
- Free users: "Upgrade to Premium" button with benefits list

**Tech Stack:**
- GET `/api/v1/user/{id}` for account data
- In-app purchase integration (future: Stripe or App Store)
- AsyncStorage: `user_profile` cache

**AC:**
- [ ] Account details display correctly
- [ ] Premium status shows accurate expiry date
- [ ] Upgrade button opens premium modal
- [ ] Sign out button clears all local data

---

### Story 6.4: Onboarding Flow (First Launch)

**As a** new user
**I want to** complete a quick onboarding setup
**So that I can** start reading immediately with personalized settings

**Implementation:**
- 4-screen onboarding:
  1. Welcome screen with app value proposition
  2. Native language selection (Polish, German, Spanish, French)
  3. English level selection (Beginner, Intermediate, Advanced)
  4. Interactive demo - tap word to see translation
- Skip option on each screen
- Completion redirects to Library Screen

**Tech Stack:**
- React Navigation Stack with onboarding screens
- AsyncStorage: `onboarding_completed` flag
- Conditional rendering: Show onboarding only if flag is false

**AC:**
- [ ] Onboarding shows only on first launch
- [ ] All 4 screens flow smoothly
- [ ] Skip button works on each screen
- [ ] Selections save to user preferences
- [ ] Interactive demo shows translation popup correctly

---

### Story 6.5: App Info & Support

**As a** user
**I want to** access app information and get help
**So that I can** troubleshoot issues and learn about the app

**Implementation:**
- Settings section: "About"
  - App version number
  - Privacy Policy link
  - Terms of Service link
  - Contact Support (email link)
  - Rate the App (deep link to App Store/Play Store)
  - Clear cache button
  - Reset app to defaults button (with confirmation)

**Tech Stack:**
- React Native Linking for external URLs
- DeviceInfo library for app version
- AsyncStorage clear functions

**AC:**
- [ ] App version displays correctly
- [ ] External links open in browser
- [ ] Clear cache removes all cached data
- [ ] Reset to defaults shows confirmation dialog
- [ ] Rate app opens correct store page (iOS/Android)

---

## Implementation Roadmap

### Phase 1: MVP Core (Weeks 1-4)
- Epic 2: Reading Experience (Stories 2.1-2.5)
- Epic 3: Instant Translation (Stories 3.1-3.4)
- Epic 1: Book Library (Stories 1.1-1.2)

### Phase 2: Learning Features (Weeks 5-6)
- Epic 4: Vocabulary Building (Stories 4.1-4.3)
- Epic 1: Freemium Model (Story 1.3)

### Phase 3: Enhancement & Polish (Weeks 7-8)
- Epic 5: Audio & Narration (Stories 5.1-5.4)
- Epic 6: Settings & Personalization (Stories 6.1-6.4)
- Epic 4: Advanced Vocabulary (Stories 4.4-4.5)

### Phase 4: Premium & Launch (Week 9-10)
- Epic 1: Progress Tracking (Story 1.4)
- Epic 6: Account Management (Story 6.3)
- Epic 5: Narrator Selection (Story 5.5)
- Epic 6: App Info & Support (Story 6.5)

---

## Success Metrics

**Engagement:**
- Daily active users reading > 10 minutes
- Average session duration: 15+ minutes
- Reading streak retention: 40%+ at Day 7

**Learning:**
- Vocabulary words saved per user: 50+ in first month
- Flashcard review completion rate: 60%+
- User-reported comprehension improvement: 70%+ positive

**Business:**
- Free-to-premium conversion: 5%+ within 30 days
- Churn rate: <20% monthly
- Net Promoter Score (NPS): 40+

---

**Document Status:** Ready for Technical Specification
**Next Step:** Run `tech-spec` workflow to generate detailed implementation specs for each epic
