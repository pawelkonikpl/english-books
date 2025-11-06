"""
Factory for creating ML inference services.
Automatically selects API or local based on configuration.
"""
from services.ml_base import MLInferenceService, InferenceMode
from services.ml_api import HuggingFaceAPIService
from config import settings
import logging

logger = logging.getLogger(__name__)


class MLServiceFactory:
    """Factory for creating ML inference services"""

    _instance: MLInferenceService = None

    @classmethod
    def get_service(
        cls,
        mode: InferenceMode = InferenceMode.API,
        api_token: str = None
    ) -> MLInferenceService:
        """
        Get or create ML inference service.

        Args:
            mode: Inference mode (API or LOCAL)
            api_token: Hugging Face API token (for API mode)

        Returns:
            MLInferenceService instance
        """
        if cls._instance is None:
            if mode == InferenceMode.API:
                logger.info("Creating Hugging Face API service")
                cls._instance = HuggingFaceAPIService(api_token=api_token)
            elif mode == InferenceMode.LOCAL:
                logger.info("Creating local model service")
                from services.ml_local import LocalModelService
                cls._instance = LocalModelService(
                    cache_dir=settings.HF_HOME
                )
            else:
                raise ValueError(f"Unknown inference mode: {mode}")

        return cls._instance

    @classmethod
    def reset(cls):
        """Reset the singleton instance (useful for testing)"""
        cls._instance = None
