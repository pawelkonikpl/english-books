"""
Local model inference implementation.
Uses locally downloaded models for inference.
Requires: transformers, torch, librosa (install with: uv sync --extra local)
"""
from typing import Dict, Any, Optional
from services.ml_base import MLInferenceService
import logging

logger = logging.getLogger(__name__)


class LocalModelService(MLInferenceService):
    """
    ML inference using locally downloaded models.

    Note: This requires additional dependencies:
        uv sync --extra local
    """

    def __init__(self, cache_dir: str = "./data/models"):
        """
        Initialize local model service.

        Args:
            cache_dir: Directory to cache downloaded models
        """
        try:
            from transformers import pipeline
            import torch
        except ImportError:
            raise ImportError(
                "Local inference requires additional dependencies. "
                "Install with: uv sync --extra local"
            )

        self.cache_dir = cache_dir
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.models = {}
        logger.info(f"Initialized local model service (device: {self.device})")

    def _get_pipeline(self, task: str, model: str):
        """Get or create a pipeline for a task"""
        from transformers import pipeline

        key = f"{task}:{model}"
        if key not in self.models:
            logger.info(f"Loading model: {model}")
            self.models[key] = pipeline(
                task,
                model=model,
                device=self.device,
                cache_dir=self.cache_dir
            )
        return self.models[key]

    async def translate(
        self,
        text: str,
        source_lang: str,
        target_lang: str
    ) -> Dict[str, Any]:
        """Translate text using local Helsinki-NLP models"""
        model_name = f"Helsinki-NLP/opus-mt-{source_lang}-{target_lang}"
        translator = self._get_pipeline("translation", model_name)

        result = translator(text)[0]
        translated_text = result['translation_text']

        logger.info(f"Translated '{text[:50]}...' from {source_lang} to {target_lang}")

        return {
            "translated_text": translated_text,
            "source_lang": source_lang,
            "target_lang": target_lang,
            "model": model_name
        }

    async def transcribe_audio(
        self,
        audio_path: str,
        language: str = "en"
    ) -> Dict[str, Any]:
        """Transcribe audio using local Whisper model"""
        model_name = "openai/whisper-base"
        transcriber = self._get_pipeline("automatic-speech-recognition", model_name)

        result = transcriber(audio_path)
        text = result['text']

        logger.info(f"Transcribed audio from {audio_path}")

        return {
            "text": text,
            "language": language,
            "confidence": 1.0,
            "model": model_name
        }

    async def analyze_text(
        self,
        text: str,
        task: str = "sentiment"
    ) -> Dict[str, Any]:
        """Analyze text using local NLP models"""
        if task == "sentiment":
            model_name = "distilbert-base-uncased-finetuned-sst-2-english"
            classifier = self._get_pipeline("text-classification", model_name)
            result = classifier(text)
        else:
            raise ValueError(f"Unsupported task: {task}")

        logger.info(f"Analyzed text for {task}")

        return {
            "task": task,
            "result": result,
            "model": model_name
        }
