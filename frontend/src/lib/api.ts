import { CatalogFilters, ProjectCard, ProjectDetail } from "@/types/project";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

/**
 * Ana sayfa vitrini için hafifletilmiş proje listesini getirir.
 */
export async function fetchProjects(
  domain?: string,
  difficulty?: string
): Promise<ProjectCard[]> {
  const params = new URLSearchParams();
  if (domain) params.append("domain", domain);
  if (difficulty) params.append("difficulty", difficulty);

  const queryString = params.toString() ? `?${params.toString()}` : "";
  const response = await fetch(`${API_BASE_URL}/projects${queryString}`, {
    cache: "no-store", // Geliştirme aşamasında veritabanı güncellemelerini anında yansıtır
  });

  if (!response.ok) {
    throw new Error(`Projeler yüklenemedi (HTTP ${response.status})`);
  }

  return response.json();
}

export async function fetchCatalogFilters(): Promise<CatalogFilters> {
  const response = await fetch(`${API_BASE_URL}/catalog/filters`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Katalog filtreleri yüklenemedi (HTTP ${response.status})`);
  }

  return response.json();
}

/**
 * Slug değerine göre projenin 9 sütunlu tüm mimari detaylarını getirir.
 * Proje bulunamazsa (404) null döner.
 */
export async function fetchProjectBySlug(
  slug: string
): Promise<ProjectDetail | null> {
  const response = await fetch(`${API_BASE_URL}/projects/${slug}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Proje detayı yüklenemedi (HTTP ${response.status})`);
  }

  return response.json();
}