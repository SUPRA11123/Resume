import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  ArrowUp,
  Search,
  Eye,
  Globe,
} from "lucide-react";

/**
 * Portfolio.tsx — multilingual + animated background + scroll progress
 *
 * Update: Qualifications is a single nav section that contains tabs: Education, Certifications, Thesis, Skills, References.
 */

// ---- Central links ----
const LINKS = {
  profilePic: "/profile.jpg",
  linkedIn: "https://www.linkedin.com/in/suprabhat-supra-06956578/",
  github: "https://github.com/SUPRA11123",
  email: "suprabhat.supra@gmail.com",
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

// ---- i18n ----
const dict = {
  en: {
    nav: {
      home: "Home",
      experience: "Experience",
      projects: "Projects",
      qualifications: "Qualifications",
      contact: "Contact",
    },
    heroTitle: (
      <>
        Building reliable products across <span className="text-indigo-600">Full‑Stack</span>,
        <br className="hidden md:block" /> <span className="text-indigo-600">Data Science</span> & QA
      </>
    ),
    heroIntro1:
      "I craft responsive web apps, production ML pipelines, and robust test automation.",
    heroIntro2: "Based in Germany. Work permit available.",
    viewCV: "View CV",
    downloadCV: "Download CV",
    contact: "Contact",
    send: "Send",
    menu: "Menu",
    sections: {
      experience: "Experience",
      projects: "Highlighted Projects",
      qualifications: "Qualifications",
      contact: "Get in touch",
    },
    qualTabs: {
      education: "Education",
      certs: "Certifications",
      thesis: "Thesis",
      skills: "Skills",
      refs: "References",
    },
    hint: "Hint: Press ⌘K / Ctrl+K.",
    top: "Top",
  },
  de: {
    nav: {
      home: "Start",
      experience: "Erfahrung",
      projects: "Projekte",
      qualifications: "Qualifikationen",
      contact: "Kontakt",
    },
    heroTitle: (
      <>
        Zuverlässige Produkte in <span className="text-indigo-600">Full‑Stack</span>,
        <br className="hidden md:block" /> <span className="text-indigo-600">Data Science</span> & QA entwickeln
      </>
    ),
    heroIntro1:
      "Ich entwickle Responsive‑Webapps, produktive ML‑Pipelines und robuste Testautomatisierung.",
    heroIntro2: "Mit Wohnsitz in Deutschland. Arbeitserlaubnis vorhanden.",
    viewCV: "Lebenslauf ansehen",
    downloadCV: "Lebenslauf herunterladen",
    contact: "Kontakt",
    send: "Senden",
    menu: "Menü",
    sections: {
      experience: "Erfahrung",
      projects: "Ausgewählte Projekte",
      qualifications: "Qualifikationen",
      contact: "Kontakt aufnehmen",
    },
    qualTabs: {
      education: "Studium",
      certs: "Zertifikate",
      thesis: "Thesis",
      skills: "Fähigkeiten",
      refs: "Referenzen",
    },
    hint: "Tipp: ⌘K / Ctrl+K.",
    top: "Nach oben",
  },
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

const Section = ({ id, title, children }: { id: string; title: React.ReactNode; children: React.ReactNode }) => {
  const reduceMotion = useReducedMotion();
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, x: reduceMotion ? 0 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduceMotion ? 0 : 0.5 }}
        className="text-3xl md:text-4xl font-bold tracking-tight mb-8"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, x: reduceMotion ? 0 : -22 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduceMotion ? 0 : 0.55 }}
      >
        {children}
      </motion.div>
    </section>
  );
};

