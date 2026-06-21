import {
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Twitter
} from "lucide-react";

export const site = {
  name: "Prabhsamrath Singh",
  tagline: "Developer. Builder. Entrepreneur.",
  description: "Building products, exploring AI, and sharing the journey publicly.",
  email: "prabhsamrathsingh1212@gmail.com",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/noking1212-code",
      icon: Github
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/prabhsamrath-singh/",
      icon: Linkedin
    },
    {
      label: "X",
      href: "https://x.com/prabhsamrath",
      icon: Twitter
    },
    {
      label: "Email",
      href: "mailto:prabhsamrathsingh1212@gmail.com",
      icon: Mail
    }
  ]
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Story", href: "#story" },
  { label: "Building", href: "#building" },
  { label: "Journey", href: "#journey" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" }
];

export const proofItems = ["Building", "Learning", "Creating", "Sharing"];

export const focusCards = [
  {
    title: "Zentriva",
    text: "Building a technology-driven platform designed to solve meaningful real-world problems.",
    featured: true
  },
  { title: "AI Experiments", text: "Testing practical workflows that compress learning and product iteration." },
  { title: "Personal Brand Growth", text: "Sharing progress, lessons, and the honest path behind the work." },
  { title: "Product Development", text: "Turning promising ideas into usable, carefully shaped product systems." },
  { title: "Learning & Exploration", text: "Deepening foundations across engineering, design, startups, and AI." }
];

export const skillGroups = [
  { title: "Programming", skills: ["Java", "Python", "TypeScript"] },
  { title: "Frontend", skills: ["Next.js", "React", "Tailwind CSS"] },
  { title: "Backend", skills: ["API Development", "Node.js"] },
  { title: "Database", skills: ["PostgreSQL", "Prisma"] },
  { title: "Design", skills: ["Figma", "Canva"] },
  { title: "Tools", skills: ["Git", "GitHub", "VS Code"] }
];

export const journey = [
  "Student",
  "Learning Programming",
  "Exploring Startups",
  "Internships",
  "Building Products",
  "Growing Personal Brand",
  "Future: Entrepreneurship, Competitive Programming, Scalable Technology"
];

export const articles = [
  {
    title: "Building Zentriva",
    description: "Notes from shaping an ambitious product from idea to execution.",
    tag: "Product"
  },
  {
    title: "Lessons from Learning Programming",
    description: "A builder's record of getting better through fundamentals and projects.",
    tag: "Engineering"
  },
  {
    title: "Exploring AI as a Student",
    description: "How AI tools can become a serious advantage for young builders.",
    tag: "AI"
  },
  {
    title: "Startup Experiments and Learnings",
    description: "Reflections on trying, testing, and improving with public momentum.",
    tag: "Startups"
  }
];

export const commandActions = [
  ...navItems.map((item) => ({ ...item, type: "Navigate", icon: Sparkles })),
  ...site.socials.map((item) => ({ ...item, type: "Open", icon: item.icon })),
  ...articles.map((article) => ({
    label: article.title,
    href: "#blog",
    type: "Article",
    icon: Sparkles
  }))
];
