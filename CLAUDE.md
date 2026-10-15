# portfolio

Personal portfolio website at diegoponte.dev — Astro static site with projects pulled from GitHub. Projeto de portfólio público (README e código em inglês).

## Comandos

Tudo passa pelo Makefile; o hook de Stop do harness roda `make test`.

- `make test`: testes unitários (Vitest, `src/**/*.test.ts`); o agente roda a cada turno que muda código
- `make test-e2e`: Playwright no Chromium contra o build de produção (`e2e/`)
- `make test-all`: unitários + e2e (CI)
- `make lint`: astro check + ESLint + Prettier
- `make dev`: servidor local em http://localhost:4321

## Onde fica o quê

- `src/`: páginas, componentes e conteúdo do site (Astro)
- `public/`: arquivos estáticos
- `docs/features/`: uma página por feature architectural
- `docs/adr/`: decisões caras de reverter

## Regras

Cada regra nasceu de um erro real do agente. O que um hook ou teste consegue garantir não entra aqui.
Formato: a regra, e na linha de baixo o **Por quê** (o erro que a originou).

- <Regra>
  Por quê: <o que o agente fez de errado, com data>.
