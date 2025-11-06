# Backend Technical Specification: Epic 1 - Book Library & Management

**Epic ID:** 1
**Component:** Backend (FastAPI + SQLite)
**Author:** AiDev
**Date:** 2025-11-02
**Status:** Draft

---

## Overview

This document specifies the backend implementation for the Book Library & Management system, covering FastAPI REST endpoints, SQLAlchemy data models, business logic services, and database schema for book metadata and user progress tracking.

**Scope:** Python FastAPI backend with SQLite local storage

---

## System Architecture

### Technology Stack

- **Framework:** FastAPI 0.109.0+
- **Database:** SQLite 3.0+ (via SQLAlchemy 2.0+)
- **ORM:** SQLAlchemy with Alembic migrations
- **Validation:** Pydantic 2.6+
- **Python:** 3.11+

### Project Structure

```
backend/
├── api/
│   └── routes/
│       └── lessons.py          # Epic 1 endpoints
├── models/
│   ├── database.py             # SQLAlchemy models
│   └── schemas.py              # Pydantic schemas
├── services/
│   └── lesson_service.py       # Business logic
├── db/
│   ├── session.py              # DB connection
│   └── migrations/             # Alembic
├── data/
│   └── english_app.db          # SQLite file
└── main.py                      # FastAPI app
```

---

## Database Schema

### Tables

#### 1. lessons

Stores book metadata and content.

```sql
CREATE TABLE lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    description TEXT,
    level VARCHAR(20) NOT NULL CHECK(level IN ('beginner', 'intermediate', 'advanced')),
    category VARCHAR(50) DEFAULT 'book',
    cover_url VARCHAR(500),
    is_premium BOOLEAN DEFAULT 0,
    estimated_duration INTEGER,  -- in minutes
    learning_benefits JSON,      -- Array of strings
    key_vocabulary JSON,         -- Array of vocabulary words
    content JSON NOT NULL,       -- Full book content structure
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lessons_level ON lessons(level);
CREATE INDEX idx_lessons_category ON lessons(category);
CREATE INDEX idx_lessons_is_premium ON lessons(is_premium);
```

**Sample Data:**
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "description": "A classic novel of American literature...",
  "level": "intermediate",
  "category": "book",
  "cover_url": "/static/covers/great-gatsby.jpg",
  "is_premium": false,
  "estimated_duration": 45,
  "learning_benefits": [
    "150+ business and social vocabulary words",
    "Jazz Age cultural context",
    "Advanced narrative structures"
  ],
  "key_vocabulary": ["vulnerable", "contemptuous", "supercilious", "simultaneously", "feign"],
  "content": {
    "chapters": [
      {
        "id": 1,
        "title": "Chapter 1",
        "text": "In my younger and more vulnerable years...",
        "audio_url": "/static/audio/gatsby-ch1.mp3",
        "sentences": [
          {
            "id": 1,
            "text": "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.",
            "start_time": 0.0,
            "end_time": 6.5
          }
        ]
      }
    ]
  },
  "created_at": "2025-11-02T10:00:00Z",
  "updated_at": "2025-11-02T10:00:00Z"
}
```

#### 2. user_progress

Tracks reading progress for each user per book.

```sql
CREATE TABLE user_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    lesson_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'not_started',  -- 'not_started', 'in_progress', 'completed'
    progress_percentage INTEGER DEFAULT 0,     -- 0-100
    current_chapter_id INTEGER,
    current_sentence_id INTEGER,
    last_position_offset INTEGER DEFAULT 0,    -- Scroll position in pixels
    time_spent INTEGER DEFAULT 0,              -- Total seconds spent reading
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id),
    UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_progress_user ON user_progress(user_id);
