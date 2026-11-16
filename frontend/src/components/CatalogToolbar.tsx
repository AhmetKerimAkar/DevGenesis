"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Loader2, Search, X } from "lucide-react";

interface CatalogToolbarProps {
  domains: string[];
  difficulties: string[];
  query: string;
  onQueryChange: (value: string) => void;
  filtersError?: boolean;
}

export default function CatalogToolbar({ domains, difficulties, query, onQueryChange, filtersError }: CatalogToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const activeFilters = searchParams.has("domain") || searchParams.has("difficulty");

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    if (query.trim()) params.set("q", query.trim()); else params.delete("q");
    startTransition(() => router.push(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false }));
  };

  return (
    <div className="catalog-controls" aria-busy={isPending}>
      <div className="toolbar">
        <label className="search-field">
          <Search size={18} aria-hidden="true" /><span className="sr-only">Proje ara</span>
          <input type="search" placeholder="Bir proje, konu veya alan ara…" value={query} onChange={(event) => onQueryChange(event.target.value)} />
        </label>
        <div className="filter-fields">
          <label className="select-field"><span className="sr-only">Proje alanı</span>
            <select disabled={isPending || filtersError} value={searchParams.get("domain") ?? ""} onChange={(event) => updateFilter("domain", event.target.value)}>
              <option value="">Tüm alanlar</option>{domains.map((domain) => <option key={domain} value={domain}>{domain}</option>)}
            </select><ChevronDown size={15} aria-hidden="true" />
          </label>
          <label className="select-field"><span className="sr-only">Proje seviyesi</span>
            <select disabled={isPending || filtersError} value={searchParams.get("difficulty") ?? ""} onChange={(event) => updateFilter("difficulty", event.target.value)}>
              <option value="">Tüm seviyeler</option>{difficulties.map((difficulty) => <option key={difficulty} value={difficulty}>{difficulty}</option>)}
            </select><ChevronDown size={15} aria-hidden="true" />
          </label>
        </div>
      </div>
      {(activeFilters || isPending || filtersError) && <div className="filter-feedback">
        {isPending ? <span role="status"><Loader2 size={14} className="spin" aria-hidden="true" /> Projeler güncelleniyor…</span> : <span>{filtersError ? "Alan ve seviye filtreleri şu anda kullanılamıyor." : "Seçtiğin alan ve seviyeye göre gösteriliyor."}</span>}
        {activeFilters && <button type="button" disabled={isPending} onClick={() => { onQueryChange(""); startTransition(() => router.push("/", { scroll: false })); }}><X size={14} aria-hidden="true" /> Filtreleri temizle</button>}
      </div>}
    </div>
  );
}
