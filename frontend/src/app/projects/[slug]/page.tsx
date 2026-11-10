import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Award,
  Bot,
  CheckCircle2,
  Cpu,
  HelpCircle,
  Laptop,
  ListChecks,
  ShieldAlert,
  Users,
} from "lucide-react";
import { fetchProjectBySlug } from "@/lib/api";
import GenesisPromptBox from "@/components/GenesisPromptBox";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const project = await fetchProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      {/* Üst Geri Dönüş Navigasyonu */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-indigo-400 transition-colors bg-slate-800/55 border border-slate-700/70 px-3 py-1.5 rounded-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Mimari Kataloğa Dön</span>
        </Link>
      </div>

      {/* Proje Üst Başlık ve Tek Satır Künye */}
      <header className="pb-8 mb-10 border-b border-slate-700/70">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          {project.title}
        </h1>

        <div className="mt-3 font-mono text-xs text-indigo-300 bg-indigo-950/40 border border-indigo-500/30 inline-block px-3.5 py-1.5 rounded-md">
          [Alanlar: {project.domains.join(", ")}] &nbsp;•&nbsp; [Seviye:{" "}
          {project.difficulty}]
        </div>

        <p className="mt-4 text-base text-slate-300 max-w-4xl leading-relaxed">
          {project.short_description}
        </p>
      </header>

      {/* Masaüstü 2 Kolonlu Mimari Düzen: Sol %35 | Sağ %65 (Sticky) */}
      <div className="grid grid-cols-[35fr_65fr] gap-8 items-start">
        {/* SOL KOLON (%35 - STICKY): Kitle, Ortam, Stack & AI, Önkoşullar */}
        <aside className="sticky top-20 space-y-5">
          {/* Sütun 01: Kime Hitap Ediyor? */}
          <div className="rounded-xl border border-slate-700/70 bg-slate-800/55 p-5">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100">
                  Kime Hitap Ediyor?
                </h3>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                Sütun 01
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.target_audience}
            </p>
          </div>

          {/* Sütun 03: Geliştirme Ortamı (OS, IDE, Docker) */}
          <div className="rounded-xl border border-slate-700/70 bg-slate-800/55 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100">
                  Nerede Yapmalısın? (Ortam)
                </h3>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                Sütun 03
              </span>
            </div>

            <dl className="space-y-2.5 text-xs">
              <div className="bg-[#0f1420]/90 border border-slate-700/60 rounded-lg p-2.5">
                <dt className="font-mono text-[10px] text-slate-400 uppercase">
                  İşletim Sistemi (OS)
                </dt>
                <dd className="text-slate-200 mt-0.5">
                  {project.environment.os}
                </dd>
              </div>
              <div className="bg-[#0f1420]/90 border border-slate-700/60 rounded-lg p-2.5">
                <dt className="font-mono text-[10px] text-slate-400 uppercase">
                  IDE &amp; Araçlar
                </dt>
                <dd className="text-slate-200 mt-0.5">
                  {project.environment.ide}
                </dd>
              </div>
              <div className="bg-[#0f1420]/90 border border-slate-700/60 rounded-lg p-2.5">
                <dt className="font-mono text-[10px] text-slate-400 uppercase">
                  Konteyner &amp; Altyapı
                </dt>
                <dd className="text-slate-200 mt-0.5">
                  {project.environment.docker}
                </dd>
              </div>
            </dl>
          </div>

          {/* Sütun 04: Teknoloji Yığını ve AI İş Bölümü */}
          <div className="rounded-xl border border-slate-700/70 bg-slate-800/55 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100">
                  Neleri Kullanmalısın? (Stack &amp; AI İş Bölümü)
                </h3>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                Sütun 04
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech_stack_and_ai.core_stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#0f1420]/90 border border-slate-700/60 text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="rounded-lg bg-indigo-950/30 border border-indigo-500/20 p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-300 mb-1.5">
                <Bot className="w-3.5 h-3.5" />
                <span>İNSAN vs AI İŞ BÖLÜMÜ</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.tech_stack_and_ai.ai_division_of_labor}
              </p>
            </div>
          </div>

          {/* Sütun 05: Önkoşullar (Prerequisites) */}
          <div className="rounded-xl border border-slate-700/70 bg-slate-800/55 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100">
                  Neyi Bilerek Başlamalısın?
                </h3>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                Sütun 05
              </span>
            </div>

            <ul className="space-y-2">
              {project.prerequisites.map((prereq, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                >
                  <span className="font-mono text-indigo-400 font-bold">•</span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* SAĞ KOLON (%65): Neden Yapmalısın, Anti-Patterns, Genesis Prompt, DoD, Mülakat */}
        <div className="space-y-8 min-w-0">
          {/* Sütun 02: Neden Yapmalısın? (CV & Mülakat Katkısı) */}
          <section className="rounded-xl border border-slate-700/70 bg-slate-800/55 p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <Award className="w-5 h-5 text-indigo-400 shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                Sütun 02
              </span>
              <h2 className="text-lg font-bold text-slate-100">
                Neden Yapmalısın? (CV &amp; Mülakat Katkısı)
              </h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.why_build}
            </p>
          </section>

          {/* Sütun 06: Nereye Saplanmamalısın? (Anti-Patterns) */}
          <section className="rounded-xl border border-amber-500/30 bg-amber-950/10 p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Sütun 06 • Mimari Tuzaklar
              </span>
              <h2 className="text-lg font-bold text-slate-100">
                Nereye Saplanmamalısın? (Anti-Patterns)
              </h2>
            </div>
            <ul className="space-y-3">
              {project.anti_patterns.map((pattern, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-slate-300 bg-slate-800/55 border border-amber-500/20 rounded-lg p-3.5"
                >
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded shrink-0 mt-0.5">
                    TUZAK #{index + 1}
                  </span>
                  <span className="leading-relaxed">{pattern}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Sütun 07: Genesis Prompt (Tek Tıkla Kopyalama) */}
          <GenesisPromptBox
            prompt={project.genesis_prompt}
            projectTitle={project.title}
          />

          {/* Sütun 08: Projenin Bittiğini Nasıl Anlarsın? (Definition of Done) */}
          <section className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Sütun 08 • 3 Somut Kabul Kriteri
              </span>
              <h2 className="text-lg font-bold text-slate-100">
                Projenin Bittiğini Nasıl Anlarsın?
              </h2>
            </div>
            <div className="space-y-3">
              {project.definition_of_done.map((criterion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3.5 text-sm text-slate-200 bg-[#0f1420]/90 border border-emerald-500/20 rounded-lg p-4"
                >
                  <span className="font-mono text-xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{criterion}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sütun 09: Mülakatta Ne Sorulur? (2 Soru ve Teknik Savunması) */}
          <section className="rounded-xl border border-slate-700/70 bg-slate-800/55 p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
              <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                Sütun 09 • Teknik Savunma
              </span>
              <h2 className="text-lg font-bold text-slate-100">
                Mülakatta Ne Sorulur?
              </h2>
            </div>

            <div className="space-y-5">
              {project.interview_questions.map((iq, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-700/70 bg-[#0f1420]/90 p-5"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="font-mono text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 rounded shrink-0">
                      SORU {index + 1}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-100 leading-snug">
                      {iq.question}
                    </h3>
                  </div>
                  <div className="pl-3 border-l-2 border-indigo-500/50 mt-3">
                    <span className="block font-mono text-[11px] text-indigo-400 uppercase tracking-wider mb-1">
                      Kıdemli Seviye Teknik Savunma:
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {iq.technical_defense}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}