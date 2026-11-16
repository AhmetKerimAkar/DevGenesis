import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowDown, ArrowUpRight, ChevronDown, Unplug } from "lucide-react";
import { fetchProjectBySlug } from "@/lib/api";
import GenesisPromptBox from "@/components/GenesisPromptBox";
import RetryButton from "@/components/RetryButton";

interface ProjectDetailPageProps {
  params: { slug: string };
  searchParams: { domain?: string; difficulty?: string; q?: string };
}

const sections = [
  ["hedef-kitle", "Kime uygun?"],
  ["neden-yapmalisin", "Ne kazandırır?"],
  ["ortam", "Geliştirme ortamı"],
  ["teknoloji-yigini", "Teknoloji & iş bölümü"],
  ["onkosullar", "Başlamadan önce"],
  ["kacinilacak-tuzaklar", "Kaçınılacak tuzaklar"],
  ["genesis-prompt", "Başlangıç promptu"],
  ["bitis-kriterleri", "Bitiş kriterleri"],
  ["mulakat-sorulari", "Mülakat hazırlığı"],
];

function SectionLinks() {
  return <nav className="toc-links" aria-label="Rehber bölümleri">{sections.map(([id, label], index) => <a key={id} href={`#${id}`}><span>{(index + 1).toString().padStart(2, "0")}</span>{label}</a>)}</nav>;
}

function GuideSection({ id, number, title, children, tone = "" }: { id: string; number: string; title: string; children: ReactNode; tone?: string }) {
  return <section id={id} className={`guide-section ${tone}`}><div className="guide-section-heading"><span className="section-number">{number}</span><h2>{title}</h2></div><div className="guide-section-body">{children}</div></section>;
}

export default async function ProjectDetailPage({ params, searchParams }: ProjectDetailPageProps) {
  const query = new URLSearchParams();
  if (searchParams.domain) query.set("domain", searchParams.domain);
  if (searchParams.difficulty) query.set("difficulty", searchParams.difficulty);
  if (searchParams.q) query.set("q", searchParams.q);
  const catalogHref = `/${query.size ? `?${query}` : ""}#katalog`;
  let project;
  try {
    project = await fetchProjectBySlug(params.slug);
  } catch {
    return <div className="shell state-page"><div role="alert" className="empty-state"><span className="empty-icon"><Unplug size={26} aria-hidden="true" /></span><h1>Rehbere şu anda ulaşamıyoruz.</h1><p>Tekrar deneyebilir veya diğer projelere göz atabilirsin.</p><div className="state-actions"><RetryButton /><Link href={catalogHref} className="button button-secondary">Kataloğa dön <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></div>;
  }
  if (!project) notFound();

  return (
    <div className="shell detail-page">
      <Link href={catalogHref} className="back-link"><ArrowLeft size={16} aria-hidden="true" /> Proje kütüphanesi</Link>
      <header className="detail-header">
        <div className="detail-title-block"><div className="domain-tags">{project.domains.map((domain) => <span key={domain}>{domain}</span>)}</div><h1>{project.title}</h1><p>{project.short_description}</p></div>
        <div className="detail-header-meta"><span className="difficulty"><span />{project.difficulty}</span><span className="detail-section-count">9 bölüm · Mimari rehber</span><Link href="#genesis-prompt" className="button button-primary">Başlangıç promptu <ArrowDown size={16} aria-hidden="true" /></Link></div>
      </header>
      <details className="mobile-toc"><summary>Bu rehberde <ChevronDown size={17} aria-hidden="true" /></summary><SectionLinks /></details>
      <div className="guide-layout">
        <aside className="guide-sidebar"><p className="eyebrow">BU REHBERDE</p><SectionLinks /><div className="sidebar-note"><span className="status-dot" /><p>Her kararın bir nedeni var.<br />Koddan önce onu keşfet.</p></div></aside>
        <article className="guide-content" aria-label={`${project.title} proje rehberi`}>
          <GuideSection id="hedef-kitle" number="01" title="Bu proje kime uygun?"><p>{project.target_audience}</p></GuideSection>
          <GuideSection id="neden-yapmalisin" number="02" title="Bu projeden ne kazanırsın?"><p>{project.why_build}</p></GuideSection>
          <GuideSection id="ortam" number="03" title="Çalışma ortamını hazırla">
            <dl className="environment-list">{[["İşletim sistemi", project.environment.os], ["Editör & araçlar", project.environment.ide], ["Konteyner & altyapı", project.environment.docker]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </GuideSection>
          <GuideSection id="teknoloji-yigini" number="04" title="Teknoloji ve iş bölümü">
            <div className="tech-tags">{project.tech_stack_and_ai.core_stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
            <div className="editorial-note"><h3>Sen ve yapay zekâ</h3><p>{project.tech_stack_and_ai.ai_division_of_labor}</p></div>
          </GuideSection>
          <GuideSection id="onkosullar" number="05" title="Başlamadan önce">
            <ul className="clean-list">{project.prerequisites.map((prerequisite, index) => <li key={index}>{prerequisite}</li>)}</ul>
          </GuideSection>
          <GuideSection id="kacinilacak-tuzaklar" number="06" title="Bu tuzaklara dikkat et" tone="caution-section">
            <ul className="clean-list">{project.anti_patterns.map((pattern, index) => <li key={index}>{pattern}</li>)}</ul>
          </GuideSection>
          <GenesisPromptBox prompt={project.genesis_prompt} projectTitle={project.title} />
          <GuideSection id="bitis-kriterleri" number="08" title="Ne zaman tamamlanmış sayılır?">
            <ol className="criteria-list">{project.definition_of_done.map((criterion, index) => <li key={index}><span>{(index + 1).toString().padStart(2, "0")}</span><p>{criterion}</p></li>)}</ol>
          </GuideSection>
          <GuideSection id="mulakat-sorulari" number="09" title="Yaptığın işi anlatabilmek">
            <p className="section-intro">Önce kendi cevabını düşün. Ardından teknik açıklamayla karşılaştır.</p>
            <div className="interview-list">{project.interview_questions.map((item, index) => <details key={index}><summary><span className="question-number">{index + 1}.</span><span>{item.question}</span><ChevronDown size={17} aria-hidden="true" /></summary><div className="interview-answer"><span className="eyebrow">TEKNİK AÇIKLAMA</span><p>{item.technical_defense}</p></div></details>)}</div>
          </GuideSection>
          <div className="guide-end"><span>Bir sonraki adım sana ait.</span><Link href={catalogHref} className="text-link">Diğer projeleri keşfet <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        </article>
      </div>
    </div>
  );
}
