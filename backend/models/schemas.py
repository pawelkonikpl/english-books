"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime


# ===== User Schemas =====

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    native_language: str = Field(..., min_length=2, max_length=10)
    target_language: str = Field(..., min_length=2, max_length=10)
    level: str = Field(default="beginner", pattern="^(beginner|intermediate|advanced)$")


class UserCreate(UserBase):
    pass


class UserResponse(UserBase):
    id: int
    created_at: datetime
    last_active: datetime

    model_config = ConfigDict(from_attributes=True)


# ===== Lesson Schemas =====

class LessonBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    level: str = Field(..., pattern="^(beginner|intermediate|advanced)$")
    category: Optional[str] = None
    content: Dict[str, Any]
    estimated_duration: Optional[int] = None


class LessonCreate(LessonBase):
    pass


class LessonUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    level: Optional[str] = Field(None, pattern="^(beginner|intermediate|advanced)$")
    category: Optional[str] = None
    content: Optional[Dict[str, Any]] = None
    estimated_duration: Optional[int] = None
    is_active: Optional[bool] = None


class LessonResponse(LessonBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ===== Vocabulary Schemas =====

class VocabularyItemBase(BaseModel):
    word: str = Field(..., min_length=1, max_length=100)
    translation: str = Field(..., min_length=1, max_length=100)
    pronunciation: Optional[str] = None
    part_of_speech: Optional[str] = None
    difficulty_level: Optional[str] = Field(None, pattern="^(beginner|intermediate|advanced)$")
    example_sentence: Optional[str] = None
    lesson_id: Optional[int] = None


class VocabularyItemCreate(VocabularyItemBase):
    pass


class VocabularyItemResponse(VocabularyItemBase):
    id: int
    audio_url: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ===== Progress Schemas =====

class UserProgressBase(BaseModel):
    user_id: int
    lesson_id: int
    status: str = Field(default="not_started", pattern="^(not_started|in_progress|completed)$")
    progress_percentage: int = Field(default=0, ge=0, le=100)
    time_spent: int = Field(default=0, ge=0)


class UserProgressCreate(UserProgressBase):
    pass


class UserProgressUpdate(BaseModel):
    status: Optional[str] = Field(None, pattern="^(not_started|in_progress|completed)$")
    progress_percentage: Optional[int] = Field(None, ge=0, le=100)
    score: Optional[int] = Field(None, ge=0, le=100)
    time_spent: Optional[int] = Field(None, ge=0)


class UserProgressResponse(UserProgressBase):
    id: int
    score: Optional[int] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    last_accessed: datetime

    model_config = ConfigDict(from_attributes=True)


# ===== Vocabulary Practice Schemas =====

class VocabularyPracticeBase(BaseModel):
    user_id: int
    vocabulary_id: int


class VocabularyPracticeUpdate(BaseModel):
    correct: bool
    mastery_level: Optional[int] = Field(None, ge=0, le=5)


class VocabularyPracticeResponse(VocabularyPracticeBase):
    id: int
    correct_count: int
    incorrect_count: int
    last_practiced: datetime
    next_review: Optional[datetime] = None
    mastery_level: int

    model_config = ConfigDict(from_attributes=True)


# ===== Pronunciation Schemas =====

class PronunciationAnalysisRequest(BaseModel):
    expected_text: Optional[str] = None
    language: str = Field(default="en", min_length=2, max_length=10)


class PronunciationAnalysisResponse(BaseModel):
    id: int
    transcription: Optional[str] = None
    accuracy_score: Optional[float] = Field(None, ge=0.0, le=1.0)
    feedback: Optional[Dict[str, Any]] = None
    audio_path: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ===== Translation Schemas =====

class TranslationRequest(BaseModel):
    text: str = Field(..., min_length=1)
    source_lang: str = Field(..., min_length=2, max_length=10)
    target_lang: str = Field(..., min_length=2, max_length=10)


class TranslationResponse(BaseModel):
    source_text: str
    translated_text: str
    source_lang: str
    target_lang: str
    model: str


# ===== API Response Wrapper =====

class APIResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    message: Optional[str] = None
    error: Optional[Dict[str, Any]] = None
