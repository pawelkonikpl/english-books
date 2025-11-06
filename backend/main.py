"""
FastAPI application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "English Learning App API",
        "version": settings.APP_VERSION,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "environment": settings.ENV
    }


# Import and include routers
# from api.routes import lessons, vocabulary, pronunciation, translation, progress
# app.include_router(lessons.router, prefix=settings.API_V1_PREFIX, tags=["lessons"])
# app.include_router(vocabulary.router, prefix=settings.API_V1_PREFIX, tags=["vocabulary"])
# app.include_router(pronunciation.router, prefix=settings.API_V1_PREFIX, tags=["pronunciation"])
# app.include_router(translation.router, prefix=settings.API_V1_PREFIX, tags=["translation"])
# app.include_router(progress.router, prefix=settings.API_V1_PREFIX, tags=["progress"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
