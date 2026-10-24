import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  Terminal,
  Monitor,
  Smartphone,
  Gauge,
  Mail,
  ShieldCheck,
  Zap
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

import mascot from './assets/devforge_in_mascot.png';
import { SkiperButton } from './components/ui/SkiperButton';
import { CursorCard } from './components/ui/cursor-card';
import { AnimatedFooter } from './components/ui/animated-footer';
import { PeekRating } from './components/PeekRating';
import { FloatingDock } from './components/FloatingDock';
import { StudioLoader } from './components/StudioLoader';
import { ParallaxBackground } from './components/ParallaxBackground';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES_DATA = [
  {
    id: 'websites',
    number: '01',
    category: 'WEB ARCHITECTURE',
    title: 'Custom Websites',
    summary: 'Purpose-built websites designed around your brand, content, and conversion goals.',
    description:
      'High-performance, bespoke websites engineered without bloated templates or generic agency frameworks. Every line of markup, styling, and typography is meticulously crafted for fluid responsiveness and instant loading.',
    deliverables: [
      'Bespoke Visual Identity & Layouts',
      'Fluid Responsive Breakpoints (Mobile/Desktop)',
      'SEO Architecture & Meta Standards',
      'Sub-Second First Contentful Paint (<0.8s)',
      'Lighthouse 95+ Performance & A11y'
    ],
    stack: ['React', 'Next.js / Vite', 'Tailwind CSS', 'GSAP', 'TypeScript'],
    idealFor: 'Design studios, founders, businesses, portfolios, and product showcases.'
  },
  {
    id: 'apps',
    number: '02',
    category: 'APPLICATION ENGINEERING',
    title: 'Custom Applications',
    summary: 'Web applications developed around specific workflows, user roles, and data requirements.',
    description:
      'Interactive tools, client portals, and administrative software structured for reliability and clean state management. Designed to feel instantaneous, tactile, and natural for daily use.',
    deliverables: [
      'Interactive Dashboard & Workflow Interfaces',
      'Role-Based Authorization & Session State',
      'REST & GraphQL API Integrations',
      'Real-Time Feedback & Form Validation',
      'Clean Modular Component Architecture'
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Framer Motion'],
    idealFor: 'SaaS utilities, client management platforms, internal tools, and interactive products.'
  },
  {
    id: 'improvements',
    number: '03',
    category: 'SYSTEM MODERNIZATION',
    title: 'Website Improvements',
    summary: 'Targeted modernization for existing sites needing faster speed, modern aesthetics, or refreshed UX.',
    description:
      'Careful refactoring of legacy codebases, resolving performance bottlenecks, upgrading typography, and implementing modern micro-interactions without disrupting established user habits.',
    deliverables: [
      'Core Web Vitals & Speed Optimization',
      'Interface Polish & Micro-Interactions',
      'Mobile UX & Touch Target Refinements',
      'Accessibility & Screen Reader Remediation',
      'Dependency Pruning & Code Optimization'
    ],
    stack: ['CSS Architecture', 'Lighthouse Audits', 'Performance Profiling', 'Refactoring'],
    idealFor: 'Existing websites that feel sluggish, dated, or difficult to maintain.'
  }
];

export default function App() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState('websites');
  const [userRating, setUserRating] = useState(5);

  // Contact form state (budget removed)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Custom Website',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const heroRef = useRef(null);
  const heroMascotRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    if (!loaderComplete) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        '.hero-reveal',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
      );

      if (heroMascotRef.current) {
        gsap.fromTo(
          heroMascotRef.current,
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // Section scroll reveals
      const reveals = gsap.utils.toArray('.gsap-section-reveal');
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [loaderComplete]);

  // Handle direct Gmail redirection
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setFormSubmitted(true);

    const subject = `Project Inquiry from ${formState.name} — ${formState.projectType}`;
    const body = `Hi DevForge,\n\nName: ${formState.name}\nEmail: ${formState.email}\nProject Type: ${formState.projectType}\n\nProject Scope & Vision:\n${formState.message}\n\nLooking forward to hearing from you.`;

    // Direct redirection to Gmail web compose window
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=devforge.in@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open Gmail directly in a new tab
    const newWindow = window.open(gmailUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Fallback to mailto if pop-up blocked
      window.location.href = `mailto:devforge.in@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
  };

  const selectedService =
    SERVICES_DATA.find((s) => s.id === activeServiceId) || SERVICES_DATA[0];

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#FAFAFA] font-body selection:bg-purple-600 selection:text-white overflow-x-hidden">
      {/* 120-Frame Smooth Parallax Animation Background */}
      <ParallaxBackground />

      {/* 5-Square Studio Loader */}
      <StudioLoader onComplete={() => setLoaderComplete(true)} />

      {/* Floating Dock Navigation (replaces the upper nav bar completely) */}
      <FloatingDock />

      <main id="main-content" className="relative z-10">
        {/* ── HOME / HERO SECTION: REBUILT, CLEAN & AESTHETIC ─────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-[92vh] pt-16 pb-20 sm:pt-24 sm:pb-32 flex items-center architectural-grid border-b border-zinc-900/80"
          aria-label="Studio Introduction"
        >
          <div className="max-w-site mx-auto px-6 sm:px-12 w-full">
            {/* Top Studio Label Bar */}
            <div className="hero-reveal flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-zinc-800/80 text-xs text-zinc-400 font-heading">
              <div className="flex items-center gap-3">
                <span className="font-bold text-zinc-100 tracking-wider">devforge.in</span>
                <span className="text-zinc-600">/</span>
                <span className="tracking-wide text-zinc-400">INDEPENDENT DEVELOPMENT STUDIO</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-zinc-500">
                <span>Direct 1:1 Engineering</span>
                <span>•</span>
                <span>Reasonable Pricing</span>
              </div>
            </div>

            {/* Centered Hero Layout with TAN Meringue Typography */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-7 pt-4 sm:pt-8 pb-12">
              <div className="hero-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-purple-300 text-xs font-heading font-medium tracking-wide shadow-md backdrop-blur-md">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>Custom Websites & Applications</span>
              </div>

              <h1 className="hero-reveal font-heading font-normal text-5xl sm:text-7xl lg:text-8xl leading-[1.06] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-600">
                  Your ideas.
                </span>{' '}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-purple-400/80 to-zinc-600 italic">
                  Forged into digital experiences.
                </span>
              </h1>

              <p className="hero-reveal font-body text-base sm:text-lg text-zinc-300/90 leading-relaxed max-w-2xl mx-auto">
                devforge.in is a focused one-person engineering studio. You work directly with
                the developer who designs, codes, and refines your product from first concept
                to finished launch.
              </p>

              {/* Craftsmanship Highlights - Centered Glass Bar */}
              <div
                ref={heroMascotRef}
                className="hero-reveal w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-5 pb-5 px-6 sm:px-8 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md text-xs shadow-xl"
              >
                <div className="text-center sm:border-r sm:border-zinc-800/80 sm:pr-4">
                  <span className="block font-heading font-bold text-zinc-200 text-sm">01. Direct</span>
                  <span className="text-zinc-400">1:1 Engineering with zero agency bloat</span>
                </div>
                <div className="text-center sm:border-r sm:border-zinc-800/80 sm:px-4">
                  <span className="block font-heading font-bold text-zinc-200 text-sm">02. Bespoke</span>
                  <span className="text-zinc-400">Tailored architecture, zero cookie-cutter templates</span>
                </div>
                <div className="text-center sm:pl-4">
                  <span className="block font-heading font-bold text-zinc-200 text-sm">03. Fast</span>
                  <span className="text-zinc-400">Lighthouse 95+ score with pure performance</span>
                </div>
              </div>

              {/* Centered Actions */}
              <div className="hero-reveal flex flex-wrap items-center justify-center gap-4 pt-2">
                <SkiperButton href="#contact" variant="primary">
                  Start a Project
                </SkiperButton>
                <SkiperButton href="#services" variant="dark">
                  Explore Services
                </SkiperButton>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE SERVICES SECTION ───────────────────────────────────── */}
        <section id="services" className="relative py-24 sm:py-32 bg-[#0d0d11]/85 backdrop-blur-md border-b border-zinc-900/80" aria-label="Interactive Services Matrix">
          <div className="max-w-site mx-auto px-6 sm:px-12">
            <div className="gsap-section-reveal mb-14">
              <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-purple-400 mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Interactive Capabilities Lab</span>
              </div>
              <h2 className="font-heading font-bold text-3xl sm:text-5xl tracking-tight text-zinc-100">
                Built around what you actually need.
              </h2>
              <p className="font-body text-sm sm:text-base text-zinc-400 mt-3 max-w-2xl">
                Select any offering below to inspect architectural specifications, exact deliverables,
                and technical tooling.
              </p>
            </div>

            {/* Interactive Grid: Left Services Selector, Right Live Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Service Selectors (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {SERVICES_DATA.map((srv) => {
                  const isActive = activeServiceId === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setActiveServiceId(srv.id)}
                      className={`w-full text-left p-6 rounded-card border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-zinc-900 border-purple-500/80 shadow-lg'
                          : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-900/60 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-purple-400">{srv.number}</span>
                        <span className="text-[11px] font-heading uppercase tracking-wider text-zinc-500">
                          {srv.category}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-zinc-100 mb-2">
                        {srv.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {srv.summary}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs font-heading font-semibold text-purple-400">
                        <span>{isActive ? 'Currently Inspecting' : 'Inspect Details'}</span>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1' : ''}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Live Interactive Inspector Panel (7 cols) */}
              <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-card p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                {/* Header bar of the inspector */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800/80 text-xs">
                  <div className="flex items-center gap-2 font-mono text-zinc-400">
                    <span>SPECIFICATION_INSPECTOR // {selectedService.id.toUpperCase()}</span>
                  </div>
                  <span className="font-mono text-purple-400 text-[11px]">
                    MODULAR ARCHITECTURE
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading font-bold text-2xl text-zinc-100 mb-2">
                      {selectedService.title}
                    </h4>
                    <p className="font-body text-sm text-zinc-300 leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>

                  {/* Concrete Deliverables Checklist */}
                  <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                    <span className="block font-heading font-bold text-xs uppercase tracking-wider text-zinc-400 mb-3">
                      Core Engineering Deliverables
                    </span>
                    <ul className="space-y-2.5">
                      {selectedService.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Stack Tags */}
                  <div>
                    <span className="block font-heading font-bold text-xs uppercase tracking-wider text-zinc-400 mb-2.5">
                      Tooling & Technologies
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.stack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ideal For Note */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-body">
                    <span>
                      <strong className="text-zinc-200">Best Suited For:</strong> {selectedService.idealFor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT SECTION: CLEAN MATTE BACKGROUND WITH CURSORCARD ───────────── */}
        <section id="about" className="relative py-24 sm:py-32 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-900/80" aria-label="About Developer">
          <div className="max-w-site mx-auto px-6 sm:px-12">
            <div className="gsap-section-reveal mb-14">
              <span className="font-heading font-bold text-xs uppercase tracking-widest text-purple-400 block mb-2">
                Developer Identity
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-5xl tracking-tight text-zinc-100">
                A developer, a movie enthusiast, and a builder.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Detailed Narrative with Interactive CursorCards */}
              <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-body">
                <p>
                  I'm an independent developer who enjoys turning ideas into{' '}
                  <CursorCard
                    image={mascot}
                    title="Purpose-Built Software"
                    description="Crafting clean, accessible, and responsive interfaces without unnecessary frameworks or fluff."
                  >
                    things people can actually use
                  </CursorCard>
                  .
                </p>

                <p>
                  I'm 21 years old and have spent{' '}
                  <CursorCard
                    image={mascot}
                    title="Five+ Years of Engineering"
                    description="Half a decade of continuous daily coding, building frontend architectures and shipping real web products."
                  >
                    over five years
                  </CursorCard>{' '}
                  learning, experimenting, and building with code. When I take on a project, I care
                  deeply about the underlying structure, visual rhythm, and final execution.
                </p>

                <p>
                  When I'm not writing code, you'll probably find me{' '}
                  <CursorCard
                    image={mascot}
                    title="Cinematic Storytelling"
                    description="Studying framing, pacing, and visual storytelling in film — principles that directly inform UI motion design."
                  >
                    watching a movie
                  </CursorCard>{' '}
                  or exploring another idea worth building. Cinema teaches that pacing, restraint,
                  and negative space create memorable experiences — lessons that apply directly
                  to digital engineering.
                </p>

                <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-heading">
                  <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                    <span className="block text-zinc-500 uppercase text-[10px] tracking-wider">Age</span>
                    <span className="font-bold text-zinc-100 text-sm">21 Years Old</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                    <span className="block text-zinc-500 uppercase text-[10px] tracking-wider">Experience</span>
                    <span className="font-bold text-zinc-100 text-sm">5+ Years Coding</span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800 col-span-2 sm:col-span-1">
                    <span className="block text-zinc-500 uppercase text-[10px] tracking-wider">Interests</span>
                    <span className="font-bold text-zinc-100 text-sm">Code & Cinema</span>
                  </div>
                </div>
              </div>

              {/* Founder Avatar & Direct Collaboration Panel */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[380px] p-6 rounded-card bg-zinc-900/50 border border-zinc-800 flex flex-col items-center text-center">
                  <div className="w-40 h-40 rounded-xl overflow-hidden mb-5 border border-zinc-700/60 bg-zinc-950">
                    <img
                      src={mascot}
                      alt="DevForge Studio Mascot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-zinc-100 mb-1">
                    devforge.in
                  </h3>
                  <p className="font-body text-xs text-zinc-400 mb-4">
                    One developer. Direct communication. Dedicated execution.
                  </p>
                  <div className="w-full pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
                    <span>STATUS: ACTIVE</span>
                    <span className="text-purple-400">ACCEPTING COMMISSIONS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SELECTED WORK / COMMISSIONS ─────────────────────────────────────── */}
        <section id="work" className="relative py-24 bg-[#0d0d11]/85 backdrop-blur-md border-b border-zinc-900/80" aria-label="Selected Work">
          <div className="max-w-site mx-auto px-6 sm:px-12">
            <div className="gsap-section-reveal p-8 sm:p-12 rounded-card bg-zinc-950/80 backdrop-blur-md border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl space-y-3">
                <span className="text-xs font-mono text-purple-400 tracking-wider uppercase">
                  Selected Work & Commissions
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-zinc-100">
                  Every project begins with an idea worth building.
                </h3>
                <p className="font-body text-sm text-zinc-400 leading-relaxed">
                  The studio accepts select client projects for custom websites and web applications.
                  You work directly with the builder without intermediary layers or marked-up agency fees.
                </p>
              </div>

              <div className="shrink-0">
                <SkiperButton href="#contact" variant="primary">
                  Discuss a Project
                </SkiperButton>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS SECTION ─────────────────────────────────────────────────── */}
        <section id="process" className="relative py-24 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-900/80" aria-label="Process">
          <div className="max-w-site mx-auto px-6 sm:px-12">
            <div className="gsap-section-reveal mb-14">
              <span className="font-heading font-bold text-xs uppercase tracking-widest text-purple-400 block mb-2">
                Collaboration Roadmap
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-5xl tracking-tight text-zinc-100">
                How it works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: '01',
                  title: 'Tell me',
                  line: 'Share your idea, requirements, target audience, and what you want to achieve.'
                },
                {
                  num: '02',
                  title: 'Design',
                  line: 'I create a bespoke interactive prototype and architecture for you to review and approve.'
                },
                {
                  num: '03',
                  title: 'Build',
                  line: 'I write clean, modular code with regular updates and zero surprises along the way.'
                },
                {
                  num: '04',
                  title: 'Deliver',
                  line: 'You receive the finished, tested, and deployment-ready project ready to launch.'
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex flex-col justify-between h-56"
                >
                  <span className="font-mono font-bold text-3xl text-purple-400">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-zinc-100 mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {step.line}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT SECTION: DIRECT GMAIL REDIRECT & NO BUDGET DROPDOWN ─────── */}
        <section id="contact" className="relative py-24 sm:py-32 bg-[#0d0d11]/85 backdrop-blur-md" aria-label="Contact Studio">
          <div className="max-w-site mx-auto px-6 sm:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Outreach Info */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-heading font-bold text-xs uppercase tracking-widest text-purple-400 block mb-2">
                    Direct Contact
                  </span>
                  <h2 className="font-heading font-bold text-3xl sm:text-5xl tracking-tight text-zinc-100 mb-4">
                    Got something worth building?
                  </h2>
                  <p className="font-body text-sm sm:text-base text-zinc-400 leading-relaxed">
                    Tell me what you're thinking about. Whether it's a new website, a custom application,
                    or an idea you're still figuring out, let's talk about it.
                  </p>
                </div>

                {/* Direct Contact Channels */}
                <div className="p-6 rounded-card bg-zinc-950 border border-zinc-800 space-y-5">
                  <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-wider text-zinc-400 font-bold">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span>Direct Studio Inbox</span>
                  </div>
                  <div>
                    <a
                      href="mailto:devforge.in@gmail.com"
                      className="font-heading font-bold text-xl text-zinc-100 hover:text-purple-400 transition-colors block"
                    >
                      devforge.in@gmail.com
                    </a>
                    <span className="text-xs text-zinc-500 mt-1 block">
                      Guaranteed direct response within 24–48 hours.
                    </span>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80">
                    <a
                      href="https://instagram.com/devforge.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-11 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800 hover:border-zinc-700 font-heading font-semibold text-xs transition-all duration-150 flex items-center justify-center gap-2.5 group cursor-pointer"
                    >
                      <InstagramIcon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                      <span>Contact me on Instagram</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
                    </a>
                  </div>
                </div>

                {/* Interactive PeekRating in Contact area */}
                <div className="p-5 rounded-card bg-zinc-950 border border-zinc-800">
                  <span className="block font-heading font-bold text-xs text-zinc-300 mb-1">
                    Studio Experience Rating
                  </span>
                  <span className="block text-[11px] text-zinc-500 mb-3">
                    Interactive score from concept to completion
                  </span>
                  <PeekRating
                    value={userRating}
                    onChange={(val) => setUserRating(val)}
                    labels={['Concept', 'Design', 'Architecture', 'Polish', 'Execution']}
                    activeColor="#A855F7"
                    idleColor="#52525b"
                    tipColor="#18181b"
                    tipTextColor="#FAFAFA"
                  />
                </div>
              </div>

              {/* Right Column: Inquiry Form with Direct Gmail Redirection */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-card bg-zinc-950 border border-zinc-800 shadow-2xl">
                  {formSubmitted ? (
                    <div className="py-10 text-center space-y-4">
                      <CheckCircle2 className="w-14 h-14 text-purple-400 mx-auto" />
                      <h3 className="font-heading font-bold text-2xl text-zinc-100">
                        Opening in Gmail...
                      </h3>
                      <p className="font-body text-sm text-zinc-400 max-w-md mx-auto">
                        Your inquiry has been formulated into a pre-filled message directed to{' '}
                        <strong className="text-zinc-200">devforge.in@gmail.com</strong>.
                      </p>
                      <div className="pt-4 flex justify-center gap-4">
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=devforge.in@gmail.com&su=${encodeURIComponent(
                            `Project Inquiry from ${formState.name}`
                          )}&body=${encodeURIComponent(formState.message)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-semibold text-xs flex items-center gap-2"
                        >
                          Open Gmail Directly <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200 underline font-heading"
                        >
                          Reset form
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block font-heading text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full h-11 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block font-heading text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full h-11 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-heading text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                          Project Type
                        </label>
                        <select
                          value={formState.projectType}
                          onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                          className="w-full h-11 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-purple-500 cursor-pointer"
                        >
                          <option value="Custom Website">Custom Website (Brand / Portfolio / Landing)</option>
                          <option value="Custom Application">Custom Web Application (SaaS / Portal)</option>
                          <option value="Website Improvements">Website Improvements & Optimization</option>
                          <option value="Identity / Logo">Logo & Interface Mark</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-heading text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                          Project Scope & Vision *
                        </label>
                        <textarea
                          rows="4"
                          required
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          placeholder="Describe the project, what you want to achieve, any reference links, or target dates..."
                          className="w-full p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full h-12 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-900/30"
                      >
                        <span>Send Inquiry via Gmail</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>

                      <p className="text-[11px] text-zinc-500 text-center font-mono">
                        Directly launches Gmail compose with pre-filled details to devforge.in@gmail.com
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── REAL ASCII HANDS ANIMATED FOOTER ───────────────────────────────── */}
      <AnimatedFooter
        headingLines={['DEVFORGE', 'STUDIO']}
        leftImage="/animated-footer/hand-left.jpg"
        rightImage="/animated-footer/hand-right.jpg"
        background="#09090b"
        textColor="#FAFAFA"
        charColor="#A855F7"
        hoverColor="#C084FC"
        hoverCharColor="#09090b"
      />
    </div>
  );
}
