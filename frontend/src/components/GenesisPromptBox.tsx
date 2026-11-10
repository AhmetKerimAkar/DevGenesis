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
  const [copyError, setCopyError] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Panoya kopyalama başarısız oldu:", err);
      setCopyError(true);
    }
  };

  return (
    <section id="genesis-prompt" className="scroll-mt-24 rounded-xl border border-slate-700/60 bg-[#0f1420]/90 shadow-lg shadow-indigo-950/20 overflow-hidden">
      {/* Üst Başlık ve Kopyalama Butonu */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 bg-[#0f1420]/90 border-b border-slate-700/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Başlangıç Promptu (Genesis Prompt)
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Bu promptu kopyalayıp AI asistanına (Copilot / Gemini / Claude) ilk mesaj olarak vererek mimariyi başlat.
            </p>
          </div>
        </div>

        <div className="flex w-full sm:w-auto shrink-0 flex-col items-stretch sm:items-end gap-2">
          <button
            onClick={handleCopy}
            type="button"
            aria-label={`${projectTitle} Genesis Promptunu Kopyala`}
            className={`flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-medium transition-all border focus-visible:ring-2 focus-visible:ring-indigo-400 ${
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
          {copyError && (
            <p aria-live="polite" className="w-full text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 rounded-md px-3 py-2 mt-2">
              Kopyalanamadı, metni seçip kopyalayabilirsin
            </p>
          )}
        </div>
      </div>

      {/* Prompt İçerik Alanı */}
      <div className="p-6 bg-[#0f1420]/90">
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-3 pb-2 border-b border-slate-700/60">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>Başlangıç metni</span>
        </div>
        <pre className="font-mono text-sm text-slate-200 whitespace-pre-wrap break-words overflow-x-auto leading-relaxed selection:bg-indigo-500/40">
          {prompt}
        </pre>
      </div>
    </section>
  );
}