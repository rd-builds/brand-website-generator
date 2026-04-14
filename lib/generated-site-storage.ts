/** sessionStorage payload after generate (client-only). */
export const GENERATED_SITE_STORAGE_KEY = "clear-generated-site-preview-v1"

export type StoredGeneratedSite = {
  title: string
  tagline: string
  sections: Array<{ type: string; content: string }>
  /** Optional: improves preview title + primary CTA. */
  businessName?: string
  goalId?: string
}
