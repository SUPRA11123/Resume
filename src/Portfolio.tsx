import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Quote,
  Sun,
  Moon,
  ChevronRight,
  ArrowUp,
} from "lucide-react";

/**
 * Revamped, recruiter-focused portfolio
 * - Clean visual hierarchy and stronger contrast
 * - Scrollspy with active section indicator
 * - Section slide-in from left on first view
 * - Theme toggle (light/dark) persisted in localStorage
 * - Project filters + subtle card hover lift
 * - Testimonials carousel
 * - Sticky mobile CTA and scroll-to-top button
 * - Minimal deps: Tailwind CSS, framer-motion, lucide-react
 */

// ---- Central links (replace placeholders) ----
const LINKS = {
  profilePic: "/profile.jpg", // set your image file
  linkedIn: "https://www.linkedin.com/in/suprabhat-supra-06956578/",
  github: "https://github.com/SUPRA11123",
  email: "mailto:suprabhat.supra@gmail.com",
  cv: "/Suprabhat_CV_FullStackDev.pdf",
  farmit: "https://www.github.com/SUPRA11123/farmit",
  iqviaSilverAward:
    "https://drive.google.com/file/d/1hGztDkvSwgO16X5ZLBoS2DcFYHhZYQVR/view",
  thesis:
    "https://drive.google.com/file/d/1JPdlajG-5PPOVeW2WBuHErLQKAy0Yd2R/view",
  refMoellerProfile: "#",
  refHerrmannProfile:
    "https://drive.google.com/file/d/1D_zgo8iJUt1FvGAtP6rhhzjX5UYEdFES/view",
};

// ---- Small UI primitives ----
const cn = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");

const Chip = ({ children, active = false, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-3 py-1 rounded-full border text-sm transition",
      active
        ? "bg-indigo-600 text-white border-indigo-600 shadow"
        : "text-gray-700 dark:text-gray-200 border-gray-300/70 dark:border-gray-700/70 hover:bg-gray-50 dark:hover:bg-white/5"
    )}
  >
    {children}
  </button>
);

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="max-w-6xl mx-auto px-6 py-20">
    <motion.h2
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="text-3xl md:text-4xl font-bold tracking-tight mb-8"
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ opacity: 0, x: -22 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  </section>
);

