# Entrega dos ajustes v0.1

Branch: `codex/ajustes-v01`, destinada a pull request para `main`.

## Validações locais

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Passou, sem avisos do ESLint |
| `npm run typecheck` | Passou |
| `npm run test:events` | 5 testes passaram |
| `npm run test:participation` | 7 testes passaram, incluindo falhas da Server Action |
| `npm run build` | Passou |
| `npm run check:portal` | Passou: 23 páginas públicas, 404, filtros, redirecionamentos e imagens |

O smoke test foi executado também no servidor de produção em `http://127.0.0.1:3000`. Conferência no Chromium local: 26 páginas/variações em 390, 820 e 1280 px sem rolagem horizontal; grades compartilhadas com duas colunas em 820 px; cantos lapidados presentes. Foram conferidas capturas de tela do hero, cards, formulário e endereço longo.

Interação com e sem JavaScript: seleção do tipo, envio indisponível sem credenciais, erro por campo, preservação dos valores e limpeza após sucesso da armadilha. Com JavaScript, foco na mensagem de status conferido. Os testes da Server Action cobrem resposta realista `ok: true`, HTTP inválido, JSON inválido, rejeição do destino, erro de rede e timeout, usando respostas locais simuladas. Não houve envio real ao Google.

## Imagens

As 15 referências temporárias dos JSONs foram substituídas por 12 arquivos JPG únicos, reaproveitando imagens repetidas. Nenhum download falhou. A ilustração do Natal foi criada como SVG local.

## Configuração externa

1. Criar a planilha Google e configurar o fuso de São Paulo.
2. Colar `scripts/apps-script/participacao.gs` no Apps Script e configurar a propriedade `PARTICIPATION_SECRET`; `NOTIFY_EMAIL` é opcional.
3. Implantar como App da Web, executado pela conta do projeto, com acesso por qualquer pessoa.
4. Configurar `PARTICIPATION_WEBHOOK_URL` e `PARTICIPATION_WEBHOOK_SECRET` na Vercel, em Production e Preview, e refazer o deploy.
5. Enviar uma contribuição de cada tipo e conferir a planilha.

Passo a passo completo: [Configurar o Participe](participacao.md).

## Decisões de implementação

- O Natal recebe prioridade editorial entre os eventos ativos marcados como destaque, somente na Home. Os demais preservam sua ordem; a agenda continua cronológica. Ao encerrar, o Natal sai da Home, e o smoke test respeita esse limite para não falhar depois da campanha.
- A frase com o link relativo foi omitida do texto de Natal conforme autorizado, porque o renderizador atual aceita somente links HTTP(S).
- A troca de tipo usa links com `?tipo=` para funcionar sem JavaScript; a Server Action permanece como único destino do formulário no cliente.
- `allowImportingTsExtensions` permite executar a validação e a Server Action nos testes Node sem instalar dependências.
- Incluída a documentação de contexto já preparada localmente na tarefa anterior, atualizada para esta entrega.
- O Apps Script foi mantido exatamente como fornecido. Uma falha do aviso por e-mail pode ocorrer após a linha ser gravada; esse comportamento está explicado na documentação de configuração.

## Arquivos criados

- `.env.example`
- `PROJECT_CONTEXT.md`
- `docs/ajustes-v01.md`
- `docs/participacao.md`
- `public/images/eventos/caminhada-pelos-casaroes.jpg`
- `public/images/eventos/degustacao-de-cafes-especiais.jpg`
- `public/images/eventos/natal-aclimacao-preciosa.svg`
- `public/images/eventos/oficina-de-ceramica.jpg`
- `public/images/eventos/piquenique-musical-no-parque.jpg`
- `public/images/lugares/biblioteca-raul-bopp.jpg`
- `public/images/lugares/parque-da-aclimacao.jpg`
- `public/images/lugares/vilas-da-rua-pedra-azul.jpg`
- `public/images/negocios/cafe-livraria-da-praca.jpg`
- `public/images/negocios/espaco-yoga-aclimacao.jpg`
- `public/images/negocios/moinho-da-colina.jpg`
- `public/images/negocios/oficina-mecanica-do-bairro.jpg`
- `public/images/negocios/quintal-das-suculentas.jpg`
- `scripts/apps-script/participacao.gs`
- `scripts/participation.test.mjs`
- `src/app/participe/actions.ts`
- `src/components/placa.tsx`
- `src/components/project-contacts.tsx`
- `src/lib/participation.ts`
- `src/lib/site.ts`

## Arquivos alterados

- `.github/workflows/ci.yml`
- `ACLIMACAO_PRECIOSA_SPEC_V0_1.md`
- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `next.config.ts`
- `package.json`
- `prompt_site.txt`
- `scripts/check-portal.mjs`
- `src/app/eventos/[slug]/page.tsx`
- `src/app/eventos/page.tsx`
- `src/app/globals.css`
- `src/app/lugares/[slug]/page.tsx`
- `src/app/lugares/page.tsx`
- `src/app/negocios/[slug]/page.tsx`
- `src/app/negocios/page.tsx`
- `src/app/not-found.tsx`
- `src/app/page.tsx`
- `src/app/participe/page.tsx`
- `src/components/business-contacts.tsx`
- `src/components/business-media.tsx`
- `src/components/detail.tsx`
- `src/components/footer.tsx`
- `src/components/participation-form.tsx`
- `src/components/styles.ts`
- `src/components/ui.tsx`
- `src/data/establishments.json`
- `src/data/events.json`
- `src/data/places.json`
- `tsconfig.json`

## Arquivos removidos

Nenhum arquivo existente foi removido. A receita e as props `eyebrow`, o envio simulado, campos de card sem uso e `images.remotePatterns` foram retirados dos arquivos correspondentes.
