"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CatalogToolbarProps {
  domains: string[];
  difficulties: string[];
}

export default function CatalogToolbar({
  domains,
  difficulties,
}: CatalogToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-700/70 bg-slate-800/40 p-4 sm:flex-row sm:items-end">
      <label className="flex flex-1 flex-col gap-2 text-sm text-slate-200">
        <span>Alan</span>
        <select
          value={searchParams.get("domain") ?? ""}
          onChange={(event) => updateFilter("domain", event.target.value)}
          className="rounded-lg border border-slate-600 bg-[#0f1420] px-3 py-2 text-sm text-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <option value="">Tüm alanlar</option>
          {domains.map((domain) => <option key={domain} value={domain}>{domain}</option>)}
        </select>
      </label>
      <label className="flex flex-1 flex-col gap-2 text-sm text-slate-200">
        <span>Seviye</span>
        <select
          value={searchParams.get("difficulty") ?? ""}
          onChange={(event) => updateFilter("difficulty", event.target.value)}
          className="rounded-lg border border-slate-600 bg-[#0f1420] px-3 py-2 text-sm text-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <option value="">Tüm seviyeler</option>
          {difficulties.map((difficulty) => <option key={difficulty} value={difficulty}>{difficulty}</option>)}
        </select>
      </label>
    </div>
  );
}
