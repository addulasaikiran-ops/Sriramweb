"use client";

import { useEffect } from "react";

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

export function Analytics() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_GA_ID;
    if (!id) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) { window.dataLayer?.push(args); };
    window.gtag("js", new Date());
    window.gtag("config", id);
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a");
      if (!link || !window.gtag) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) window.gtag("event", "call_click", { link_url: href });
      if (href.includes("wa.me") || href.includes("whatsapp.com")) window.gtag("event", "whatsapp_click", { link_url: href });
    };
    const onSubmit = (event: Event) => {
      if ((event.target as HTMLElement).matches("form.enquiry-form")) window.gtag?.("event", "form_submit", { form_name: "travel_enquiry" });
    };
    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("submit", onSubmit); script.remove(); };
  }, []);
  return null;
}
