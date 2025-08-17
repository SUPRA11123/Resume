import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Quote, PenTool } from "lucide-react";

// Lightweight UI primitives (no external UI kit)
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow bg-white ${className}`}>{children}</div>
);
const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Suprabhat
        </motion.h1>
        <p className="text-xl max-w-2xl">
          Full Stack Developer | Data Scientist | QA Engineer
        </p>
        <div className="flex gap-4 mt-6">
          <a href="mailto:suprabhat.supra@gmail.com">
            <Button className="bg-white text-gray-900">
              <Mail className="h-4 w-4" /> Email
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/in/suprabhat-supra-06956578/"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="bg-white text-gray-900">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </Button>
          </a>
          <a href="https://github.com/SUPRA11123" target="_blank" rel="noreferrer">
            <Button className="bg-white text-gray-900">
              <Github className="h-4 w-4" /> GitHub
            </Button>
          </a>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
        <p className="text-lg leading-relaxed text-gray-700 text-center">
          I am a versatile engineer with 3+ years of professional experience across
          Full Stack Development, Data Science, and QA Automation. Skilled in building
          production-ready web applications, developing AI/ML pipelines, and ensuring
          high-quality standards in software delivery. Passionate about solving real-world
          problems through technology and continuous learning.
        </p>
      </section>

      {/* Experience */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-10 text-center">Experience</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card><CardContent>
            <h3 className="text-xl font-semibold">Student Assistant – Full-Stack Web Development</h3>
            <p className="text-sm text-gray-500">Chair of Economics, Univ. of Siegen | 2024 – 2025</p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>Developed React, TypeScript, GraphQL components.</li>
              <li>Maintained PostgreSQL backend and Next.js SSR.</li>
              <li>Ensured responsive and accessible UI implementation.</li>
            </ul>
          </CardContent></Card>

          <Card><CardContent>
            <h3 className="text-xl font-semibold">Master Thesis – Data Science & Software Development</h3>
            <p className="text-sm text-gray-500">FOXBYTE (CSI Verwaltungs GmbH) | 2023 – 2024</p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>Built AI/ML models (LSTM, ARIMA) for predictive analytics.</li>
              <li>Delivered visualizations and anomaly detection insights.</li>
              <li>Deployed ML pipelines with PyTorch & Keras.</li>
            </ul>
          </CardContent></Card>

          <Card><CardContent>
            <h3 className="text-xl font-semibold">Software Developer</h3>
            <p className="text-sm text-gray-500">IQVIA | 2019 – 2021</p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>Developed enterprise-grade clinical trial platform components.</li>
              <li>Built test automation tools reducing regression cycles.</li>
              <li>Collaborated in cross-functional global scrum teams.</li>
            </ul>
          </CardContent></Card>

          <Card><CardContent>
            <h3 className="text-xl font-semibold">Working Student – Data Analytics & QA</h3>
            <p className="text-sm text-gray-500">Exactag GmbH | 2022</p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>Migrated test suites from Cypress to Playwright.</li>
              <li>Integrated automated tests into CI/CD pipelines.</li>
              <li>Enhanced QA reliability for scalable web products.</li>
            </ul>
          </CardContent></Card>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Key Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card><CardContent>
            <h3 className="text-xl font-semibold">FARMIT – IoT & Deep Learning Project</h3>
            <p className="text-sm text-gray-500">University of Siegen | 2023</p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>React + Django REST; real-time IoT ingestion.</li>
              <li>LSTM forecasting and YOLOv5 detection.</li>
            </ul>
          </CardContent></Card>

          <Card><CardContent>
            <h3 className="text-xl font-semibold">Predictive Maintenance (Master Thesis)</h3>
            <p className="text-sm text-gray-500">FOXBYTE (CSI Verwaltungs GmbH) | 2023 – 2024</p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>Anomaly detection & failure prediction models.</li>
              <li>Explainable dashboards; CI/CD validation.</li>
            </ul>
          </CardContent></Card>

          <Card><CardContent>
            <h3 className="text-xl font-semibold">Clinical Trial Platform</h3>
            <p className="text-sm text-gray-500">IQVIA | 2019 – 2021</p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>Healthcare platform features, automation cut QA by 35%.</li>
              <li>Anomaly detection POCs with Scikit-learn.</li>
            </ul>
          </CardContent></Card>

          <Card><CardContent>
            <h3 className="text-xl font-semibold">Invoice Entity Extraction with BERT</h3>
            <p className="text-sm text-gray-500">Independent Project | 2025</p>
            <ul className="list-disc list-inside mt-3 text-gray-700">
              <li>Fine-tuned BERT for invoice NER.</li>
              <li>Integrated into a web app.</li>
            </ul>
          </CardContent></Card>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Technical Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <Card className="p-4"><p className="font-semibold">React, TypeScript, Next.js</p></Card>
          <Card className="p-4"><p className="font-semibold">Python, Django, FastAPI</p></Card>
          <Card className="p-4"><p className="font-semibold">PostgreSQL, SQL/NoSQL</p></Card>
          <Card className="p-4"><p className="font-semibold">PyTorch, TensorFlow, ML</p></Card>
          <Card className="p-4"><p className="font-semibold">Cypress, Playwright, Selenium</p></Card>
          <Card className="p-4"><p className="font-semibold">Docker, AWS, CI/CD</p></Card>
        </div>
      </section>

      {/* Languages & Strengths */}
      <section className="py-16 px-6 bg-indigo-50">
        <h2 className="text-3xl font-bold mb-10 text-center">Languages & Strengths</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card><CardContent className="text-center">
            <h3 className="text-xl font-semibold mb-4">Languages</h3>
            <ul className="space-y-2 text-gray-700">
              <li>English – Fluent</li>
              <li>German – B1 (in progress)</li>
              <li>Hindi – Native</li>
            </ul>
          </CardContent></Card>

          <Card><CardContent className="text-center">
            <h3 className="text-xl font-semibold mb-4">Strengths</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Attention to Detail</li>
              <li>Problem-Solving & Proactivity</li>
              <li>Collaboration & Communication</li>
              <li>Curiosity & Growth Mindset</li>
              <li>Adaptability & Learning Agility</li>
            </ul>
          </CardContent></Card>
        </div>
      </section>

      {/* References */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-10 text-center">References</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card><CardContent>
            <Quote className="h-6 w-6 text-indigo-600 mb-3" />
            <p className="text-gray-700 italic">
              “Suprabhat has consistently demonstrated strong technical expertise and problem-solving abilities.”
            </p>
            <p className="mt-4 font-semibold">Prof. Dr. Michael Moeller</p>
            <p className="text-sm text-gray-500">Computer Vision Group, University of Siegen</p>
            <p className="text-sm text-gray-500">michael.moeller@uni-siegen.de</p>
          </CardContent></Card>

          <Card><CardContent>
            <Quote className="h-6 w-6 text-indigo-600 mb-3" />
            <p className="text-gray-700 italic">
              “He combines technical knowledge with adaptability, delivering high-quality results in interdisciplinary projects.”
            </p>
            <p className="mt-4 font-semibold">Dr.-Ing. Stefan Herrmann</p>
            <p className="text-sm text-gray-500">Head, FOXBYTE – CSI Verwaltungs GmbH</p>
            <p className="text-sm text-gray-500">Stefan.Herrmann@csi-online.de</p>
          </CardContent></Card>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Blog & Insights</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card><CardContent>
            <PenTool className="h-6 w-6 text-indigo-600 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Leveraging AI for Predictive Maintenance</h3>
            <p className="text-gray-700 text-sm mb-3">
              How models like LSTM and ARIMA optimize equipment health and reduce downtime.
            </p>
            <a href="#" className="text-indigo-600 font-semibold">Read More →</a>
          </CardContent></Card>

          <Card><CardContent>
            <PenTool className="h-6 w-6 text-indigo-600 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Building Scalable Full-Stack Applications</h3>
            <p className="text-gray-700 text-sm mb-3">
              My approach to React + GraphQL with PostgreSQL and modern deployments.
            </p>
            <a href="#" className="text-indigo-600 font-semibold">Read More →</a>
          </CardContent></Card>
        </div>
      </section>

      {/* Download CV */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Download My CV</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="/Suprabhat_CV_FullStackDev.pdf" download><Button><Download className="h-4 w-4" /> Full Stack CV</Button></a>
          <a href="/Suprabhat_SD_CV.pdf" download><Button><Download className="h-4 w-4" /> Software Developer CV</Button></a>
          <a href="/Suprabhat_QA_Engineer_Specialist.pdf" download><Button><Download className="h-4 w-4" /> QA Engineer CV</Button></a>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <p className="mb-6 max-w-xl mx-auto">
          I’m open to exciting opportunities in Full Stack Development, Data Science, and QA Engineering.
          Let’s connect and build something impactful together!
        </p>
        <a href="mailto:suprabhat.supra@gmail.com">
          <Button className="bg-white text-gray-900"><Mail className="h-4 w-4" /> Contact Me</Button>
        </a>
      </section>
    </div>
  );
}
