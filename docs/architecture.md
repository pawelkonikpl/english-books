# MVP Architecture - English Learning App

## Executive Summary

A local-first English learning mobile application with Python FastAPI backend providing AI-powered language learning features via Hugging Face models, and React Native frontend for cross-platform mobile experience. MVP focuses on core learning functionality with offline-capable architecture and local deployment.

## Project Initialization

### Backend Setup
```bash
# Create Python virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn transformers torch huggingface-hub python-multipart pydantic sqlalchemy

# Initialize project structure
mkdir -p backend/{api,models,services,db,utils}
touch backend/{__init__.py,main.py,config.py}
```

### Frontend Setup
```bash
# Initialize React Native project
npx react-native@latest init EnglishApp --template react-native-template-typescript

# Install core dependencies
cd EnglishApp
npm install @react-navigation/native @react-navigation/stack axios @react-native-async-storage/async-storage
npm install react-native-sound react-native-tts react-native-voice
```

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
| -------- | -------- | ------- | ------------- | --------- |
| Backend Framework | FastAPI | 0.109.0+ | All | High performance, modern Python, automatic API docs, async support |
| Frontend Framework | React Native | 0.73+ | All | Cross-platform (iOS/Android), large ecosystem, hot reload |
| Programming Language (Backend) | Python | 3.11+ | All | Best ML/AI library support, Hugging Face ecosystem |
| Programming Language (Frontend) | TypeScript | 5.0+ | All | Type safety, better IDE support, fewer runtime errors |
| ML Framework | Transformers (Hugging Face) | 4.36+ | AI Features | Industry standard, extensive model library, local inference |
| Speech Recognition | Whisper (via transformers) | latest | Pronunciation, Dictation | Open source, multilingual, runs locally |
| Text-to-Speech | React Native TTS | 4.0+ | Audio Learning | Cross-platform, offline capable |
| Database | SQLite | 3.0+ | Progress Tracking | Lightweight, zero-config, portable, local-first |
| ORM | SQLAlchemy | 2.0+ | Data Layer | Python standard, supports SQLite, migration support |
| State Management | React Context + Hooks | Built-in | Frontend State | Native React, no external deps for MVP |
| API Protocol | REST | HTTP/1.1 | All | Simple, well-understood, sufficient for MVP |
| Authentication | Local Storage (MVP) | N/A | User Management | No server auth needed for local deployment |
| Storage | File System + SQLite | N/A | Media, Data | Local-first approach, no cloud dependencies |
| Testing (Backend) | pytest | 8.0+ | Quality | Python standard, extensive plugin ecosystem |
| Testing (Frontend) | Jest + React Native Testing Library | Built-in | Quality | Included with React Native, component testing |
| Model Hosting | Local Inference | N/A | AI Features | Privacy, offline support, no API costs |
| Code Formatting (Backend) | Black + isort | latest | Dev Experience | Consistent Python formatting |
| Code Formatting (Frontend) | Prettier + ESLint | latest | Dev Experience | TypeScript/React standards |

## Project Structure

```
english_app/
├── backend/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── lessons.py          # Lesson CRUD endpoints
│   │   │   ├── vocabulary.py       # Vocabulary endpoints
│   │   │   ├── pronunciation.py    # Speech analysis endpoints
│   │   │   ├── translation.py      # Translation endpoints
│   │   │   └── progress.py         # User progress tracking
│   │   └── dependencies.py          # FastAPI dependencies
│   ├── models/
│   │   ├── __init__.py
│   │   ├── database.py              # SQLAlchemy models
│   │   └── schemas.py               # Pydantic schemas (request/response)
│   ├── services/
│   │   ├── __init__.py
│   │   ├── huggingface_service.py   # HF model management
│   │   ├── speech_service.py        # Whisper integration
│   │   ├── translation_service.py   # Translation models
│   │   └── vocabulary_service.py    # Vocabulary analysis
│   ├── db/
│   │   ├── __init__.py
│   │   ├── session.py               # Database session management
│   │   └── migrations/              # SQLAlchemy migrations
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── logger.py                # Logging configuration
│   │   └── validators.py            # Input validation helpers
│   ├── data/
│   │   ├── models/                  # Downloaded HF models
│   │   ├── audio/                   # Uploaded audio files
│   │   └── lessons/                 # Lesson content
│   ├── main.py                      # FastAPI application entry
│   ├── config.py                    # Configuration management
│   ├── requirements.txt             # Python dependencies
│   └── .env.example                 # Environment variables template
│
├── EnglishApp/                      # React Native project
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Reusable UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Input.tsx
│   │   │   ├── lesson/              # Lesson-specific components
│   │   │   │   ├── LessonCard.tsx
│   │   │   │   ├── VocabularyItem.tsx
│   │   │   │   └── ExerciseCard.tsx
│   │   │   └── pronunciation/       # Pronunciation components
│   │   │       ├── RecordButton.tsx
│   │   │       └── WaveformDisplay.tsx
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx       # Main dashboard
│   │   │   ├── LessonListScreen.tsx # Browse lessons
│   │   │   ├── LessonScreen.tsx     # Lesson detail
│   │   │   ├── VocabularyScreen.tsx # Vocabulary practice
│   │   │   ├── PronunciationScreen.tsx # Pronunciation practice
│   │   │   └── ProgressScreen.tsx   # Progress tracking
│   │   ├── navigation/
│   │   │   ├── AppNavigator.tsx     # Navigation stack
│   │   │   └── types.ts             # Navigation types
│   │   ├── services/
│   │   │   ├── api.ts               # Axios API client
│   │   │   ├── audio.ts             # Audio recording/playback
│   │   │   └── storage.ts           # AsyncStorage wrapper
│   │   ├── contexts/
│   │   │   ├── LearningContext.tsx  # Learning state
│   │   │   └── SettingsContext.tsx  # App settings
│   │   ├── hooks/
│   │   │   ├── useLesson.ts         # Lesson data hook
│   │   │   ├── useVocabulary.ts     # Vocabulary hook
│   │   │   └── useProgress.ts       # Progress tracking hook
│   │   ├── types/
│   │   │   ├── api.ts               # API response types
│   │   │   ├── lesson.ts            # Lesson data types
│   │   │   └── user.ts              # User data types
│   │   └── utils/
│   │       ├── constants.ts         # App constants
│   │       └── helpers.ts           # Helper functions
│   ├── android/                     # Android native code
│   ├── ios/                         # iOS native code
│   ├── App.tsx                      # Root component
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   ├── architecture.md              # This document
│   ├── api-documentation.md         # API endpoint docs
│   └── setup-guide.md               # Development setup
│
└── scripts/
    ├── download_models.py           # Download HF models
    ├── setup_db.py                  # Initialize database
    └── seed_lessons.py              # Load sample lessons
```

