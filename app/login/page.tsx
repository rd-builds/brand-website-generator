"use client"

import Link from "next/link"
import { Sparkles, ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none dark:hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px]"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none hidden dark:block" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px]"
           style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37, 99, 235, 0.15) 0%, transparent 60%)' }} />
      </div>

      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-4 z-10">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md space-y-8 glass-card rounded-2xl p-8 sm:p-10 border border-border/50">
          <div className="flex flex-col items-center justify-center text-center">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </Link>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-smooth"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-primary hover:text-primary/80 transition-smooth">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-smooth"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-bold text-background bg-foreground hover:bg-foreground/90 transition-smooth shadow-lg shadow-black/5 dark:shadow-white/5 disabled:opacity-50"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:text-primary/80 transition-smooth">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
