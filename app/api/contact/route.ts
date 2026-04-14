import { NextResponse } from "next/server"

export type ContactBody = {
  name?: string
  email?: string
  message?: string
  [key: string]: unknown
}

export async function POST(request: Request) {
  let body: ContactBody

  try {
    body = (await request.json()) as ContactBody
  } catch {
    return NextResponse.json(
      { ok: false, error: "Expected JSON body" },
      { status: 400 }
    )
  }

  console.log("[api/contact] submission", {
    receivedAt: new Date().toISOString(),
    email: body.email,
    name: body.name,
    hasMessage: Boolean(body.message),
  })

  return NextResponse.json(
    {
      ok: true,
      message: "Thanks — we received your message.",
    },
    { status: 200 }
  )
}
