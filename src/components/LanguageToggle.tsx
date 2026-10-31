"use client";

import { useEffect, useState } from "react";

const translations: Record<string, { en: string; te: string }> = {
  "hero-subtitle": { en: "Etios · Innova · Ertiga · Tempo Traveller", te: "ఎటియోస్ · ఇన్నోవా · ఎర్టిగా · టెంపో ట్రావెలర్" },
  "hero-description": { en: "Book a car with driver for local travel, outstation trips and family journeys from Gooty. Contact us directly to discuss your route and availability.", te: "గూటి నుంచి స్థానిక ప్రయాణాలు, దూరప్రాంత ప్రయాణాలు మరియు కుటుంబ యాత్రల కోసం డ్రైవర్‌తో కారును బుక్ చేసుకోండి. మీ మార్గం, అందుబాటు వివరాల కోసం మమ్మల్ని సంప్రదించండి." },
  "call-now": { en: "Call Now", te: "ఇప్పుడే కాల్ చేయండి" },
  "whatsapp-enquiry": { en: "WhatsApp Enquiry", te: "వాట్సాప్ ద్వారా అడగండి" },
  "faq-intro": { en: "Need something else? Ask us directly and we’ll help clarify the details.", te: "మరిన్ని వివరాలు కావాలా? మమ్మల్ని నేరుగా సంప్రదించండి." },
  "faq-book-q": { en: "How do I book a vehicle?", te: "వాహనాన్ని ఎలా బుక్ చేసుకోవాలి?" },
  "faq-book-a": { en: "Message us on WhatsApp or call. Share where you are going, your travel date and how many people are travelling. We’ll discuss availability and next steps with you.", te: "వాట్సాప్‌లో మెసేజ్ చేయండి లేదా కాల్ చేయండి. గమ్యస్థానం, ప్రయాణ తేదీ, ప్రయాణికుల సంఖ్య తెలియజేయండి. వాహనం అందుబాటు వివరాలు చెబుతాము." },
  "faq-routes-q": { en: "Which places do you travel to?", te: "మీరు ఏ ప్రాంతాలకు ప్రయాణ సేవలు అందిస్తారు?" },
  "faq-routes-a": { en: "Please message us with your pickup point and destination so we can confirm whether your requested route is available.", te: "మీ పికప్ ప్రదేశం, గమ్యస్థానాన్ని పంపండి. ఆ మార్గానికి సేవ అందుబాటులో ఉందో నిర్ధారిస్తాము." },
  "faq-fare-q": { en: "How is the fare decided?", te: "ప్రయాణ ఛార్జీ ఎలా నిర్ణయిస్తారు?" },
  "faq-fare-a": { en: "Fare can depend on the vehicle, route and trip details. Ask us for a confirmed quote before booking; any rates shown on this page are reference-only until confirmed by Sriram Travels.", te: "వాహనం, మార్గం, ప్రయాణ వివరాలపై ఛార్జీ ఆధారపడి ఉంటుంది. బుకింగ్‌కు ముందు ఖచ్చితమైన ధరను నిర్ధారించుకోండి." },
  "faq-vehicle-q": { en: "Can I confirm the vehicle before booking?", te: "బుకింగ్‌కు ముందు వాహనాన్ని నిర్ధారించుకోవచ్చా?" },
  "faq-vehicle-a": { en: "Yes—please ask us to confirm the vehicle, seating and availability for your dates before you finalise the trip.", te: "అవును. ప్రయాణాన్ని ఖరారు చేసే ముందు వాహనం, సీట్ల సంఖ్య, తేదీలకు అందుబాటును నిర్ధారించుకోండి." },
  "faq-cancel-q": { en: "What is the cancellation or change policy?", te: "రద్దు లేదా మార్పుల విధానం ఏమిటి?" },
  "faq-cancel-a": { en: "Please contact Sriram Travels as early as possible if you need to cancel or change your trip. Any advance-payment refund, cancellation charge, date-change fee or rescheduling depends on the booking terms agreed when you confirm. Ask for those terms in writing before paying; no fixed policy is published here yet.", te: "ప్రయాణాన్ని రద్దు చేయాలన్నా లేదా మార్చాలన్నా వీలైనంత త్వరగా సంప్రదించండి. రీఫండ్‌లు, రద్దు ఛార్జీలు, తేదీ మార్పులు బుకింగ్ సమయంలో అంగీకరించిన నిబంధనలపై ఆధారపడతాయి. చెల్లింపుకు ముందు నిబంధనలను రాతపూర్వకంగా తీసుకోండి." },

  "faq-q-0": { en: "How do I book a vehicle?", te: "వాహనాన్ని ఎలా బుక్ చేసుకోవాలి?" },
  "faq-a-0": { en: "Message us on WhatsApp or call. Share where you are going, your travel date and how many people are travelling. We’ll discuss availability and next steps with you.", te: "వాట్సాప్‌లో మెసేజ్ చేయండి లేదా కాల్ చేయండి. గమ్యస్థానం, ప్రయాణ తేదీ, ప్రయాణికుల సంఖ్య తెలియజేయండి. వాహనం అందుబాటు వివరాలు చెబుతాము." },
  "faq-q-1": { en: "Which places do you travel to?", te: "మీరు ఏ ప్రాంతాలకు ప్రయాణ సేవలు అందిస్తారు?" },
  "faq-a-1": { en: "Please message us with your pickup point and destination so we can confirm whether your requested route is available.", te: "మీ పికప్ ప్రదేశం, గమ్యస్థానాన్ని పంపండి. ఆ మార్గానికి సేవ అందుబాటులో ఉందో నిర్ధారిస్తాము." },
  "faq-q-2": { en: "How is the fare decided?", te: "ప్రయాణ ఛార్జీ ఎలా నిర్ణయిస్తారు?" },
  "faq-a-2": { en: "Fare can depend on the vehicle, route and trip details. Ask us for a confirmed quote before booking; any rates shown on this page are reference-only until confirmed by Sriram Travels.", te: "వాహనం, మార్గం, ప్రయాణ వివరాలపై ఛార్జీ ఆధారపడి ఉంటుంది. బుకింగ్‌కు ముందు ఖచ్చితమైన ధరను నిర్ధారించుకోండి." },
  "faq-q-3": { en: "Can I confirm the vehicle before booking?", te: "బుకింగ్‌కు ముందు వాహనాన్ని నిర్ధారించుకోవచ్చా?" },
  "faq-a-3": { en: "Yes—please ask us to confirm the vehicle, seating and availability for your dates before you finalise the trip.", te: "అవును. ప్రయాణాన్ని ఖరారు చేసే ముందు వాహనం, సీట్ల సంఖ్య, తేదీలకు అందుబాటును నిర్ధారించుకోండి." },
  "faq-q-4": { en: "What is the cancellation or change policy?", te: "రద్దు లేదా మార్పుల విధానం ఏమిటి?" },
  "faq-a-4": { en: "Please contact Sriram Travels as early as possible if you need to cancel or change your trip. Any advance-payment refund, cancellation charge, date-change fee or rescheduling depends on the booking terms agreed when you confirm. Ask for those terms in writing before paying; no fixed policy is published here yet.", te: "ప్రయాణాన్ని రద్దు చేయాలన్నా లేదా మార్చాలన్నా వీలైనంత త్వరగా సంప్రదించండి. రీఫండ్‌లు, రద్దు ఛార్జీలు, తేదీ మార్పులు బుకింగ్ సమయంలో అంగీకరించిన నిబంధనలపై ఆధారపడతాయి. చెల్లింపుకు ముందు నిబంధనలను రాతపూర్వకంగా తీసుకోండి." },
};

export function LanguageToggle() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("sriram-language");
    if (saved === "te") setLanguage("te");
  }, []);
  useEffect(() => {
    document.documentElement.lang = language === "te" ? "te" : "en";
    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (!key || !translations[key]) return;
      element.textContent = translations[key][language];
    });
    window.localStorage.setItem("sriram-language", language);
  }, [language]);
  return <div className="language-toggle" role="group" aria-label="Choose language">
    <button type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
    <button type="button" onClick={() => setLanguage("te")} aria-pressed={language === "te"}>తెలుగు</button>
  </div>;
}
