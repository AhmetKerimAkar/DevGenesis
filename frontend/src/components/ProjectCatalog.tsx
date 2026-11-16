"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowUpRight, BookOpen, SearchX } from "lucide-react";
import CatalogToolbar from "@/components/CatalogToolbar";
import type { CatalogFilters, ProjectCard } from "@/types/project";

export default function ProjectCatalog({ projects, filters, initialQuery }: { projects: ProjectCard[]; filters: CatalogFilters | null; initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("default");
  const params = useSearchParams();
  const router = useRouter();
  const normalizedQuery = query.trim().toLocaleLowerCase("tr");
  const visibleProjects = projects.filter((project) => `${project.title} ${project.short_description} ${project.domains.join(" ")}`.toLocaleLowerCase("tr").includes(normalizedQuery));
  if (sort === "title") visibleProjects.sort((a, b) => a.title.localeCompare(b.title, "tr"));
  const detailParams = new URLSearchParams(params.toString());
  if (query.trim()) detailParams.set("q", query.trim()); else detailParams.delete("q");
  const suffix = detailParams.size ? `?${detailParams}` : "";

  return (
    <>
      <CatalogToolbar domains={filters?.domains ?? []} difficulties={filters?.difficulties ?? []} query={query} onQueryChange={setQuery} filtersError={!filters} />
      <div className="results-bar"><p role="status" aria-live="polite"><strong>{visibleProjects.length}</strong> proje{normalizedQuery ? " aramanla eşleşiyor" : " keşfedilmeyi bekliyor"}</p>
        <label className="sort-field"><span>Sıralama</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="default">Varsayılan</option><option value="title">İsme göre, A–Z</option></select></label>
      </div>
      {visibleProjects.length ? <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <Link key={project.id} href={`/projects/${project.slug}${suffix}`} className="project-card">
            <div className="card-top"><span className="project-number">{(index + 1).toString().padStart(2, "0")}</span><span className="difficulty"><span />{project.difficulty}</span></div>
            <div className="card-body"><div className="domain-tags">{project.domains.map((domain) => <span key={domain}>{domain}</span>)}</div><h3>{project.title}</h3><p>{project.short_description}</p></div>
            <div className="card-bottom"><span><BookOpen size={14} aria-hidden="true" /> Mimari rehber</span><span className="card-open">Projeyi incele <ArrowUpRight size={17} aria-hidden="true" /></span></div>
          </Link>
        ))}
      </div> : <div className="empty-state"><span className="empty-icon"><SearchX size={26} aria-hidden="true" /></span><h3>Henüz bir eşleşme yok.</h3><p>Daha kısa bir arama dene veya alan ve seviye filtrelerini kaldır.</p><button type="button" className="button button-primary" onClick={() => { setQuery(""); router.push("/", { scroll: false }); }}>Tüm projeleri göster <ArrowUpRight size={16} aria-hidden="true" /></button></div>}
    </>
  );
}
