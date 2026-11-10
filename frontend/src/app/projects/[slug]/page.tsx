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
  params: { slug: string };
  searchParams: { domain?: string; difficulty?: string };
}

const sections = [
  ["hedef-kitle", "Kime hitap ediyor?"],
  ["ortam", "Geliştirme ortamı"],
  ["teknoloji-yigini", "Teknoloji yığını"],
  ["onkosullar", "Önkoşullar"],
  ["neden-yapmalisin", "Neden yapmalısın?"],
  ["kacinilacak-tuzaklar", "Kaçınılacak tuzaklar"],
  ["genesis-prompt", "Başlangıç promptu"],
  ["bitis-kriterleri", "Bitiş kriterleri"],
  ["mulakat-sorulari", "Mülakat soruları"],
];

function TableOfContents({ mobile = false }: { mobile?: boolean }) {
  const links = (
    <nav aria-label="Rehber bölümleri" className="space-y-2">
      {sections.map(([id, label]) => (
        <Link key={id} href={`#${id}`} className="block text-sm text-slate-300 hover:text-indigo-400">
          {label}
        </Link>
      ))}
    </nav>
  );

  if (mobile) {
    return (
      <details className="lg:hidden mb-6 rounded-xl border border-slate-700/70 bg-slate-800/55 p-4">
        <summary className="cursor-pointer font-semibold text-slate-100">Bu rehberde</summary>
        <div className="mt-4">{links}</div>
      </details>
    );
  }

  return (
    <div className="hidden lg:block rounded-xl border border-slate-700/70 bg-slate-800/55 p-5">
      <h2 className="mb-4 text-sm font-bold text-slate-100">Bu rehberde</h2>
      {links}
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
  searchParams,
}: ProjectDetailPageProps) {
  const project = await fetchProjectBySlug(params.slug);
  if (!project) notFound();

  const query = new URLSearchParams();
  if (searchParams.domain) query.set("domain", searchParams.domain);
  if (searchParams.difficulty) query.set("difficulty", searchParams.difficulty);
  const catalogHref = query.toString() ? `/?${query.toString()}` : "/";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link href={catalogHref} className="inline-flex items-center gap-2 rounded-md border border-slate-700/70 bg-slate-800/55 px-3 py-1.5 text-xs text-slate-300 hover:text-indigo-400">
          <ArrowLeft className="h-3.5 w-3.5" /> Kataloğa dön
        </Link>
      </div>

      <header className="mb-8 border-b border-slate-700/70 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">{project.title}</h1>
        <p className="mt-3 max-w-4xl text-base leading-relaxed text-slate-300">{project.short_description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
          <span>Alan: {project.domains.join(", ")}</span>
          <span>Seviye: {project.difficulty}</span>
        </div>
        <Link href="#genesis-prompt" className="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
          Başlangıç promptuna git
        </Link>
      </header>

      <TableOfContents mobile />

      <div className="grid grid-cols-1 lg:grid-cols-[35fr_65fr] gap-8 items-start">
        <aside className="lg:sticky lg:top-20 space-y-5">
          <TableOfContents />

          <section id="hedef-kitle" className="scroll-mt-24 rounded-xl border border-slate-700/70 bg-slate-800/55 p-5">
            <div className="mb-2.5 flex items-center gap-2"><Users className="h-4 w-4 text-slate-400" /><h2 className="text-sm font-bold">Kime Hitap Ediyor?</h2></div>
            <p className="text-xs leading-relaxed text-slate-300">{project.target_audience}</p>
          </section>

          <section id="ortam" className="scroll-mt-24 rounded-xl border border-slate-700/70 bg-slate-800/55 p-5">
            <div className="mb-3 flex items-center gap-2"><Laptop className="h-4 w-4 text-slate-400" /><h2 className="text-sm font-bold">Nerede Yapmalısın? (Ortam)</h2></div>
            <dl className="space-y-2.5 text-xs">
              <div className="rounded-lg border border-slate-700/60 bg-[#0f1420]/90 p-2.5"><dt className="text-slate-400">İşletim Sistemi (OS)</dt><dd className="mt-0.5 text-slate-200">{project.environment.os}</dd></div>
              <div className="rounded-lg border border-slate-700/60 bg-[#0f1420]/90 p-2.5"><dt className="text-slate-400">IDE &amp; Araçlar</dt><dd className="mt-0.5 text-slate-200">{project.environment.ide}</dd></div>
              <div className="rounded-lg border border-slate-700/60 bg-[#0f1420]/90 p-2.5"><dt className="text-slate-400">Konteyner &amp; Altyapı</dt><dd className="mt-0.5 text-slate-200">{project.environment.docker}</dd></div>
            </dl>
          </section>

          <section id="teknoloji-yigini" className="scroll-mt-24 rounded-xl border border-slate-700/70 bg-slate-800/55 p-5">
            <div className="mb-3 flex items-center gap-2"><Cpu className="h-4 w-4 text-slate-400" /><h2 className="text-sm font-bold">Neleri Kullanmalısın? (Stack &amp; AI İş Bölümü)</h2></div>
            <div className="mb-4 flex flex-wrap gap-1.5">{project.tech_stack_and_ai.core_stack.map((tech) => <span key={tech} className="rounded bg-[#0f1420]/90 px-2.5 py-1 text-[11px] text-slate-200">{tech}</span>)}</div>
            <div className="rounded-lg border border-slate-700/60 bg-[#0f1420]/90 p-3.5">
              <div className="mb-1.5 flex items-center gap-1.5 text-[11px] text-slate-300"><Bot className="h-3.5 w-3.5" /> İnsan ve AI iş bölümü</div>
              <p className="text-xs leading-relaxed text-slate-300">{project.tech_stack_and_ai.ai_division_of_labor}</p>
            </div>
          </section>

          <section id="onkosullar" className="scroll-mt-24 rounded-xl border border-slate-700/70 bg-slate-800/55 p-5">
            <div className="mb-3 flex items-center gap-2"><ListChecks className="h-4 w-4 text-slate-400" /><h2 className="text-sm font-bold">Neyi Bilerek Başlamalısın?</h2></div>
            <ul className="space-y-2 text-xs leading-relaxed text-slate-300">{project.prerequisites.map((prereq, index) => <li key={index}>• {prereq}</li>)}</ul>
          </section>
        </aside>

        <div className="min-w-0 space-y-8">
          <section id="neden-yapmalisin" className="scroll-mt-24 rounded-xl border border-slate-700/70 bg-slate-800/55 p-6">
            <div className="mb-3 flex items-center gap-2.5"><Award className="h-5 w-5 text-slate-400" /><h2 className="text-lg font-bold">Neden Yapmalısın? (CV &amp; Mülakat Katkısı)</h2></div>
            <p className="text-sm leading-relaxed text-slate-300">{project.why_build}</p>
          </section>

          <section id="kacinilacak-tuzaklar" className="scroll-mt-24 rounded-xl border border-amber-500/30 bg-amber-950/10 p-6">
            <div className="mb-4 flex items-center gap-2.5"><ShieldAlert className="h-5 w-5 text-amber-400" /><h2 className="text-lg font-bold">Nereye Saplanmamalısın? (Kaçınılacak Tuzaklar)</h2></div>
            <ul className="space-y-3">{project.anti_patterns.map((pattern, index) => <li key={index} className="rounded-lg border border-amber-500/20 bg-slate-800/55 p-3.5 text-sm leading-relaxed text-slate-300">{pattern}</li>)}</ul>
          </section>

          <GenesisPromptBox prompt={project.genesis_prompt} projectTitle={project.title} />

          <section id="bitis-kriterleri" className="scroll-mt-24 rounded-xl border border-slate-700/70 bg-slate-800/55 p-6">
            <div className="mb-4 flex items-center gap-2.5"><CheckCircle2 className="h-5 w-5 text-slate-400" /><h2 className="text-lg font-bold">Projenin Bittiğini Nasıl Anlarsın?</h2></div>
            <div className="space-y-3">{project.definition_of_done.map((criterion, index) => <div key={index} className="flex items-start gap-3.5 rounded-lg border border-slate-700/60 bg-[#0f1420]/90 p-4 text-sm text-slate-200"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs">{index + 1}</span><span>{criterion}</span></div>)}</div>
          </section>

          <section id="mulakat-sorulari" className="scroll-mt-24 rounded-xl border border-slate-700/70 bg-slate-800/55 p-6">
            <div className="mb-5 flex items-center gap-2.5"><HelpCircle className="h-5 w-5 text-slate-400" /><h2 className="text-lg font-bold">Mülakatta Ne Sorulur?</h2></div>
            <div className="space-y-5">{project.interview_questions.map((iq, index) => (
              <div key={index} className="rounded-lg border border-slate-700/70 bg-[#0f1420]/90 p-5">
                <h3 className="text-sm font-semibold leading-snug text-slate-100">{index + 1}. {iq.question}</h3>
                <details className="group mt-3">
                  <summary className="cursor-pointer text-xs font-medium text-indigo-400 hover:text-indigo-300 select-none">Teknik savunmayı göster</summary>
                  <p className="mt-3 border-l-2 border-slate-600 pl-3 text-sm leading-relaxed text-slate-300">{iq.technical_defense}</p>
                </details>
              </div>
            ))}</div>
          </section>
        </div>
      </div>
    </div>
  );
}