## Epic to Architecture Mapping

| Epic | Backend Components | Frontend Components | Key Technologies |
|------|-------------------|---------------------|------------------|
| **Vocabulary Learning** | vocabulary.py, vocabulary_service.py | VocabularyScreen.tsx, VocabularyItem.tsx | HF Translation Models, SQLite |
| **Pronunciation Practice** | pronunciation.py, speech_service.py | PronunciationScreen.tsx, RecordButton.tsx | Whisper (transformers), React Native Voice |
| **Lesson Management** | lessons.py | LessonScreen.tsx, LessonCard.tsx | FastAPI, React Navigation |
| **Progress Tracking** | progress.py, database.py | ProgressScreen.tsx, useProgress.ts | SQLAlchemy, AsyncStorage |
| **Audio Learning** | speech_service.py | audio.ts service | React Native TTS, File System |
| **Translation** | translation.py, translation_service.py | Translation components | HF Translation Models (Helsinki-NLP) |

## Technology Stack Details

### Core Technologies

#### Backend Stack
- **FastAPI (0.109.0+)**
  - Purpose: REST API framework
  - Key features: Automatic OpenAPI docs, async support, dependency injection
  - Endpoints: `/api/v1/lessons`, `/api/v1/vocabulary`, `/api/v1/pronunciation`, `/api/v1/translation`, `/api/v1/progress`
  - Documentation: Auto-generated at `/docs` (Swagger UI)

- **Python 3.11+**
  - Purpose: Primary backend language
  - Advantages: Native ML library support, Hugging Face ecosystem
  - Performance: Async/await for concurrent operations

- **Transformers (Hugging Face) 4.36+**
  - Purpose: ML model inference
  - Models used:
    - `openai/whisper-base` - Speech recognition (74MB)
    - `Helsinki-NLP/opus-mt-en-*` - Translation (300MB avg)
    - `distilbert-base-uncased` - Text analysis (256MB)
  - Configuration: Local model cache in `backend/data/models/`

- **SQLAlchemy 2.0+ with SQLite**
  - Purpose: Data persistence and ORM
  - Database location: `backend/data/english_app.db`
  - Models: User, Lesson, Vocabulary, Progress, AudioRecording
  - Migrations: Alembic for schema changes

#### Frontend Stack
- **React Native 0.73+ with TypeScript**
  - Purpose: Cross-platform mobile framework
  - Target platforms: iOS 13+, Android 8.0+
  - Bundle: Metro bundler with hot reload

- **React Navigation 6.0+**
  - Purpose: Screen navigation
  - Pattern: Stack navigator with modal support
  - Screens: Home, LessonList, Lesson, Vocabulary, Pronunciation, Progress

