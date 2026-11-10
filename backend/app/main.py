from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.api.projects import catalog_router, router as projects_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# Next.js Frontend (localhost:3000) için CORS izinleri
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Proje Router'ını /api/v1 altına bağla
app.include_router(projects_router, prefix=settings.API_V1_STR)
app.include_router(catalog_router, prefix=settings.API_V1_STR)


@app.get(f"{settings.API_V1_STR}/health", tags=["System"])
async def health_check(db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(text("SELECT 1"))
        if result.scalar() == 1:
            return {
                "status": "healthy",
                "service": settings.PROJECT_NAME,
                "database": "connected (asyncpg)",
            }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Veritabanı bağlantı hatası: {str(e)}",
        )