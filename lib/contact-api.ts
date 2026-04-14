/**
 * Example client for POST /api/contact from the browser.
 *
 * ```ts
 * const res = await submitContact({ email: "a@b.com", name: "Ada", message: "Hi" })
 * ```
 */
export type ContactPayload = {
  email: string
  name?: string
  message?: string
}

export type ContactResponse = {
  ok: boolean
  message?: string
  error?: string
}

export async function submitContact(
  payload: ContactPayload
): Promise<ContactResponse> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const data = (await res.json()) as ContactResponse
  if (!res.ok) {
    throw new Error(data.error ?? `Request failed (${res.status})`)
  }
  return data
}