- **Axios 1.6+**
  - Purpose: HTTP client for API calls
  - Configuration: Base URL pointing to local backend (http://localhost:8000)
  - Interceptors: Request/response logging, error handling

- **AsyncStorage**
  - Purpose: Local data persistence
  - Storage: User preferences, offline lesson data, progress cache
  - Capacity: Unlimited (file-based)

### Integration Points

#### 1. Backend ↔ Hugging Face Hub
```python
# Service: huggingface_service.py
from transformers import pipeline, AutoModelForSeq2SeqLM, AutoTokenizer

class HuggingFaceService:
    def __init__(self, cache_dir: str = "./data/models"):
        self.cache_dir = cache_dir
        self.models = {}

    def load_translation_model(self, source_lang: str, target_lang: str):
        model_name = f"Helsinki-NLP/opus-mt-{source_lang}-{target_lang}"
        if model_name not in self.models:
            self.models[model_name] = pipeline(
                "translation",
                model=model_name,
                cache_dir=self.cache_dir
            )
        return self.models[model_name]
```

**Data Flow:**
1. Frontend requests translation
2. Backend loads appropriate model from cache (or downloads if first use)
3. Model performs inference locally
4. Result returned to frontend

**Configuration:**
- Environment variable: `HF_HOME=./backend/data/models`
- Offline mode: `transformers.offline_mode = True` (after initial download)

#### 2. Frontend ↔ Backend API
```typescript
// Service: src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 30000,
  headers: {'Content-Type': 'application/json'}
});

export const lessonAPI = {
  getLessons: () => api.get('/lessons'),
  getLesson: (id: string) => api.get(`/lessons/${id}`),
};

export const pronunciationAPI = {
  analyzeAudio: (audioFile: File) => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    return api.post('/pronunciation/analyze', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });
  }
};
```

**Communication Pattern:**
- Protocol: HTTP REST
- Format: JSON for data, multipart/form-data for audio
- Error handling: Centralized error interceptor
- Timeout: 30s for standard requests, 60s for ML inference

#### 3. Mobile App ↔ Device Hardware
```typescript
// Service: src/services/audio.ts
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

export class AudioService {
  async startRecording(): Promise<void> {
    await Voice.start('en-US');
  }

  async stopRecording(): Promise<string> {
    await Voice.stop();
    const results = await Voice.results();
    return results[0];
  }

  async speak(text: string, language: string = 'en-US'): Promise<void> {
    await Tts.setDefaultLanguage(language);
    await Tts.speak(text);
  }
}
```

**Hardware Requirements:**
- Microphone: For pronunciation practice
- Speaker: For audio playback
- Storage: Minimum 500MB for models and content

## Implementation Patterns

These patterns ensure consistent implementation across all development:

### 1. API Response Pattern
All API endpoints return consistent response structure:

```python
# Success response
{
    "success": true,
    "data": {...},
    "message": "Operation completed successfully"
}

# Error response
{
    "success": false,
    "error": {
        "code": "VOCABULARY_NOT_FOUND",
        "message": "Vocabulary item not found",
        "details": {}
    }
}
```

### 2. Model Initialization Pattern
All Hugging Face models initialized lazily and cached:

```python
class ModelManager:
    _instance = None
    _models: Dict[str, Any] = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def get_model(self, model_name: str):
        if model_name not in self._models:
            self._models[model_name] = self._load_model(model_name)
        return self._models[model_name]
```

### 3. Component Organization Pattern
All React Native components follow atomic design:

```
components/
  common/          # Atoms (Button, Input, Card)
  lesson/          # Molecules (LessonCard, ExerciseCard)
  pronunciation/   # Molecules (RecordButton, WaveformDisplay)
screens/           # Organisms (full screen compositions)
```

### 4. Data Fetching Pattern
All API calls use custom hooks with loading/error states:

```typescript
export function useLesson(lessonId: string) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    lessonAPI.getLesson(lessonId)
      .then(response => setLesson(response.data.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [lessonId]);

  return { lesson, loading, error };
}
```

### 5. Database Access Pattern
All database operations use repository pattern:

```python
class LessonRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, lesson_id: int) -> Optional[Lesson]:
        return self.db.query(Lesson).filter(Lesson.id == lesson_id).first()

    def get_all(self) -> List[Lesson]:
        return self.db.query(Lesson).all()

    def create(self, lesson: LessonCreate) -> Lesson:
        db_lesson = Lesson(**lesson.dict())
        self.db.add(db_lesson)
        self.db.commit()
        self.db.refresh(db_lesson)
        return db_lesson
```

## Consistency Rules

### Naming Conventions

#### Backend (Python)
- **Files**: `snake_case.py` (e.g., `vocabulary_service.py`)
- **Classes**: `PascalCase` (e.g., `VocabularyService`)
- **Functions/Methods**: `snake_case` (e.g., `get_vocabulary_by_id`)
- **Variables**: `snake_case` (e.g., `lesson_data`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_AUDIO_LENGTH`)
- **Database Tables**: `snake_case` plural (e.g., `lessons`, `vocabulary_items`)
- **Database Columns**: `snake_case` (e.g., `created_at`, `user_id`)

#### Frontend (TypeScript)
- **Files**: `PascalCase.tsx` for components, `camelCase.ts` for utilities (e.g., `LessonCard.tsx`, `api.ts`)
- **Components**: `PascalCase` (e.g., `VocabularyItem`)
- **Functions**: `camelCase` (e.g., `handleSubmit`)
- **Variables**: `camelCase` (e.g., `lessonData`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)
- **Types/Interfaces**: `PascalCase` with `I` prefix for interfaces (e.g., `ILesson`, `VocabularyItem`)
- **Hooks**: `use` prefix + `PascalCase` (e.g., `useLesson`, `useVocabulary`)

#### API Endpoints
- Pattern: `/api/v1/{resource}/{action}`
- Format: `kebab-case` for multi-word resources
- Examples:
  - `GET /api/v1/lessons` - List all lessons
  - `GET /api/v1/lessons/{id}` - Get specific lesson
  - `POST /api/v1/pronunciation/analyze` - Analyze pronunciation
  - `GET /api/v1/vocabulary-items` - List vocabulary

### Code Organization

#### Backend Module Structure
```python
# Each service file follows this pattern:
"""
Module: {service_name}_service.py
Purpose: {description}
"""

from typing import List, Optional
from models.database import {Model}
from models.schemas import {Schema}

class {Service}Service:
    """Service class for {domain} operations."""

    def __init__(self, db: Session):
        self.db = db

    def get_{resource}(self, id: int) -> Optional[{Model}]:
        """Retrieve {resource} by ID."""
        pass
```

#### Frontend Component Structure
```typescript
// Component pattern:
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ComponentNameProps } from './types';

export const ComponentName: React.FC<ComponentNameProps> = ({ prop1, prop2 }) => {
  // 1. Hooks
  const [state, setState] = useState();

  // 2. Effects
  useEffect(() => {}, []);

  // 3. Handlers
  const handleAction = () => {};

  // 4. Render
  return (
    <View style={styles.container}>
      <Text>{prop1}</Text>
    </View>
  );
};

// 5. Styles
const styles = StyleSheet.create({
  container: {},
});
```

### Error Handling

#### Backend Error Handling
```python
from fastapi import HTTPException, status

# Custom exception classes
class VocabularyNotFoundError(Exception):
    pass

class ModelLoadError(Exception):
    pass

# Exception handlers in main.py
@app.exception_handler(VocabularyNotFoundError)
async def vocabulary_not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "success": False,
            "error": {
                "code": "VOCABULARY_NOT_FOUND",
                "message": str(exc)
            }
        }
    )

