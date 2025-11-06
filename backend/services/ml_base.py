"""
Base classes for ML inference services.
Supports both API-based and local model inference.
"""
from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from enum import Enum


class InferenceMode(Enum):
    """Mode for ML inference"""
    API = "api"  # Use Hugging Face Inference API
    LOCAL = "local"  # Use local models


class MLInferenceService(ABC):
    """Abstract base class for ML inference services"""

    @abstractmethod
    async def translate(
        self,
        text: str,
        source_lang: str,
        target_lang: str
    ) -> Dict[str, Any]:
        """
        Translate text from source language to target language.

        Args:
            text: Text to translate
            source_lang: Source language code (e.g., 'en')
            target_lang: Target language code (e.g., 'es')

        Returns:
            {
                "translated_text": str,
                "source_lang": str,
                "target_lang": str,
                "model": str
            }
        """
        pass

    @abstractmethod
    async def transcribe_audio(
        self,
        audio_path: str,
        language: str = "en"
    ) -> Dict[str, Any]:
        """
        Transcribe audio file to text.

        Args:
            audio_path: Path to audio file
            language: Language code (e.g., 'en')

        Returns:
            {
                "text": str,
                "language": str,
                "confidence": float
            }
        """
        pass

    @abstractmethod
    async def analyze_text(
        self,
        text: str,
        task: str = "sentiment"
    ) -> Dict[str, Any]:
        """
        Analyze text for various NLP tasks.

        Args:
            text: Text to analyze
            task: Analysis task (sentiment, grammar, etc.)

        Returns:
            Task-specific results
        """
        pass
