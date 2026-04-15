"use client"

import * as React from "react"
import Link from "next/link"
import type { GeneratedWebsite, WebsiteTheme } from "@/lib/generate-website-types"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Menu, Sparkles, X, ImageIcon, CheckCircle2, Edit3 } from "lucide-react"
import { cn } from "@/lib/utils"

const FONT_CLASS: Record<string, string> = {
  sans: "font-sans",
  serif: "font-serif",
  modern: "font-sans tracking-tight",
}

// ------------------------------------------------------------------
// UTILITY COMPONENTS
// ------------------------------------------------------------------

const EditableText = ({ 
  value, 
  onChange, 
  className,
  as: Component = "p",
  style
}: { 
  value: string, 
  onChange: (v: string) => void, 
  className?: string,
  as?: any,
  style?: React.CSSProperties
}) => {
  return (
    <Component
      contentEditable
      suppressContentEditableWarning
      className={cn("outline-none focus:ring-2 focus:ring-primary/50 rounded transition-colors hover:bg-black/5 dark:hover:bg-white/5", className)}
      style={style}
      onBlur={(e: React.FocusEvent<HTMLElement>) => onChange(e.currentTarget.textContent || "")}
    >
      {value}
    </Component>
  )
}

const EditableImage = ({
  src,
  onChange,
  className,
  alt
}: {
  src: string,
  onChange: (v: string) => void,
  className?: string,
  alt?: string
}) => {
  return (
    <div className={cn("relative group overflow-hidden cursor-pointer", className)} onClick={() => {
      const newUrl = window.prompt("Enter new image URL:", src)
      if (newUrl) onChange(newUrl)
    }}>
      <img src={src} alt={alt || "Image"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="bg-white text-black p-3 flex items-center gap-2 rounded-full shadow-lg font-medium text-sm">
          <ImageIcon className="w-4 h-4"/>
          Replace Image
        </div>
      </div>
    </div>
  )
}

const ThemeStyles = ({ theme }: { theme: WebsiteTheme }) => (
  <style dangerouslySetInnerHTML={{__html: `
    .preview-container {
      background-color: ${theme.light.bg};
      color: ${theme.light.text};
      --color-primary: ${theme.light.primary};
      --color-bg: ${theme.light.bg};
      --color-text: ${theme.light.text};
    }
    .dark .preview-container {
      background-color: ${theme.dark.bg};
      color: ${theme.dark.text};
      --color-primary: ${theme.dark.primary};
      --color-bg: ${theme.dark.bg};
      --color-text: ${theme.dark.text};
    }
    .preview-primary-bg {
      background-color: var(--color-primary);
      color: #fff !important;
    }
    .preview-primary-text {
      color: var(--color-primary);
    }
    .preview-card {
      background-color: color-mix(in srgb, var(--color-text) 5%, var(--color-bg));
      border: 1px solid color-mix(in srgb, var(--color-text) 10%, transparent);
    }
    .preview-border {
      border-color: color-mix(in srgb, var(--color-text) 15%, transparent);
    }
  `}} />
)

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
] as const

// ------------------------------------------------------------------
// LAYOUT FUNCTIONS
// ------------------------------------------------------------------

type LayoutProps = {
  data: any
  updateData: (key: string, value: any) => void
  theme: WebsiteTheme
}

