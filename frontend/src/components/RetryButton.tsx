"use client";

import { RefreshCw } from "lucide-react";

export default function RetryButton() {
  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
    >
      <RefreshCw className="h-4 w-4" /> Tekrar dene
    </button>
  );
}
