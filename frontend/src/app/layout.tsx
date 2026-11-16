import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { ArrowUpRight, Command } from "lucide-react";
import "./globals.css";

const geist = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-sans", display: "swap" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "DevGenesis — Bir sonraki projen", template: "%s | DevGenesis" },
  description: "Bir proje seç. Mimarisini anla. Kendi çözümünü geliştir. Yazılım projeleri için adım adım mimari rehberler.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">İçeriğe geç</a>
        <header className="site-header">
          <div className="shell header-inner">
            <Link href="/" className="brand" aria-label="DevGenesis ana sayfa">
              <span className="brand-mark"><Command size={20} aria-hidden="true" /></span>
              <span>DevGenesis<span className="brand-dot">.</span></span>
            </Link>
            <nav className="main-nav" aria-label="Ana menü">
              <Link href="/#katalog">Projeler</Link>
              <Link href="/#yaklasim" className="nav-secondary">Nasıl çalışır?</Link>
              <Link href="/#katalog" className="nav-cta">Keşfet <ArrowUpRight size={15} aria-hidden="true" /></Link>
            </nav>
          </div>
        </header>
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <div><Link href="/" className="footer-brand">DevGenesis.</Link><p>İyi yazılım, doğru sorularla başlar.</p></div>
            <Link href="/#katalog" className="text-link">Bir sonraki projeni bul <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
