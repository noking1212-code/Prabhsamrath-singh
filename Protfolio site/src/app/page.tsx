"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowRight,
  Check,
  Command,
  ExternalLink,
  Menu,
  Send,
  X
} from "lucide-react";
import {
  articles,
  commandActions,
  focusCards,
  journey,
  navItems,
  proofItems,
  site,
  skillGroups
} from "@/lib/site";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { scrollYProgress } = useScroll();
  const heroGlow = useTransform(scrollYProgress, [0, 0.4], [0, -120]);

  const filteredCommands = useMemo(() => {
    const needle = query.toLowerCase();
    return commandActions.filter((item) => item.label.toLowerCase().includes(needle));
  }, [query]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const runAction = (href: string) => {
    setCommandOpen(false);
    setMenuOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          style={{ y: heroGlow }}
          className="absolute left-1/2 top-[-16rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_34rem)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />
      </div>

      <Navbar menuOpen={menuOpen} setCommandOpen={setCommandOpen} setMenuOpen={setMenuOpen} />
      <CommandMenu
        open={commandOpen}
        query={query}
        setOpen={setCommandOpen}
        setQuery={setQuery}
        actions={filteredCommands}
        runAction={runAction}
      />

      <section id="home" className="relative z-10 flex min-h-screen items-center px-5 pb-20 pt-28 md:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.82fr]">
          <motion.div {...reveal}>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(37,99,235,0.9)]" />
              Currently Building Zentriva
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
              Prabhsamrath Singh
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] text-white sm:text-7xl lg:text-8xl">
              Developer.
              <br />
              Builder.
              <br />
              Entrepreneur.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Building products, exploring AI, and sharing the journey publicly.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => runAction("#journey")} className="btn-primary">
                Explore My Journey <ArrowRight size={18} />
              </button>
              <button onClick={() => runAction("#contact")} className="btn-secondary">
                Let's Connect
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {site.socials.map((social) => (
                <a key={social.label} href={social.href} className="icon-link" target="_blank" rel="noreferrer" aria-label={social.label}>
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="relative mx-auto w-full max-w-[31rem]">
            <div className="absolute inset-6 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 shadow-premium">
              <Image
                src="/images/profile.jpg"
                alt="Portrait of Prabhsamrath Singh"
                width={900}
                height={900}
                priority
                className="aspect-square rounded-[1.45rem] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="proof">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proofItems.map((item, index) => (
            <motion.div key={item} {...reveal} transition={{ ...reveal.transition, delay: index * 0.06 }} className="surface p-6">
              <p className="text-2xl font-semibold">{item}</p>
              <p className="mt-2 text-sm text-slate-400">A focused pillar of the public journey.</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="story" eyebrow="Story" title="A young builder with serious long-term intent.">
        <motion.div {...reveal} className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-xl leading-9 text-slate-200">
            Prabhsamrath Singh is a Class 12 PCM student passionate about technology, software development, startups, AI, product building, and digital creation.
          </p>
          <div className="space-y-5 text-base leading-8 text-slate-400">
            <p>
              His journey has included learning programming, exploring UI/UX design, working on startup ideas, completing internships, experimenting with AI-powered workflows, and continuously improving as a builder.
            </p>
            <p>
              Today, he focuses on building meaningful products, growing his skills, and documenting the process publicly.
            </p>
          </div>
        </motion.div>
      </Section>

      <Section id="building" eyebrow="Current Focus" title="What I'm Building">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {focusCards.map((card, index) => (
            <motion.article key={card.title} {...reveal} transition={{ ...reveal.transition, delay: index * 0.04 }} className={`surface group p-6 ${card.featured ? "md:col-span-2" : ""}`}>
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-400">
                  Focus
                </span>
                <ExternalLink className="text-slate-500 transition group-hover:text-white" size={18} />
              </div>
              <h3 className="text-2xl font-semibold">{card.title}</h3>
              <p className="mt-4 max-w-xl leading-7 text-slate-400">{card.text}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="skills" eyebrow="Capabilities" title="Skill groups built for product work.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <motion.div key={group.title} {...reveal} className="surface p-6">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="journey" eyebrow="Journey" title="The path is compounding in public.">
        <div className="relative space-y-4 before:absolute before:left-4 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-white/10 md:before:left-1/2">
          {journey.map((item, index) => (
            <motion.div key={item} {...reveal} className={`relative grid gap-4 md:grid-cols-2 ${index % 2 ? "md:text-left" : "md:text-right"}`}>
              <div className={index % 2 ? "md:col-start-2" : ""}>
                <div className="surface ml-10 p-5 md:ml-0">
                  <p className="text-sm text-slate-500">0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold">{item}</h3>
                </div>
              </div>
              <span className="absolute left-4 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-accent md:left-1/2" />
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="blog" eyebrow="Blog" title="A scalable writing system for the journey.">
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <motion.article key={article.title} {...reveal} className="surface p-6">
              <span className="text-sm font-medium text-accent">{article.tag}</span>
              <h3 className="mt-4 text-2xl font-semibold">{article.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{article.description}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="philosophy" eyebrow="What Drives Me" title="Technology should become impact.">
        <motion.div {...reveal} className="surface p-8 md:p-12">
          <p className="max-w-4xl text-2xl leading-10 text-slate-100">
            I believe technology is one of the most powerful tools for creating impact.
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            My focus is on building useful products, learning relentlessly, and sharing the journey openly.
          </p>
        </motion.div>
      </Section>

      <Newsletter />
      <Contact />
      <Footer />
    </main>
  );
}

function Navbar({ menuOpen, setMenuOpen, setCommandOpen }: {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  setCommandOpen: (value: boolean) => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#home" className="text-sm font-semibold tracking-wide">{site.name}</a>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-slate-400 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCommandOpen(true)} className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-400 transition hover:text-white md:flex">
            <Command size={16} />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="icon-link md:hidden" aria-label="Open menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="border-t border-white/10 bg-ink/95 px-5 py-5 backdrop-blur-xl md:hidden">
          <div className="grid gap-3">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-slate-300 hover:bg-white/[0.04]">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function CommandMenu({ open, query, setOpen, setQuery, actions, runAction }: {
  open: boolean;
  query: string;
  setOpen: (value: boolean) => void;
  setQuery: (value: string) => void;
  actions: typeof commandActions;
  runAction: (href: string) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="mx-auto mt-24 max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#080d19] shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Command size={18} className="text-slate-500" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} autoFocus placeholder="Search pages, links, and posts..." className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-slate-600" />
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {actions.map((action) => (
            <button key={`${action.type}-${action.label}`} onClick={() => runAction(action.href)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-white/[0.05]">
              <span className="flex items-center gap-3">
                <action.icon size={17} className="text-slate-500" />
                <span>{action.label}</span>
              </span>
              <span className="text-xs text-slate-500">{action.type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: {
  id: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title) && (
          <motion.div {...reveal} className="mb-10 max-w-3xl">
            {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{eyebrow}</p>}
            {title && <h2 className="text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

function Newsletter() {
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email") })
    });
    setStatus(response.ok ? "You're on the journey list." : "Please check the email and try again.");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <Section id="newsletter" eyebrow="Follow the Journey" title="Updates on projects, experiments, lessons, and growth.">
      <motion.form {...reveal} onSubmit={submit} className="surface flex flex-col gap-3 p-4 sm:flex-row">
        <input name="email" type="email" required placeholder="Email address" className="min-h-12 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-4 outline-none placeholder:text-slate-600" />
        <button className="btn-primary justify-center" type="submit">
          Follow <Check size={18} />
        </button>
      </motion.form>
      {status && <p className="mt-3 text-sm text-slate-400">{status}</p>}
    </Section>
  );
}

function Contact() {
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        message: form.get("message")
      })
    });
    setStatus(response.ok ? "Message sent. Thank you." : "Something went wrong. Please try email instead.");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Let's Build Something Great">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
        <motion.form {...reveal} onSubmit={submit} className="surface grid gap-4 p-5 md:p-6">
          <input name="name" required placeholder="Name" className="field" />
          <input name="email" type="email" required placeholder="Email" className="field" />
          <textarea name="message" required placeholder="Message" rows={6} className="field resize-none" />
          <button type="submit" className="btn-primary justify-center">
            Send Message <Send size={18} />
          </button>
          {status && <p className="text-sm text-slate-400">{status}</p>}
        </motion.form>
        <motion.div {...reveal} className="surface p-6">
          <p className="text-lg leading-8 text-slate-300">
            Open to clients, collaborators, startup conversations, internships, and product opportunities.
          </p>
          <div className="mt-8 grid gap-3">
            {site.socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-300 transition hover:border-white/20 hover:text-white">
                <span className="flex items-center gap-3">
                  <social.icon size={18} />
                  {social.label}
                </span>
                <ExternalLink size={16} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="mt-2 text-sm text-slate-500">Developer. Builder. Entrepreneur.</p>
          <p className="mt-1 text-sm text-slate-500">{site.description}</p>
        </div>
        <div className="flex gap-3">
          {site.socials.map((social) => (
            <a key={social.label} href={social.href} className="icon-link" target="_blank" rel="noreferrer" aria-label={social.label}>
              <social.icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
