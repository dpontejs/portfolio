import type { Locale } from "./config";

/** Interface strings (labels, headings). Profile content lives in src/data/profile.ts. */
export const ui = {
  en: {
    "meta.title": "Diego Ponte — Machine Learning Engineer",
    "meta.description":
      "Machine Learning Engineer working on AI engineering, computer vision, deep learning, RAG and LLMs.",
    "a11y.skip": "Skip to content",
    "a11y.themeToggle": "Toggle dark mode",
    "a11y.social": "Social links",
    "a11y.languages": "Language",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.education": "Education",
    "hero.greeting": "Hi, I'm",
    "skills.main": "Main areas",
    "skills.stack": "Stack",
    "period.present": "Present",
    "language.name": "English",
  },
  pt: {
    "meta.title": "Diego Ponte — Machine Learning Engineer",
    "meta.description":
      "Machine Learning Engineer com foco em AI engineering, visão computacional, deep learning, RAG e LLMs.",
    "a11y.skip": "Pular para o conteúdo",
    "a11y.themeToggle": "Alternar modo escuro",
    "a11y.social": "Redes sociais",
    "a11y.languages": "Idioma",
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.skills": "Competências",
    "nav.education": "Formação",
    "hero.greeting": "Olá, eu sou",
    "skills.main": "Principais áreas",
    "skills.stack": "Stack",
    "period.present": "Atual",
    "language.name": "Português",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)["en"];
