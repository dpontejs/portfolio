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
  { label: "Email", href: "mailto:diego@diegoponte.dev" },
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
    // From Diego's LinkedIn "About" (written in English by him).
    summary: [
      "I am a Machine Learning Engineer and Computer Engineering student at UFRN, with 2+ years of experience building Machine Learning, Deep Learning, Computer Vision, and Generative AI solutions for real-world problems.",
      "My main focus is Machine Learning and Computer Vision, currently applied to medical imaging. I work on the development and evaluation of Deep Learning models for high-resolution images, covering data preparation, experimentation, training, model evaluation, and integration with real applications through APIs, backend services, and messaging systems.",
      "I also work with AI Engineering and Generative AI, developing solutions based on LLMs, Retrieval-Augmented Generation (RAG), and multi-agent systems using LangChain and LangGraph. My work includes architecture discussions, agentic workflows, prompt engineering, structured outputs, preprocessing and post-processing pipelines, and response validation. I also take part in technical meetings conducted in English with international teams and stakeholders.",
      "My previous experience includes Machine Learning applied to educational data, involving data preparation, experimentation, and predictive modeling, as well as Computer Vision for instrumentation and automation systems.",
      "My main technical stack includes Python, PyTorch, scikit-learn, Deep Learning, Computer Vision, FastAPI, SQL, LangChain, LangGraph, RAG, LLMs, and RabbitMQ. I am currently deepening my knowledge in MLOps, cloud, model deployment, observability, and ML/AI systems in production.",
      "I am primarily interested in opportunities as a Machine Learning Engineer, AI Engineer, and Applied AI Engineer, as well as roles related to Computer Vision and Generative AI, especially in teams working at the intersection of modeling, software engineering, and production ML systems.",
    ],
    links,
    experience: [
      {
        title: "AI Engineer",
        company: "Metrópole Digital — IMD/UFRN",
        location: "Natal, Brazil · Remote",
        start: "2026-07",
        highlights: [
          "Developed Generative AI applications using LLMs, LangChain, and LangGraph.",
          "Built RAG pipelines and multi-agent systems for process automation.",
          "Implemented prompt engineering, structured outputs, and preprocessing/post-processing workflows to improve response reliability.",
          "Researched and implemented Agentic AI architectures integrated with enterprise systems.",
          "Collaborated in technical meetings conducted in English with international teams and stakeholders.",
        ],
      },
      {
        title: "Machine Learning Engineer",
        company: "Intersistemas Serviços em Tecnologia",
        location: "Natal, Brazil · On-site",
        start: "2025-06",
        highlights: [
          "Developed Machine Learning and Computer Vision solutions for medical imaging, including classification and analysis of digitized pathology slides.",
          "Built and evaluated Deep Learning pipelines using Python and PyTorch for high-resolution medical images.",
          "Worked across data preprocessing, experimentation, model training, evaluation, and inference workflows.",
          "Integrated ML models with existing scanner and image visualization systems, enabling model outputs to be used within real application workflows.",
          "Developed and integrated services through APIs and messaging systems, connecting ML pipelines to existing software infrastructure.",
          "Worked at the intersection of Machine Learning, backend development, and data processing, with a focus on building reliable AI systems for real-world applications.",
        ],
      },
      {
        title: "Data Analyst",
        company: "Controladoria-Geral do Estado do Rio Grande do Norte (CONTROL)",
        location: "Natal, Brazil · On-site",
        start: "2025-02",
        end: "2025-05",
        highlights: [
          "Developed Business Intelligence dashboards and data solutions to support decision-making at the State Comptroller's Office.",
          "Built data visualizations and analyses on financial and government data using Power BI and Tableau.",
          "Developed dashboards focused on public transparency and KPI monitoring.",
        ],
      },
      {
        title: "Computer Vision Engineer",
        company: "Federal University of Rio Grande do Norte (UFRN)",
        location: "Natal, Brazil · On-site",
        start: "2024-10",
        end: "2025-05",
        highlights: [
          "Developed a Computer Vision system for water level estimation in tanks, complementing measurements from existing sensors.",
          "Researched and implemented image processing and Machine Learning techniques to improve measurement robustness and reliability.",
          "Investigated the application of AI in instrumentation and industrial automation systems.",
          "Conducted experimental development using Python, OpenCV, Machine Learning, and Deep Learning.",
        ],
      },
      {
        title: "Machine Learning & Software Engineer",
        company: "iRede",
        location: "Manaus, Brazil · Remote",
        start: "2024-06",
        end: "2024-12",
        highlights: [
          "Contributed to the development and evolution of the backend of the Homero educational platform, including code refactoring and implementation of new features.",
          "Developed a Machine Learning solution to predict student success/performance in high school education, working with educational data and predictive models.",
          "Participated in data preparation, experimentation, and model evaluation for Machine Learning applications in the educational domain.",
          "Applied Software Engineering, Clean Code, and Design Patterns practices to improve application maintainability.",
          "Collaborated with a multidisciplinary team to implement technical solutions for product and education-related problems.",
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
        period: "Mar 2022 – present",
      },
      {
        title: "Machine Learning Specialization",
        institution: "DeepLearning.AI & Stanford Online",
        period: "Sep 2024",
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
      { label: "E-mail", href: "mailto:diego@diegoponte.dev" },
    ],
    experience: [
      {
        title: "AI Engineer",
        company: "Metrópole Digital — IMD/UFRN",
        location: "Natal, RN · Remoto",
        start: "2026-07",
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
        highlights: [
          "Desenvolvimento de soluções de Machine Learning e Computer Vision para imagens médicas, incluindo classificação e análise de lâminas digitalizadas.",
          "Desenvolvimento e avaliação de pipelines de Deep Learning com Python e PyTorch, trabalhando com imagens médicas de alta resolução.",
          "Atuação em pré-processamento de dados, experimentação, treinamento, avaliação e fluxos de inferência de modelos.",
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
        period: "mar. 2022 – presente",
      },
      {
        title: "Machine Learning Specialization",
        institution: "DeepLearning.AI & Stanford Online",
        period: "set. 2024",
      },
    ],
  },
};
