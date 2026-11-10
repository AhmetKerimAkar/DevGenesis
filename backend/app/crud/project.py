from collections.abc import Sequence
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.project import Project


async def get_projects(
    db: AsyncSession,
    difficulty: str | None = None,
    domain: str | None = None,
) -> Sequence[Project]:
    """
    Vitrin sayfası için projeleri getirir.
    Opsiyonel olarak zorluk seviyesi (difficulty) ve alan (domain) filtresi uygular.
    """
    stmt = select(Project).order_by(Project.id.asc())

    if difficulty:
        stmt = stmt.where(Project.difficulty == difficulty)

    if domain:
        # PostgreSQL JSONB '@>' (contains) operatörü ile dizi içi arama
        stmt = stmt.where(Project.domains.contains([domain]))

    result = await db.execute(stmt)
    return result.scalars().all()


async def get_project_by_slug(db: AsyncSession, slug: str) -> Project | None:
    """
    Detay sayfası için tekil projeyi URL dostu 'slug' alanı üzerinden getirir.
    """
    stmt = select(Project).where(Project.slug == slug)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()