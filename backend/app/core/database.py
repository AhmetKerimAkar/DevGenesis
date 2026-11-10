from collections.abc import AsyncGenerator
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings

# Asenkron veritabanı motoru (pool_pre_ping kopan bağlantıları otomatik yeniler)
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    future=True,
    pool_pre_ping=True,
)

# Her istek için izole oturum üreten fabrika (session factory)
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


# Tüm SQLAlchemy modellerimizin miras alacağı temel sınıf
class Base(DeclarativeBase):
    pass


# FastAPI uç noktalarında Depends(get_db) ile kullanılacak bağımlılık
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()