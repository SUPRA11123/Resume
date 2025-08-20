import React, { useState } from "react";
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
} from "lucide-react";

// --- Central links (replace # with real URLs where noted) ---
const LINKS = {
  profilePic: "/profile.jpg", // TODO: replace with your profile picture path
  linkedIn: "https://www.linkedin.com/in/suprabhat-supra-06956578/",
  github: "https://github.com/", // TODO: point to your username
  email: "mailto:suprabhat.supra@gmail.com",
  farmit: "https://www.github.com/SUPRA11123/farmit", // TODO: repo/demo link
  iqviaSilverAward: "https://drive.google.com/file/d/1hGztDkvSwgO16X5ZLBoS2DcFYHhZYQVR/view", // TODO: proof link
  refMoellerProfile: "#", // optional
  THESIS: "https://drive.google.com/file/d/1JPdlajG-5PPOVeW2WBuHErLQKAy0Yd2R/view",
  refHerrmannProfile: "https://drive.google.com/file/d/1D_zgo8iJUt1FvGAtP6rhhzjX5UYEdFES/view", // optional
};

// Lightweight UI primitives
const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full border text-sm text-gray-700 dark:text-gray-200 border-gray-300/70 dark:border-gray-700/70">
    {children}
  </span>
);

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="max-w-5xl mx-auto px-6 py-16">
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
    >
      {title}
    </motion.h2>
    <div>{children}</div>
  </section>
);

export default function Portfolio() {
  const [open, setOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0b0b0d] dark:text-gray-100">
      {/* ===== Top Nav ===== */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/30 bg-white/80 dark:bg-black/40 border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-6xl mx-auto flex items-center gap-4 px-6 h-16">
          <a href="#home" className="font-semibold tracking-tight text-xl md:text-2xl">Suprabhat</a>

          <nav className="hidden md:flex ml-auto items-center gap-6 text-sm">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:opacity-80">
                {n.label}
              </a>
            ))}
            <a
              href="/Suprabhat_CV_FullStackDev.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              View CV
            </a>
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
              <div className="flex flex-col gap-4">
                {nav.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="text-base"
                  >
                    {n.label}
                  </a>
                ))}
                <a
                  href="/Suprabhat_CV_FullStackDev.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white"
                >
                  <Download className="h-4 w-4" /> View CV
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ===== Hero ===== */}
      <section id="home" className="max-w-6xl mx-auto px-6 pt-16 pb-10">
    <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
    <motion.img
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    src={LINKS.profilePic}           // e.g. "/profile.jpg"
    alt="Profile"
    className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-indigo-600"
  />
  <div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Building reliable products across <span className="text-indigo-600">Full‑Stack</span>,
          <br className="hidden md:block" /> <span className="text-indigo-600">Data Science</span> & QA.
        </motion.h1>
        <p className="mt-5 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          I craft responsive web apps, production ML pipelines, and robust test automation. Currently based in Germany.
        </p>
        </div></div>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="/Suprabhat_CV_FullStackDev.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Download className="h-4 w-4" /> View CV (Full‑Stack)
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
      </section>

      {/* ===== Experience ===== */}
      <Section id="experience" title="Experience">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border dark:border-gray-800">
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

          <div className="p-6 rounded-2xl border dark:border-gray-800">
            <h3 className="text-xl font-semibold">Master Thesis – Data Science & Software Development</h3>
            <p className="text-sm text-gray-500">FOXBYTE (CSI Verwaltungs GmbH) • 2023 – 2024</p>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>Forecasting with LSTM/ARIMA; anomaly detection & dashboards.</li>
              <li>End‑to‑end ML with PyTorch/Keras; deployment & explainability.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border dark:border-gray-800">
            <h3 className="text-xl font-semibold">Software Developer</h3>
            <p className="text-sm text-gray-500">IQVIA • 2019 – 2021</p>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>Enterprise clinical platform features; automation reduced QA cycle time.</li>
              <li>
                Team was recognized with <span className="font-medium">IQVIA Silver Award</span>
                <a href={LINKS.iqviaSilverAward} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:underline ml-1">
                <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border dark:border-gray-800">
            <h3 className="text-xl font-semibold">Working Student – Data Analytics & QA</h3>
            <p className="text-sm text-gray-500">Exactag GmbH • 2022</p>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>Migrated end‑to‑end tests from Cypress to Playwright; CI integration.</li>
            </ul>
          </div>
        </div>
      </Section>
       {/* ===== Education ===== */}
