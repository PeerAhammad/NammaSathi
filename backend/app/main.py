from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.translation import router as translation_router
from app.core.config import CORS_ORIGINS

app = FastAPI(
    title="NammaSathi API",
    description="AI-powered Kannada Communication Companion",
    version="1.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_origin_regex=r"^https://namma-sathi-bqzn\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(translation_router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to NammaSathi API",
        "status": "running",
    }


@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "NammaSathi",
        "version": "1.1.0",
    }