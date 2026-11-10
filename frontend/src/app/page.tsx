import Link from "next/link";
import { ArrowUpRight, Compass, ShieldAlert, Cpu } from "lucide-react";
import { fetchProjects } from "@/lib/api";

const blueprintItems = [
  {
    label: "[Sütun 01-05] Sistem Künyesi & AI İş Bölümü",
    text: "Mimari kararlar İnsan | Boilerplate & Test AI",
  },
  {
    label: "[Sütun 06] Anti-Pattern Kalkanı",
    text: "Kodlamaya başlamadan darboğaz ve tuzak analizi",
  },
  {
    label: "[Sütun 07] Genesis Meta-Prompt",
    text: "Tek tıkla kopyalanan yönlendirici sistem promptu",
  },
  {
    label: "[Sütun 08-09] Kabul Kriterleri & Mülakat",
    text: "3 Somut DoD Kriteri + 2 Kıdemli Mülakat Savunması",
  },
];

export default async function HomePage() {
  const projects = await fetchProjects();

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Üst Hero & Değer Önerisi Alanı */}
      <section className="grid grid-cols-12 gap-8 items-center mb-14">
        <div className="col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>ANALİZ FELCİNİ KIRAN KARAR MOTORU</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-100 leading-tight">
            Oyuncak Script&apos;leri Bırak.{" "}
            <span className="text-indigo-400">
              Üretim Seviyesi Sistemler İnşa Et.
            </span>
          </h1>

          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            DevGenesis sana kopyala-yapıştır hazır kod vermez. Sektör mühendislik
            bloglarındaki gerçek mimari problemleri; kaçınılacak tuzaklar
            (anti-patterns), kabul kriterleri, mülakat savunmaları ve AI
            asistanına vereceğin ilk yönlendirici{" "}
            <span className="text-slate-100 font-medium">Genesis Prompt</span> ile
            9 temel sütunda sunar.
          </p>

          {/* 3 Kısa Mimari İlkemiz */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-700/70">
            <div className="flex items-start gap-2.5 rounded-lg border border-slate-700/70 bg-slate-800/55 p-3">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-slate-100 block mb-0.5">
                  Anti-Pattern Kalkanı
                </strong>
                Projeye başlamadan önce nereye saplanmaman gerektiğini öğren.
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg border border-slate-700/70 bg-slate-800/55 p-3">
              <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-slate-100 block mb-0.5">
                  AI İş Bölümü &amp; Genesis Prompt
                </strong>
                Mimariyi sen kur, alt modülleri doğru meta-prompt ile AI&apos;ya
                yazdır.
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-lg border border-slate-700/70 bg-slate-800/55 p-3">
              <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-slate-100 block mb-0.5">
                  Mülakat Savunması
                </strong>
                Projen bittiğinde teknik mülakatta sorulacak sorulara hazır ol.
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5">
          <div className="rounded-xl border border-indigo-500/30 bg-slate-800/70 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-slate-700/70 bg-[#0f1420]/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400/90" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/90" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
              </div>
              <span className="font-mono text-[11px] text-slate-300 tracking-wide">
                DEVGENESIS_DECISION_MATRIX.spec
              </span>
            </div>

            <div className="space-y-3 bg-[#0f1420]/90 p-4">
              {blueprintItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-slate-700/60 bg-slate-800/55 p-3"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-indigo-300">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-200">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-slate-700/60 bg-slate-800/60 px-4 py-3 text-[11px] font-mono text-emerald-300">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              <span>STATUS: PRODUCTION-READY ARCHITECTURE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vitrin Başlığı */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-700/70">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">
            Mimari Proje Kataloğu
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            9 sütunlu teknik spesifikasyonu ve Genesis Prompt&apos;u incelemek
            için bir sistem seçin.
          </p>
        </div>
        <span className="font-mono text-xs text-slate-300 bg-slate-800/55 border border-slate-700/70 px-3 py-1 rounded">
          Toplam {projects.length} Üretim Mimarisi
        </span>
      </div>

      {/* Masaüstü 2 Kolonlu Proje Vitrin Grid'i */}
      <div className="grid grid-cols-2 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group relative flex flex-col justify-between rounded-xl border border-slate-700/70 bg-slate-800/55 p-7 hover:border-indigo-500/60 hover:bg-slate-800/70 transition-all duration-200"
          >
            <div>
              {/* Başlık ve Sağ Üst Yönlendirme İkonu */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors leading-snug">
                  {project.title}
                </h3>
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/70 flex items-center justify-center text-slate-300 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Tek Satır Etiket Künyesi: [Alanlar: ...] • [Seviye: ...] */}
              <div className="mt-2.5 font-mono text-xs text-indigo-300/90 bg-indigo-950/40 border border-indigo-500/20 inline-block px-3 py-1 rounded">
                [Alanlar: {project.domains.join(", ")}] &nbsp;•&nbsp; [Seviye:{" "}
                {project.difficulty}]
              </div>

              {/* Kısa Mimari Özet */}
              <p className="mt-4 text-sm text-slate-200 leading-relaxed">
                {project.short_description}
              </p>
            </div>

            {/* Kart Alt Bilgi Çubuğu */}
            <div className="mt-6 pt-4 border-t border-slate-700/70 flex items-center justify-between text-xs font-mono text-slate-300">
              <span>SLUG: /{project.slug}</span>
              <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                9 Sütunlu Mimariyi Aç →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