// 1. PROFESSIONAL: Clean grid layout, Left-aligned sections, Medium spacing, Standard cards
function ProfessionalLayout({ data, updateData }: LayoutProps) {
  return (
    <main className="pt-20 pb-20 max-w-7xl mx-auto px-6 space-y-24">
      {/* Hero */}
      <section id="hero" className="scroll-mt-24 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-left">
          <EditableText as="h1" className="text-5xl md:text-6xl font-bold tracking-tight mb-6" value={data.heading} onChange={(v) => updateData("heading", v)} />
          <EditableText as="p" className="text-lg md:text-xl opacity-80 mb-8 max-w-2xl" value={data.subtext} onChange={(v) => updateData("subtext", v)} />
          <div className="flex gap-4">
            <button className="preview-primary-bg px-8 py-3 rounded-md font-medium hover:opacity-90 transition-opacity">Get Started</button>
            <button className="px-8 py-3 rounded-md font-medium preview-border border hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Learn More</button>
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <EditableImage src={data.images.hero} onChange={(v) => updateData("images.hero", v)} className="w-full aspect-video rounded-lg shadow-xl" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 py-16 flex flex-col md:flex-row-reverse items-center gap-12">
        <div className="flex-1 text-left">
          <h2 className="preview-primary-text font-semibold uppercase tracking-wider text-sm mb-3">About Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Who we are</h3>
          <EditableText as="p" className="text-lg opacity-80 leading-relaxed" value={data.aboutText} onChange={(v) => updateData("aboutText", v)} />
        </div>
        <div className="flex-1 w-full">
          <EditableImage src={data.images.about} onChange={(v) => updateData("images.about", v)} className="w-full aspect-square md:aspect-video rounded-lg shadow-lg object-cover" />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 py-16">
        <div className="text-left mb-12">
          <h2 className="preview-primary-text font-semibold uppercase tracking-wider text-sm mb-3">Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold">What we offer</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((svc: any, idx: number) => (
            <div key={idx} className="preview-card p-8 rounded-lg flex flex-col">
              <EditableImage src={data.images.services[idx] || `https://source.unsplash.com/featured/400x300?business,work,${idx}`} onChange={(v) => {
                const newImgs = [...data.images.services];
                newImgs[idx] = v;
                updateData("images.services", newImgs);
              }} className="w-full h-48 rounded-md mb-6" />
              <EditableText as="h4" className="text-xl font-bold mb-3" value={svc.title} onChange={(v) => {
                const newSvcs = [...data.services];
                newSvcs[idx].title = v;
                updateData("services", newSvcs);
              }} />
              <EditableText as="p" className="opacity-80 leading-relaxed" value={svc.description} onChange={(v) => {
                const newSvcs = [...data.services];
                newSvcs[idx].description = v;
                updateData("services", newSvcs);
              }} />
            </div>
          ))}
        </div>
      </section>
      
      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 py-16 text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Simple Grid Pricing */}
           {[
             { name: "Basic", price: "$29" },
             { name: "Professional", price: "$99" },
             { name: "Enterprise", price: "Custom" }
           ].map((plan, i) => (
             <div key={i} className={cn("preview-card p-8 rounded-lg border", i === 1 ? "border-2 preview-border" : "border-transparent")}>
                <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
                <div className="text-4xl font-bold mb-6 preview-primary-text">{plan.price}</div>
                <ul className="space-y-3 opacity-80 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 preview-primary-text"/> Essential features</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 preview-primary-text"/> Support via email</li>
                </ul>
                <button className={cn("w-full py-3 rounded-md font-medium transition-opacity", i===1 ? "preview-primary-bg" : "preview-border border")}>
                  Select Plan
                </button>
             </div>
           ))}
        </div>
      </section>
    </main>
  )
}