CREATE INDEX idx_progress_last_accessed ON user_progress(last_accessed DESC);
```

---

## SQLAlchemy Models

**Location:** `backend/models/database.py`

```python
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db.session import Base

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    author = Column(String(100), nullable=False)
    description = Column(Text)
    level = Column(String(20), nullable=False)  # beginner, intermediate, advanced
    category = Column(String(50), default="book")
    cover_url = Column(String(500))
    is_premium = Column(Boolean, default=False, index=True)
    estimated_duration = Column(Integer)  # minutes
    learning_benefits = Column(JSON)  # List[str]
    key_vocabulary = Column(JSON)  # List[str]
    content = Column(JSON, nullable=False)  # Full book structure
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    progress_records = relationship("UserProgress", back_populates="lesson")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "description": self.description,
            "level": self.level,
            "category": self.category,
            "coverUrl": self.cover_url,
            "isPremium": self.is_premium,
            "estimatedDuration": self.estimated_duration,
            "learningBenefits": self.learning_benefits or [],
            "keyVocabulary": self.key_vocabulary or [],
            "content": self.content,
            "createdAt": self.created_at.isoformat() if self.created_at else None,
        }


class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    status = Column(String(20), default="not_started")
    progress_percentage = Column(Integer, default=0)
    current_chapter_id = Column(Integer)
    current_sentence_id = Column(Integer)
    last_position_offset = Column(Integer, default=0)
    time_spent = Column(Integer, default=0)  # seconds
    started_at = Column(DateTime)
    completed_at = Column(DateTime)
    last_accessed = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    lesson = relationship("Lesson", back_populates="progress_records")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "lessonId": self.lesson_id,
            "status": self.status,
            "progressPercentage": self.progress_percentage,
            "currentChapterId": self.current_chapter_id,
            "currentSentenceId": self.current_sentence_id,
            "lastPositionOffset": self.last_position_offset,
            "timeSpent": self.time_spent,
            "startedAt": self.started_at.isoformat() if self.started_at else None,
            "completedAt": self.completed_at.isoformat() if self.completed_at else None,
            "lastAccessed": self.last_accessed.isoformat() if self.last_accessed else None,
        }
```

---

## Pydantic Schemas

**Location:** `backend/models/schemas.py`

```python
from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict, Any
from datetime import datetime

class LessonBase(BaseModel):
    title: str = Field(..., max_length=200)
    author: str = Field(..., max_length=100)
    description: Optional[str] = None
    level: str = Field(..., pattern="^(beginner|intermediate|advanced)$")
    category: str = Field(default="book", max_length=50)
    cover_url: Optional[str] = None
    is_premium: bool = Field(default=False)
    estimated_duration: Optional[int] = None  # minutes
    learning_benefits: Optional[List[str]] = []
    key_vocabulary: Optional[List[str]] = []
    content: Dict[str, Any] = Field(...)  # JSON content structure

class LessonCreate(LessonBase):
    pass

class LessonUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    cover_url: Optional[str] = None
    content: Optional[Dict[str, Any]] = None

