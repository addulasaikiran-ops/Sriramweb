import { NextResponse } from "next/server";

const recentSubmissions = new Map<string, number>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  // Honeypot: bots often fill hidden fields; silently accept without forwarding.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const pickup = String(body.pickup ?? "").trim();
  const destination = String(body.destination ?? "").trim();
  const date = String(body.date ?? "").trim();
  if (!name || !/^[+0-9 ()-]{8,18}$/.test(phone) || !pickup || !destination) {
    return NextResponse.json({ error: "Please provide a name, valid phone, pickup and destination." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const previous = recentSubmissions.get(ip) ?? 0;
  if (now - previous < WINDOW_MS / MAX_PER_WINDOW) return NextResponse.json({ error: "Please wait before sending another enquiry." }, { status: 429 });
  recentSubmissions.set(ip, now);
  for (const [key, timestamp] of recentSubmissions) if (now - timestamp > WINDOW_MS) recentSubmissions.delete(key);

  const webhook = process.env.LEAD_WEBHOOK_URL;
  const webhookSecret = process.env.LEADS_WEBHOOK_SECRET;
  if (!webhook) return NextResponse.json({ ok: false, saved: false, error: "Lead destination is not configured. WhatsApp enquiry can still continue." }, { status: 503 });

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json", ...(webhookSecret ? { "x-lead-secret": webhookSecret } : {}) },
      body: JSON.stringify({ ...body, name, phone, pickup, destination, date, receivedAt: new Date().toISOString(), source: "Sriram Travels website" }),
      cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ error: "Lead destination could not save the enquiry." }, { status: 502 });
    return NextResponse.json({ ok: true, saved: true });
  } catch {
    return NextResponse.json({ error: "Lead destination could not be reached." }, { status: 502 });
  }
}
