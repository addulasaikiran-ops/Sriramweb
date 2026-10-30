"use client";

import { useEffect, useState } from "react";
import type { FormEvent, InputHTMLAttributes } from "react";
import { ArrowUpRight } from "lucide-react";
import { fleet } from "@/data/fleet";
import { buildWhatsAppUrl } from "./whatsapp";

type Props = { selectedVehicle: string };
type Values = {
  name: string;
  phone: string;
  pickup: string;
  destination: string;
  date: string;
  tripType: string;
  vehicle: string;
  passengers: string;
  notes: string;
};

const emptyValues: Values = {
  name: "",
  phone: "",
  pickup: "",
  destination: "",
  date: "",
  tripType: "outstation",
  vehicle: "",
  passengers: "",
  notes: "",
};

export function EnquiryForm({ selectedVehicle }: Props) {
  const [values, setValues] = useState<Values>({ ...emptyValues, vehicle: selectedVehicle });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [website, setWebsite] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!selectedVehicle) return;
    setValues((current) => ({ ...current, vehicle: selectedVehicle }));
  }, [selectedVehicle]);

  const update = (key: keyof Values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setStatusMessage("");
  };

  const field = (
    key: keyof Values,
    label: string,
    props: InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <div className="form-field">
      <label htmlFor={key}>{label}</label>
      <input
        id={key}
        name={key}
        value={values[key]}
        onChange={(event) => update(key, event.target.value)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        {...props}
      />
      {errors[key] && <span id={`${key}-error`} className="field-error">{errors[key]}</span>}
    </div>
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<Record<keyof Values, string>> = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!/^[+0-9 ()-]{8,18}$/.test(values.phone.trim())) next.phone = "Enter a valid phone number.";
    if (!values.pickup.trim()) next.pickup = "Enter your pickup point.";
    if (!values.destination.trim()) next.destination = "Enter your destination.";
    if (!values.date) next.date = "Choose your travel date.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    window.dispatchEvent(new Event("sriram:lead-submit"));
    // Open a blank tab synchronously to avoid popup blockers while the lead is saved.
    const whatsappWindow = window.open("about:blank", "_blank");
    setStatusMessage("Saving your enquiry…");

    const payload = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      pickup: values.pickup.trim(),
      destination: values.destination.trim(),
      date: values.date,
      tripType: values.tripType,
      vehicle: values.vehicle || "Not specified",
      passengers: values.passengers || "Not specified",
      notes: values.notes.trim(),
      website,
    };

    let saved = false;
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      saved = response.ok;
    } catch {
      saved = false;
    }

    const message = [
      "Hello Sriram Travels, I'd like to make a travel enquiry.",
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `Pickup: ${payload.pickup}`,
      `Destination: ${payload.destination}`,
      `Travel date: ${payload.date}`,
      `Trip type: ${payload.tripType}`,
      `Vehicle: ${payload.vehicle}`,
      `Passengers: ${payload.passengers}`,
      `Additional details: ${payload.notes || "Not specified"}`,
    ].join("\n");
    const whatsappUrl = buildWhatsAppUrl(message);

    if (whatsappWindow) {
      whatsappWindow.location.href = whatsappUrl;
    } else {
      window.location.assign(whatsappUrl);
    }
    setStatusMessage(saved
      ? "Enquiry saved. Review the WhatsApp message and press Send to contact us."
      : "WhatsApp is opening. The website could not save this enquiry; please press Send in WhatsApp and contact us if needed.");
  };

  return (
    <section className="enquiry-section" id="enquiry" aria-labelledby="enquiry-title">
      <div className="section-heading">
        <div>
          <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> PLAN YOUR JOURNEY</div>
          <h2 id="enquiry-title">Tell us what you <em>need.</em></h2>
        </div>
        <p>Enter the five key trip details. We’ll attempt to save your enquiry, then open WhatsApp with a ready-to-review message.</p>
      </div>

      <form className="enquiry-form" onSubmit={submit} noValidate>
        {field("name", "Your name", { autoComplete: "name", placeholder: "Enter your name", required: true })}
        {field("phone", "Phone number", { type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "+91", required: true })}
        {field("pickup", "Pickup point", { autoComplete: "street-address", placeholder: "Town, area or landmark", required: true })}
        {field("destination", "Destination", { placeholder: "Where are you going?", required: true })}
        {field("date", "Travel date", { type: "date", required: true, min: new Date().toISOString().slice(0, 10) })}

        <div className="form-field">
          <label htmlFor="tripType">Trip type (optional)</label>
          <select id="tripType" name="tripType" value={values.tripType} onChange={(event) => update("tripType", event.target.value)}>
            <option value="local">Local travel</option>
            <option value="outstation">Outstation travel</option>
            <option value="group">Family / group travel</option>
            <option value="towing">Towing / vehicle recovery</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="vehicle">Preferred vehicle (optional)</label>
          <select id="vehicle" name="vehicle" value={values.vehicle} onChange={(event) => update("vehicle", event.target.value)}>
            <option value="">Please recommend</option>
            {fleet.map((vehicle) => <option key={vehicle.number} value={vehicle.name}>{vehicle.name}</option>)}
          </select>
        </div>
        {field("passengers", "Passengers (optional)", { type: "number", inputMode: "numeric", min: "1", step: "1", placeholder: "Number of people" })}
        <div className="form-field form-field-wide">
          <label htmlFor="notes">Additional details (optional)</label>
          <textarea id="notes" name="notes" rows={3} value={values.notes} onChange={(event) => update("notes", event.target.value)} placeholder="Luggage, stops or other preferences" />
        </div>

        <div className="lead-honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
        </div>
        <p className="form-note form-field-wide">Your enquiry is sent to our configured lead endpoint. WhatsApp opens separately; review the message and press Send to contact us.</p>
        {statusMessage && <p className="form-status form-field-wide" role="status" aria-live="polite">{statusMessage}</p>}
        <button className="button button-gold form-submit form-field-wide" type="submit">
          Save enquiry &amp; continue to WhatsApp <ArrowUpRight size={17} />
        </button>
      </form>
    </section>
  );
}
