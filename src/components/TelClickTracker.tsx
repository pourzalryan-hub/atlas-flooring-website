"use client";

import { useEffect } from "react";
import { pushEvent } from "@/lib/gtm";

/**
 * Sitewide phone-click tracking. Listens for clicks on any tel: link
 * (header, footer, sticky bar, CTAs) and pushes a `phone_call_click`
 * event to the GTM dataLayer — map it to a Google Ads conversion.
 */
export default function TelClickTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!link) return;
      pushEvent("phone_call_click", {
        phone_number: link.href.replace("tel:", ""),
        link_text: link.textContent?.trim() ?? "",
        page_path: window.location.pathname,
        conversion_event: "phone_call",
      });
    };
    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
