import React from "react";
import { Link } from "react-router-dom";

export default function Consulting() {
  return (
    <div className="min-h-[100svh] bg-background text-foreground">
      {/* Top bar */}
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-extrabold text-lg">AltruisticXAI</Link>
          <div className="hidden md:flex gap-6 text-sm opacity-80">
            <a href="#education" className="hover:opacity-100">Education</a>
            <a href="#healthcare" className="hover:opacity-100">Healthcare</a>
            <a href="#energy" className="hover:opacity-100">Energy</a>
            <a href="#startups" className="hover:opacity-100">Startups</a>
          </div>
          <Link
            to="/contact"
            className="rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-gray-200"
          >
            Book a Call
          </Link>
        </div>
      </div>

      {/* Page heading */}
      <header className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-black">
          Consulting: From Idea to Impact
        </h1>
        <p className="mt-3 max-w-3xl opacity-90">
          We design lightweight pilots, measurable MVPs, and scalable rollouts.
          Start with a <strong>4-week scoped sprint</strong>, then grow based on proof—not hype.
        </p>
      </header>

      {/* Sticky in-page nav */}
      <nav
        aria-label="Section navigation"
        className="sticky top-0 z-20 mt-6 border-y border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <ul className="flex flex-wrap gap-2 py-3 text-sm">
            {[
              ["Education", "#education"],
              ["Healthcare", "#healthcare"],
              ["Energy", "#energy"],
              ["Startups", "#startups"],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/10"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-6xl px-4 md:px-6 py-10 space-y-16">
        {/* Education */}
        <Section
          id="education"
          eyebrow="K-12 / Higher-Ed"
          title="Education"
          blurb="AI-powered questioning, assessment integrity, and teacher time-savings—aligned with district policy and state guidance."
          bullets={[
            "Question Analyzer: boost student question quality (+25–40%)",
            "Oral Defense Generator: quick oral checks to reduce plagiarism",
            "Assessment Integrity: rubric helpers + versioning",
            "Teacher Copilot: 30–60 min/week time savings",
          ]}
          ctaText="See a classroom micro-pilot"
          ctaHref="/cases#education"
        />

        {/* Healthcare */}
        <Section
          id="healthcare"
          eyebrow="Clinics / Admin Ops"
          title="Healthcare"
          blurb="HIPAA-friendly automation for front desk, intake, scheduling, auth, and documentation—no PHI leaves your control."
          bullets={[
            "Intake triage: classify, summarize, and route",
            "Prior auth + benefits checks (API-first workflows)",
            "Documentation assist: note → structured fields",
            "Local-first redaction + audit logs",
          ]}
          ctaText="Explore an admin automation pilot"
          ctaHref="/cases#healthcare"
        />

        {/* Energy */}
        <Section
          id="energy"
          eyebrow="Campuses / Municipal / Utility-adjacent"
          title="Energy"
          blurb="Enterprise-scale optimization for asset management & sustainability. Local-first analytics with explainable models."
          bullets={[
            "Load + comfort: optimization and anomaly detection",
            "Asset health: predictive maintenance signals",
            "Sustainability: automated Scope 2/3 data prep",
            "Exec rollups: ROI, payback, and carbon impact",
          ]}
          ctaText="See campus energy case study"
          ctaHref="/cases#energy"
        />

        {/* Startups */}
        <Section
          id="startups"
          eyebrow="Founders / Product Teams"
          title="Startups"
          blurb="AI-native MVPs that validate fast: thin slice of value, real usage, and metrics that matter."
          bullets={[
            "Idea → demo: 2-week product spike",
            "RAG & local-first patterns baked-in",
            "Eval harness: prompt + model quality checks",
            "Founders’ dashboard: usage, retention, NPS",
          ]}
          ctaText="Ship an MVP with us"
          ctaHref="/cases#startups"
        />

        {/* Process section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl md:text-2xl font-bold">Our 3-Step Process</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              ["Discover", "Scope the tiniest unit of value; define success metrics and guardrails."],
              ["Pilot", "Ship a micro-pilot in 2–4 weeks; measure outcomes with users."],
              ["Scale", "Automate, harden, and integrate; show ROI and plan expansion."],
            ].map(([t, d], i) => (
              <li key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm opacity-80">Step {i + 1}</div>
                <div className="font-semibold">{t}</div>
                <p className="mt-1 text-sm opacity-85">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-gray-200"
            >
              Start a scoped discovery call
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  blurb,
  bullets,
  ctaText,
  ctaHref,
}: {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <div className="mb-3 text-xs uppercase tracking-wider opacity-70">{eyebrow}</div>
      <h2 id={`${id}-title`} className="text-2xl md:text-3xl font-bold">
        {title}
      </h2>
      <p className="mt-2 max-w-3xl opacity-90">{blurb}</p>

      <ul className="mt-4 grid sm:grid-cols-2 gap-3">
        {bullets.map((b, i) => (
          <li key={i} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm">
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <Link
          to={ctaHref}
          className="inline-flex items-center rounded-full border border-white/25 px-4 py-2 text-sm hover:bg-white/10"
        >
          {ctaText} →
        </Link>
      </div>
    </section>
  );
}
