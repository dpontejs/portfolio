# diegoponte.dev

![Status](https://img.shields.io/badge/status-work%20in%20progress-FFD43B?style=flat-square)
![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat-square&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

Source of my personal website at **[diegoponte.dev](https://diegoponte.dev)**: who I am, my experience as a
Machine Learning Engineer and the projects I build, pulled automatically from GitHub at build time.
Static site built with **Astro**, served by Caddy on my own infrastructure ([infra](https://github.com/dpontejs/infra)).

## Roadmap

Each item is a vertical slice tracked as a GitHub issue.

- [x] **Scaffold and design system** — Astro + Tailwind, layout, light/dark theme, Python color palette.
- [x] **Home, about and experience** — content from my resume, in English and Portuguese.
- [ ] **Projects from GitHub** — project cards generated at build time from public repos.
- [ ] **Notes / blog** — short technical write-ups in MDX.
- [ ] **Deploy and quality checks** — Docker image, deploy via the infra pipeline, Lighthouse CI.

## Learning guide

Each step is documented as a didactic guide: concepts, walkthrough of the code, decisions, exercises and pitfalls.

1. [Scaffold and design system](docs/guide/01-scaffold-and-design-system.md)
2. [Content from data files, in two languages](docs/guide/02-content-and-i18n.md)
3. [Packaging the site as a container image](docs/guide/03-container-image.md)
4. [Continuous deployment: from merge to live site](docs/guide/04-continuous-deployment.md)

## Development

Requirements: Node.js ≥ 22.

```bash
make install    # install dependencies
make dev        # http://localhost:4321 with hot reload
make test       # unit tests (Vitest)
make test-e2e   # end-to-end tests in Chromium (Playwright)
make lint       # astro check + ESLint + Prettier
make build      # static site in dist/
make image-test # build the production Docker image and smoke-test it
```

## License

MIT (code). Content © Diego Ponte.
