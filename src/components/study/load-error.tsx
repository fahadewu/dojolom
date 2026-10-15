"use client";

import { WarningCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

/**
 * Shown when a content chunk fails to load. The bundler caches the failed
 * chunk promise, so re-running the import rejects again without a network
 * request; only a page reload fetches it afresh. Progress is already saved.
 */
export function LoadError({ what = "The lesson" }: { what?: string }) {
  return (
    <div className="surface rounded-[28px] p-8 flex flex-col gap-4 items-start" role="alert" data-testid="load-error">
      <WarningCircle size={28} weight="duotone" className="text-ember" />
      <h1 className="text-2xl font-semibold">{what} did not load</h1>
      <p className="lede">Check your connection and reload the page. Your progress so far is saved.</p>
      <Button onClick={() => location.reload()}>Reload</Button>
    </div>
  );
}
