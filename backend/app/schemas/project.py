from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


# --- Alt Şemalar (JSONB Yapı Doğrulayıcıları) ---

class EnvironmentSpec(BaseModel):
    os: str = Field(..., description="Önerilen işletim sistemi veya çalışma ortamı")
    ide: str = Field(..., description="IDE ve eklenti kurulumu")
    docker: str = Field(..., description="Konteyner ve altyapı gereksinimi")


class TechStackAndAISpec(BaseModel):
    core_stack: list[str] = Field(..., min_length=1, description="Kullanılacak çekirdek teknolojiler")
    ai_division_of_labor: str = Field(
        ..., description="Mimariyi insanın, hangi alt modülleri AI asistanının yazacağını belirleyen iş bölümü"
    )


class InterviewQuestionSpec(BaseModel):
    question: str = Field(..., description="Teknik mülakatta sorulacak mimari soru")
    technical_defense: str = Field(..., description="Adayın vermesi gereken kıdemli seviye teknik savunma")


# --- Ana Şemalar ---

class ProjectBase(BaseModel):
    slug: str = Field(..., pattern=r"^[a-z0-9-]+$")
    title: str
    short_description: str
    domains: list[str] = Field(..., min_length=1)
    difficulty: str

    # 9 Temel Sütun
    target_audience: str
    why_build: str
    environment: EnvironmentSpec
    tech_stack_and_ai: TechStackAndAISpec
    prerequisites: list[str] = Field(..., min_length=1)
    anti_patterns: list[str] = Field(..., min_length=1)
    genesis_prompt: str
    definition_of_done: list[str] = Field(
        ..., min_length=3, max_length=3, description="Tam olarak 3 somut kabul kriteri"
    )
    interview_questions: list[InterviewQuestionSpec] = Field(
        ..., min_length=2, max_length=2, description="Tam olarak 2 mülakat sorusu ve teknik savunması"
    )


class ProjectCreate(ProjectBase):
    """JSON dosyalarından okunan tohum verilerini veritabanına yazmadan önce doğrular."""
    pass


class ProjectCardResponse(BaseModel):
    """Ana sayfa (Vitrin) için hafifletilmiş veri modeli (9 ağır sütunu taşımaz)."""
    id: int
    slug: str
    title: str
    short_description: str
    domains: list[str]
    difficulty: str

    model_config = ConfigDict(from_attributes=True)


class CatalogFiltersResponse(BaseModel):
    domains: list[str]
    difficulties: list[str]
    total_count: int


class ProjectDetailResponse(ProjectBase):
    """Detay sayfası (/projects/[slug]) için tüm 9 sütunu içeren tam model."""
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)