"""
Application configuration management
"""
from pydantic_settings import BaseSettings
from typing import List, Optional


class Settings(BaseSettings):
    """Application settings"""

    # Application
    APP_NAME: str = "English Learning App API"
    APP_VERSION: str = "1.0.0"
    ENV: str = "development"
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"

    # Database
    DATABASE_URL: str = "sqlite:///./data/english_app.db"

    # API
    API_V1_PREFIX: str = "/api/v1"
    CORS_ORIGINS: List[str] = ["*"]

    # Hugging Face
    HF_HOME: str = "./data/models"
    HF_OFFLINE: bool = False
    HF_API_TOKEN: Optional[str] = None  # Optional: for private models or higher rate limits
    INFERENCE_MODE: str = "api"  # "api" or "local"

    # Models
    WHISPER_MODEL: str = "openai/whisper-base"
    TRANSLATION_MODEL_PREFIX: str = "Helsinki-NLP/opus-mt"
    TEXT_MODEL: str = "distilbert-base-uncased"

    # File Storage
    UPLOAD_DIR: str = "./data/audio"
    MAX_UPLOAD_SIZE: int = 10485760  # 10MB
    ALLOWED_AUDIO_FORMATS: List[str] = [".wav", ".mp3", ".m4a", ".ogg"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
