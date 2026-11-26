import { Blocks, Building2, ServerCog, ShieldCheck, Smartphone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const foundations = [
  {
    description: "Responsive App Router foundation with strict TypeScript and Tailwind CSS.",
    icon: Building2,
    title: "Web application",
  },
  {
    description: "Provider-independent NestJS API with health and OpenAPI foundations.",
    icon: ServerCog,
    title: "Modular API",
  },
  {
    description: "Portable contracts and API client boundaries for web and future mobile clients.",
    icon: Blocks,
    title: "Shared packages",
  },
] as const;

export default function HomePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-20" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[34rem] w-[50rem] -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl"
      />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-400 text-slate-950">
              <Building2 aria-hidden="true" className="size-5" strokeWidth={2.25} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Society Management Platform
              </p>
              <p className="text-sm text-slate-400">Phase 01 foundation</p>
            </div>
          </div>
          <span className="hidden rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm font-medium text-emerald-200 sm:inline-flex">
            Local development
          </span>
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1.5 text-sm font-medium text-sky-200">
              <ShieldCheck aria-hidden="true" className="size-4" />
              Secure, tenant-aware architecture
            </div>
            <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              One reliable foundation for every society experience.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300">
              The monorepo is organised for independently deployable web and API applications,
              reusable contracts, disciplined quality checks, and a future mobile client.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className={buttonVariants()} href="#foundation">
                Explore the foundation
              </a>
              <a
                className={cn(buttonVariants({ variant: "outline" }))}
                href="https://github.com/Mishra-Vinaykumar/society-management-platform"
                rel="noreferrer"
                target="_blank"
              >
                View repository
              </a>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-sky-950/30 backdrop-blur sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-sky-200">Foundation status</p>
                <h2 className="mt-2 text-2xl font-semibold">Built for the next phases</h2>
              </div>
              <Smartphone aria-hidden="true" className="size-6 text-sky-300" />
            </div>
            <dl className="mt-8 space-y-5">
              <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-4">
                <dt className="text-slate-400">Frontend</dt>
                <dd className="text-right font-medium">Next.js + React</dd>
              </div>
              <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-4">
                <dt className="text-slate-400">Backend</dt>
                <dd className="text-right font-medium">NestJS REST API</dd>
              </div>
              <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-4">
                <dt className="text-slate-400">Shared boundary</dt>
                <dd className="text-right font-medium">Platform-independent</dd>
              </div>
              <div className="flex items-center justify-between gap-5">
                <dt className="text-slate-400">Production data</dt>
                <dd className="text-right font-medium text-amber-200">Not connected</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="pb-12" id="foundation">
          <div className="grid gap-4 md:grid-cols-3">
            {foundations.map(({ description, icon: Icon, title }) => (
              <article
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
                key={title}
              >
                <Icon aria-hidden="true" className="size-6 text-sky-300" />
                <h2 className="mt-5 text-lg font-semibold">{title}</h2>
                <p className="mt-2 leading-7 text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
