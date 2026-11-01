from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.translation import router as translation_router

app = FastAPI(
    title="NammaSathi API",
    description="AI-powered Kannada Communication Companion",
    version="1.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
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
