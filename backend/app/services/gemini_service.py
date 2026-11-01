from google import genai

from app.core.config import GEMINI_API_KEY, GEMINI_MODEL

client = genai.Client(api_key=GEMINI_API_KEY)


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

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
    )

    result = response.text

    if not result or not result.strip():
        raise ValueError("Gemini returned an empty translation.")

    return result.strip()
