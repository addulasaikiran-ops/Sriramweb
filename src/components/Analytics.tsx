"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest("a") : null;
      if (!element) return;
      const href = element.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        window.gtag?.("event", "call_click", { link_url: href });
      } else if (href.includes("wa.me/")) {
        window.gtag?.("event", "whatsapp_click", { link_url: "whatsapp" });
      }
    };
    const onLeadSubmit = () => {
      window.gtag?.("event", "form_submit", { form_id: "enquiry" });
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("sriram:lead-submit", onLeadSubmit);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("sriram:lead-submit", onLeadSubmit);
    };
  }, []);

  if (!measurementId || !/^G-[A-Z0-9]+$/i.test(measurementId)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; window.gtag = function(){window.dataLayer.push(arguments);}; window.gtag('js', new Date()); window.gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}
