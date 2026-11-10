from datetime import datetime
from typing import Any
from sqlalchemy import String, Text, DateTime, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Project(Base):
    __tablename__ = "projects"

    # Kimlik ve Vitrin (Katalog) Metadata Alanları
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    short_description: Mapped[str] = mapped_column(String(500), nullable=False)
    domains: Mapped[list[str]] = mapped_column(JSONB, nullable=False)
    difficulty: Mapped[str] = mapped_column(String(50), nullable=False, index=True)

    # 9 Temel Mimari Sütun (DevGenesis Çekirdeği)
    target_audience: Mapped[str] = mapped_column(Text, nullable=False)
    why_build: Mapped[str] = mapped_column(Text, nullable=False)
    environment: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False)
    tech_stack_and_ai: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False)
    prerequisites: Mapped[list[str]] = mapped_column(JSONB, nullable=False)
    anti_patterns: Mapped[list[str]] = mapped_column(JSONB, nullable=False)
    genesis_prompt: Mapped[str] = mapped_column(Text, nullable=False)
    definition_of_done: Mapped[list[str]] = mapped_column(JSONB, nullable=False)
    interview_questions: Mapped[list[dict[str, str]]] = mapped_column(JSONB, nullable=False)

    # Zaman Damgaları (Audit Timestamps)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )