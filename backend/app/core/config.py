import os

from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")

CORS_ORIGINS = [
    origin.strip().rstrip("/")
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if origin.strip()
]

# Always allow the production Vercel frontend.
PRODUCTION_ORIGIN = "https://namma-sathi-bqzn.vercel.app"

if PRODUCTION_ORIGIN not in CORS_ORIGINS:
    CORS_ORIGINS.append(PRODUCTION_ORIGIN)

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not configured.")