import { NextResponse } from "next/server"
import type { BrandGeneratePayload, GenerateWebsiteInput } from "@/lib/generate-website-types"
import { mockGenerateFromBrandInput, mockGenerateWebsite } from "@/lib/mock-website-generator"

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

function pickString(obj: Record<string, unknown>, key: string): string {
  const v = obj[key]
  return typeof v === "string" ? v : ""
}

function pickPersonality(obj: Record<string, unknown>): string[] {
  const v = obj.personality
  if (Array.isArray(v)) {
    return v.filter((x): x is string => typeof x === "string").map((s) => s.trim()).filter(Boolean)
  }
  if (typeof v === "string") {
    return v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

function isBrandGenerateBody(obj: Record<string, unknown>): obj is Record<string, unknown> & BrandGeneratePayload {
  const services = pickString(obj, "services").trim()
  const location = pickString(obj, "location").trim()
  const goal = pickString(obj, "goal").trim()
  const personality = pickPersonality(obj)
  return Boolean(services && location && goal && personality.length > 0)
}

function parseBrandPayload(obj: Record<string, unknown>): BrandGeneratePayload {
  return {
    services: pickString(obj, "services").trim(),
    location: pickString(obj, "location").trim(),
    personality: pickPersonality(obj),
    goal: pickString(obj, "goal").trim(),
  }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Expected JSON body" }, { status: 400 })
  }

  if (!isRecord(body)) {
    return NextResponse.json({ ok: false, error: "Invalid JSON object" }, { status: 400 })
  }

  if (isBrandGenerateBody(body)) {
    const input = parseBrandPayload(body)
    const generated = mockGenerateFromBrandInput(input)
    return NextResponse.json({ ok: true, ...generated })
  }

  const name = pickString(body, "name").trim()
  if (!name) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Send either Brand Input fields { "services", "location", "personality", "goal" } or legacy { "name", ... }.',
      },
      { status: 400 }
    )
  }

  const legacy: GenerateWebsiteInput = {
    name,
    industry: pickString(body, "industry"),
    style: pickString(body, "style"),
    tone: pickString(body, "tone"),
    description: pickString(body, "description"),
  }

  const generated = mockGenerateWebsite(legacy)
  return NextResponse.json({ ok: true, ...generated })
}