# Usage in routes
@router.get("/vocabulary/{id}")
async def get_vocabulary(id: int, db: Session = Depends(get_db)):
    vocab = vocabulary_service.get_by_id(id)
    if not vocab:
        raise VocabularyNotFoundError(f"Vocabulary {id} not found")
    return {"success": True, "data": vocab}
```

#### Frontend Error Handling
```typescript
// Centralized error handler
export class APIError extends Error {
  code: string;
  details?: any;

  constructor(code: string, message: string, details?: any) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

// API interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.data?.error) {
      const { code, message, details } = error.response.data.error;
      throw new APIError(code, message, details);
    }
    throw new APIError('NETWORK_ERROR', 'Network request failed');
  }
);

// Component usage
try {
  const lesson = await lessonAPI.getLesson(id);
} catch (error) {
  if (error instanceof APIError) {
    if (error.code === 'LESSON_NOT_FOUND') {
      showToast('Lesson not found');
    } else {
      showToast('An error occurred');
    }
  }
}
```

### Logging Strategy

#### Backend Logging
```python
# utils/logger.py
import logging
from logging.handlers import RotatingFileHandler

def setup_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)

    # Console handler
    console = logging.StreamHandler()
    console.setFormatter(logging.Formatter(
        '[%(asctime)s] %(levelname)s [%(name)s] %(message)s'
    ))

    # File handler
    file_handler = RotatingFileHandler(
        'logs/app.log',
        maxBytes=10485760,  # 10MB
        backupCount=5
    )
    file_handler.setFormatter(logging.Formatter(
        '[%(asctime)s] %(levelname)s [%(name)s:%(lineno)d] %(message)s'
    ))

    logger.addHandler(console)
    logger.addHandler(file_handler)
    return logger

