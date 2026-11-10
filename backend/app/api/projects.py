from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.crud import project as project_crud
from app.schemas.project import ProjectCardResponse, ProjectDetailResponse

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get(
    "",
    response_model=list[ProjectCardResponse],
    status_code=status.HTTP_200_OK,
    summary="Vitrin için tüm projeleri listele",
)
async def list_projects(
    difficulty: str | None = Query(
        default=None, description="Zorluk seviyesine göre filtrele (Örn: Orta, Orta-İleri)"
    ),
    domain: str | None = Query(
        default=None, description="Alana göre filtrele (Örn: Siber Güvenlik, Backend, Yapay Zeka)"
    ),
    db: AsyncSession = Depends(get_db),
):
    """
    Ana sayfa (Vitrin) kartları için hafifletilmiş proje listesini döner.
    Performans için 9 mimari sütun bu uç noktada serileştirilmez.
    """
    projects = await project_crud.get_projects(
        db=db, difficulty=difficulty, domain=domain
    )
    return projects


@router.get(
    "/{slug}",
    response_model=ProjectDetailResponse,
    status_code=status.HTTP_200_OK,
    summary="Slug değerine göre projenin 9 sütunlu tüm detaylarını getir",
)
async def retrieve_project_detail(
    slug: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Detay sayfası (/projects/[slug]) için Genesis Prompt, Kabul Kriterleri,
    Mülakat Soruları ve Teknik Künye dahil tüm 9 temel sütunu döner.
    """
    project = await project_crud.get_project_by_slug(db=db, slug=slug)
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"'{slug}' kodlu proje sistemde bulunamadı.",
        )
    return project