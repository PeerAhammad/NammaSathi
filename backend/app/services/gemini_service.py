import logging

from google import genai

from app.core.config import GEMINI_API_KEY, GEMINI_MODEL

logger = logging.getLogger(__name__)

client = genai.Client(api_key=GEMINI_API_KEY)

# Current supported Gemini models, in priority order.
FALLBACK_MODELS = list(dict.fromkeys([
    GEMINI_MODEL or "gemini-3.8-flash",
    "gemini-3.8-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
]))


def translate_text(
    text: str,
    source_language: str,
    target_language: str,
    context: str,
) -> str:

    prompt = f"""
You are NammaSathi, an intelligent multilingual communication assistant.

Translate the following text accurately.

Source language: {source_language}
Target language: {target_language}
Situation: {context}

Original text:
{text}

Instructions:
1. Preserve the original meaning and intent.
2. Use natural, conversational language.
3. Consider the specified real-life situation.
4. If the target language is Kannada, use Kannada script.
5. Do not provide explanations or introductory phrases.
6. Return only the translated text.
7. Never invent additional information.
8. Preserve important names, numbers, and details.

Translation:
"""

    errors = []

    for model in FALLBACK_MODELS:
        try:
            logger.info("Attempting translation with model: %s", model)

            response = client.models.generate_content(
                model=model,
                contents=prompt,
            )

            result = response.text

            if result and result.strip():
                logger.info("Translation successful with model: %s", model)
                return result.strip()

            errors.append(f"{model}: empty response")
            logger.warning("Model %s returned an empty response", model)

        except Exception as exc:
            logger.exception("Translation failed with model %s", model)
            errors.append(f"{model}: {exc}")

    raise RuntimeError(
        "All Gemini translation models failed: " + " | ".join(errors)
    )