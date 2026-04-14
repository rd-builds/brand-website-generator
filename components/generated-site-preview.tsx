import type { GeneratedWebsite, WebsiteSectionType } from "@/lib/generate-website-types"
import { cn } from "@/lib/utils"

const sectionLabels: Record<WebsiteSectionType, string> = {
  hero: "Hero",
  about: "About",
  services: "Services",
  testimonials: "Testimonials",
}

function SectionBlock({
  type,
  content,
}: {
  type: WebsiteSectionType
  content: string
}) {
  return (
    <section className="rounded-xl border border-border bg-card/50 p-5 shadow-sm dark:bg-card/40">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {sectionLabels[type]}
      </p>
      <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
        {content}
      </div>
    </section>
  )
}

export function GeneratedSitePreview({
  site,
  className,
}: {
  site: GeneratedWebsite | null
  className?: string
}) {
  if (!site) {
    return (
      <div
        className={cn(
          "flex min-h-[320px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center text-sm text-muted-foreground",
          className
        )}
      >
        Generated content will appear here after you click Generate.
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      <header className="rounded-xl border border-border bg-gradient-to-br from-primary/10 via-transparent to-accent/5 p-6 dark:from-primary/15">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{site.title}</h2>
        <p className="mt-2 text-muted-foreground">{site.tagline}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {site.sections.map((section) => (
          <div
            key={section.type}
            className={section.type === "hero" ? "md:col-span-2" : undefined}
          >
            <SectionBlock type={section.type} content={section.content} />
          </div>
        ))}
      </div>
    </div>
  )
}
