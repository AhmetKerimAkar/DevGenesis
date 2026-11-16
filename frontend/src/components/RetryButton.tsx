"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function RetryButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return <button type="button" disabled={isPending} onClick={() => startTransition(() => router.refresh())} className="button button-primary"><RefreshCw size={16} className={isPending ? "spin" : ""} aria-hidden="true" />{isPending ? "Yeniden yükleniyor…" : "Tekrar dene"}</button>;
}
