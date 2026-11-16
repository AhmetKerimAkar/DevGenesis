export default function Loading() {
  return <div className="shell loading-page" role="status" aria-label="Projeler yükleniyor"><span className="sr-only">Projeler yükleniyor…</span><div className="skeleton skeleton-eyebrow" /><div className="skeleton skeleton-title" /><div className="skeleton skeleton-description" /><div className="skeleton skeleton-toolbar" /><div className="project-grid">{[1, 2, 3].map((item) => <div key={item} className="skeleton skeleton-card" />)}</div></div>;
}
