import { NextRequest, NextResponse } from "next/server";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  pickup?: unknown;
  destination?: unknown;
  date?: unknown;
  tripType?: unknown;
  vehicle?: unknown;
  passengers?: unknown;
  notes?: unknown;
  website?: unknown;
};

const recentRequests = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function text(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const entry = recentRequests.get(ip);
  if (entry && entry.resetAt > now && entry.count >= MAX_REQUESTS) {
    return NextResponse.json({ error: "Too many enquiries. Please try again later." }, { status: 429 });
  }
  recentRequests.set(ip, entry && entry.resetAt > now
    ? { count: entry.count + 1, resetAt: entry.resetAt }
    : { count: 1, resetAt: now + WINDOW_MS });

  let payload: LeadPayload;
  try {
    payload = await request.json() as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: respond generically without forwarding likely bot submissions.
  if (text(payload.website, 200)) return NextResponse.json({ ok: true });

  const lead = {
    name: text(payload.name, 100),
    phone: text(payload.phone, 30),
    pickup: text(payload.pickup, 200),
    destination: text(payload.destination, 200),
    date: text(payload.date, 30),
    tripType: text(payload.tripType, 40),
    vehicle: text(payload.vehicle, 100),
    passengers: text(payload.passengers, 10),
    notes: text(payload.notes, 1000),
    submittedAt: new Date().toISOString(),
  };

  if (!lead.name || !/^[+0-9 ()-]{8,18}$/.test(lead.phone) || !lead.pickup || !lead.destination || !lead.date) {
    return NextResponse.json({ error: "Please provide valid name, phone, pickup, destination and date." }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Lead storage is not configured." }, { status: 503 });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEADS_WEBHOOK_SECRET ? { "x-lead-secret": process.env.LEADS_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify(lead),
      cache: "no-store",
    });
    if (!webhookResponse.ok) {
      return NextResponse.json({ error: "Could not save enquiry." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Could not reach lead storage." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
