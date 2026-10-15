import type { Locale } from "../i18n/config";

export interface Link {
  label: string;
  href: string;
}

export interface Role {
  title: string;
  company: string;
  location: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM"; omitted while the role is ongoing */
  end?: string;
  highlights: string[];
}

export interface SkillGroup {
  /** Key into the interface strings (src/i18n/ui.ts) */
  labelKey: "skills.main" | "skills.stack";
  items: string[];
}

export interface Education {
  title: string;
  institution: string;
  period: string;
}

export interface Profile {
  name: string;
  headline: string;
  intro: string;
  summary: string[];
  links: Link[];
  experience: Role[];
  skills: SkillGroup[];
  education: Education[];
}

const links: Link[] = [
  { label: "GitHub", href: "https://github.com/dpontejs" },
  { label: "LinkedIn", href: "https://linkedin.com/in/diegopontejs" },
  { label: "Email", href: "mailto:dpontejs@gmail.com" },
];

const stack = [
  "Python",
  "PyTorch",
  "scikit-learn",
  "Pandas",
  "NumPy",
  "SQL",
  "FastAPI",
  "MLflow",
  "LangChain",
  "LangGraph",
  "RabbitMQ",
  "Docker",
];

/** Profile content, from the resume. Both languages must keep the same structure (tested). */
export const profile: Record<Locale, Profile> = {
  en: {
    name: "Diego Ponte",
    headline:
      "Machine Learning Engineer · AI Engineering & Computer Vision · Deep Learning, RAG & LLMs",
    intro:
      "I build machine learning systems that work in real applications, from medical imaging to generative AI.",
    summary: [
      "Machine Learning Engineer with 2+ years of hands-on experience building Machine Learning, Deep Learning and AI solutions across different domains.",
      "I work across data preparation and processing, experimentation, model development and evaluation, Computer Vision, predictive models and the integration of AI into software applications.",
      "I also build with Generative AI, LLMs, RAG and multi-agent systems, combining modeling and software engineering to create AI systems for real-world applications.",
    ],
    links,
    experience: [
      {
        title: "AI Engineer",
        company: "Metrópole Digital — IMD/UFRN",
        location: "Natal, Brazil · Remote",
        start: "2026-07",
        end: "2026-09",
        highlights: [
          "Built Generative AI applications with LLMs, LangChain and LangGraph.",
          "Built RAG pipelines and multi-agent systems for process automation.",
          "Implemented prompt engineering, structured outputs and pre/post-processing flows to make answers more reliable.",
          "Researched and implemented Agentic AI architectures integrated with enterprise systems.",
          "Took part in technical meetings in English with international teams and stakeholders.",
        ],
      },
      {
        title: "Machine Learning Engineer",
        company: "Intersistemas Serviços em Tecnologia",
        location: "Natal, Brazil · On-site",
        start: "2025-06",
        end: "2026-09",
        highlights: [
          "Developed Machine Learning and Computer Vision solutions for medical images, including classification and analysis of digitized slides.",
          "Built and evaluated Deep Learning pipelines with Python and PyTorch on high-resolution medical images.",
          "Integrated AI models with slide scanning and viewing systems, bringing results into the application workflow.",
          "Developed and integrated services through APIs and message brokers, connecting AI pipelines to the existing software infrastructure.",
          "Worked across modeling, data processing and backend, focused on AI systems usable in real applications.",
        ],
      },
      {
        title: "Data Analyst",
        company: "Controladoria-Geral do Estado do Rio Grande do Norte (CONTROL)",
        location: "Natal, Brazil · On-site",
        start: "2025-02",
        end: "2025-05",
        highlights: [
          "Built dashboards and Business Intelligence solutions to support decision-making at the State Comptroller's Office.",
          "Built visualizations and analyses of financial and government data with Power BI and Tableau.",
          "Developed public transparency dashboards and indicator tracking.",
        ],
      },
      {
        title: "Computer Vision Engineer",
        company: "Federal University of Rio Grande do Norte (UFRN)",
        location: "Natal, Brazil · On-site",
        start: "2024-10",
        end: "2025-05",
        highlights: [
          "Developed a Computer Vision system to estimate the water level in tanks, complementing sensor measurements.",
          "Researched and implemented image processing and Machine Learning techniques to make measurements more robust.",
          "Investigated applications of AI in industrial instrumentation and automation systems.",
          "Experimental development with Python, OpenCV, Machine Learning and Deep Learning.",
        ],
      },
      {
        title: "Machine Learning & Software Engineer",
        company: "iRede",
        location: "Manaus, Brazil · Remote",
        start: "2024-06",
        end: "2024-12",
        highlights: [
          "Developed and evolved the backend of the Homero educational platform, including refactoring and new features.",
          "Built a Machine Learning solution to predict the success/performance of high-school students using educational data.",
          "Took part in data preparation, experimentation and evaluation of machine learning models for education.",
          "Applied Software Engineering practices, Clean Code and Design Patterns to improve maintainability.",
          "Collaborated with a multidisciplinary team on technical solutions for product and education problems.",
        ],
      },
    ],
    skills: [
      {
        labelKey: "skills.main",
        items: [
          "Machine Learning",
          "Artificial Intelligence",
          "Deep Learning",
          "Computer Vision",
          "Generative AI",
          "LLMs",
        ],
      },
      { labelKey: "skills.stack", items: stack },
    ],
    education: [
      {
        title: "B.Sc. in Computer Engineering",
        institution: "Federal University of Rio Grande do Norte (UFRN)",
        period: "2022 – present",
      },
      {
        title: "Machine Learning Specialization",
        institution: "DeepLearning.AI & Stanford Online",
        period: "2024",
      },
    ],
  },
  pt: {
    name: "Diego Ponte",
    headline:
      "Machine Learning Engineer · AI Engineering & Computer Vision · Deep Learning, RAG & LLMs",
    intro:
      "Construo sistemas de machine learning que funcionam em aplicações reais, de imagens médicas a IA generativa.",
    summary: [
      "Machine Learning Engineer com mais de 2 anos de experiência prática no desenvolvimento de soluções de Machine Learning, Deep Learning e Inteligência Artificial aplicadas a diferentes domínios.",
      "Tenho experiência com preparação e processamento de dados, experimentação, desenvolvimento e avaliação de modelos, Computer Vision, modelos preditivos e integração de soluções de IA com aplicações de software.",
      "Também atuo com Generative AI, LLMs, RAG e sistemas multiagentes, combinando modelagem, engenharia de software e construção de sistemas de IA voltados para aplicações reais.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/dpontejs" },
      { label: "LinkedIn", href: "https://linkedin.com/in/diegopontejs" },
      { label: "E-mail", href: "mailto:dpontejs@gmail.com" },
    ],
    experience: [
      {
        title: "AI Engineer",
        company: "Metrópole Digital — IMD/UFRN",
        location: "Natal, RN · Remoto",
        start: "2026-07",
        end: "2026-09",
        highlights: [
          "Desenvolvimento de aplicações de IA Generativa com LLMs, LangChain e LangGraph.",
          "Construção de pipelines de RAG e sistemas multiagentes para automação de processos.",
          "Implementação de prompt engineering, structured outputs e fluxos de pré/pós-processamento para aumentar a confiabilidade das respostas.",
          "Pesquisa e implementação de arquiteturas de Agentic AI integradas a sistemas corporativos.",
          "Colaboração em reuniões técnicas conduzidas em inglês com equipes e stakeholders internacionais.",
        ],
      },
      {
        title: "Machine Learning Engineer",
        company: "Intersistemas Serviços em Tecnologia",
        location: "Natal, RN · Presencial",
        start: "2025-06",
        end: "2026-09",
        highlights: [
          "Desenvolvimento de soluções de Machine Learning e Computer Vision para imagens médicas, incluindo classificação e análise de lâminas digitalizadas.",
          "Desenvolvimento e avaliação de pipelines de Deep Learning com Python e PyTorch, trabalhando com imagens médicas de alta resolução.",
          "Integração de modelos de IA com sistemas de scanner e visualização de lâminas, permitindo o uso dos resultados dentro do fluxo da aplicação.",
          "Desenvolvimento e integração de serviços por meio de APIs e sistemas de mensageria, conectando pipelines de IA à infraestrutura de software existente.",
          "Atuação entre modelagem, processamento de dados e backend, com foco na construção de sistemas de IA utilizáveis em aplicações reais.",
        ],
      },
      {
        title: "Data Analyst",
        company: "Controladoria-Geral do Estado do Rio Grande do Norte (CONTROL)",
        location: "Natal, RN · Presencial",
        start: "2025-02",
        end: "2025-05",
        highlights: [
          "Desenvolvimento de dashboards e soluções de Business Intelligence para suporte à tomada de decisão na Controladoria do Estado.",
          "Construção de visualizações e análises sobre dados financeiros e governamentais utilizando Power BI e Tableau.",
          "Desenvolvimento de painéis voltados à transparência pública e acompanhamento de indicadores.",
        ],
      },
      {
        title: "Computer Vision Engineer",
        company: "Universidade Federal do Rio Grande do Norte (UFRN)",
        location: "Natal, RN · Presencial",
        start: "2024-10",
        end: "2025-05",
        highlights: [
          "Desenvolvimento de um sistema de Computer Vision para estimativa do nível de água em tanques, complementando medições provenientes de sensores.",
          "Pesquisa e implementação de técnicas de image processing e Machine Learning para melhorar a robustez das medições.",
          "Investigação da aplicação de IA em sistemas de instrumentação e automação industrial.",
          "Desenvolvimento experimental utilizando Python, OpenCV, Machine Learning e Deep Learning.",
        ],
      },
      {
        title: "Machine Learning & Software Engineer",
        company: "iRede",
        location: "Manaus, AM · Remoto",
        start: "2024-06",
        end: "2024-12",
        highlights: [
          "Atuação no desenvolvimento e evolução do backend da plataforma educacional Homero, incluindo refatoração de código e implementação de novas funcionalidades.",
          "Desenvolvimento de uma solução de Machine Learning para predição de sucesso/desempenho de estudantes do ensino médio, trabalhando com dados educacionais.",
          "Participação nas etapas de preparação de dados, experimentação e avaliação de modelos de aprendizado de máquina aplicados ao contexto educacional.",
          "Aplicação de práticas de Software Engineering, Clean Code e Design Patterns para melhorar a manutenibilidade da aplicação.",
          "Colaboração com equipe multidisciplinar na implementação de soluções técnicas para problemas de produto e educação.",
        ],
      },
    ],
    skills: [
      {
        labelKey: "skills.main",
        items: [
          "Machine Learning",
          "Inteligência Artificial",
          "Deep Learning",
          "Computer Vision",
          "Generative AI",
          "LLMs",
        ],
      },
      { labelKey: "skills.stack", items: stack },
    ],
    education: [
      {
        title: "Bacharelado em Engenharia de Computação",
        institution: "Universidade Federal do Rio Grande do Norte (UFRN)",
        period: "2022 – presente",
      },
      {
        title: "Machine Learning Specialization",
        institution: "DeepLearning.AI & Stanford Online",
        period: "2024",
      },
    ],
  },
};