<Section id="education" title="Education">
  <div className="space-y-6">
    <div className="p-6 rounded-2xl border dark:border-gray-800">
      <h3 className="text-xl font-semibold">Master of Science – Computer Science</h3>
      <p className="text-sm text-gray-500">Universität Siegen • Siegen, Germany • October 2021 – March 2025</p>
      <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
        <li>Specialized in Data Science, Full-Stack Development, and QA Engineering.</li>
        <li>Master Thesis on Predictive Maintenance with IoT time-series data.</li>
      </ul>
    </div>

    <div className="p-6 rounded-2xl border dark:border-gray-800">
      <h3 className="text-xl font-semibold">Bachelor of Technology – Computer Science</h3>
      <p className="text-sm text-gray-500">Cochin University of Science and Technology • Kochi, India • 2015 – 2019</p>
      <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
        <li>Built strong foundations in Software Engineering, Algorithms, and Databases.</li>
        <li>Graduated with projects in AI and Web Development.</li>
      </ul>
    </div>
  </div>
</Section>
 
      {/* ===== Projects ===== */}
      <Section id="projects" title="Highlighted Projects">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border dark:border-gray-800">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">FARMIT – IoT & Deep Learning</h3>
                <p className="text-sm text-gray-500">University of Siegen • 2023</p>
              </div>
              <a href={LINKS.farmit} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:underline">
                View <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>React + Django REST, real‑time IoT ingestion.</li>
              <li>LSTM forecasting & YOLOv5 detection.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border dark:border-gray-800">
            <h3 className="text-xl font-semibold">Invoice Entity Extraction with BERT</h3>
            <p className="text-sm text-gray-500">Independent • 2025</p>
            <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
              <li>Fine‑tuned BERT for invoice NER; integrated into a web app.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ===== Skills ===== */}
      <Section id="skills" title="Skills">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["React, TypeScript, Next.js","Python, Django, FastAPI","PostgreSQL, SQL/NoSQL","PyTorch, TensorFlow, ML","Cypress, Playwright, Selenium","Docker, AWS, CI/CD"].map((s) => (
            <div key={s} className="p-4 rounded-2xl border text-center dark:border-gray-800">{s}</div>
          ))}
        </div>
      </Section>

      {/* ===== Certifications ===== */}
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

      {/* ===== Thesis ===== */}
      <Section id="thesis" title="Thesis & Publications">
        <div className="p-6 rounded-2xl border dark:border-gray-800">
          <h3 className="text-xl font-semibold">Master Thesis – Predictive Maintenance</h3>
          <p className="text-sm text-gray-500">FOXBYTE (CSI Verwaltungs GmbH) • 2023 – 2024</p>
          <ul className="list-disc list-inside mt-3 text-gray-700 dark:text-gray-300">
            <li>Time‑series forecasting (LSTM/ARIMA/SARIMAX), anomaly detection, explainable dashboards.</li>
            <li>CI/CD validation and production‑ready ML pipelines.</li>
          </ul>
        </div>
      </Section>

      {/* ===== References ===== */}
      <Section id="references" title="References">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border dark:border-gray-800">
            <Quote className="h-6 w-6 text-indigo-600 mb-3" />
            <p className="italic text-gray-700 dark:text-gray-300">
              “Suprabhat has consistently demonstrated strong technical expertise and problem‑solving abilities.”
            </p>
            <div className="mt-4">
              <p className="font-semibold">
                <a href={LINKS.refMoellerProfile} target="_blank" rel="noreferrer" className="hover:underline">
                  Prof. Dr. Michael Moeller
                </a>
              </p>
              <p className="text-sm text-gray-500">Computer Vision Group, University of Siegen</p>
              <p className="text-sm text-gray-500">
                <a href="mailto:michael.moeller@uni-siegen.de" className="text-indigo-600 hover:underline">
                  michael.moeller@uni-siegen.de
                </a>
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border dark:border-gray-800">
            <Quote className="h-6 w-6 text-indigo-600 mb-3" />
            <p className="italic text-gray-700 dark:text-gray-300">
              “He combines technical knowledge with adaptability, delivering high‑quality results in interdisciplinary projects.”
            </p>
            <div className="mt-4">
              <p className="font-semibold">
                <a href={LINKS.refHerrmannProfile} target="_blank" rel="noreferrer" className="hover:underline">
                  Dr.-Ing. Stefan Herrmann
                </a>
              </p>
              <p className="text-sm text-gray-500">Head, FOXBYTE – CSI Verwaltungs GmbH</p>
              <p className="text-sm text-gray-500">
                <a href="mailto:Stefan.Herrmann@csi-online.de" className="text-indigo-600 hover:underline">
                  Stefan.Herrmann@csi-online.de
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== Contact / Footer ===== */}
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

      {/* Mobile floating CV bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden">
        <div className="flex gap-2 rounded-2xl shadow-lg bg-white/95 dark:bg-black/70 border border-gray-200 dark:border-gray-800 p-2">
          <a
            href="/Suprabhat_CV_FullStackDev.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
          >
            View CV
          </a>
          <a href="/Suprabhat_CV_FullStackDev.pdf" download className="px-4 py-2 rounded-xl border">
            Download
          </a>
        </div>
      </div>
    </div>
  );
}