import type { Locale } from "../i18n/config";

export interface Project {
  /** Repository name under github.com/dpontejs; live stats come from the GitHub API at build time. */
  repo: string;
  year: number;
  tags: string[];
  /** Live demo, when there is one (otherwise the repo's homepage field is used, if set). */
  demo?: string;
  text: Record<Locale, { title: string; summary: string; highlights: string[] }>;
}

/** Featured projects, in display order. Only public repositories belong here. */
export const projects: Project[] = [
  {
    repo: "infra",
    year: 2026,
    tags: ["Terraform", "Ansible", "Docker", "Caddy", "GitHub Actions", "Python"],
    text: {
      en: {
        title: "Personal Cloud Infrastructure",
        summary:
          "Infrastructure as code for the VPS that hosts this site: provisioned with Terraform, configured with Ansible, services in Docker behind Caddy with automatic HTTPS, and pull-based deploys with automatic rollback.",
        highlights: [
          "Hetzner server, firewall and Cloudflare DNS as Terraform code, tested with mocked providers.",
          "Server hardening with Ansible: SSH keys only, two firewall layers, fail2ban and automatic security updates, idempotent and linted.",
          "Deploy agent in Python: the server pulls new images, waits for the healthcheck and rolls back unhealthy versions, validated by an integration test against a real Docker registry.",
          "Every step documented as a didactic guide, including the real bugs found along the way.",
        ],
      },
      pt: {
        title: "Infraestrutura de Nuvem Pessoal",
        summary:
          "Infraestrutura como código da VPS que hospeda este site: provisionada com Terraform, configurada com Ansible, serviços em Docker atrás do Caddy com HTTPS automático e deploy pull-based com rollback automático.",
        highlights: [
          "Servidor na Hetzner, firewall e DNS na Cloudflare como código Terraform, testados com providers simulados.",
          "Hardening com Ansible: login só por chave SSH, duas camadas de firewall, fail2ban e atualizações de segurança automáticas, idempotente e com lint.",
          "Agente de deploy em Python: o servidor baixa imagens novas, espera o healthcheck e faz rollback de versões doentes, validado por teste de integração com um registry Docker real.",
          "Cada etapa documentada como guia didático, incluindo os bugs reais encontrados no caminho.",
        ],
      },
    },
  },
  {
    repo: "flamengo-news",
    year: 2026,
    tags: ["Python", "LLM", "Gemini", "Web scraping", "GitHub Actions"],
    text: {
      en: {
        title: "Flamengo News",
        summary:
          "Automated newsletter about Flamengo: collects news from several sources, pulls match statistics and uses an LLM to summarize and analyze them, delivered by email every Monday and Friday.",
        highlights: [
          "News collected from Google News, ge and the club's website, grouped and summarized by an LLM (Gemini).",
          "Last match, form and standings from ESPN's public API, plus an AI-written match analysis.",
          "Runs on a GitHub Actions schedule and still sends titles, links and stats if the LLM quota runs out.",
          "HTML and plain-text emails sent through Resend from a custom domain, with a test suite in pytest.",
        ],
      },
      pt: {
        title: "Flamengo News",
        summary:
          "Newsletter automática do Flamengo: coleta notícias de várias fontes, busca estatísticas das partidas e usa um LLM para resumir e analisar, com envio por e-mail toda segunda e sexta.",
        highlights: [
          "Notícias coletadas do Google News, ge e site oficial, agrupadas e resumidas por um LLM (Gemini).",
          "Última partida, forma recente e classificação pela API pública da ESPN, com análise do jogo escrita por IA.",
          "Roda agendado no GitHub Actions e, se a cota do LLM acabar, ainda envia títulos, links e estatísticas.",
          "E-mails em HTML e texto puro enviados pela Resend com domínio próprio, com testes em pytest.",
        ],
      },
    },
  },
  {
    repo: "portfolio",
    year: 2026,
    tags: ["Astro", "TypeScript", "Tailwind CSS", "Playwright", "Docker"],
    text: {
      en: {
        title: "diegoponte.dev",
        summary:
          "This website: a static Astro site in English and Portuguese, packaged as a container and deployed automatically on every merge.",
        highlights: [
          "Content in typed data files, i18n routing with hreflang, and a light/dark theme without flash.",
          "Project stats fetched from the GitHub API at build time, without ever breaking the build.",
          "Unit tests (Vitest), end-to-end tests in Chromium (Playwright) and an image smoke test in CI.",
          "CI only turns green once the merged commit is actually live.",
        ],
      },
      pt: {
        title: "diegoponte.dev",
        summary:
          "Este site: Astro estático em inglês e português, empacotado em container e publicado automaticamente a cada merge.",
        highlights: [
          "Conteúdo em arquivos de dados tipados, rotas por idioma com hreflang e tema claro/escuro sem piscar.",
          "Estatísticas dos projetos buscadas na API do GitHub durante o build, sem nunca quebrar o build.",
          "Testes unitários (Vitest), testes ponta a ponta no Chromium (Playwright) e smoke test da imagem no CI.",
          "O CI só fica verde quando o commit do merge está de fato no ar.",
        ],
      },
    },
  },
  {
    repo: "classificacao_voz",
    year: 2025,
    tags: ["PyTorch", "Transformers", "Wav2Vec2", "Audio", "Gradio"],
    text: {
      en: {
        title: "Speech Command Classifier",
        summary:
          "Fine-tuned Wav2Vec2 to classify 35 spoken commands from the Speech Commands dataset, reaching 95.37% accuracy on the test set.",
        highlights: [
          "Pretrained wav2vec2-base with the encoder frozen except its last two transformer layers, plus a custom classification head.",
          "Exploration with waveforms and Mel spectrograms; evaluation with per-class metrics and a confusion matrix.",
          "Gradio demo: upload a .wav file and get the predicted command.",
        ],
      },
      pt: {
        title: "Classificador de Comandos de Voz",
        summary:
          "Fine-tuning do Wav2Vec2 para classificar 35 comandos de voz da base Speech Commands, com 95,37% de acurácia no conjunto de teste.",
        highlights: [
          "wav2vec2-base pré-treinado com o encoder congelado, exceto as duas últimas camadas transformer, e uma cabeça de classificação própria.",
          "Exploração com formas de onda e espectrogramas Mel; avaliação com métricas por classe e matriz de confusão.",
          "Demo em Gradio: envie um arquivo .wav e receba o comando previsto.",
        ],
      },
    },
  },
  {
    repo: "prontuario-agil",
    year: 2026,
    tags: ["Django", "Python", "REST API", "JWT"],
    text: {
      en: {
        title: "Prontuário Ágil",
        summary:
          "Web system for medical clinics, built by a team of four in the Software Engineering course at UFRN and motivated by public healthcare data (CNES/DataSUS).",
        highlights: [
          "Patient area to find doctors by specialty and book or cancel appointments.",
          "Doctor area for electronic health records: notes, diagnosis and prescriptions.",
          "REST API protected by JWT with role-based access, automated tests with coverage and CI.",
        ],
      },
      pt: {
        title: "Prontuário Ágil",
        summary:
          "Sistema web para gestão de clínicas médicas, desenvolvido em equipe de quatro na disciplina de Engenharia de Software da UFRN, motivado por dados públicos de saúde (CNES/DataSUS).",
        highlights: [
          "Área do paciente para buscar médicos por especialidade e agendar ou cancelar consultas.",
          "Área do médico para prontuário eletrônico: anotações, diagnóstico e prescrição.",
          "API REST protegida por JWT com controle de acesso por papel, testes automatizados com cobertura e CI.",
        ],
      },
    },
  },
  {
    repo: "bd_dca",
    year: 2026,
    tags: ["MySQL", "Streamlit", "Plotly", "Docker"],
    text: {
      en: {
        title: "Clinic Analytics Dashboard",
        summary:
          "Dashboard integrated with Prontuário Ágil that analyzes public healthcare data from CNES/DataSUS for Rio Grande do Norte.",
        highlights: [
          "MySQL 8 schema with seed scripts and import of the public CNES dataset.",
          "Interactive Streamlit dashboard with Plotly charts.",
          "One-command setup with Docker Compose.",
        ],
      },
      pt: {
        title: "Dashboard Analítico de Clínicas",
        summary:
          "Dashboard integrado ao Prontuário Ágil que analisa dados públicos de saúde do CNES/DataSUS para o Rio Grande do Norte.",
        highlights: [
          "Esquema MySQL 8 com scripts de carga inicial e importação da base pública do CNES.",
          "Dashboard interativo em Streamlit com gráficos em Plotly.",
          "Ambiente completo com um comando, via Docker Compose.",
        ],
      },
    },
  },
  {
    repo: "ml_stanford",
    year: 2024,
    tags: ["Machine Learning", "Neural Networks", "Reinforcement Learning"],
    text: {
      en: {
        title: "Machine Learning Specialization Labs",
        summary:
          "Labs from the Machine Learning Specialization by DeepLearning.AI and Stanford Online.",
        highlights: [
          "Neural network for handwritten digit recognition.",
          "K-means implemented from scratch and used for image compression.",
          "Reinforcement learning agent that lands a lunar lander.",
        ],
      },
      pt: {
        title: "Labs da Machine Learning Specialization",
        summary: "Labs da Machine Learning Specialization da DeepLearning.AI e Stanford Online.",
        highlights: [
          "Rede neural para reconhecimento de dígitos manuscritos.",
          "K-means implementado do zero e aplicado em compressão de imagens.",
          "Agente de aprendizado por reforço que pousa um módulo lunar.",
        ],
      },
    },
  },
];
