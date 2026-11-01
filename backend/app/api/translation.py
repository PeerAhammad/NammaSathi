import logging

from fastapi import APIRouter, HTTPException

from app.schemas.translation import (
    TranslationRequest,
    TranslationResponse,
)
from app.services.gemini_service import translate_text

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["Translation"])


@router.post("/translate", response_model=TranslationResponse)
def translate(request: TranslationRequest):

    if request.source_language == request.target_language:
        raise HTTPException(
            status_code=400,
            detail="Source and target languages must be different.",
        )

    try:
        translated = translate_text(
            text=request.text,
            source_language=request.source_language,
            target_language=request.target_language,
            context=request.context,
        )

        return TranslationResponse(
            original_text=request.text,
            translated_text=translated,
            source_language=request.source_language,
            target_language=request.target_language,
            context=request.context,
        )

    except Exception:
        logger.exception("NammaSathi translation failed")
        raise HTTPException(
            status_code=502,
            detail="Translation service is temporarily unavailable.",
        )
