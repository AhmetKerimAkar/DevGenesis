import Link from "next/link";
import { ArrowDown, ArrowUpRight, BookOpen, Check, Unplug } from "lucide-react";
import { fetchCatalogFilters, fetchProjects } from "@/lib/api";
import ProjectCatalog from "@/components/ProjectCatalog";
import RetryButton from "@/components/RetryButton";

interface HomePageProps {
  searchParams: { domain?: string; difficulty?: string; q?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const [projectsResult, filtersResult] = await Promise.allSettled([
    fetchProjects(searchParams.domain, searchParams.difficulty),
    fetchCatalogFilters(),
  ]);
  const filters = filtersResult.status === "fulfilled" ? filtersResult.value : null;

  return (
    <div className="shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> GELİŞTİRİCİLER İÇİN PROJE KÜTÜPHANESİ</p>
          <h1 id="hero-title">Bir fikirden<br /><span>iyi bir yazılıma.</span></h1>
          <p className="hero-description">Sadece ne yapacağını değil, neden ve nasıl yapacağını da bil. Bir proje seç, mimarisini keşfet ve kendi çözümünü geliştir.</p>
          <div className="hero-actions">
            <Link href="#katalog" className="button button-primary">Projeleri keşfet <ArrowDown size={17} aria-hidden="true" /></Link>
            <span className="hero-note">Her projede 9 bölümlük rehber</span>
          </div>
        </div>
        <div className="guide-preview" aria-label="Her proje rehberinin yaklaşımı">
          <div className="preview-top"><span className="preview-icon"><BookOpen size={19} aria-hidden="true" /></span><span>MİMARİDEN UYGULAMAYA</span><span className="preview-edition">01 / 03</span></div>
          <h2>Önce doğru sorular.<br />Sonra ilk satır kod.</h2>
          <div className="preview-steps">
            <div><span className="step-marker"><Check size={13} aria-hidden="true" /></span><span>Problemi ve sınırlarını anla</span><span className="step-label">BAĞLAM</span></div>
            <div><span className="step-marker"><Check size={13} aria-hidden="true" /></span><span>Teknoloji kararlarını ver</span><span className="step-label">MİMARİ</span></div>
            <div><span className="step-marker step-current">3</span><span>Çözümünü hayata geçir</span><ArrowUpRight size={16} aria-hidden="true" /></div>
          </div>
          <div className="preview-bottom"><span className="status-dot" /> Hazır cevaplardan daha fazlası.</div>
        </div>
      </section>

      <section id="katalog" className="catalog-section" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div><p className="eyebrow">KEŞFET &amp; GELİŞTİR</p><h2 id="catalog-title">Sıradaki projen burada<span className="brand-dot">.</span></h2></div>
          {filters && <span className="catalog-total">{filters.total_count.toString().padStart(2, "0")} <span>proje rehberi</span></span>}
        </div>
        {projectsResult.status === "fulfilled" ? (
          <ProjectCatalog key={`${searchParams.domain ?? ""}:${searchParams.difficulty ?? ""}:${searchParams.q ?? ""}`} projects={projectsResult.value} filters={filters} initialQuery={searchParams.q ?? ""} />
        ) : (
          <div role="alert" className="empty-state">
            <span className="empty-icon"><Unplug size={25} aria-hidden="true" /></span>
            <h3>Projeleri şu anda getiremedik.</h3>
            <p>Bağlantı yeniden kurulduğunda kaldığın yerden devam edebilirsin.</p>
            <RetryButton />
          </div>
        )}
      </section>

      <section id="yaklasim" className="approach" aria-labelledby="approach-title">
        <div className="approach-intro"><p className="eyebrow">NASIL ÇALIŞIR?</p><h2 id="approach-title">Kopyalaman için değil,<br />geliştirmen için.</h2><p>Her rehber, kendi kararlarını verebilmen için bir başlangıç noktası.</p></div>
        <div className="approach-steps">
          {[
            ["01", "Merak ettiğin bir alan seç", "Seviyene ve ilgi alanına uygun bir problemle başla."],
            ["02", "Mimarinin arkasını gör", "Araçları, tercihlerin nedenlerini ve kaçınman gereken tuzakları öğren."],
            ["03", "İnşa et, test et, anlat", "Bitiş kriterleriyle çözümünü doğrula. Mülakatta kararlarını savun."],
          ].map(([number, title, description]) => <div className="approach-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}
        </div>
      </section>
    </div>
  );
}
