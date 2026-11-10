"use client";

import { useState } from "react";
import { Check, Copy, Sparkles, Terminal } from "lucide-react";

interface GenesisPromptBoxProps {
  prompt: string;
  projectTitle: string;
}

export default function GenesisPromptBox({
  prompt,
  projectTitle,
}: GenesisPromptBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Panoya kopyalama başarısız oldu:", err);
    }
  };

  return (
    <section className="rounded-xl border border-slate-700/60 bg-[#0f1420]/90 shadow-lg shadow-indigo-950/20 overflow-hidden">
      {/* Üst Başlık ve Kopyalama Butonu */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#0f1420]/90 border-b border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Sütun 07 • Başlangıç Meta-Promptu
              </span>
              <h2 className="text-base font-bold text-slate-100">
                Genesis Prompt (İlk Promptun Ne Olmalı?)
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Bu promptu kopyalayıp AI asistanına (Copilot / Gemini / Claude) ilk mesaj olarak vererek mimariyi başlat.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label={`${projectTitle} Genesis Promptunu Kopyala`}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-medium transition-all border ${
            copied
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
              : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 shadow-sm"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Panoya Kopyalandı!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Promptu Kopyala</span>
            </>
          )}
        </button>
      </div>

      {/* Prompt İçerik Alanı */}
      <div className="p-6 bg-[#0f1420]/90">
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-3 pb-2 border-b border-slate-700/60">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>SYSTEM_DIRECTIVE // DOĞRUDAN AI ASİSTANINA YAPIŞTIRILACAK METİN</span>
        </div>
        <pre className="font-mono text-sm text-slate-200 whitespace-pre-wrap leading-relaxed selection:bg-indigo-500/40">
          {prompt}
        </pre>
      </div>
    </section>
  );
}