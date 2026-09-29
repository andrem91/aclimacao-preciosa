# Aclimação Preciosa

Portal editorial de bairro para descobrir negócios, eventos e lugares da Aclimação, em São Paulo.

O projeto é um MVP de conteúdo local, estruturado para evoluir para um painel administrativo e um banco PostgreSQL/Supabase.

## Contexto para continuar o desenvolvimento

Leia [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) para conhecer as decisões de produto, arquitetura, limitações e próximos passos. [AGENTS.md](AGENTS.md) contém as instruções de trabalho; [CLAUDE.md](CLAUDE.md) importa ambos para o Claude Code. A especificação v0.1 e o prompt original são históricos.

## O que já existe

- **Negócios** em `/negocios`, com logo, foto opcional, endereço, serviços, contatos e redes sociais.
- **Eventos** em `/eventos`, com filtros, eventos em andamento, sessões em vários dias, horários e contatos opcionais.
- **Lugares** em `/lugares`, com busca, filtro por categoria, informações de visitação, endereço, mapa, contatos e links úteis.
- **Participe** em `/participe`, com formulário ligado a uma Server Action, pronto para receber contribuições numa planilha do Google após configuração.
- Layout responsivo, navegação por teclado, estados vazios, páginas de detalhe e redirecionamentos legados.

Os dados atuais são conteúdo de desenvolvimento. Antes do lançamento público, revise textos, imagens, contatos e horários com os responsáveis.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- JSON local como fonte temporária de conteúdo

## Executar localmente

Use Node.js 22, como no CI, para executar também os testes que utilizam `--experimental-strip-types`.

```bash
npm ci
npm run dev
```

Abra <http://127.0.0.1:3000>.

Comandos úteis:

```bash
npm run lint
npm run typecheck
npm run build
npm run check:portal
npm run test:events
npm run test:participation
npm run format
```

## Estrutura principal

```text
src/app/                  páginas e rotas
src/components/           componentes de interface
src/data/                 negócios, eventos e lugares em JSON
src/lib/                  leitura, validação e regras de domínio
src/types/                tipos compartilhados
src/app/globals.css       tema e estilos globais essenciais
src/components/styles.ts padrões compartilhados de classes Tailwind
public/                   imagens e assets locais
scripts/                  verificações automatizadas
```

## Estilos da interface

O portal usa **Tailwind CSS 4** como padrão. Layout, espaçamentos, cores, estados e responsividade ficam nas classes dos componentes. Botões, containers e outros padrões recorrentes compartilham receitas em `src/components/styles.ts`, sem uma biblioteca extra.

O `globals.css` contém apenas a importação do Tailwind, os tokens do tema e a base global de tipografia e acessibilidade. Se alguma necessidade futura exigir CSS próprio, use um arquivo `*.module.css` junto do componente, evitando estilos de componentes no global.

Os breakpoints seguem a escala padrão do Tailwind: `sm` a partir de 640 px, `md` de 768 px, `lg` de 1024 px, `xl` de 1280 px e `2xl` de 1536 px. Evite criar valores arbitrários para novas telas.

## Conteúdo

Os registros publicados ficam em `src/data`. Use um `slug` único e `status: "published"` para exibir um registro. Registros com `status: "draft"` ficam fora das páginas públicas.

Eventos usam `title`, `subtitle`, `body` e uma lista `sessions` com data e horário. O texto aceita formatação leve, como negrito, itálico, subtítulos, listas, emojis e links seguros. Os filtros da agenda são `q`, `categoria` e `periodo`.

Lugares usam nome, categoria, resumo, texto sobre o lugar, foto, endereço e campos opcionais de visitação e contato. A página só mostra blocos quando há informação cadastrada.

## Rotas

- `/` — início
- `/negocios` — negócios da Aclimação
- `/eventos` — agenda do bairro
- `/lugares` — lugares para conhecer
- `/participe` — contribuições
- `/sobre` — sobre o projeto, acessível pelo rodapé

`/estabelecimentos` continua redirecionando para `/negocios` para preservar links antigos. `/experiencias` continua redirecionando para `/eventos`.

## Próximas etapas

1. Revisar e substituir o conteúdo de demonstração por dados autorizados.
2. Criar o painel administrativo com rascunho, revisão e publicação.
3. Migrar os JSONs para Supabase/PostgreSQL.
4. Configurar a planilha de contribuições e a operação de revisão da equipe.
5. Configurar domínio, metadados sociais, indexação e monitoramento antes do lançamento.

O banco, a autenticação, o upload de imagens e o painel administrativo ainda não fazem parte desta versão.

## Licença e conteúdo

Este repositório é público. Os negócios, eventos e parte dos textos e imagens são conteúdo de demonstração. Textos, marcas, fotografias e contatos de terceiros só serão publicados no site após autorização e conferência. `private: true` no `package.json` apenas impede a publicação do pacote no npm.

## Formulário do Participe

O formulário envia as contribuições para uma planilha por meio de uma Server Action e do Google Apps Script. Consulte [a configuração passo a passo](docs/participacao.md). Sem as variáveis configuradas, ele informa a indisponibilidade e mantém os campos preenchidos. Os contatos alternativos públicos ficam em `src/lib/site.ts`.

## Publicação

O portal é publicado na Vercel a cada push na `main`. Pull requests geram links de prévia para revisão antes da publicação. O CI verifica lint, tipos, testes de eventos e participação, build e páginas do servidor de produção.

As variáveis `PARTICIPATION_WEBHOOK_URL` e `PARTICIPATION_WEBHOOK_SECRET` ficam em **Settings → Environment Variables** da Vercel, nos ambientes Production e Preview. Nunca devem entrar no repositório ou usar o prefixo `NEXT_PUBLIC_`.

A indexação no Google permanece desligada até o lançamento oficial, com `robots: { index: false, follow: false }` em `src/app/layout.tsx`.
