import type {
  BrandGeneratePayload,
  GeneratedWebsite,
  GenerateWebsiteInput,
} from "@/lib/generate-website-types"

export type GenerateApiPayload = GenerateWebsiteInput | BrandGeneratePayload

function isBrandPayload(p: GenerateApiPayload): p is BrandGeneratePayload {
  return (
    "services" in p &&
    "location" in p &&
    "personality" in p &&
    "goal" in p &&
    Array.isArray((p as BrandGeneratePayload).personality)
  )
}

async function parseGenerateResponse(res: Response): Promise<GeneratedWebsite> {
  const data = (await res.json()) as GeneratedWebsite & { ok?: boolean; error?: string }

  if (!res.ok || data.ok === false) {
    throw new Error(typeof data.error === "string" ? data.error : `Generate failed (${res.status})`)
  }

  const { title, tagline, sections } = data
  if (!title || !tagline || !Array.isArray(sections)) {
    throw new Error("Invalid response shape from /api/generate")
  }

  return { title, tagline, sections }
}

/** Brand Input page or any client sending the four brand fields. */
export async function requestBrandWebsiteGeneration(
  payload: BrandGeneratePayload
): Promise<GeneratedWebsite> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseGenerateResponse(res)
}

/** Site Generator “quick” form (name + industry + …). */
export async function requestGeneratedWebsite(
  payload: GenerateWebsiteInput
): Promise<GeneratedWebsite> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseGenerateResponse(res)
}

/** Union helper when payload shape varies by screen. */
export async function postGeneratedWebsite(payload: GenerateApiPayload): Promise<GeneratedWebsite> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      isBrandPayload(payload)
        ? {
            services: payload.services,
            location: payload.location,
            personality: payload.personality,
            goal: payload.goal,
          }
        : payload
    ),
  })
  return parseGenerateResponse(res)
}
