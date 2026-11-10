import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-24 text-center">
      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-5">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h1 className="text-2xl font-bold text-slate-100">
        Mimari Spesifikasyon Bulunamadı (404)
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Aradığınız proje kodu (slug) DevGenesis veritabanında mevcut değil veya kaldırılmış.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Vitrin Kataloğuna Dön</span>
      </Link>
    </div>
  );
}