// 2. PREMIUM & LUXURY: Centered layout, Large spacing, Minimal sections, Stacked, Large typography
function PremiumLayout({ data, updateData }: LayoutProps) {
  return (
    <main className="pt-32 pb-32 max-w-5xl mx-auto px-6 space-y-40 text-center font-serif">
      {/* Hero */}
      <section id="hero" className="scroll-mt-32 py-24 flex flex-col items-center">
        <h2 className="preview-primary-text tracking-[0.2em] uppercase text-xs sm:text-sm mb-6">Welcome to</h2>
        <EditableText as="h1" className="text-6xl md:text-8xl font-medium tracking-tight mb-8" value={data.heading} onChange={(v) => updateData("heading", v)} />
        <EditableText as="p" className="text-xl md:text-2xl opacity-70 mb-12 max-w-3xl font-light" value={data.subtext} onChange={(v) => updateData("subtext", v)} />
        <EditableImage src={data.images.hero} onChange={(v) => updateData("images.hero", v)} className="w-full aspect-[21/9] rounded-sm shadow-2xl" />
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-32 py-24">
        <EditableText as="h3" className="text-4xl md:text-5xl mb-12 font-medium" value="Our Philosophy" onChange={()=>{}} />
        <EditableText as="p" className="text-2xl md:text-3xl leading-relaxed opacity-80 font-light mx-auto max-w-4xl" value={data.aboutText} onChange={(v) => updateData("aboutText", v)} />
        <div className="mt-20 mx-auto w-[1px] h-24 preview-primary-bg opacity-50"></div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-32 py-24">
        <h2 className="text-4xl md:text-5xl font-medium mb-20 tracking-wide">Signature Services</h2>
        <div className="flex flex-col gap-24">
          {data.services.map((svc: any, idx: number) => (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-12 md:gap-24 md:even:flex-row-reverse text-left">
              <div className="flex-1 w-full">
                 <EditableImage src={data.images.services[idx] || `https://source.unsplash.com/featured/600x800?luxury,${idx}`} onChange={(v) => {
                    const newImgs = [...data.images.services];
                    newImgs[idx] = v;
                    updateData("images.services", newImgs);
                  }} className="w-full aspect-[3/4] rounded-sm object-cover" />
              </div>
              <div className="flex-1">
                <p className="preview-primary-text tracking-widest text-sm uppercase mb-4">0{idx + 1}</p>
                <EditableText as="h4" className="text-3xl md:text-5xl font-medium mb-6" value={svc.title} onChange={(v) => {
                  const newSvcs = [...data.services];
                  newSvcs[idx].title = v;
                  updateData("services", newSvcs);
                }} />
                <EditableText as="p" className="text-xl opacity-70 leading-relaxed font-light" value={svc.description} onChange={(v) => {
                  const newSvcs = [...data.services];
                  newSvcs[idx].description = v;
                  updateData("services", newSvcs);
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Pricing - Stacked premium approach */}
      <section id="pricing" className="scroll-mt-32 py-24 border-t preview-border pt-32">
         <h2 className="text-4xl md:text-5xl font-medium mb-16 tracking-wide">Investment</h2>
         <div className="max-w-3xl mx-auto space-y-8">
           {[
             { name: "Signature Collection", price: "From $2,500" },
             { name: "Curated Experience", price: "From $5,000" },
           ].map((plan, i) => (
             <div key={i} className="flex flex-col md:flex-row justify-between items-center py-8 border-b preview-border pb-8">
               <h4 className="text-2xl font-medium">{plan.name}</h4>
               <div className="text-xl preview-primary-text font-serif italic mt-4 md:mt-0">{plan.price}</div>
             </div>
           ))}
         </div>
      </section>
    </main>
  )
}

// 3. PLAYFUL & FUN: Dynamic layout, bold colors, bigger text, scattered cards
function PlayfulLayout({ data, updateData }: LayoutProps) {
  return (
    <main className="pt-24 pb-24 max-w-7xl mx-auto px-6 overflow-hidden">
      {/* Hero */}
      <section id="hero" className="scroll-mt-24 py-12 flex flex-col items-center text-center relative z-10">
        <EditableText as="h1" className="text-6xl md:text-8xl font-black tracking-tight mb-8 transform -rotate-1" value={data.heading} onChange={(v) => updateData("heading", v)} />
        <EditableText as="p" className="text-2xl md:text-3xl font-medium opacity-80 mb-12 max-w-3xl transform rotate-1" value={data.subtext} onChange={(v) => updateData("subtext", v)} />
        <button className="preview-primary-bg px-10 py-5 rounded-3xl font-black text-xl hover:scale-110 active:scale-95 transition-transform shadow-[8px_8px_0_rgba(0,0,0,0.2)] dark:shadow-[8px_8px_0_rgba(255,255,255,0.2)]">Let's Go!</button>
        <div className="mt-20 w-full max-w-5xl mx-auto transform -rotate-2">
           <EditableImage src={data.images.hero} onChange={(v) => updateData("images.hero", v)} className="w-full rounded-3xl border-8 preview-border object-cover aspect-video" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 py-32 flex flex-col md:flex-row items-center gap-16 relative">
         <div className="flex-1 transform rotate-3">
           <div className="preview-card p-10 rounded-3xl shadow-[12px_12px_0_rgba(0,0,0,0.1)]">
             <h2 className="text-5xl font-black mb-8 preview-primary-text uppercase tracking-tighter">About Us!</h2>
             <EditableText as="p" className="text-xl md:text-2xl font-medium leading-loose" value={data.aboutText} onChange={(v) => updateData("aboutText", v)} />
           </div>
         </div>
         <div className="flex-1 w-full transform -rotate-3">
           <EditableImage src={data.images.about} onChange={(v) => updateData("images.about", v)} className="w-full aspect-square rounded-full border-8 preview-border object-cover" />
         </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 py-24 text-center">
        <h2 className="text-6xl font-black mb-20 preview-primary-text">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {data.services.map((svc: any, idx: number) => (
            <div key={idx} className={cn("preview-card p-8 rounded-3xl flex flex-col items-center text-center shadow-[8px_8px_0_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-4", idx%2===0 ? "rotate-2" : "-rotate-2")}>
              <EditableImage src={data.images.services[idx] || `https://source.unsplash.com/featured/400x400?fun,${idx}`} onChange={(v) => {
                const newImgs = [...data.images.services];
                newImgs[idx] = v;
                updateData("images.services", newImgs);
              }} className="w-32 h-32 rounded-full mb-8 object-cover border-4 preview-border mx-auto" />
              <EditableText as="h4" className="text-2xl font-black mb-4 uppercase" value={svc.title} onChange={(v) => {
                const newSvcs = [...data.services];
                newSvcs[idx].title = v;
                updateData("services", newSvcs);
              }} />
              <EditableText as="p" className="text-lg font-medium opacity-80" value={svc.description} onChange={(v) => {
                const newSvcs = [...data.services];
                newSvcs[idx].description = v;
                updateData("services", newSvcs);
              }} />
            </div>
          ))}
        </div>
      </section>
      
      {/* Pricing - quirky shapes */}
      <section id="pricing" className="scroll-mt-24 py-24 text-center">
         <h2 className="text-6xl font-black mb-16">Pricing</h2>
         <div className="flex flex-col md:flex-row justify-center gap-12 max-w-4xl mx-auto">
            <div className="preview-card flex-1 p-10 rounded-t-[100px] rounded-b-[40px] shadow-lg transform -rotate-2">
               <h3 className="text-2xl font-black uppercase tracking-wider mb-2">Cool</h3>
               <div className="text-5xl font-black preview-primary-text mb-8">$10</div>
               <button className="preview-primary-bg px-8 py-3 rounded-full font-black text-lg w-full">Pick Me!</button>
            </div>
            <div className="preview-card flex-1 p-10 rounded-b-[100px] rounded-t-[40px] shadow-lg transform rotate-2">
               <h3 className="text-2xl font-black uppercase tracking-wider mb-2">Awesome</h3>
               <div className="text-5xl font-black preview-primary-text mb-8">$30</div>
               <button className="preview-primary-bg px-8 py-3 rounded-full font-black text-lg w-full">Pick Me!</button>
            </div>
         </div>
      </section>
    </main>
  )
}

// 4. MODERN & MINIMAL: Clean, lots of whitespace, thin typography, fewer elements.
function MinimalLayout({ data, updateData }: LayoutProps) {
  return (
    <main className="pt-24 pb-24 max-w-6xl mx-auto px-8 space-y-40">
      {/* Hero */}
      <section id="hero" className="scroll-mt-24 py-20 flex flex-col justify-center items-start border-b preview-border pb-32">
        <EditableText as="h1" className="text-5xl md:text-7xl font-extralight tracking-tight mb-8 w-full max-w-4xl" value={data.heading} onChange={(v) => updateData("heading", v)} />
        <EditableText as="p" className="text-lg md:text-xl font-light opacity-60 max-w-2xl" value={data.subtext} onChange={(v) => updateData("subtext", v)} />
      </section>

      <section className="w-full">
         <EditableImage src={data.images.hero} onChange={(v) => updateData("images.hero", v)} className="w-full aspect-[21/9] object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700" />
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 py-12 flex flex-col md:flex-row gap-20">
        <div className="md:w-1/3">
           <h2 className="text-sm uppercase tracking-widest font-semibold preview-primary-text">Context</h2>
        </div>
        <div className="md:w-2/3">
           <EditableText as="p" className="text-2xl md:text-4xl font-light leading-snug" value={data.aboutText} onChange={(v) => updateData("aboutText", v)} />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 py-12 border-t preview-border pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-16">
          {data.services.map((svc: any, idx: number) => (
            <div key={idx} className="flex flex-col">
              <EditableText as="h4" className="text-2xl font-light mb-4" value={svc.title} onChange={(v) => {
                const newSvcs = [...data.services];
                newSvcs[idx].title = v;
                updateData("services", newSvcs);
              }} />
              <EditableText as="p" className="font-light opacity-60 leading-relaxed max-w-sm mb-8" value={svc.description} onChange={(v) => {
                const newSvcs = [...data.services];
                newSvcs[idx].description = v;
                updateData("services", newSvcs);
              }} />
              <div className="mt-auto">
                 <EditableImage src={data.images.services[idx] || `https://source.unsplash.com/featured/800x500?minimal,${idx}`} onChange={(v) => {
                  const newImgs = [...data.images.services];
                  newImgs[idx] = v;
                  updateData("images.services", newImgs);
                }} className="w-full aspect-[4/3] object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Pricing - Minimal List */}
      <section id="pricing" className="scroll-mt-24 py-24 border-t preview-border pt-32">
         <h2 className="text-2xl font-light mb-16">Pricing Structure</h2>
         <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-end border-b preview-border pb-4">
               <span className="text-lg font-light">Essential</span>
               <span className="text-xl">Free</span>
            </div>
            <div className="flex justify-between items-end border-b preview-border pb-4">
               <span className="text-lg font-light">Pro Edition</span>
               <span className="text-xl">$49 / m</span>
            </div>
            <div className="flex justify-between items-end border-b preview-border pb-4">
               <span className="text-lg font-light">Unlimited</span>
               <span className="text-xl">$199 / m</span>
            </div>
         </div>
      </section>
    </main>
  )
}

// 5. TRUSTWORTHY: Balanced grid, compact, clear alignment, corporate.
function TrustworthyLayout({ data, updateData }: LayoutProps) {
  return (
    <main className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero */}
      <section id="hero" className="scroll-mt-24 py-16 text-center max-w-4xl mx-auto">
        <EditableText as="h1" className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6" value={data.heading} onChange={(v) => updateData("heading", v)} />
        <EditableText as="p" className="text-xl text-slate-600 dark:text-slate-300 mb-10" value={data.subtext} onChange={(v) => updateData("subtext", v)} />
        <div className="flex justify-center gap-4 mb-16">
           <button className="preview-primary-bg px-6 py-3 rounded font-semibold text-white">Get Started</button>
           <button className="px-6 py-3 rounded font-semibold preview-primary-text bg-blue-50 dark:bg-slate-800">Contact Sales</button>
        </div>
        <EditableImage src={data.images.hero} onChange={(v) => updateData("images.hero", v)} className="w-full aspect-[16/7] object-cover rounded shadow-lg" />
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 py-16 bg-slate-50 dark:bg-slate-900 rounded-xl px-8 md:px-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 w-full order-2 md:order-1">
           <div className="grid grid-cols-2 gap-4">
              <EditableImage src={data.images.about} onChange={(v) => updateData("images.about", v)} className="w-full aspect-square object-cover rounded shadow-md" />
              <img src="https://source.unsplash.com/featured/?office,team" className="w-full aspect-square object-cover rounded shadow-md mt-8" alt="Team" />
           </div>
        </div>
        <div className="flex-1 order-1 md:order-2">
           <h2 className="text-3xl font-bold mb-6">Built on Trust</h2>
           <EditableText as="p" className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6" value={data.aboutText} onChange={(v) => updateData("aboutText", v)} />
           <ul className="space-y-3 font-medium">
             <li className="flex items-center gap-3"><CheckCircle2 className="preview-primary-text w-5 h-5"/> Verified Professionals</li>
             <li className="flex items-center gap-3"><CheckCircle2 className="preview-primary-text w-5 h-5"/> Secure Procedures</li>
             <li className="flex items-center gap-3"><CheckCircle2 className="preview-primary-text w-5 h-5"/> 24/7 Support</li>
           </ul>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Solutions</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">We provide end-to-end services designed to scale securely with your organization.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((svc: any, idx: number) => (
            <div key={idx} className="preview-card border preview-border rounded-lg p-6 shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded bg-blue-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                 <Sparkles className="preview-primary-text w-6 h-6"/>
              </div>
              <EditableText as="h4" className="text-xl font-bold mb-3" value={svc.title} onChange={(v) => {
                const newSvcs = [...data.services];
                newSvcs[idx].title = v;
                updateData("services", newSvcs);
              }} />
              <EditableText as="p" className="text-slate-600 dark:text-slate-300 leading-relaxed" value={svc.description} onChange={(v) => {
                const newSvcs = [...data.services];
                newSvcs[idx].description = v;
                updateData("services", newSvcs);
              }} />
            </div>
          ))}
        </div>
      </section>
      
      {/* Pricing - Corporate Tiers */}
      <section id="pricing" className="scroll-mt-24 py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="preview-card border preview-border rounded-lg p-10 text-center">
               <h3 className="text-2xl font-bold mb-4">Standard</h3>
               <div className="text-4xl font-bold mb-8">$49<span className="text-lg text-slate-500 font-normal">/mo</span></div>
               <button className="preview-border border px-8 py-3 rounded font-semibold w-full">Choose Standard</button>
            </div>
            <div className="preview-card border-2 preview-border rounded-lg p-10 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 preview-primary-bg text-white text-xs font-bold px-4 py-1 rounded-bl-lg">RECOMMENDED</div>
               <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
               <div className="text-4xl font-bold mb-8">$199<span className="text-lg text-slate-500 font-normal">/mo</span></div>
               <button className="preview-primary-bg px-8 py-3 rounded font-semibold text-white w-full">Contact Sales</button>
            </div>
         </div>
      </section>
    </main>
  )
}

// ------------------------------------------------------------------
// MAIN PREVIEW COMPONENT
// ------------------------------------------------------------------

export function PreviewGeneratedSite({
  site,
  goalId,
  businessName,
}: {
  site: GeneratedWebsite
  goalId?: string
  businessName?: string
}) {
  const displayTitle = (businessName?.trim() || site.title).trim()
  const heroNode = site.sections.find((s) => s.type === "hero")
  const aboutNode = site.sections.find((s) => s.type === "about")
  const servicesNode = site.sections.find((s) => s.type === "services")

  const [siteData, setSiteData] = React.useState({
    heading: heroNode?.type === "hero" ? heroNode.heading : displayTitle,
    subtext: heroNode?.type === "hero" ? heroNode.subtext : site.tagline,
    aboutText: aboutNode?.type === "about" ? aboutNode.content : "We deliver exceptional results for our clients.",
    services: servicesNode?.type === "services" ? servicesNode.items : [],
    images: {
      hero: "https://source.unsplash.com/featured/1200x600?business",
      about: "https://source.unsplash.com/featured/800x800?people,team",
      services: [] as string[]
    }
  })

  const updateData = (key: string, value: any) => {
    setSiteData(prev => {
      const keys = key.split(".")
      if (keys.length === 1) return { ...prev, [key]: value }
      
      const newObj = { ...prev } as any
      let current = newObj
      for(let i=0; i<keys.length-1; i++) {
        current = current[keys[i]]
      }
      current[keys[keys.length-1]] = value
      return newObj
    })
  }

  const [activeSection, setActiveSection] = React.useState<string>("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  React.useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      { root: null, threshold: [0.25, 0.5, 0.75], rootMargin: "-25% 0px -25% 0px" }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const layoutStyle = site.theme.layoutStyle || "Professional"

  return (
    <div className={cn("preview-container min-h-screen", FONT_CLASS[site.theme.fontStyle || "sans"])}>
      <ThemeStyles theme={site.theme} />

      <header className="fixed top-0 z-50 w-full border-b preview-border bg-transparent backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-75 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <nav className="hidden items-center md:flex min-w-0 flex-1 justify-center">
             <div className="flex gap-8 items-center bg-transparent px-4 py-1.5 rounded-full border preview-border shadow-sm">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={handleNavClick}
                      className={cn(
                        "text-sm font-semibold transition-colors px-2 py-1 rounded-md", 
                        isActive ? "preview-primary-text bg-black/5 dark:bg-white/5" : "hover:text-current opacity-70 hover:opacity-100"
                      )}
                    >
                      {item.label}
                    </a>
                  )
                })}
             </div>
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded-md text-xs font-semibold uppercase tracking-wider">
              <Edit3 className="w-3 h-3"/> Click text/images to edit
            </div>
            <ThemeToggle />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="border-t preview-border px-4 py-3 backdrop-blur-md md:hidden flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleNavClick}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
          </nav>
        )}
      </header>

      {/* Render the appropriate layout completely distinctly */}
      {layoutStyle === "Professional" && <ProfessionalLayout data={siteData} updateData={updateData} theme={site.theme} />}
      {layoutStyle === "Premium & Luxury" && <PremiumLayout data={siteData} updateData={updateData} theme={site.theme} />}
      {layoutStyle === "Playful & Fun" && <PlayfulLayout data={siteData} updateData={updateData} theme={site.theme} />}
      {layoutStyle === "Modern & Minimal" && <MinimalLayout data={siteData} updateData={updateData} theme={site.theme} />}
      {layoutStyle === "Trustworthy" && <TrustworthyLayout data={siteData} updateData={updateData} theme={site.theme} />}
      {layoutStyle === "Friendly & Warm" && <ProfessionalLayout data={siteData} updateData={updateData} theme={site.theme} />} 
      
      <footer className="border-t preview-border py-8 text-center text-sm font-medium opacity-60">
        Generated with Clear AI Base · {layoutStyle} Theme
      </footer>
    </div>
  )
}