# Usage in services
logger = setup_logger(__name__)
logger.info(f"Loading model: {model_name}")
logger.error(f"Failed to process audio: {str(e)}")
```

#### Frontend Logging
```typescript
// utils/logger.ts
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class Logger {
  log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${level} ${message}`;

    if (__DEV__) {
      console.log(logEntry, data || '');
    }

    // In production, could send to analytics service
  }

  info(message: string, data?: any) {
    this.log(LogLevel.INFO, message, data);
  }

  error(message: string, data?: any) {
    this.log(LogLevel.ERROR, message, data);
  }
}

export const logger = new Logger();
```

## Data Architecture

### Database Schema

```sql
-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    native_language VARCHAR(10) NOT NULL,
    target_language VARCHAR(10) NOT NULL,
    level VARCHAR(20) DEFAULT 'beginner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lessons table
CREATE TABLE lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    level VARCHAR(20) NOT NULL,
    category VARCHAR(50),
    content JSON NOT NULL,
    estimated_duration INTEGER,  -- in minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vocabulary items table
CREATE TABLE vocabulary_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word VARCHAR(100) NOT NULL,
    translation VARCHAR(100) NOT NULL,
    pronunciation VARCHAR(200),
    part_of_speech VARCHAR(20),
    difficulty_level VARCHAR(20),
    example_sentence TEXT,
    audio_url VARCHAR(500),
    lesson_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- User progress table
CREATE TABLE user_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    lesson_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'not_started',  -- not_started, in_progress, completed
    progress_percentage INTEGER DEFAULT 0,
    score INTEGER,
    time_spent INTEGER,  -- in seconds
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id),
    UNIQUE(user_id, lesson_id)
);

-- Vocabulary practice table
CREATE TABLE vocabulary_practice (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    vocabulary_id INTEGER NOT NULL,
    correct_count INTEGER DEFAULT 0,
    incorrect_count INTEGER DEFAULT 0,
    last_practiced TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    next_review TIMESTAMP,
    mastery_level INTEGER DEFAULT 0,  -- 0-5 scale
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vocabulary_id) REFERENCES vocabulary_items(id),
    UNIQUE(user_id, vocabulary_id)
);

-- Pronunciation recordings table
CREATE TABLE pronunciation_recordings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    vocabulary_id INTEGER,
    audio_path VARCHAR(500) NOT NULL,
    transcription TEXT,
    accuracy_score REAL,
    feedback JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vocabulary_id) REFERENCES vocabulary_items(id)
);
```

### SQLAlchemy Models

```python
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    native_language = Column(String(10), nullable=False)
    target_language = Column(String(10), nullable=False)
    level = Column(String(20), default="beginner")
    created_at = Column(DateTime, default=datetime.utcnow)
    last_active = Column(DateTime, default=datetime.utcnow)

    progress = relationship("UserProgress", back_populates="user")
    vocabulary_practice = relationship("VocabularyPractice", back_populates="user")

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    level = Column(String(20), nullable=False)
    category = Column(String(50))
    content = Column(JSON, nullable=False)
    estimated_duration = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

    vocabulary_items = relationship("VocabularyItem", back_populates="lesson")
    progress = relationship("UserProgress", back_populates="lesson")

class VocabularyItem(Base):
    __tablename__ = "vocabulary_items"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String(100), nullable=False)
    translation = Column(String(100), nullable=False)
    pronunciation = Column(String(200))
    part_of_speech = Column(String(20))
    difficulty_level = Column(String(20))
    example_sentence = Column(Text)
    audio_url = Column(String(500))
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    lesson = relationship("Lesson", back_populates="vocabulary_items")
    practice = relationship("VocabularyPractice", back_populates="vocabulary")
```

### Pydantic Schemas

```python
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class LessonBase(BaseModel):
    title: str = Field(..., max_length=200)
    description: Optional[str] = None
    level: str = Field(..., pattern="^(beginner|intermediate|advanced)$")
    category: Optional[str] = None
    content: dict
    estimated_duration: Optional[int] = None

class LessonCreate(LessonBase):
    pass

class LessonResponse(LessonBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class VocabularyItemBase(BaseModel):
    word: str = Field(..., max_length=100)
    translation: str = Field(..., max_length=100)
    pronunciation: Optional[str] = None
    part_of_speech: Optional[str] = None
    difficulty_level: Optional[str] = None
    example_sentence: Optional[str] = None
    lesson_id: Optional[int] = None

class VocabularyItemResponse(VocabularyItemBase):
    id: int
    audio_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
```

## API Contracts

### REST API Endpoints

#### Base URL
```
http://localhost:8000/api/v1
```

#### Authentication
MVP uses local storage, no authentication required. Future versions will add JWT.

#### Endpoints Specification

##### Lessons

```http
GET /lessons
Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Basic Greetings",
      "description": "Learn common English greetings",
      "level": "beginner",
      "category": "conversation",
      "estimated_duration": 15,
      "created_at": "2025-11-02T10:00:00Z"
    }
  ]
}

GET /lessons/{id}
Response: 200 OK
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Basic Greetings",
    "description": "Learn common English greetings",
    "level": "beginner",
    "category": "conversation",
    "content": {
      "sections": [
        {"type": "vocabulary", "items": [...]},
        {"type": "exercise", "questions": [...]}
      ]
    },
    "estimated_duration": 15,
    "created_at": "2025-11-02T10:00:00Z"
  }
}

POST /lessons
Request Body:
{
  "title": "Basic Greetings",
  "description": "Learn common English greetings",
  "level": "beginner",
  "category": "conversation",
  "content": {...},
  "estimated_duration": 15
}
Response: 201 Created
```

##### Vocabulary

```http
GET /vocabulary
Query Params: ?lesson_id=1&level=beginner
Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "word": "hello",
      "translation": "hola",
      "pronunciation": "həˈloʊ",
      "part_of_speech": "interjection",
      "difficulty_level": "beginner",
      "example_sentence": "Hello, how are you?",
      "audio_url": "/audio/hello.mp3",
      "lesson_id": 1
    }
  ]
}

GET /vocabulary/{id}
Response: 200 OK

POST /vocabulary
Request Body:
{
  "word": "hello",
  "translation": "hola",
  "pronunciation": "həˈloʊ",
  "part_of_speech": "interjection",
  "difficulty_level": "beginner",
  "example_sentence": "Hello, how are you?",
  "lesson_id": 1
}
Response: 201 Created
```

##### Translation

```http
POST /translation/translate
Request Body:
{
  "text": "Hello, how are you?",
  "source_lang": "en",
  "target_lang": "es"
}
Response: 200 OK
{
  "success": true,
  "data": {
    "source_text": "Hello, how are you?",
    "translated_text": "Hola, ¿cómo estás?",
    "source_lang": "en",
    "target_lang": "es",
    "model_used": "Helsinki-NLP/opus-mt-en-es"
  }
}
```

##### Pronunciation

```http
POST /pronunciation/analyze
Request: multipart/form-data
- audio: [audio file]
- expected_text: "hello"
- language: "en-US"

Response: 200 OK
{
  "success": true,
  "data": {
    "transcription": "hello",
    "accuracy_score": 0.92,
    "feedback": {
      "pronunciation_quality": "good",
      "suggestions": ["Clear pronunciation of 'h' sound"],
      "phonetic_breakdown": [...]
    }
  }
}
```

##### Progress

```http
GET /progress/user/{user_id}
Response: 200 OK
{
  "success": true,
  "data": {
    "total_lessons": 10,
    "completed_lessons": 3,
    "in_progress_lessons": 2,
    "total_time_spent": 3600,  // seconds
    "average_score": 85,
    "lessons": [
      {
        "lesson_id": 1,
        "lesson_title": "Basic Greetings",
        "status": "completed",
        "progress_percentage": 100,
        "score": 90,
        "time_spent": 900,
        "completed_at": "2025-11-01T15:30:00Z"
      }
    ]
  }
}

POST /progress
Request Body:
{
  "user_id": 1,
  "lesson_id": 1,
  "status": "in_progress",
  "progress_percentage": 50,
  "time_spent": 450
}
Response: 201 Created

PUT /progress/{id}
Request Body:
{
  "status": "completed",
  "progress_percentage": 100,
  "score": 90,
  "time_spent": 900
}
Response: 200 OK
```

### Frontend TypeScript Types

```typescript
// types/api.ts
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  message?: string;
}

export interface Lesson {
  id: number;
  title: string;
  description?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  content: LessonContent;
  estimated_duration?: number;
  created_at: string;
}

export interface LessonContent {
  sections: LessonSection[];
}

export interface LessonSection {
  type: 'vocabulary' | 'exercise' | 'reading' | 'listening';
  items: any[];
}

export interface VocabularyItem {
  id: number;
  word: string;
  translation: string;
  pronunciation?: string;
  part_of_speech?: string;
  difficulty_level?: string;
  example_sentence?: string;
  audio_url?: string;
  lesson_id?: number;
}

export interface UserProgress {
  id: number;
  user_id: number;
  lesson_id: number;
  lesson_title?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress_percentage: number;
  score?: number;
  time_spent: number;
  started_at?: string;
  completed_at?: string;
  last_accessed: string;
}
```

## Security Architecture

### MVP Security Considerations

Since this is a local-only MVP without network exposure, security requirements are minimal:

#### Data Protection
- **Local Storage**: All data stored locally in SQLite database
- **File Permissions**: Database and audio files have user-only read/write permissions (chmod 600)
- **No Cloud Sync**: No data transmitted to external servers in MVP

#### Input Validation
```python
from pydantic import validator

class VocabularyItemCreate(BaseModel):
    word: str

    @validator('word')
    def validate_word(cls, v):
        if len(v) > 100:
            raise ValueError('Word too long')
        if not v.strip():
            raise ValueError('Word cannot be empty')
        return v.strip()
```

#### Audio File Handling
```python
ALLOWED_AUDIO_FORMATS = {'.wav', '.mp3', '.m4a', '.ogg'}
MAX_AUDIO_SIZE = 10 * 1024 * 1024  # 10MB

def validate_audio_file(file: UploadFile):
    # Check file extension
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_AUDIO_FORMATS:
        raise HTTPException(400, "Invalid audio format")

    # Check file size
    file.file.seek(0, 2)
    size = file.file.tell()
    file.file.seek(0)
    if size > MAX_AUDIO_SIZE:
        raise HTTPException(400, "Audio file too large")
```

#### Future Security Enhancements (Post-MVP)
- JWT authentication for multi-device sync
- End-to-end encryption for cloud storage
- Rate limiting on API endpoints
- HTTPS for remote access
- OAuth integration for third-party services

## Performance Considerations

### Backend Performance

#### Model Loading Optimization
```python
# Lazy loading with caching
class ModelCache:
    def __init__(self, max_models: int = 3):
        self.max_models = max_models
        self.models = OrderedDict()

    def get_model(self, model_name: str):
        if model_name in self.models:
            # Move to end (most recently used)
            self.models.move_to_end(model_name)
            return self.models[model_name]

        # Load new model
        if len(self.models) >= self.max_models:
            # Remove least recently used
            self.models.popitem(last=False)

        model = self._load_model(model_name)
        self.models[model_name] = model
        return model
```

**Expected Performance:**
- First model load: 2-5 seconds
- Cached model access: <100ms
- Translation inference: 100-500ms per sentence
- Speech recognition: 1-3 seconds per 30s audio

#### Database Query Optimization
```python
# Use eager loading for relationships
lesson = db.query(Lesson)\
    .options(joinedload(Lesson.vocabulary_items))\
    .filter(Lesson.id == lesson_id)\
    .first()

# Index frequently queried columns
class User(Base):
    __tablename__ = "users"
    username = Column(String(50), unique=True, nullable=False, index=True)

# Use connection pooling
engine = create_engine(
    DATABASE_URL,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True
)
```

#### Async Operations
```python
# Use async for I/O-bound operations
@router.post("/pronunciation/analyze")
async def analyze_pronunciation(
    audio: UploadFile,
    background_tasks: BackgroundTasks
):
    # Save file asynchronously
    audio_path = await save_audio_file(audio)

    # Process in background
    background_tasks.add_task(process_audio, audio_path)

    return {"success": True, "message": "Processing started"}
```

### Frontend Performance

#### List Rendering Optimization
```typescript
import { FlatList } from 'react-native';

<FlatList
  data={lessons}
  renderItem={({ item }) => <LessonCard lesson={item} />}
  keyExtractor={(item) => item.id.toString()}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
  getItemLayout={(data, index) => ({
    length: 120,  // Item height
    offset: 120 * index,
    index,
  })}
/>
```

#### Image and Audio Caching
```typescript
// Use react-native-fast-image for image caching
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: vocabulary.audio_url }}
  priority={FastImage.priority.normal}
  cache={FastImage.cacheControl.immutable}
/>

// Preload audio files
import Sound from 'react-native-sound';

const audioCache = new Map<string, Sound>();

function preloadAudio(urls: string[]) {
  urls.forEach(url => {
    if (!audioCache.has(url)) {
      const sound = new Sound(url, '', () => {
        audioCache.set(url, sound);
      });
    }
  });
}
```

#### State Management Optimization
```typescript
// Use React.memo for expensive components
export const VocabularyItem = React.memo<VocabularyItemProps>(
  ({ vocabulary, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text>{vocabulary.word}</Text>
      </TouchableOpacity>
    );
  },
  (prev, next) => prev.vocabulary.id === next.vocabulary.id
);

// Use useMemo for expensive calculations
const sortedLessons = useMemo(
  () => lessons.sort((a, b) => a.title.localeCompare(b.title)),
  [lessons]
);
```

#### Bundle Size Optimization
```javascript
// metro.config.js
module.exports = {
  transformer: {
    minifierConfig: {
      compress: {
        drop_console: true,  // Remove console.log in production
      },
    },
  },
};
```

**Performance Targets:**
- App launch time: <2 seconds
- Screen transition: <100ms
- API response display: <300ms
- Audio playback start: <200ms
- List scroll: 60 FPS

## Deployment Architecture

### Local Development Setup

#### System Requirements
- **OS**: Windows 10+, macOS 11+, or Linux (Ubuntu 20.04+)
- **CPU**: Intel i5 or equivalent (for ML inference)
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 5GB free space (for models and data)
- **Python**: 3.11+
- **Node.js**: 18+
- **Mobile**: Android SDK 31+ or Xcode 14+

#### Backend Deployment

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Setup environment variables
cp .env.example .env
# Edit .env with your settings

# 5. Initialize database
python scripts/setup_db.py

# 6. Download Hugging Face models
python scripts/download_models.py

# 7. Seed sample data (optional)
python scripts/seed_lessons.py

# 8. Run backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Backend will be available at http://localhost:8000
# API docs at http://localhost:8000/docs
```

#### Frontend Deployment

```bash
# 1. Navigate to React Native project
cd EnglishApp

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env - set API_BASE_URL=http://localhost:8000

# For iOS
cd ios && pod install && cd ..

# 4. Run on device/emulator
# Android
npm run android

# iOS
npm run ios
```

### Production Deployment (Future)

#### Backend (Docker)
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Download models at build time
RUN python scripts/download_models.py

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Mobile App Distribution
- **Android**: Build APK with `cd android && ./gradlew assembleRelease`
- **iOS**: Archive in Xcode, submit to TestFlight
- **OTA Updates**: Consider CodePush for React Native

### Environment Configuration

#### Backend `.env`
```bash
# Application
ENV=development
DEBUG=true
LOG_LEVEL=INFO

# Database
DATABASE_URL=sqlite:///./data/english_app.db

# Hugging Face
HF_HOME=./data/models
HF_OFFLINE=false  # Set to true after initial model download

# API
API_V1_PREFIX=/api/v1
CORS_ORIGINS=["*"]  # Restrict in production

# File Storage
UPLOAD_DIR=./data/audio
MAX_UPLOAD_SIZE=10485760  # 10MB

# Model Configuration
WHISPER_MODEL=openai/whisper-base
TRANSLATION_MODEL_PREFIX=Helsinki-NLP/opus-mt
TEXT_MODEL=distilbert-base-uncased
```

#### Frontend `.env`
```bash
# API Configuration
API_BASE_URL=http://localhost:8000
API_TIMEOUT=30000

# Feature Flags
ENABLE_OFFLINE_MODE=true
ENABLE_ANALYTICS=false

# App Configuration
DEFAULT_LANGUAGE=en
MAX_AUDIO_DURATION=60  # seconds
```

## Development Environment

### Prerequisites

#### System Tools
- **Python 3.11+**: Backend runtime
- **Node.js 18+**: Frontend build tools
- **Git**: Version control
- **Android Studio**: Android development (if targeting Android)
- **Xcode**: iOS development (if targeting iOS, macOS only)

#### Python Dependencies
```txt
# requirements.txt
fastapi==0.109.2
uvicorn[standard]==0.27.1
transformers==4.37.2
torch==2.2.0
huggingface-hub==0.20.3
python-multipart==0.0.9
pydantic==2.6.1
sqlalchemy==2.0.25
alembic==1.13.1
python-dotenv==1.0.1
librosa==0.10.1  # Audio processing
soundfile==0.12.1

# Dev dependencies
pytest==8.0.0
pytest-asyncio==0.23.5
black==24.1.1
isort==5.13.2
flake8==7.0.0
```

#### Node.js Dependencies
```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.73.4",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "axios": "^1.6.7",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "react-native-sound": "^0.11.2",
    "react-native-tts": "^4.1.0",
    "@react-native-voice/voice": "^3.2.4"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-native": "^0.73.0",
    "typescript": "^5.3.3",
    "jest": "^29.7.0",
    "@testing-library/react-native": "^12.4.3",
    "eslint": "^8.56.0",
    "prettier": "^3.2.4"
  }
}
```

### Setup Commands

```bash
# ==== Full Project Setup ====

