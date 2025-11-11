// src/components/CreativeEyesHeroNew.tsx
import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

// Lazy-load the heavy 3D background to avoid blocking TTI.
// If you prefer the direct import, keep your original import and remove this.
const CreativeEyes = lazy(() =>
  import("@/components/ui/creative-eyes-hero-section-1").then(m => ({
    default: m.CreativeEyes,
  }))
);

export default function CreativeEyesHeroNew() {
  return (
    <div className="relative min-h-[100svh] w-screen bg-background text-foreground font-sans overflow-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:text-black focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      {/* Background 3D Eyes (lazy + reduced-motion guard) */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <Suspense
          fallback={
            // Lightweight gradient shimmer while the 3D scene loads
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
          }
        >
          <CreativeEyes />
        </Suspense>
      </div>

      {/* Foreground UI */}
      <div className="relative z-10 p-4 md:p-8 flex flex-col min-h-[100svh] box-border">
        {/* Header */}
        <header
          role="banner"
          aria-label="Site Header"
          className="flex items-center justify-between w-full"
        >
          <Link
            to="/"
            aria-label="AltruisticXAI home"
            className="font-extrabold text-xl md:text-2xl tracking-tight bg-gradient-to-r from-foreground/90 via-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            AltruisticXAI
          </Link>

          <nav
            role="navigation"
            aria-label="Primary"
            className="hidden md:flex items-center gap-6"
          >
            <Link className="nav-link" to="/labs">Labs</Link>
            <Link className="nav-link" to="/consulting">Consulting</Link>
            <Link className="nav-link" to="/policy">Policy</Link>
            <Link className="nav-link" to="/impact">Impact Ledger</Link>
          </nav>

          <div className="flex items-center gap-2">
            {/* Tiny utility links (kept subtle) */}
            <a
              href="https://www.youtube.com/watch?v=duqekXZfMqM"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex text-xs px-2 py-1 rounded-full border border-white/20 hover:bg-white/10 backdrop-blur-sm transition"
              aria-label="Watch on YouTube"
            >
              YouTube
            </a>
            <a
              href="https://www.newhopeproductsco.com/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex text-[11px] px-2 py-1 rounded-full border border-white/20 hover:bg-white/10 backdrop-blur-sm transition"
            >
              newhopexcollab
            </a>

            <Link
              to="/contact"
              className="bg-white text-black py-2.5 px-5 rounded-full font-semibold text-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              Book a Call
            </Link>
          </div>
        </header>

        {/* Hero */}
        <main
          id="main"
          className="flex-grow flex flex-col justify-end items-center text-center pb-28 md:pb-32"
        >
          <h1
            className="text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] font-black bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent motion-safe:animate-[fade-in-up_600ms_ease-out]"
          >
            AI Strategy That Works
          </h1>
          <p className="max-w-3xl text-base md:text-xl mt-4 md:mt-5 opacity-90">
            We don’t just talk about AI—we implement it. Our proven frameworks
            help organizations in education, healthcare, energy, and startups
            turn AI vision into measurable impact.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/cases"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-sm backdrop-blur-sm hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              See Case Studies
            </Link>
            <Link
              to="/consulting"
              className="inline-flex items-center justify-center rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              Explore Services
            </Link>
          </div>
        </main>

        {/* Sectors strip */}
        <section
          aria-label="Sectors We Serve"
          className="mx-auto w-full max-w-5xl -mt-16 md:-mt-20"
        >
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-xl">
            <div className="px-4 md:px-6 py-4 md:py-5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="text-sm md:text-base font-semibold tracking-wide">
                  Sectors We Serve
                </h2>
                <Link
                  to="/consulting"
                  className="text-xs md:text-sm underline underline-offset-4 opacity-90 hover:opacity-100"
                >
                  View all services →
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <SectorCard
                  to="/consulting#education"
                  title="Education"
                  blurb="AI-powered questioning & assessment tools for K-12"
                />
                <SectorCard
                  to="/consulting#healthcare"
                  title="Healthcare"
                  blurb="Administrative automation with HIPAA-compliant workflows"
                />
                <SectorCard
                  to="/consulting#energy"
                  title="Energy"
                  blurb="Enterprise optimization & sustainability analytics"
                />
                <SectorCard
                  to="/labs#startups"
                  title="Startups"
                  blurb="AI-native MVPs from idea to PMF"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="h-6 md:h-8" />
      </div>
    </div>
  );
}

/** Small, reusable sector card with consistent focus states */
function SectorCard({
  to,
  title,
  blurb,
}: {
  to: string;
  title: string;
  blurb: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-xl border border-white/10 bg-white/5 p-3 md:p-4 hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
    >
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-1 text-[11px] md:text-xs opacity-80">{blurb}</p>
      <span className="mt-2 inline-block text-[11px] md:text-xs underline opacity-90 group-hover:opacity-100">
        Learn more
      </span>
    </Link>
  );
}