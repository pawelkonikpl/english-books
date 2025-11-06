"""
Hugging Face Inference API implementation.
Uses Hugging Face's hosted API for model inference.
"""
import asyncio
from typing import Dict, Any, Optional
import aiohttp
from huggingface_hub import InferenceClient
from services.ml_base import MLInferenceService
from config import settings
import logging

logger = logging.getLogger(__name__)


class HuggingFaceAPIService(MLInferenceService):
    """ML inference using Hugging Face Inference API"""

    def __init__(self, api_token: Optional[str] = None):
        """
        Initialize Hugging Face API client.

        Args:
            api_token: HF API token (optional for public models)
        """
        self.api_token = api_token
        self.client = InferenceClient(token=api_token)
        logger.info("Initialized Hugging Face API client")

    async def translate(
        self,
        text: str,
        source_lang: str,
        target_lang: str
    ) -> Dict[str, Any]:
        """Translate text using Helsinki-NLP models via API"""
        try:
            # Helsinki-NLP translation models
            model_name = f"Helsinki-NLP/opus-mt-{source_lang}-{target_lang}"

            # Use async inference
            result = await asyncio.to_thread(
                self.client.translation,
                text,
                model=model_name
            )

            translated_text = result.translation_text if hasattr(result, 'translation_text') else result

            logger.info(f"Translated '{text[:50]}...' from {source_lang} to {target_lang}")

            return {
                "translated_text": translated_text,
                "source_lang": source_lang,
                "target_lang": target_lang,
                "model": model_name
            }
        except Exception as e:
            logger.error(f"Translation error: {str(e)}")
            raise

    async def transcribe_audio(
        self,
        audio_path: str,
        language: str = "en"
    ) -> Dict[str, Any]:
        """Transcribe audio using Whisper model via API"""
        try:
            model_name = "openai/whisper-base"

            # Read audio file
            with open(audio_path, "rb") as audio_file:
                audio_data = audio_file.read()

            # Use async inference
            result = await asyncio.to_thread(
                self.client.automatic_speech_recognition,
                audio_data,
                model=model_name
            )

            text = result.text if hasattr(result, 'text') else result

            logger.info(f"Transcribed audio from {audio_path}")

            return {
                "text": text,
                "language": language,
                "confidence": 1.0,  # API doesn't provide confidence
                "model": model_name
            }
        except Exception as e:
            logger.error(f"Transcription error: {str(e)}")
            raise

    async def analyze_text(
        self,
        text: str,
        task: str = "sentiment"
    ) -> Dict[str, Any]:
        """Analyze text using various NLP models via API"""
        try:
            if task == "sentiment":
                model_name = "distilbert-base-uncased-finetuned-sst-2-english"
                result = await asyncio.to_thread(
                    self.client.text_classification,
                    text,
                    model=model_name
                )
            elif task == "grammar":
                # Grammar checking model
                model_name = "prithivida/grammar_error_correcter_v1"
                result = await asyncio.to_thread(
                    self.client.text_generation,
                    text,
                    model=model_name
                )
            else:
                raise ValueError(f"Unsupported task: {task}")

            logger.info(f"Analyzed text for {task}")

            return {
                "task": task,
                "result": result,
                "model": model_name
            }
        except Exception as e:
            logger.error(f"Text analysis error: {str(e)}")
            raise
