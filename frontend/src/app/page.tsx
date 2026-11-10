import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fetchCatalogFilters, fetchProjects } from "@/lib/api";
import CatalogToolbar from "@/components/CatalogToolbar";
import RetryButton from "@/components/RetryButton";

interface HomePageProps {
  searchParams: {
    domain?: string;
    difficulty?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const domain = searchParams.domain;
  const difficulty = searchParams.difficulty;
  const currentQueryString = new URLSearchParams(
    Object.entries({ domain, difficulty }).filter(([, value]) => value) as [string, string][]
  ).toString();

  const [projectsResult, filtersResult] = await Promise.allSettled([
    fetchProjects(domain, difficulty),
    fetchCatalogFilters(),
  ]);

  if (projectsResult.status === "rejected") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">Yazılım projelerini keşfet</h1>
          <p className="mt-2 text-slate-300">Alanına ve seviyene uygun bir proje seç, mimari rehberle geliştirmeye başla.</p>
        </header>
        <div role="alert" className="rounded-xl border border-rose-500/40 bg-rose-950/20 p-6">
          <h2 className="font-semibold text-rose-200">Projeler yüklenemedi</h2>
          <p className="mt-2 text-sm text-rose-100/80">Bağlantıyı kontrol edip isteği yeniden deneyebilirsin.</p>
          <RetryButton />
        </div>
      </div>
    );
  }

  const projects = projectsResult.value;
  const catalogFilters =
    filtersResult.status === "fulfilled" ? filtersResult.value : null;

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">
            Yazılım projelerini keşfet
          </h1>
          <p className="mt-2 text-slate-300">
            Alanına ve seviyene uygun bir proje seç, mimari rehberle geliştirmeye başla.
          </p>
        </header>

        <CatalogToolbar
          domains={catalogFilters?.domains ?? []}
          difficulties={catalogFilters?.difficulties ?? []}
          filtersError={!catalogFilters}
        />

        <div className="mt-8 flex items-center justify-between border-b border-slate-700/70 pb-3">
          <h2 className="text-xl font-semibold text-slate-100">Proje kataloğu</h2>
          <span className="text-xs text-slate-300">
            {catalogFilters
              ? `Filtreyle eşleşen ${projects.length} / ${catalogFilters.total_count} proje`
              : `Eşleşen: ${projects.length} proje`}
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="mt-8 rounded-xl border border-slate-700/70 bg-slate-800/50 p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-100">Bu filtrelerle eşleşen proje yok</h2>
            <p className="mt-2 text-sm text-slate-300">
              Alan: {domain ?? "Tümü"} · Seviye: {difficulty ?? "Tümü"}
            </p>
            <Link href="/" className="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
              Filtreleri temizle
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}${currentQueryString ? `?${currentQueryString}` : ""}`}
                className="group flex min-h-52 flex-col justify-between rounded-xl border border-slate-700/70 bg-slate-800/55 p-6 transition-all hover:border-indigo-500/60 hover:bg-slate-800/70 focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <div>
                  <h2 className="text-xl font-bold leading-snug text-slate-100 group-hover:text-indigo-400">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">{project.short_description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                    <span>Seviye: {project.difficulty}</span>
                    <span>Alan: {project.domains.join(", ")}</span>
                  </div>
                </div>
                <span className="mt-6 self-end text-sm font-medium text-indigo-400">
                  Rehberi aç <ArrowUpRight className="ml-1 inline h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
  );
}
