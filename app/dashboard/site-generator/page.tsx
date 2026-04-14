import { DashboardLayout } from "@/components/dashboard-layout"
import { SiteGeneratorWorkspace } from "@/components/site-generator-workspace"

export default function SiteGeneratorPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI site generator</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your brand details and generate a structured preview (mock logic via{" "}
            <code className="text-xs text-primary">POST /api/generate</code>).
          </p>
        </div>
        <SiteGeneratorWorkspace />
      </div>
    </DashboardLayout>
  )
}
