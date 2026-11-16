"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Copy } from "lucide-react";

export default function GenesisPromptBox({ prompt, projectTitle }: { prompt: string; projectTitle: string }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setCopyError(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <section id="genesis-prompt" className="prompt-section">
      <div className="prompt-heading"><div><span className="eyebrow">07 / FİKİRDEN İLK ADIMA</span><h2>Başlangıç promptun.</h2><p>AI asistanına projenin bağlamını vermek için bu metni kullan.</p></div><button onClick={handleCopy} type="button" className="button copy-button" aria-label={`${projectTitle} başlangıç promptunu kopyala`}>{copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}<span aria-live="polite">{copied ? "Kopyalandı" : "Kopyala"}</span></button></div>
      {copyError && <p role="status" className="copy-error">Kopyalanamadı. Aşağıdaki metni seçerek elle kopyalayabilirsin.</p>}
      <div className={`prompt-body ${expanded ? "is-expanded" : ""}`}><pre id="prompt-text" tabIndex={0} aria-label="Başlangıç promptu">{prompt}</pre></div>
      <button className="prompt-expand" type="button" aria-expanded={expanded} aria-controls="prompt-text" onClick={() => setExpanded(!expanded)}>{expanded ? "Metni daralt" : "Metnin tamamını göster"}<ChevronDown size={16} className={expanded ? "rotate" : ""} aria-hidden="true" /></button>
    </section>
  );
}
