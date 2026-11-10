import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Terminal, Layers } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "DevGenesis | Mimari Proje Başlatma ve Karar Motoru",
  description:
    "Analiz felcini kıran, 9 sütunlu üretim seviyesi yazılım mimarisi ve meta-prompt karar platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#131824] text-slate-100 antialiased min-h-screen flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200`}
      >
        {/* Masaüstü Üst Navigasyon Barı */}
        <header className="sticky top-0 z-40 border-b border-slate-700/70 bg-[#131824]/85 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 group-hover:border-indigo-400 transition-colors">
                <Terminal className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-slate-100 text-lg leading-none">
                  DevGenesis
                </span>
                <span className="text-[11px] font-mono text-slate-400 mt-1">
                  ARCHITECTURE &amp; DECISION ENGINE
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="hidden md:flex items-center gap-2 font-mono text-xs bg-slate-800/55 border border-slate-700/70 px-3 py-1.5 rounded-md text-slate-300">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>9-Sütunlu Mimari Standart</span>
              </div>
            </div>
          </div>
        </header>

        {/* Ana İçerik Alanı */}
        <main className="flex-1 bg-[#131824]">{children}</main>

        {/* Alt Bilgi (Footer) */}
        <footer className="border-t border-slate-700/70 bg-[#131824] py-6 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-300 font-mono">
            <span>DevGenesis — Hazır kod değil, mimari sınırlar ve doğru başlangıç.</span>
            <span>FastAPI + Next.js 14 Production Stack</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
