from typing import Literal
from pydantic import BaseModel, Field, field_validator

Language = Literal["English", "Hindi", "Kannada"]

Context = Literal[
    "general",
    "hospital",
    "shopping",
    "transport",
    "education",
    "workplace",
]


class TranslationRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=500)
    source_language: Language
    target_language: Language
    context: Context = "general"

    @field_validator("text")
    @classmethod
    def validate_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Text cannot be empty.")
        return value


class TranslationResponse(BaseModel):
    original_text: str
    translated_text: str
    source_language: str
    target_language: str
    context: str
