"""
SQLAlchemy database models
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Float, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from db.session import Base


class User(Base):
    """User model"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    native_language = Column(String(10), nullable=False)
    target_language = Column(String(10), nullable=False)
    level = Column(String(20), default="beginner")  # beginner, intermediate, advanced
    created_at = Column(DateTime, default=datetime.utcnow)
    last_active = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    progress = relationship("UserProgress", back_populates="user", cascade="all, delete-orphan")
    vocabulary_practice = relationship("VocabularyPractice", back_populates="user", cascade="all, delete-orphan")
    pronunciation_recordings = relationship("PronunciationRecording", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"


class Lesson(Base):
    """Lesson model"""
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    level = Column(String(20), nullable=False, index=True)  # beginner, intermediate, advanced
    category = Column(String(50), index=True)  # conversation, grammar, vocabulary, etc.
    content = Column(JSON, nullable=False)  # Structured lesson content
    estimated_duration = Column(Integer)  # Duration in minutes
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    vocabulary_items = relationship("VocabularyItem", back_populates="lesson", cascade="all, delete-orphan")
    progress = relationship("UserProgress", back_populates="lesson", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Lesson(id={self.id}, title='{self.title}')>"


class VocabularyItem(Base):
    """Vocabulary item model"""
    __tablename__ = "vocabulary_items"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String(100), nullable=False, index=True)
    translation = Column(String(100), nullable=False)
    pronunciation = Column(String(200))  # IPA or phonetic representation
    part_of_speech = Column(String(20))  # noun, verb, adjective, etc.
    difficulty_level = Column(String(20), index=True)  # beginner, intermediate, advanced
    example_sentence = Column(Text)
    audio_url = Column(String(500))  # Path to audio file
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    lesson = relationship("Lesson", back_populates="vocabulary_items")
    practice = relationship("VocabularyPractice", back_populates="vocabulary", cascade="all, delete-orphan")
    pronunciation_recordings = relationship("PronunciationRecording", back_populates="vocabulary", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<VocabularyItem(id={self.id}, word='{self.word}')>"


class UserProgress(Base):
    """User progress tracking model"""
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    status = Column(String(20), default="not_started")  # not_started, in_progress, completed
    progress_percentage = Column(Integer, default=0)  # 0-100
    score = Column(Integer, nullable=True)  # Final score
    time_spent = Column(Integer, default=0)  # Time in seconds
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    last_accessed = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="progress")
    lesson = relationship("Lesson", back_populates="progress")

    def __repr__(self):
        return f"<UserProgress(user_id={self.user_id}, lesson_id={self.lesson_id}, status='{self.status}')>"


class VocabularyPractice(Base):
    """Vocabulary practice tracking model"""
    __tablename__ = "vocabulary_practice"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    vocabulary_id = Column(Integer, ForeignKey("vocabulary_items.id"), nullable=False)
    correct_count = Column(Integer, default=0)
    incorrect_count = Column(Integer, default=0)
    last_practiced = Column(DateTime, default=datetime.utcnow)
    next_review = Column(DateTime, nullable=True)  # Spaced repetition
    mastery_level = Column(Integer, default=0)  # 0-5 scale
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="vocabulary_practice")
    vocabulary = relationship("VocabularyItem", back_populates="practice")

    def __repr__(self):
        return f"<VocabularyPractice(user_id={self.user_id}, vocabulary_id={self.vocabulary_id}, mastery={self.mastery_level})>"


class PronunciationRecording(Base):
    """Pronunciation recording and analysis model"""
    __tablename__ = "pronunciation_recordings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    vocabulary_id = Column(Integer, ForeignKey("vocabulary_items.id"), nullable=True)
    audio_path = Column(String(500), nullable=False)
    transcription = Column(Text, nullable=True)
    accuracy_score = Column(Float, nullable=True)  # 0.0 - 1.0
    feedback = Column(JSON, nullable=True)  # Detailed feedback
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="pronunciation_recordings")
    vocabulary = relationship("VocabularyItem", back_populates="pronunciation_recordings")

    def __repr__(self):
        return f"<PronunciationRecording(id={self.id}, user_id={self.user_id}, score={self.accuracy_score})>"
