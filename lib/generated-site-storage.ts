/** localStorage payload after generate (client-only). */
export const GENERATED_SITE_STORAGE_KEY = "clear-generated-site-preview-v1"

export type StoredGeneratedSite = {
  title: string
  tagline: string
  theme: {
    primaryColor: string
    backgroundColor: string
    fontStyle: "sans" | "serif" | "modern"
  }
  sections: Array<Record<string, unknown>>
  /** Optional: improves preview title + primary CTA. */
  businessName?: string
  goalId?: string
}
