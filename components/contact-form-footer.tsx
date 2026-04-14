"use client"

import * as React from "react"
import { submitContact } from "@/lib/contact-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactFormFooter() {
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setStatus("loading")
    try {
      await submitContact({
        email: email.trim(),
        name: name.trim() || undefined,
        message: message.trim() || undefined,
      })
      setStatus("success")
      setEmail("")
      setName("")
      setMessage("")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  return (
    <section className="mx-auto max-w-xl px-4 pb-14 sm:px-6 sm:pb-16">
      <div className="glass-card dark:border-slate-700/80 rounded-2xl p-4 sm:p-6 md:p-8">
        <h2 className="text-lg font-semibold text-foreground">Contact</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Sends a JSON POST to <code className="text-xs text-primary">/api/contact</code> (see{" "}
          <code className="text-xs text-primary">lib/contact-api.ts</code>).
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name (optional)</Label>
            <Input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message (optional)</Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              rows={3}
            />
          </div>
          <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
            {status === "loading" ? "Sending…" : "Send"}
          </Button>
          {status === "success" && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400">Message received.</p>
          )}
          {status === "error" && error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