class LessonResponse(LessonBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ProgressBase(BaseModel):
    user_id: int
    lesson_id: int
    status: str = Field(default="not_started", pattern="^(not_started|in_progress|completed)$")
    progress_percentage: int = Field(default=0, ge=0, le=100)
    current_chapter_id: Optional[int] = None
    current_sentence_id: Optional[int] = None
    last_position_offset: int = Field(default=0)
    time_spent: int = Field(default=0)

class ProgressCreate(ProgressBase):
    pass

class ProgressUpdate(BaseModel):
    status: Optional[str] = None
    progress_percentage: Optional[int] = Field(None, ge=0, le=100)
    current_chapter_id: Optional[int] = None
    current_sentence_id: Optional[int] = None
    last_position_offset: Optional[int] = None
    time_spent: Optional[int] = None

class ProgressResponse(ProgressBase):
    id: int
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    last_accessed: datetime

    class Config:
        from_attributes = True
```

---

## REST API Endpoints

**Base URL:** `http://localhost:8000/api/v1`

**Response Format (Consistent):**
```json
{
  "success": true,
  "data": { /* payload */ },
  "message": "Optional message"
}
```

### Endpoint Specifications

#### 1. GET /lessons

**Description:** Retrieve all books with optional filtering

**Query Parameters:**
- `level` (optional): Filter by beginner|intermediate|advanced
- `is_premium` (optional): Filter by true|false
- `limit` (optional): Max results (default: 100)
- `offset` (optional): Pagination offset (default: 0)

**Request:**
```
GET /api/v1/lessons?level=intermediate&is_premium=false
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "description": "A classic novel...",
      "level": "intermediate",
      "category": "book",
      "coverUrl": "/static/covers/great-gatsby.jpg",
      "isPremium": false,
      "estimatedDuration": 45,
      "learningBenefits": ["150+ vocabulary words", "Jazz Age context"],
      "keyVocabulary": ["vulnerable", "contemptuous", "feign"],
      "content": { /* Full chapter structure */ },
      "createdAt": "2025-11-02T10:00:00Z"
    }
  ]
}
```

**Implementation:**

```python
# backend/api/routes/lessons.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from models.schemas import LessonResponse
from services.lesson_service import LessonService
from db.session import get_db

router = APIRouter(prefix="/api/v1", tags=["lessons"])

@router.get("/lessons", response_model=dict)
async def get_lessons(
    level: Optional[str] = Query(None, pattern="^(beginner|intermediate|advanced)$"),
    is_premium: Optional[bool] = None,
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    """
    Retrieve all books with optional filtering.

    - **level**: Filter by learning level
    - **is_premium**: Filter by premium status
    - **limit**: Maximum number of results
    - **offset**: Pagination offset
    """
    service = LessonService(db)
    lessons = service.get_lessons(
        level=level,
        is_premium=is_premium,
        limit=limit,
        offset=offset
    )

    return {
        "success": True,
        "data": [lesson.to_dict() for lesson in lessons]
    }
```

---

#### 2. GET /lessons/{id}

**Description:** Retrieve single book details by ID

**Path Parameters:**
- `id` (required): Lesson ID

**Request:**
```
GET /api/v1/lessons/1
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    /* ...full book details... */
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "error": {
    "code": "LESSON_NOT_FOUND",
    "message": "Lesson with ID 1 not found"
  }
}
```

**Implementation:**

```python
@router.get("/lessons/{lesson_id}", response_model=dict)
async def get_lesson(
    lesson_id: int,
    db: Session = Depends(get_db)
):
    """Retrieve single book by ID"""
    service = LessonService(db)
    lesson = service.get_lesson_by_id(lesson_id)

    if not lesson:
        raise HTTPException(
            status_code=404,
            detail={
                "success": False,
                "error": {
                    "code": "LESSON_NOT_FOUND",
                    "message": f"Lesson with ID {lesson_id} not found"
                }
            }
        )

    return {
        "success": True,
        "data": lesson.to_dict()
    }
```

---

#### 3. POST /lessons

**Description:** Create new book (Admin only - MVP stub)

**Request Body:**
```json
{
  "title": "1984",
  "author": "George Orwell",
  "description": "Dystopian social science fiction novel...",
  "level": "advanced",
  "is_premium": true,
  "estimated_duration": 60,
  "learning_benefits": ["Political vocabulary", "Narrative structures"],
  "key_vocabulary": ["doublethink", "thoughtcrime", "newspeak"],
  "content": {
    "chapters": [/* ... */]
  }
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": 2,
    "title": "1984",
    /* ...created book... */
  },
  "message": "Lesson created successfully"
}
```

**Implementation:**

```python
@router.post("/lessons", response_model=dict, status_code=201)
async def create_lesson(
    lesson: LessonCreate,
    db: Session = Depends(get_db)
):
    """Create new book (Admin only)"""
    service = LessonService(db)
    new_lesson = service.create_lesson(lesson)

    return {
        "success": True,
        "data": new_lesson.to_dict(),
        "message": "Lesson created successfully"
    }
```

---

#### 4. GET /progress/current

**Description:** Get current book user is reading

**Query Parameters:**
- `user_id` (required): User ID

**Request:**
```
GET /api/v1/progress/current?user_id=1
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userId": 1,
    "lessonId": 1,
    "status": "in_progress",
    "progressPercentage": 35,
    "currentChapterId": 3,
    "currentSentenceId": 42,
    "lastPositionOffset": 1200,
    "timeSpent": 1800,
    "lastAccessed": "2025-11-02T15:30:00Z"
  }
}
```

**Implementation:**

```python
@router.get("/progress/current", response_model=dict)
async def get_current_book(
    user_id: int = Query(...),
    db: Session = Depends(get_db)
):
    """Get the book user is currently reading"""
    service = LessonService(db)
    progress = service.get_current_progress(user_id)

    if not progress:
        return {
            "success": True,
            "data": None,
            "message": "No book in progress"
        }

    return {
        "success": True,
        "data": progress.to_dict()
    }
```

---

#### 5. POST /progress

**Description:** Create or update reading progress

**Request Body:**
```json
{
  "user_id": 1,
  "lesson_id": 1,
  "status": "in_progress",
  "progress_percentage": 35,
  "current_chapter_id": 3,
  "current_sentence_id": 42,
  "last_position_offset": 1200,
  "time_spent": 1800
}
```

**Response:** `200 OK` (upsert)
```json
{
  "success": true,
  "data": {
    "id": 1,
    /* ...progress record... */
  },
  "message": "Progress updated successfully"
}
```

**Implementation:**

```python
@router.post("/progress", response_model=dict)
async def update_progress(
    progress: ProgressCreate,
    db: Session = Depends(get_db)
):
    """Create or update reading progress (upsert)"""
    service = LessonService(db)
    updated_progress = service.upsert_progress(progress)

    return {
        "success": True,
        "data": updated_progress.to_dict(),
        "message": "Progress updated successfully"
    }
```

---

## Business Logic Layer

**Location:** `backend/services/lesson_service.py`

```python
from sqlalchemy.orm import Session
from models.database import Lesson, UserProgress
from models.schemas import LessonCreate, ProgressCreate
from typing import Optional, List
from datetime import datetime

class LessonService:
    def __init__(self, db: Session):
        self.db = db

    def get_lessons(
        self,
        level: Optional[str] = None,
        is_premium: Optional[bool] = None,
        limit: int = 100,
        offset: int = 0
    ) -> List[Lesson]:
        """
        Retrieve lessons with optional filtering.

        Args:
            level: Filter by beginner/intermediate/advanced
            is_premium: Filter by premium status
            limit: Maximum results
            offset: Pagination offset

        Returns:
            List of Lesson objects
        """
        query = self.db.query(Lesson).filter(Lesson.category == "book")

        if level:
            query = query.filter(Lesson.level == level)

        if is_premium is not None:
            query = query.filter(Lesson.is_premium == is_premium)

        return query.order_by(Lesson.created_at.desc()).limit(limit).offset(offset).all()

    def get_lesson_by_id(self, lesson_id: int) -> Optional[Lesson]:
        """Retrieve single lesson by ID"""
        return self.db.query(Lesson).filter(Lesson.id == lesson_id).first()

    def create_lesson(self, lesson_data: LessonCreate) -> Lesson:
        """Create new lesson"""
        lesson = Lesson(**lesson_data.dict())
        self.db.add(lesson)
        self.db.commit()
        self.db.refresh(lesson)
        return lesson

    def get_current_progress(self, user_id: int) -> Optional[UserProgress]:
        """
        Get the book user is currently reading.

        Returns the most recently accessed in-progress book.
        """
        return (
            self.db.query(UserProgress)
            .filter(
                UserProgress.user_id == user_id,
                UserProgress.status == "in_progress"
            )
            .order_by(UserProgress.last_accessed.desc())
            .first()
        )

    def upsert_progress(self, progress_data: ProgressCreate) -> UserProgress:
        """
        Create or update user progress (upsert).

        If progress record exists for user+lesson, update it.
        Otherwise, create new record.
        """
        existing = (
            self.db.query(UserProgress)
            .filter(
                UserProgress.user_id == progress_data.user_id,
                UserProgress.lesson_id == progress_data.lesson_id
            )
            .first()
        )

        if existing:
            # Update existing record
            for key, value in progress_data.dict(exclude_unset=True).items():
                setattr(existing, key, value)

            existing.last_accessed = datetime.utcnow()

            # Set started_at if transitioning to in_progress
            if not existing.started_at and progress_data.status == "in_progress":
                existing.started_at = datetime.utcnow()

            # Set completed_at if status is completed
            if progress_data.status == "completed" and not existing.completed_at:
                existing.completed_at = datetime.utcnow()

            self.db.commit()
            self.db.refresh(existing)
            return existing
        else:
            # Create new record
            progress = UserProgress(**progress_data.dict())
            progress.started_at = datetime.utcnow() if progress_data.status == "in_progress" else None
            progress.completed_at = datetime.utcnow() if progress_data.status == "completed" else None
            self.db.add(progress)
            self.db.commit()
            self.db.refresh(progress)
            return progress
```

---

## Database Migration (Alembic)

**Initial Migration:**

```bash
# Generate migration
alembic revision --autogenerate -m "Create lessons and user_progress tables"

# Apply migration
alembic upgrade head
```

**Migration File:** `backend/db/migrations/versions/001_create_lessons_tables.py`

```python
def upgrade():
    op.create_table(
        'lessons',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('title', sa.String(200), nullable=False),
        sa.Column('author', sa.String(100), nullable=False),
        sa.Column('description', sa.Text()),
        sa.Column('level', sa.String(20), nullable=False),
        sa.Column('category', sa.String(50), default='book'),
        sa.Column('cover_url', sa.String(500)),
        sa.Column('is_premium', sa.Boolean(), default=False),
        sa.Column('estimated_duration', sa.Integer()),
        sa.Column('learning_benefits', sa.JSON()),
        sa.Column('key_vocabulary', sa.JSON()),
        sa.Column('content', sa.JSON(), nullable=False),
        sa.Column('created_at', sa.DateTime(), default=datetime.utcnow),
        sa.Column('updated_at', sa.DateTime(), default=datetime.utcnow),
    )

    op.create_index('idx_lessons_level', 'lessons', ['level'])
    op.create_index('idx_lessons_is_premium', 'lessons', ['is_premium'])

    op.create_table(
        'user_progress',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('lesson_id', sa.Integer(), sa.ForeignKey('lessons.id'), nullable=False),
        sa.Column('status', sa.String(20), default='not_started'),
        sa.Column('progress_percentage', sa.Integer(), default=0),
        sa.Column('current_chapter_id', sa.Integer()),
        sa.Column('current_sentence_id', sa.Integer()),
        sa.Column('last_position_offset', sa.Integer(), default=0),
        sa.Column('time_spent', sa.Integer(), default=0),
        sa.Column('started_at', sa.DateTime()),
        sa.Column('completed_at', sa.DateTime()),
        sa.Column('last_accessed', sa.DateTime(), default=datetime.utcnow),
    )

    op.create_index('idx_progress_user', 'user_progress', ['user_id'])
    op.create_index('idx_progress_last_accessed', 'user_progress', ['last_accessed'])

def downgrade():
    op.drop_table('user_progress')
    op.drop_table('lessons')
```

---

## Seed Data Script

**Location:** `backend/scripts/seed_books.py`

```python
from sqlalchemy.orm import Session
from models.database import Lesson
from db.session import SessionLocal

def seed_books():
    db = SessionLocal()

    books = [
        Lesson(
            title="The Great Gatsby",
            author="F. Scott Fitzgerald",
            description="A classic novel of the American Dream in the Jazz Age...",
            level="intermediate",
            is_premium=False,
            estimated_duration=45,
            cover_url="/static/covers/gatsby.jpg",
            learning_benefits=[
                "150+ business and social vocabulary words",
                "Jazz Age cultural context",
                "Advanced narrative structures"
            ],
            key_vocabulary=["vulnerable", "contemptuous", "supercilious", "feign", "simultaneously"],
            content={
                "chapters": [
                    {
                        "id": 1,
                        "title": "Chapter 1",
                        "text": "In my younger and more vulnerable years...",
                        "audio_url": "/static/audio/gatsby-ch1.mp3"
                    }
                ]
            }
        ),
        Lesson(
            title="1984",
            author="George Orwell",
            description="Dystopian novel about totalitarianism...",
            level="advanced",
            is_premium=True,
            estimated_duration=60,
            cover_url="/static/covers/1984.jpg",
            learning_benefits=[
                "Political and philosophical vocabulary",
                "Complex narrative structures",
                "Critical thinking concepts"
            ],
            key_vocabulary=["doublethink", "thoughtcrime", "newspeak", "oligarchy", "prole"],
            content={
                "chapters": [/* ... */]
            }
        ),
        # Add more books...
    ]

    db.add_all(books)
    db.commit()
    print(f"✅ Seeded {len(books)} books")

if __name__ == "__main__":
    seed_books()
```

---

## Error Handling

### Custom Exceptions

```python
# backend/utils/exceptions.py
class LessonNotFoundException(Exception):
    def __init__(self, lesson_id: int):
        self.lesson_id = lesson_id
        super().__init__(f"Lesson {lesson_id} not found")

class InvalidProgressDataException(Exception):
    pass
```

### Exception Handlers

```python
# backend/main.py
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(LessonNotFoundException)
async def lesson_not_found_handler(request: Request, exc: LessonNotFoundException):
    return JSONResponse(
        status_code=404,
        content={
            "success": False,
            "error": {
                "code": "LESSON_NOT_FOUND",
                "message": str(exc)
            }
        }
    )
```

---

## Performance Considerations

### Database Indexing

```sql
-- Already created in schema
CREATE INDEX idx_lessons_level ON lessons(level);
CREATE INDEX idx_lessons_is_premium ON lessons(is_premium);
CREATE INDEX idx_progress_user ON user_progress(user_id);
CREATE INDEX idx_progress_last_accessed ON user_progress(last_accessed DESC);
```

### Query Optimization

```python
# Use eager loading for relationships
from sqlalchemy.orm import joinedload

lessons = (
    db.query(Lesson)
    .options(joinedload(Lesson.progress_records))
    .filter(Lesson.is_premium == False)
    .all()
)
```

### Connection Pooling

```python
# backend/db/session.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./data/english_app.db"

engine = create_engine(
    DATABASE_URL,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,
    connect_args={"check_same_thread": False}  # SQLite specific
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

---

## Testing Strategy

### Unit Tests (pytest)

```python
# tests/test_lesson_service.py
import pytest
from services.lesson_service import LessonService
from models.schemas import LessonCreate, ProgressCreate

def test_get_lessons_filters_by_level(db_session):
    service = LessonService(db_session)

    # Seed test data
    db_session.add_all([
        Lesson(title="Book 1", level="beginner", ...),
        Lesson(title="Book 2", level="intermediate", ...),
    ])
    db_session.commit()

    # Test
    lessons = service.get_lessons(level="beginner")

    assert len(lessons) == 1
    assert lessons[0].level == "beginner"

def test_upsert_progress_creates_new_record(db_session):
    service = LessonService(db_session)

    progress_data = ProgressCreate(
        user_id=1,
        lesson_id=1,
        status="in_progress",
        progress_percentage=25
    )

    result = service.upsert_progress(progress_data)

    assert result.id is not None
    assert result.progress_percentage == 25
    assert result.started_at is not None

def test_upsert_progress_updates_existing_record(db_session):
    service = LessonService(db_session)

    # Create initial progress
    initial = ProgressCreate(user_id=1, lesson_id=1, progress_percentage=25)
    service.upsert_progress(initial)

    # Update progress
    updated = ProgressCreate(user_id=1, lesson_id=1, progress_percentage=50)
    result = service.upsert_progress(updated)

    # Should update, not create new
    all_progress = db_session.query(UserProgress).all()
    assert len(all_progress) == 1
    assert all_progress[0].progress_percentage == 50
```

### Integration Tests

```python
# tests/test_api_lessons.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_lessons_returns_200():
    response = client.get("/api/v1/lessons")
    assert response.status_code == 200
    assert response.json()["success"] == True

def test_get_lesson_by_id_returns_404_if_not_found():
    response = client.get("/api/v1/lessons/9999")
    assert response.status_code == 404
    assert response.json()["success"] == False
    assert response.json()["error"]["code"] == "LESSON_NOT_FOUND"

def test_create_progress_returns_200():
    payload = {
        "user_id": 1,
        "lesson_id": 1,
        "status": "in_progress",
        "progress_percentage": 35
    }
    response = client.post("/api/v1/progress", json=payload)
    assert response.status_code == 200
    assert response.json()["data"]["progressPercentage"] == 35
```

---

## Non-Functional Requirements

### Performance

- **Response Time:**
  - GET /lessons: <100ms for 100 books
  - GET /lessons/{id}: <50ms
  - POST /progress: <100ms (upsert operation)

- **Throughput:**
  - Support 100 concurrent users (MVP local deployment)
  - Database queries optimized with indexes

### Security

- **Input Validation:**
  - Pydantic schemas validate all request bodies
  - Query parameters validated with FastAPI Query constraints
  - SQL injection prevented via SQLAlchemy ORM parameterized queries

- **Data Privacy:**
  - No sensitive data in logs
  - User IDs only (no PII for MVP)

### Reliability

- **Database Constraints:**
  - Foreign keys ensure referential integrity
  - Unique constraints prevent duplicate progress records
  - Check constraints validate enum values (level, status)

- **Error Handling:**
  - All endpoints return consistent error format
  - Database errors caught and logged
  - Graceful degradation on failures

### Observability

- **Logging:**
```python
import logging

logger = logging.getLogger(__name__)

@router.get("/lessons")
async def get_lessons(...):
    logger.info(f"Fetching lessons: level={level}, is_premium={is_premium}")
    # ...
```

- **Metrics:** (Future enhancement)
  - Request latency
  - Error rates
  - Database query performance

---

## Acceptance Criteria Checklist

- [ ] GET /lessons returns all books from database
- [ ] GET /lessons filters correctly by level (beginner/intermediate/advanced)
- [ ] GET /lessons filters correctly by is_premium (true/false)
- [ ] GET /lessons supports pagination (limit/offset)
- [ ] GET /lessons/{id} returns single book with full details
- [ ] GET /lessons/{id} returns 404 if book not found
- [ ] POST /lessons creates new book and returns 201 (Admin stub)
- [ ] GET /progress/current returns most recently accessed in-progress book
- [ ] GET /progress/current returns null if no book in progress
- [ ] POST /progress creates new progress record if none exists
- [ ] POST /progress updates existing record if user+lesson already exists (upsert)
- [ ] POST /progress sets started_at timestamp when status changes to in_progress
- [ ] POST /progress sets completed_at timestamp when status is completed
- [ ] Database indexes improve query performance (<100ms for GET /lessons)
- [ ] All endpoints return consistent JSON response format
- [ ] Error responses include error code and message
- [ ] SQLite database file created at backend/data/english_app.db
- [ ] Seed script populates database with 3+ sample books

---

**Status:** Ready for Implementation
**Dependencies:** Frontend Tech Spec (tech-spec-epic-1-frontend.md)
**Next Step:** Mark Epic 1 as "contexted" in sprint-status.yaml
