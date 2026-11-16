import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function ProjectNotFound() {
  return <div className="shell state-page"><div className="empty-state"><span className="empty-icon"><FileQuestion size={26} aria-hidden="true" /></span><p className="eyebrow">404 / SAYFA BULUNAMADI</p><h1>Bu proje burada değil.</h1><p>Bağlantı değişmiş veya proje kaldırılmış olabilir. Kütüphaneden başka bir proje seçebilirsin.</p><Link href="/#katalog" className="button button-primary"><ArrowLeft size={16} aria-hidden="true" /> Projelere dön</Link></div></div>;
}
