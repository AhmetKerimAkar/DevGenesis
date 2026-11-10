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
    total_count_result = await db.execute(select(func.count(Project.id)))
    difficulties_result = await db.execute(
        select(func.distinct(Project.difficulty)).order_by(Project.difficulty.asc())
    )
    domain_values = func.jsonb_array_elements_text(Project.domains)
    domains_result = await db.execute(
        select(func.distinct(domain_values)).order_by(domain_values.asc())
    )

    return (
        list(domains_result.scalars().all()),
        list(difficulties_result.scalars().all()),
        int(total_count_result.scalar_one() or 0),
    )


async def get_project_by_slug(db: AsyncSession, slug: str) -> Project | None:
    """
    Detay sayfası için tekil projeyi URL dostu 'slug' alanı üzerinden getirir.
    """
    stmt = select(Project).where(Project.slug == slug)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()