export default function Portfolio() {
  // ---- Nav config ----
  const nav = [
    { href: "#home", label: "Home" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#certs", label: "Certifications" },
    { href: "#thesis", label: "Thesis" },
    { href: "#references", label: "References" },
    { href: "#contact", label: "Contact" },
  ];

  // ---- UI state ----
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [dark, setDark] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // ---- Persisted theme ----
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = saved ? saved === "dark" : prefersDark;
    setDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // ---- Scrollspy ----
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { threshold: 0.5 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // ---- Scroll to top visibility ----
  useEffect(() => {
    const f = () => setShowTop(window.scrollY > 240);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const onNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  // ---- Projects with filters ----
  type Project = {
    title: string;
    org: string;
    year: string;
    href?: string;
    tags: string[];
    bullets: string[];
  };

  const projects: Project[] = [
    {
      title: "FARMIT – IoT & Deep Learning",
      org: "University of Siegen",
      year: "2023",
      href: LINKS.farmit,
      tags: ["Full‑Stack", "IoT", "ML"],
      bullets: ["React + Django REST, real-time IoT ingestion", "LSTM forecasting & YOLOv5 detection"],
    },
    {
      title: "Invoice Entity Extraction with BERT",
      org: "Independent",
      year: "2025",
      tags: ["NLP", "ML"],
      bullets: ["Fine-tuned BERT for invoice NER", "Integrated into a minimal web app"],
    },
  ];

  const allTags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, []);
  const [tag, setTag] = useState("All");
  const filtered = useMemo(() => (tag === "All" ? projects : projects.filter((p) => p.tags.includes(tag))), [tag]);

  // ---- Testimonials ----
  const quotes = [
    {
      text: "Suprabhat has consistently demonstrated strong technical expertise and problem‑solving abilities.",
      name: "Prof. Dr. Michael Moeller",
      role: "Computer Vision Group, University of Siegen",
      href: LINKS.refMoellerProfile,
    },
    {
      text: "He combines technical knowledge with adaptability, delivering high‑quality results in interdisciplinary projects.",
      name: "Dr.-Ing. Stefan Herrmann",
      role: "Head, FOXBYTE – CSI Verwaltungs GmbH",
      href: LINKS.refHerrmannProfile,
    },
  ];
  const [qIndex, setQIndex] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setQIndex((n) => (n + 1) % quotes.length), 5200);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0b0b0d] dark:text-gray-100">
      {/* ==== Decorative backdrop ==== */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-[32rem] w-[32rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-40 w-[60%] bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.15),transparent)]" />
      </div>

      {/* ==== Top Nav ==== */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/30 bg-white/80 dark:bg-black/40 border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-6xl mx-auto flex items-center gap-4 px-6 h-16">
          <a href="#home" className="font-semibold tracking-tight text-xl md:text-2xl">Suprabhat</a>

          <nav className="hidden md:flex ml-auto items-center gap-2 text-sm relative">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => onNavClick(e, n.href)}
                className={cn(
                  "px-3 py-2 rounded-lg transition hover:opacity-90",
                  active === n.href.slice(1) ? "text-indigo-600 bg-indigo-50 dark:bg-white/5" : ""
                )}
              >
                {n.label}
              </a>
            ))}
            <a
              href={LINKS.cv}
              target="_blank"
              rel="noreferrer"
              className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Download className="h-4 w-4" /> CV
            </a>
            <button
              aria-label="Toggle theme"
              onClick={() => setDark((d) => !d)}
              className="ml-1 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300/70 dark:border-gray-700/70"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </nav>

          {/* Hamburger */}
          <button
            className="ml-auto md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300/70 dark:border-gray-700/70"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile menu overlay */}
        {open && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
            <div
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-[#0f0f12] p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold">Menu</span>
                <button
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300/70 dark:border-gray-700/70"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {nav.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={(e) => onNavClick(e, n.href)}
                    className={cn("text-base px-2 py-2 rounded-lg", active === n.href.slice(1) && "bg-white/40 dark:bg-white/5")}
                  >
                    {n.label}
                  </a>
                ))}
                <div className="flex gap-2 pt-2">
                  <a
                    href={LINKS.cv}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white"
                  >
                    <Download className="h-4 w-4" /> CV
                  </a>
                  <button
                    onClick={() => setDark((d) => !d)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300/70 dark:border-gray-700/70"
                  >
                    {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ==== Hero ==== */}
      <section id="home" className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="flex flex-col items-center md:flex-row md:items-center gap-8">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={LINKS.profilePic}
            alt="Profile"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover ring-4 ring-indigo-600/70 shadow-lg"
          />
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              Building reliable products across <span className="text-indigo-600">Full‑Stack</span>,
              <br className="hidden md:block" /> <span className="text-indigo-600">Data Science</span> & QA
            </motion.h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              I craft responsive web apps, production ML pipelines, and robust test automation. Based in Germany.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={LINKS.cv}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <Download className="h-4 w-4" /> View CV
              </a>
              <a href={LINKS.linkedIn} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href={LINKS.email} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border">
                <Mail className="h-4 w-4" /> Contact
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <Chip>React • TypeScript • Next.js</Chip>
              <Chip>Python • FastAPI • Django</Chip>
              <Chip>PostgreSQL • GraphQL</Chip>
              <Chip>PyTorch • TensorFlow</Chip>
              <Chip>Cypress • Playwright</Chip>
              <Chip>Docker • AWS • CI/CD</Chip>
            </div>
          </div>
        </div>
      </section>

      {/* ==== Experience ==== */}
      <Section id="experience" title="Experience">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border dark:border-gray-800 bg-white/60 dark:bg-white/5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">Student Assistant – Full‑Stack Web Development</h3>
                <p className="text-sm text-gray-500">Chair of Economics, University of Siegen • 2024 – 2025</p>
              </div>
            </div>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>React/TypeScript components with GraphQL; Next.js SSR.</li>
              <li>PostgreSQL backend integration; accessibility & responsiveness.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border dark:border-gray-800 bg-white/60 dark:bg-white/5">
            <h3 className="text-xl font-semibold">Master Thesis – Data Science & Software Development</h3>
            <p className="text-sm text-gray-500">FOXBYTE (CSI Verwaltungs GmbH) • 2023 – 2024</p>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>Forecasting with LSTM/ARIMA; anomaly detection & dashboards.</li>
              <li>End‑to‑end ML with PyTorch/Keras; deployment & explainability.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border dark:border-gray-800 bg-white/60 dark:bg-white/5">
            <h3 className="text-xl font-semibold">Software Developer</h3>
            <p className="text-sm text-gray-500">IQVIA • 2019 – 2021</p>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>Enterprise clinical platform features; automation reduced QA cycle time.</li>
              <li>
                Team recognized with <span className="font-medium">IQVIA Silver Award</span>
                <a
                  href={LINKS.iqviaSilverAward}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-600 hover:underline ml-1"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border dark:border-gray-800 bg-white/60 dark:bg-white/5">
            <h3 className="text-xl font-semibold">Working Student – Data Analytics & QA</h3>
            <p className="text-sm text-gray-500">Exactag GmbH • 2022</p>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>Migrated end‑to‑end tests from Cypress to Playwright; CI integration.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ==== Education ==== */}
      <Section id="education" title="Education">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border dark:border-gray-800 bg-white/60 dark:bg-white/5">
            <h3 className="text-xl font-semibold">Master of Science – Computer Science</h3>
            <p className="text-sm text-gray-500">Universität Siegen • Siegen, Germany • Oct 2021 – Mar 2025</p>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>Specialized in Data Science, Full‑Stack Development, and QA Engineering.</li>
              <li>Master Thesis on Predictive Maintenance with IoT time‑series data.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border dark:border-gray-800 bg-white/60 dark:bg-white/5">
            <h3 className="text-xl font-semibold">Bachelor of Technology – Computer Science</h3>
            <p className="text-sm text-gray-500">CUSAT • Kochi, India • 2015 – 2019</p>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>Strong foundations in Software Engineering, Algorithms, and Databases.</li>
              <li>Graduated with projects in AI and Web Development.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ==== Projects with filters ==== */}
      <Section id="projects" title="Highlighted Projects">
        <div className="mb-4 flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Chip key={t} active={t === tag} onClick={() => setTag(t)}>
              {t}
            </Chip>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <div key={p.title} className="group p-6 rounded-2xl border dark:border-gray-800 bg-white/60 dark:bg-white/5 transition transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.org} • {p.year}</p>
                </div>
                {p.href && (
                  <a href={p.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:underline">
                    View <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tg) => (
                  <span key={tg} className="px-2 py-0.5 rounded-md text-xs border border-gray-300/70 dark:border-gray-700/70">{tg}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ==== Skills ==== */}
      <Section id="skills" title="Skills">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["React, TypeScript, Next.js","Python, Django, FastAPI","PostgreSQL, SQL/NoSQL","PyTorch, TensorFlow, ML","Cypress, Playwright, Selenium","Docker, AWS, CI/CD"].map((s) => (
            <div key={s} className="p-4 rounded-2xl border text-center dark:border-gray-800 bg-white/60 dark:bg-white/5">{s}</div>
          ))}
        </div>
      </Section>

      {/* ==== Certifications ==== */}
      <Section id="certs" title="Certifications & Awards">
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li>• AWS (Foundational) – cloud foundations & deployment exposure.</li>
          <li>
            • IQVIA <span className="font-medium">Silver Award</span>
            {" "}
            <a href={LINKS.iqviaSilverAward} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:underline">
              <ExternalLink className="h-3 w-3" />
            </a>
          </li>
          <li>• German Language – B1 (in progress).</li>
        </ul>
      </Section>

      {/* ==== Thesis ==== */}
      <Section id="thesis" title="Thesis & Publications">
        <div className="p-6 rounded-2xl border dark:border-gray-800 bg-white/60 dark:bg-white/5">
          <h3 className="text-xl font-semibold">Master Thesis – Predictive Maintenance</h3>
          <p className="text-sm text-gray-500">FOXBYTE (CSI Verwaltungs GmbH) • 2023 – 2024</p>
          <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
            <li>Time‑series forecasting (LSTM/ARIMA/SARIMAX), anomaly detection, explainable dashboards.</li>
            <li>CI/CD validation and production‑ready ML pipelines.</li>
          </ul>
          <a
            href={LINKS.thesis}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:underline"
          >
            Read thesis <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </Section>

      {/* ==== References (carousel) ==== */}
      <Section id="references" title="References">
        <div className="relative p-6 rounded-2xl border dark:border-gray-800 bg-white/60 dark:bg-white/5">
          <Quote className="h-6 w-6 text-indigo-600 mb-3" />
          <p className="italic text-gray-700 dark:text-gray-300 min-h-[72px]">“{quotes[qIndex].text}”</p>
          <div className="mt-4">
            <p className="font-semibold">
              <a href={quotes[qIndex].href} target="_blank" rel="noreferrer" className="hover:underline">
                {quotes[qIndex].name}
              </a>
            </p>
            <p className="text-sm text-gray-500">{quotes[qIndex].role}</p>
          </div>
          <div className="absolute right-4 top-4 text-xs text-gray-500">{qIndex + 1} / {quotes.length}</div>
        </div>
      </Section>

      {/* ==== Contact ==== */}
      <Section id="contact" title="Get in touch">
        <div className="flex flex-wrap gap-3">
          <a href={LINKS.email} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border">
            <Mail className="h-4 w-4" /> Email
          </a>
          <a href={LINKS.linkedIn} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a href={LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border">
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-500">© {new Date().getFullYear()} Suprabhat. All rights reserved.</p>
      </Section>

      {/* ==== Scroll to top button ==== */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-5 z-40 inline-flex items-center gap-1 px-3 py-2 rounded-xl border bg-white/95 dark:bg-black/70 border-gray-200 dark:border-gray-800 shadow"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" /> Top
        </button>
      )}

      {/* ==== Mobile floating CV bar ==== */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden">
        <div className="flex gap-2 rounded-2xl shadow-lg bg-white/95 dark:bg-black/70 border border-gray-200 dark:border-gray-800 p-2">
          <a
            href={LINKS.cv}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
          >
            View CV
          </a>
          <a href={LINKS.cv} download className="px-4 py-2 rounded-xl border">
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
