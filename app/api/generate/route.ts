import type { BrandGeneratePayload, GenerateWebsiteInput } from "@/lib/generate-website-types"
import { mockGenerateFromBrandInput, mockGenerateWebsite } from "@/lib/mock-website-generator"

const themes = {
  Professional: {
    primaryColor: "#1d4ed8",
    backgroundColor: "#f8fafc",
    accentColor: "#2563eb",
  },
  "Friendly & Warm": {
    primaryColor: "#f97316",
    backgroundColor: "#fff7ed",
    accentColor: "#fb923c",
  },
  "Premium & Luxury": {
    primaryColor: "#eab308",
    backgroundColor: "#0a0a0a",
    accentColor: "#facc15",
  },
  "Modern & Minimal": {
    primaryColor: "#111827",
    backgroundColor: "#ffffff",
    accentColor: "#6b7280",
  },
  "Playful & Fun": {
    primaryColor: "#ec4899",
    backgroundColor: "#fdf2f8",
    accentColor: "#f472b6",
  },
  Trustworthy: {
    primaryColor: "#06b6d4",
    backgroundColor: "#ecfeff",
    accentColor: "#22d3ee",
  },
} as const

const personalityLabels: Record<string, keyof typeof themes> = {
  professional: "Professional",
  friendly: "Friendly & Warm",
  premium: "Premium & Luxury",
  modern: "Modern & Minimal",
  playful: "Playful & Fun",
  trustworthy: "Trustworthy",
}

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
  try {
    let body: unknown
    try {
      const req = request
      body = await req.json()
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Expected JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!isRecord(body)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON object" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (isBrandGenerateBody(body)) {
      const input = parseBrandPayload(body)
      const generated = mockGenerateFromBrandInput(input)
      const selected = input.personality?.[0] || "Professional"
      const selectedLabel =
        themes[selected as keyof typeof themes] !== undefined
          ? (selected as keyof typeof themes)
          : (personalityLabels[selected.toLowerCase()] ?? "Professional")
      const theme = {
        ...themes[selectedLabel],
        fontStyle:
          selectedLabel === "Premium & Luxury"
            ? "serif"
            : selectedLabel === "Modern & Minimal"
            ? "modern"
            : "sans",
      }

      return new Response(
        JSON.stringify({
          ok: true,
          title: generated.title,
          tagline: generated.tagline,
          theme,
          sections: generated.sections,
        }),
        {
        status: 200,
        headers: { "Content-Type": "application/json" },
        }
      )
    }

    const name = pickString(body, "name").trim()
    if (!name) {
      return new Response(
        JSON.stringify({
          ok: false,
          error:
            'Send either Brand Input fields { "services", "location", "personality", "goal" } or legacy { "name", ... }.',
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
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
    return new Response(JSON.stringify({ ok: true, ...generated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while generating website data"
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