// ---- Command Palette ----
function useCommandPalette(actions: { id: string; label: string; run: () => void; keywords?: string }[]) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      if ((isMac && e.metaKey && e.key.toLowerCase() === "k") || (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return actions;
    return actions.filter((a) => (a.label + " " + (a.keywords || "")).toLowerCase().includes(t));
  }, [q, actions]);

  const Palette = () =>
    open ? (
      <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setOpen(false)}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="mx-auto mt-24 max-w-xl rounded-2xl bg-white dark:bg-[#0f0f12] border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-gray-200 dark:border-gray-800">
            <Search className="h-4 w-4" aria-hidden={true} />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type a command or search…"
              className="w-full bg-transparent outline-none py-2"
              aria-label="Search commands"
            />
            <kbd className="text-xs text-gray-500">Esc</kbd>
          </div>
          <ul className="max-h-72 overflow-y-auto">
            {filtered.map((a) => (
              <li key={a.id}>
                <button
                  onClick={() => {
                    a.run();
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  {a.label}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-500">No results</li>
            )}
          </ul>
        </div>
      </div>
    ) : null;

  return { Palette };
}

export default function Portfolio() {
  // ---- Language state ----
  const [lang, setLang] = useState<keyof typeof dict>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "de") setLang(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);
  const t = dict[lang];

  // ---- Nav config (single Qualifications item) ----
  const nav = [
    { href: "#home", label: t.nav.home },
    { href: "#experience", label: t.nav.experience },
    { href: "#projects", label: t.nav.projects },
    { href: "#qualifications", label: t.nav.qualifications },
    { href: "#contact", label: t.nav.contact },
  ];

  // ---- UI state ----
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [dark, setDark] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);

  // ---- Load elegant font ----
  useEffect(() => {
    const l1 = document.createElement("link");
    l1.rel = "preconnect";
    l1.href = "https://fonts.googleapis.com";
    document.head.appendChild(l1);
    const l2 = document.createElement("link");
    l2.rel = "preconnect";
    l2.href = "https://fonts.gstatic.com";
    (l2 as any).crossOrigin = "";
    document.head.appendChild(l2);
    const l3 = document.createElement("link");
    l3.rel = "stylesheet";
    l3.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(l3);
  }, []);

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
  }, [t]);

  // ---- Scroll to top and progress ----
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 240);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ---- Lock body scroll when drawer open ----
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

  // ---- Command palette actions ----
  const { Palette } = useCommandPalette([
    ...nav.map((n) => ({ id: n.href, label: `Go to ${n.label}`, run: () => document.getElementById(n.href.slice(1))?.scrollIntoView({ behavior: "smooth" }) })),
    { id: "toggle-theme", label: "Toggle theme", run: () => setDark((d) => !d), keywords: "dark light" },
    { id: "open-cv", label: "Open CV", run: () => window.open(LINKS.cv, "_blank", "noopener,noreferrer") },
    { id: "open-github", label: "Open GitHub", run: () => window.open(LINKS.github, "_blank", "noopener,noreferrer") },
    { id: "open-linkedin", label: "Open LinkedIn", run: () => window.open(LINKS.linkedIn, "_blank", "noopener,noreferrer") },
    { id: "compose-email", label: "Compose email", run: () => window.open(`mailto:${LINKS.email}`) },
  ]);

  // ---- Qualifications tabs ----
  type QualTab = "education" | "certs" | "thesis" | "skills" | "refs";
  const [qtab, setQtab] = useState<QualTab>("education");

  return (
    <div
      className="min-h-screen text-gray-900 dark:text-gray-100"
      style={{
        fontFamily:
          '"Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      {/* ==== Animated soothing background ==== */}
      <style>{`
        @keyframes floaty{0%{transform:translate(0,0) scale(1)}50%{transform:translate(-14px,18px) scale(1.05)}100%{transform:translate(0,0) scale(1)}}
      `}</style>
      <div aria-hidden={true} className="fixed inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-indigo-400/20 blur-3xl animate-[floaty_26s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -left-24 h-[26rem] w-[26rem] rounded-full bg-teal-300/20 blur-3xl animate-[floaty_32s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 right-1/4 h-32 bg-gradient-to-r from-indigo-200/30 via-teal-200/20 to-transparent" />
        <div className="absolute inset-0 bg-white/60 dark:bg-[#0b0b0d]/60" />
      </div>

      {/* ==== Top Nav ==== */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/30 bg-white/80 dark:bg-black/40 border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-6xl mx-auto flex items-center gap-3 px-6 h-16" role="navigation" aria-label="Primary">
          <a href="#home" className="font-semibold tracking-tight text-xl md:text-2xl">Suprabhat</a>

          <nav className="hidden md:flex ml-auto items-center gap-2 text-sm relative">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => onNavClick(e, n.href)}
                className={cn(
                  "px-3 py-2 rounded-lg transition hover:opacity-90 focus:outline-none focus-visible:ring-2 ring-indigo-600",
                  active === n.href.slice(1) ? "text-indigo-600 bg-indigo-50 dark:bg-white/5" : ""
                )}
              >
                {n.label}
              </a>
            ))}
            {/* Language toggle */}
            <div className="ml-2 inline-flex rounded-xl border border-gray-300/70 dark:border-gray-700/70 overflow-hidden">
              <button
                aria-label="Switch to English"
                onClick={() => setLang("en")}
                className={cn("px-2.5 py-1.5 flex items-center gap-1", lang === "en" && "bg-indigo-600 text-white")}
              >
                <Globe className="h-3.5 w-3.5" /> EN
              </button>
              <button
                aria-label="Wechsel zu Deutsch"
                onClick={() => setLang("de")}
                className={cn("px-2.5 py-1.5", lang === "de" && "bg-indigo-600 text-white")}
              >
                DE
              </button>
            </div>
            {/* Download CV in top nav */}
            <a
              href={LINKS.cv}
              download
              className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Download className="h-4 w-4" aria-hidden={true} /> {t.downloadCV}
            </a>
            <button
              aria-label="Toggle theme"
              onClick={() => setDark((d) => !d)}
              className="ml-1 inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300/70 dark:border-gray-700/70"
            >
              {dark ? <Sun className="h-4 w-4" aria-hidden={true} /> : <Moon className="h-4 w-4" aria-hidden={true} />}
            </button>
          </nav>

          {/* Hamburger bigger for mobile visibility */}
          <button
            className="ml-auto md:hidden inline-flex items-center justify-center w-12 h-12 rounded-2xl border bg-white/95 dark:bg-white/10 border-gray-300/70 dark:border-gray-700/70 shadow"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-7 w-7" aria-hidden={true} />
          </button>
        </div>
        {/* Scroll progress bar */}
        <div className="fixed top-16 left-0 right-0 z-50 h-1 bg-transparent">
          <div
            className="h-full bg-indigo-600 dark:bg-indigo-500"
            style={{ width: `${progress}%` }}
            aria-hidden={true}
          />
        </div>

        {/* Mobile menu overlay: header remains visible */}
        {open && (
          <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
            <div
              className="absolute right-0 top-0 bottom-0 w-[76%] max-w-sm bg-white dark:bg-[#0f0f12] p-6 shadow-xl border-l border-gray-200 dark:border-gray-800 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold">{t.menu}</span>
                <button
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300/70 dark:border-gray-700/70"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-6 w-6" aria-hidden={true} />
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
                  {/* Lang and theme */}
                  <div className="inline-flex rounded-xl border border-gray-300/70 dark:border-gray-700/70 overflow-hidden">
                    <button onClick={() => setLang("en")} className={cn("px-3 py-2 text-sm", lang === "en" && "bg-indigo-600 text-white")}>EN</button>
                    <button onClick={() => setLang("de")} className={cn("px-3 py-2 text-sm", lang === "de" && "bg-indigo-600 text-white")}>DE</button>
                  </div>
                  <button
                    onClick={() => setDark((d) => !d)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300/70 dark:border-gray-700/70"
                    aria-label="Toggle theme"
                  >
                    {dark ? <Sun className="h-4 w-4" aria-hidden={true} /> : <Moon className="h-4 w-4" aria-hidden={true} />}
                  </button>
                </div>
                <div className="flex gap-2 pt-2">
                  {/* Download CV inside drawer */}
                  <a
                    href={LINKS.cv}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white"
                  >
                    <Download className="h-4 w-4" aria-hidden={true} /> {t.downloadCV}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ==== Hero ==== */}
      <section id="home" className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="flex flex-col items-center md:flex-row-reverse md:items-center gap-8">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={LINKS.profilePic}
            alt="Portrait of Suprabhat"
            width={224}
            height={224}
            loading="eager"
            decoding="async"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover ring-4 ring-indigo-600/70 shadow-lg"
          />
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              {t.heroTitle}
            </motion.h1>
            <p className="mt-5 text-lg text-gray-700 dark:text-gray-300">{t.heroIntro1}</p>
            <p className="mt-1 text-lg text-gray-700 dark:text-gray-300">{t.heroIntro2}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {/* View CV with Eye icon, colored */}
              <a
                href={LINKS.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <Eye className="h-4 w-4" aria-hidden={true} /> {t.viewCV}
              </a>
              <a href={LINKS.linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border">
                <Linkedin className="h-4 w-4" aria-hidden={true} /> LinkedIn
              </a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border">
                <Github className="h-4 w-4" aria-hidden={true} /> GitHub
              </a>
              <a href={`mailto:${LINKS.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border">
                <Mail className="h-4 w-4" aria-hidden={true} /> {t.contact}
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
      <Section id="experience" title={t.sections.experience}>
        <div className="space-y-6">
          {[
            {
              title: "Student Assistant – Full‑Stack Web Development",
              sub: "Chair of Economics, University of Siegen • 2024 – 2025",
              bullets: [
                "React/TypeScript components with GraphQL; Next.js SSR.",
                "PostgreSQL backend integration; accessibility & responsiveness.",
              ],
            },
            {
              title: "Master Thesis – Data Science & Software Development",
              sub: "FOXBYTE (CSI Verwaltungs GmbH) • 2023 – 2024",
              bullets: [
                "Forecasting with LSTM/ARIMA; anomaly detection & dashboards.",
                "End‑to‑end ML with PyTorch/Keras; deployment & explainability.",
              ],
            },
            {
              title: "Software Developer",
              sub: "IQVIA • 2019 – 2021",
              bullets: [
                "Enterprise clinical platform features; automation reduced QA cycle time.",
                "Team recognized with IQVIA Silver Award.",
              ],
            },
            {
              title: "Working Student – Data Analytics & QA",
              sub: "Exactag GmbH • 2022",
              bullets: ["Migrated end‑to‑end tests from Cypress to Playwright; CI integration."],
            },
          ].map((e) => (
            <div key={e.title} className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-white/5 hover:shadow-md transition">
              <h3 className="text-xl font-semibold">{e.title}</h3>
              <p className="text-sm text-gray-500">{e.sub}</p>
              <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ==== Projects with filters ==== */}
      <Section id="projects" title={t.sections.projects}>
        <div className="mb-4 flex flex-wrap gap-2">
          {allTags.map((tname) => (
            <Chip key={tname} active={tname === tag} onClick={() => setTag(tname)}>
              {tname}
            </Chip>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <div key={p.title} className="group p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-white/5 transition transform hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.org} • {p.year}</p>
                </div>
                {p.href && (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:underline">
                    View <ExternalLink className="h-4 w-4" aria-hidden={true} />
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

      {/* ==== Qualifications with tabs (Education, Certs, Thesis, Skills, References) ==== */}
      <Section id="qualifications" title={t.sections.qualifications}>
        <div role="tablist" aria-label="Qualifications tabs" className="flex flex-wrap gap-2 mb-6">
          {(["education","certs","thesis","skills","refs"] as QualTab[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={qtab === k}
              aria-controls={`panel-${k}`}
              id={`tab-${k}`}
              onClick={() => setQtab(k)}
              className={cn(
                "px-3 py-1.5 rounded-full border text-sm",
                qtab === k ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-300/70 dark:border-gray-700/70"
              )}
            >
              {t.qualTabs[k]}
            </button>
          ))}
        </div>

        {/* Panels */}
        {qtab === "education" && (
          <div role="tabpanel" id="panel-education" aria-labelledby="tab-education" className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-white/5">
              <h3 className="text-xl font-semibold">Master of Science – Computer Science</h3>
              <p className="text-sm text-gray-500">Universität Siegen • Siegen, Germany • Oct 2021 – Mar 2025</p>
              <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
                <li>Data Science, Full‑Stack, QA Engineering focus.</li>
                <li>
                  Thesis: Predictive Maintenance on IoT time‑series.{" "}
                  <a href={LINKS.thesis} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline inline-flex items-center gap-1">
                    Read <ExternalLink className="h-3 w-3" aria-hidden={true} />
                  </a>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-white/5">
              <h3 className="text-xl font-semibold">Bachelor of Technology – Computer Science</h3>
              <p className="text-sm text-gray-500">CUSAT • Kochi, India • 2015 – 2019</p>
              <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
                <li>Software Engineering, Algorithms, Databases.</li>
                <li>Projects in AI and Web Development.</li>
              </ul>
            </div>
          </div>
        )}

        {qtab === "certs" && (
          <div role="tabpanel" id="panel-certs" aria-labelledby="tab-certs" className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-white/5">
            <h3 className="text-xl font-semibold">Certifications & Awards</h3>
            <ul className="space-y-3 mt-3 text-gray-700 dark:text-gray-300">
              <li>• AWS (Foundational) – cloud foundations & deployment exposure.</li>
              <li>
                • IQVIA <span className="font-medium">Silver Award</span>{" "}
                <a href={LINKS.iqviaSilverAward} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:underline">
                  <ExternalLink className="h-3 w-3" aria-hidden={true} />
                </a>
              </li>
              <li>• German Language – B1 (in progress).</li>
            </ul>
          </div>
        )}

        {qtab === "thesis" && (
          <div role="tabpanel" id="panel-thesis" aria-labelledby="tab-thesis" className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-white/5">
            <h3 className="text-xl font-semibold">Thesis</h3>
            <p className="text-sm text-gray-500">FOXBYTE (CSI Verwaltungs GmbH) • 2023 – 2024</p>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>Predictive Maintenance on IoT time‑series.</li>
              <li>LSTM/ARIMA/SARIMAX, anomaly detection, dashboards.</li>
            </ul>
            <a href={LINKS.thesis} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:underline">
              Read thesis <ExternalLink className="h-4 w-4" aria-hidden={true} />
            </a>
          </div>
        )}

        {qtab === "skills" && (
          <div role="tabpanel" id="panel-skills" aria-labelledby="tab-skills" className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["React, TypeScript, Next.js","Python, Django, FastAPI","PostgreSQL, SQL/NoSQL","PyTorch, TensorFlow, ML","Cypress, Playwright, Selenium","Docker, AWS, CI/CD"].map((s) => (
              <div key={s} className="p-4 rounded-3xl border border-gray-200 dark:border-gray-800 text-center bg-white/70 dark:bg-white/5">{s}</div>
            ))}
          </div>
        )}

        {qtab === "refs" && (
          <div role="tabpanel" id="panel-refs" aria-labelledby="tab-refs" className="relative p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-white/5">
            <Quote className="h-6 w-6 text-indigo-600 mb-3" aria-hidden={true} />
            <p className="italic text-gray-700 dark:text-gray-300 min-h-[72px]">“{quotes[qIndex].text}”</p>
            <div className="mt-4">
              <p className="font-semibold">
                <a href={quotes[qIndex].href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {quotes[qIndex].name}
                </a>
              </p>
              <p className="text-sm text-gray-500">{quotes[qIndex].role}</p>
            </div>
            <div className="absolute right-4 top-4 text-xs text-gray-500">{qIndex + 1} / {quotes.length}</div>
          </div>
        )}
      </Section>

      {/* ==== Contact (single Gmail CTA) ==== */}
      <Section id="contact" title={t.sections.contact}>
        <div className="flex flex-wrap gap-3 items-center">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(LINKS.email)}&su=${encodeURIComponent("Regarding your portfolio")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Mail className="h-5 w-5" aria-hidden={true} /> {t.send}
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-500">{t.hint}</p>
        <p className="mt-2 text-sm text-gray-500">© {new Date().getFullYear()} Suprabhat. All rights reserved.</p>
      </Section>

      {/* ==== Scroll to top button ==== */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-5 z-40 inline-flex items-center gap-1 px-3 py-2 rounded-xl border bg-white/95 dark:bg-black/70 border-gray-200 dark:border-gray-800 shadow"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" aria-hidden={true} /> {t.top}
        </button>
      )}

      {/* ==== Mobile floating CV bar ==== */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden">
        <div className="flex gap-2 rounded-2xl shadow-lg bg-white/95 dark:bg-black/70 border border-gray-200 dark:border-gray-800 p-2">
          <a
            href={LINKS.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white inline-flex items-center gap-2 hover:bg-indigo-700"
          >
            <Eye className="h-4 w-4" aria-hidden={true} /> {t.viewCV}
          </a>
          <a href={LINKS.cv} download className="px-4 py-2 rounded-xl bg-indigo-600 text-white inline-flex items-center gap-2 hover:bg-indigo-700">
            <Download className="h-4 w-4" aria-hidden={true} /> {t.downloadCV}
          </a>
        </div>
      </div>

      {/* ==== Command palette UI ==== */}
      <Palette />
    </div>
  );
}
