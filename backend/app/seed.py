import asyncio
import json
from pathlib import Path
from sqlalchemy import select

from app.core.database import engine, AsyncSessionLocal, Base
from app.models.project import Project
from app.schemas.project import ProjectCreate

# backend/data/projects dizinini dinamik olarak bul
PROJECTS_DIR = Path(__file__).resolve().parent.parent / "data" / "projects"


async def init_models() -> None:
    """Veritabanı tablolarını (henüz oluşturulmamışsa) oluşturur."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def seed_projects() -> None:
    """JSON dosyalarını Pydantic ile doğrular ve veritabanına idempotent (upsert) olarak yazar."""
    await init_models()

    if not PROJECTS_DIR.exists():
        print(f"[HATA] Tohumlama dizini bulunamadı: {PROJECTS_DIR}")
        return

    json_files = list(PROJECTS_DIR.glob("*.json"))
    if not json_files:
        print(f"[UYARI] {PROJECTS_DIR} içinde hiç .json dosyası bulunamadı.")
        return

    async with AsyncSessionLocal() as session:
        for file_path in json_files:
            with open(file_path, "r", encoding="utf-8") as f:
                raw_data = json.load(f)

            # 1. Katı Pydantic v2 Şema Doğrulaması (9 sütun kontrolü)
            validated_data = ProjectCreate.model_validate(raw_data)
            payload = validated_data.model_dump()

            # 2. Veritabanında bu slug ile kayıt var mı kontrol et
            stmt = select(Project).where(Project.slug == validated_data.slug)
            result = await session.execute(stmt)
            existing_project = result.scalar_one_or_none()

            if existing_project:
                # Kayıt varsa tüm alanları güncelle (Upsert davranışı)
                for key, value in payload.items():
                    setattr(existing_project, key, value)
                print(f"[GÜNCELLENDİ] {validated_data.slug} ({file_path.name})")
            else:
                # Kayıt yoksa yeni satır ekle
                new_project = Project(**payload)
                session.add(new_project)
                print(f"[EKLENDİ]     {validated_data.slug} ({file_path.name})")

        await session.commit()
        print("\n[BAŞARILI] DevGenesis veritabanı tohumlama işlemi tamamlandı!")


if __name__ == "__main__":
    asyncio.run(seed_projects())