# 1. Clone repository (or create new project)
git init english_app
cd english_app

# 2. Create directory structure
mkdir -p backend/{api/routes,models,services,db/migrations,utils,data/{models,audio,lessons},logs}
mkdir -p docs scripts

# 3. Setup Python backend
cd backend
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install fastapi uvicorn transformers torch huggingface-hub \
    python-multipart pydantic sqlalchemy alembic python-dotenv \
    librosa soundfile pytest black isort

# Save dependencies
pip freeze > requirements.txt

# Create environment file
cat > .env << EOF
ENV=development
DEBUG=true
DATABASE_URL=sqlite:///./data/english_app.db
HF_HOME=./data/models
API_V1_PREFIX=/api/v1
EOF

# Initialize database
python << EOF
from sqlalchemy import create_engine
from models.database import Base
engine = create_engine("sqlite:///./data/english_app.db")
Base.metadata.create_all(engine)
print("Database initialized")
EOF

# Download Hugging Face models
python << EOF
from transformers import pipeline
print("Downloading Whisper model...")
pipeline("automatic-speech-recognition", model="openai/whisper-base", cache_dir="./data/models")
print("Downloading translation model...")
pipeline("translation", model="Helsinki-NLP/opus-mt-en-es", cache_dir="./data/models")
print("Models downloaded successfully")
EOF

