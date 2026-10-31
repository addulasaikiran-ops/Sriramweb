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
  tripType: string;
  pickup: string;
  destination: string;
  date: string;
  vehicle: string;
  passengers: string;
  notes: string;
};

const emptyValues: Values = {
  name: "",
  phone: "",
  tripType: "local",
  pickup: "",
  destination: "",
  date: "",
  vehicle: "",
  passengers: "",
  notes: "",
};

const tripTypeLabels: Record<string, string> = {
  local: "Local travel",
  outstation: "Outstation travel",
  group: "Family / group travel",
  towing: "Towing / vehicle recovery",
};

export function EnquiryForm({ selectedVehicle }: Props) {
  const [values, setValues] = useState<Values>({ ...emptyValues, vehicle: selectedVehicle });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const isTowing = values.tripType === "towing";

  useEffect(() => {
    if (!selectedVehicle) return;
    setValues((current) => ({ ...current, vehicle: selectedVehicle }));
  }, [selectedVehicle]);

  const update = (key: keyof Values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = new FormData(form).get("website");
    if (typeof honeypot === "string" && honeypot.trim()) return;

    const next: Partial<Record<keyof Values, string>> = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!/^[+0-9 ()-]{8,18}$/.test(values.phone.trim())) next.phone = "Enter a valid phone number.";
    if (!values.pickup.trim()) next.pickup = isTowing ? "Enter your current location." : "Enter a pickup point.";

    if (!isTowing) {
      if (!values.destination.trim()) next.destination = "Enter a destination.";
      if (!values.passengers || Number(values.passengers) < 1) next.passengers = "Enter at least one passenger.";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const messageLines = [
      `Hello Sriram Travels, I'd like to make a ${isTowing ? "vehicle recovery" : "travel"} enquiry.`,
      `Name: ${values.name.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Request type: ${tripTypeLabels[values.tripType] ?? values.tripType}`,
      `${isTowing ? "Current location" : "Pickup point"}: ${values.pickup.trim()}`,
      ...(!isTowing
        ? [
            `Destination: ${values.destination.trim()}`,
            `Travel date: ${values.date || "Not specified"}`,
            `Passengers: ${values.passengers}`,
          ]
        : []),
      `Vehicle: ${values.vehicle || (isTowing ? "Not specified" : "Please recommend")}`,
      `Additional details: ${values.notes.trim() || "Not specified"}`,
    ];

    const whatsappUrl = buildWhatsAppUrl(messageLines.join("\n"));
    const whatsappWindow = window.open("about:blank", "_blank", "noopener,noreferrer");
    try {
      await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...values, website: honeypot || "" }) });
    } catch {
      // Keep the direct WhatsApp enquiry available if the lead endpoint is unavailable.
    }
    if (whatsappWindow) whatsappWindow.location.href = whatsappUrl;
    else window.location.href = whatsappUrl;
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

  return (
    <section className="enquiry-section" id="enquiry" aria-labelledby="enquiry-title">
      <div className="section-heading">
        <div>
          <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> PLAN YOUR JOURNEY</div>
          <h2 id="enquiry-title">Tell us what you <em>need.</em></h2>
        </div>
        <p>Share your trip details. We’ll open WhatsApp with a ready-to-review message so you can confirm the vehicle, fare and availability directly.</p>
      </div>

      <form className="enquiry-form" onSubmit={submit} noValidate>
        <div className="form-field honeypot-field" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
        {field("name", "Your name", { autoComplete: "name", placeholder: "Enter your name", required: true })}
        {field("phone", "Phone number", { type: "tel", inputMode: "tel", autoComplete: "tel", placeholder: "+91", required: true })}

        <div className="form-field">
          <label htmlFor="tripType">What do you need?</label>
          <select id="tripType" name="tripType" value={values.tripType} onChange={(event) => update("tripType", event.target.value)}>
            <option value="local">Local travel</option>
            <option value="outstation">Outstation travel</option>
            <option value="group">Family / group travel</option>
            <option value="towing">Towing / recovery</option>
          </select>
        </div>

        {field("pickup", isTowing ? "Current location" : "Pickup point", {
          autoComplete: "street-address",
          placeholder: isTowing ? "Town, area or nearest landmark" : "City, area or landmark",
          required: true,
        })}

        {!isTowing && field("destination", "Destination", {
          placeholder: "Where are you going?",
          required: true,
        })}

        {!isTowing && field("date", "Travel date", {
          type: "date",
          required: false,
        })}

        <div className="form-field">
          <label htmlFor="vehicle">{isTowing ? "Vehicle type (optional)" : "Preferred vehicle"}</label>
          <select id="vehicle" name="vehicle" value={values.vehicle} onChange={(event) => update("vehicle", event.target.value)}>
            <option value="">Please recommend</option>
            {fleet.map((vehicle) => (
              <option key={vehicle.number} value={vehicle.name}>
                {vehicle.name}{vehicle.number === "06" ? " — Large group" : vehicle.number === "04" ? " — Group travel" : ""}
              </option>
            ))}
          </select>
        </div>

        {!isTowing && field("passengers", "Passengers", {
          type: "number",
          inputMode: "numeric",
          min: "1",
          step: "1",
          placeholder: "Number of people",
          required: true,
        })}

        <div className="form-field form-field-wide">
          <label htmlFor="notes">{isTowing ? "What happened? (optional)" : "Special requests (optional)"}</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={values.notes}
            onChange={(event) => update("notes", event.target.value)}
            placeholder={isTowing ? "Describe the vehicle and the issue" : "Luggage, stops or any other preferences"}
          />
        </div>

        <p className="form-note form-field-wide">Your details are not stored by this website. WhatsApp opens with your message; review it and press Send to submit your enquiry.</p>
        <button className="button button-gold form-submit form-field-wide" type="submit">
          Continue to WhatsApp <ArrowUpRight size={17} />
        </button>
      </form>
    </section>
  );
}
