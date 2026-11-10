from collections.abc import Sequence
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import load_only

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
    stmt = (
        select(Project)
        .options(
            load_only(
                Project.id,
                Project.slug,
                Project.title,
                Project.short_description,
                Project.domains,
                Project.difficulty,
            )
        )
        .order_by(Project.id.asc())
    )

    if difficulty:
        stmt = stmt.where(Project.difficulty == difficulty)

    if domain:
        # PostgreSQL JSONB '@>' (contains) operatörü ile dizi içi arama
        stmt = stmt.where(Project.domains.contains([domain]))

    result = await db.execute(stmt)
    return result.scalars().all()


async def get_catalog_filters(db: AsyncSession) -> tuple[list[str], list[str], int]:
    """Katalogdaki tüm benzersiz filtre değerlerini ve toplam proje sayısını döner."""
    values_result = await db.execute(select(Project.domains, Project.difficulty))
    domains: set[str] = set()
    difficulties: set[str] = set()

    for project_domains, difficulty in values_result.all():
        domains.update(project_domains or [])
        if difficulty:
            difficulties.add(difficulty)

    total_count = await db.scalar(select(func.count(Project.id)))
    return sorted(domains), sorted(difficulties), int(total_count or 0)


async def get_project_by_slug(db: AsyncSession, slug: str) -> Project | None:
    """
    Detay sayfası için tekil projeyi URL dostu 'slug' alanı üzerinden getirir.
    """
    stmt = select(Project).where(Project.slug == slug)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()