cd ..

# 4. Setup React Native frontend
npx react-native@latest init EnglishApp --template react-native-template-typescript
cd EnglishApp

# Install dependencies
npm install @react-navigation/native @react-navigation/stack \
    axios @react-native-async-storage/async-storage \
    react-native-sound react-native-tts @react-native-voice/voice

npm install --save-dev @types/react @types/react-native \
    @testing-library/react-native

# For iOS
cd ios && pod install && cd ..

# Create environment file
cat > .env << EOF
API_BASE_URL=http://localhost:8000
API_TIMEOUT=30000
EOF

cd ..

# 5. Start development servers

# Terminal 1: Backend
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2: React Native Metro
cd EnglishApp
npm start

# Terminal 3: Run app
cd EnglishApp
npm run android  # or npm run ios
```

### IDE Setup

#### VS Code (Recommended)
```json
// .vscode/settings.json
{
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "python.formatting.provider": "black",
  "editor.formatOnSave": true,
  "[python]": {
    "editor.codeActionsOnSave": {
      "source.organizeImports": true
    }
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}

// .vscode/extensions.json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.black-formatter",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "msjsdiag.vscode-react-native"
  ]
}
```

## Architecture Decision Records (ADRs)

### ADR-001: Python + FastAPI for Backend

**Status**: Accepted

**Context**: Need to choose backend framework that supports ML model integration.

**Decision**: Use Python 3.11+ with FastAPI framework.

**Rationale**:
- Python has the best Hugging Face/ML library support
- FastAPI provides automatic API documentation
- Async support for handling concurrent requests
- Pydantic for data validation
- Fast development with type hints

**Consequences**:
- ✅ Excellent ML library ecosystem
- ✅ Fast API development
- ✅ Automatic OpenAPI documentation
- ⚠️ Slower than compiled languages (acceptable for MVP)

### ADR-002: React Native for Mobile Frontend

**Status**: Accepted

**Context**: Need cross-platform mobile solution for MVP.

**Decision**: Use React Native with TypeScript.

**Rationale**:
- Single codebase for iOS and Android
- Large ecosystem and community
- Hot reload for fast development
- JavaScript skills transferable
- Good performance for MVP needs

**Consequences**:
- ✅ Fast cross-platform development
- ✅ Code reusability
- ✅ Large component library
- ⚠️ Native modules needed for some features
- ⚠️ Occasional platform-specific issues

### ADR-003: Local-First Architecture

**Status**: Accepted

**Context**: MVP needs to work without internet connectivity.

**Decision**: Store all data locally (SQLite + file system), run ML models locally.

**Rationale**:
- Privacy: No data sent to cloud
- Offline-capable: Works without internet
- Zero infrastructure costs for MVP
- Faster response times (no network latency)

**Consequences**:
- ✅ Complete privacy
- ✅ Works offline
- ✅ No server costs
- ⚠️ Initial model download required (~500MB)
- ⚠️ Device storage requirements

### ADR-004: Hugging Face Transformers for ML

**Status**: Accepted

**Context**: Need speech recognition, translation, and NLP capabilities.

**Decision**: Use Hugging Face Transformers library with local inference.

**Rationale**:
- Industry-standard library
- Extensive pre-trained model library
- Supports local inference
- Active development and community
- No API costs

**Consequences**:
- ✅ No API costs
- ✅ Privacy-preserving
- ✅ Extensive model selection
- ⚠️ Requires model download (~500MB-1GB)
- ⚠️ Inference slower than cloud APIs

### ADR-005: SQLite for Data Persistence

**Status**: Accepted

**Context**: Need local database for lessons, vocabulary, and progress tracking.

**Decision**: Use SQLite with SQLAlchemy ORM.

**Rationale**:
- Zero-configuration embedded database
- Portable single-file database
- Sufficient for single-user MVP
- SQLAlchemy provides abstraction for future migration

**Consequences**:
- ✅ Simple setup
- ✅ Portable data
- ✅ Good performance for single user
- ⚠️ Limited concurrent write support
- ⚠️ Will need migration for multi-user cloud version

### ADR-006: REST API over GraphQL

**Status**: Accepted

**Context**: Need API protocol for frontend-backend communication.

**Decision**: Use REST API with JSON.

**Rationale**:
- Simple and well-understood
- Sufficient for MVP requirements
- Automatic documentation with FastAPI
- Lower learning curve

**Consequences**:
- ✅ Simple implementation
- ✅ Well-understood patterns
- ✅ Automatic documentation
- ⚠️ May need multiple requests for complex data
- ⚠️ Over-fetching/under-fetching possible

### ADR-007: TypeScript for Frontend

**Status**: Accepted

**Context**: Need type safety for React Native development.

**Decision**: Use TypeScript instead of JavaScript.

**Rationale**:
- Type safety reduces runtime errors
- Better IDE autocomplete and refactoring
- Easier to maintain as codebase grows
- Industry best practice

**Consequences**:
- ✅ Fewer runtime errors
- ✅ Better developer experience
- ✅ Easier refactoring
- ⚠️ Slightly slower development initially
- ⚠️ Additional compilation step

---

_Generated for English Learning App MVP_
_Date: 2025-11-02_
_Architecture Version: 1.0.0_
_Target: Local Development - iOS/Android_
