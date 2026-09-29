# Aclimação Preciosa — contexto para desenvolvimento

Atualizado em 28/09/2026 para os ajustes v0.1 na branch `codex/ajustes-v01`; conferir o PR e os checks para o estado da publicação.
Este documento registra o produto, decisões e limites atuais para continuar o trabalho com Codex, Claude Code ou outra ferramenta, sem depender do histórico da conversa.

## Como começar

1. Leia este arquivo, `AGENTS.md` e `README.md`.
2. Confira `git status`, o histórico recente e os arquivos relacionados à tarefa. Preserve alterações locais existentes.
3. Antes de alterar Next.js, leia o guia pertinente em `node_modules/next/dist/docs/`, conforme `AGENTS.md`.
4. Diferencie requisitos aprovados, comportamento implementado e trabalho futuro. Uma intenção neste documento não significa uma funcionalidade entregue.

As instruções atuais do usuário prevalecem. Este documento registra as decisões vigentes; o código, os tipos e os testes mostram a implementação real. Se divergirem, investigue e explicite a diferença. `ACLIMACAO_PRECIOSA_SPEC_V0_1.md` e `prompt_site.txt` são referências históricas, não a especificação atual.

## Produto e estágio

Portal editorial do bairro da Aclimação, em São Paulo, para aproximar moradores, visitantes, negócios e prestadores de serviços. A interface e os textos são em português brasileiro. A identidade combina fundo creme, verde, tipografia editorial e referências visuais ao bairro.

O MVP tem início, negócios, eventos, lugares e participação. Usa JSON local e conteúdo de desenvolvimento. Não há integração com banco, autenticação, painel administrativo, upload. O recebimento de contribuições usa Server Action e Google Apps Script, condicionado à configuração externa descrita em `docs/participacao.md`. Não há infraestrutura de venda de ingressos ou cobrança.

O usuário pretende evoluir para PostgreSQL/Supabase e considera organizar eventos próprios como futura fonte de receita. O nome e o desenho do painel administrativo ainda estão em aberto. A prioridade é facilitar o uso e o preenchimento por pessoas leigas, com poucos campos obrigatórios.

## Decisões de produto aprovadas

### Negócios

- Nome público: **Negócios**; rota canônica `/negocios`. `/estabelecimentos` e seus detalhes redirecionam permanentemente, preservando links antigos.
- Abrange comércios e prestadores sem ponto fixo. Endereço é opcional; não mostrar endereço inventado ou bloco vazio para quem atende no cliente ou online.
- Cards usam `logo`; sem logo, mostram iniciais. A foto não substitui a marca no card. No detalhe, logo e foto opcional podem coexistir.
- `logo` e `coverImage` são campos separados. Preservar essa distinção na futura modelagem do banco.
- Formas de atendimento e região atendida pertencem ao detalhe, não ao card.
- Telefone, WhatsApp, e-mail, site e redes são opcionais. Mostrar apenas canais preenchidos e utilizáveis. Site mostra o domínio; e-mail tem link e opção de copiar; redes têm ícones com nomes acessíveis.
- Não exigir a escolha de um “contato principal” no cadastro. Não criar essa configuração sem nova decisão do usuário.
- Foram retirados os badges de demonstração. Os dados continuam sendo de desenvolvimento; não reintroduzir esses badges como substituição de conteúdo real.
- O usuário mencionou Onodera Estética, Epimed, Outlet Liberdade, Curapro e Luiv.IA para cadastro futuro. Essa lista não fornece endereços, contatos, imagens ou autorização para inventá-los.

### Eventos

- Experiências foram retiradas do escopo atual. `/experiencias` redireciona para `/eventos`; os detalhes legados `oficina-de-ceramica` e `degustacao-de-cafes-especiais` redirecionam para os eventos correspondentes, e outros slugs retornam a interface 404. Não criar novamente uma seção independente sem nova solicitação.
- Conteúdo principal: `title`, `subtitle`, `body`. `organizer` é texto simples opcional.
- Programação é uma lista de sessões com data e horários opcionais; permite dias seguidos, vários fins de semana e mais de uma sessão por dia.
- O detalhe apresenta cada dia e horário. Cards resumem data única, intervalo contínuo ou quantidade de datas; datas não ficam como uma lista sobre a foto.
- Entrada usa apenas `free` ou `paid`, opcional. Preços, descontos, alimentos e condições especiais vão no texto sobre o evento. Não criar uma estrutura de tarifação ou botões específicos de inscrição/ingresso sem necessidade aprovada.
- Contatos opcionais seguem os canais de negócios. O futuro editor deverá facilitar formatação, emojis e links; atualmente existe apenas renderização de formatação leve, não um editor administrativo.
- Filtro padrão: próximos e em andamento. Encerrados aparecem apenas em filtros apropriados; cancelados/adiados são visíveis em “Todos os eventos”.
- “Em andamento” significa que a primeira sessão começou e a última ainda não terminou, inclusive entre sessões de fins de semana diferentes. Não significa necessariamente que há uma sessão acontecendo neste minuto.
- Cálculos usam `America/Sao_Paulo`; a interface não precisa repetir “horário de São Paulo”. Datas usam `YYYY-MM-DD`, horários `HH:mm`. A validação atual exige término posterior ao início no mesmo dia; sessões que atravessam a meia-noite não estão modeladas.

### Lugares

- Cards com imagem, categoria, nome, resumo e informação de visitação quando disponível.
- “Localização” mostra o endereço. Não há campo separado de acesso: orientações de acesso entram no texto sobre o lugar.
- Horário, visitação, endereço e contatos são opcionais. O mapa só aparece quando há endereço.
- Contatos são links simples, inclusive telefone/WhatsApp, em vez de botões de destaque.
- Links de referência aparecem em “Mais informações”. Não restabelecer “Informações consultadas” ou uma data de consulta como requisito de preenchimento.
- A galeria do detalhe elimina repetições da capa e imagens duplicadas.

### Participação

- Três opções: cadastrar negócio, divulgar evento e sugerir lugar/história.
- O formulário usa `useActionState` e a Server Action `submitParticipation`. Os links de escolha e o envio funcionam sem JavaScript. Dados são validados no servidor, com consentimento obrigatório e campo armadilha.
- `src/lib/participation.ts` contém a validação pura e o contrato de estados. Falhas preservam os campos; sucesso limpa o formulário. Logs não incluem dados pessoais, URL privada ou senha.
- O destino atual é uma planilha via Apps Script. Configurar `PARTICIPATION_WEBHOOK_URL` e `PARTICIPATION_WEBHOOK_SECRET` somente no servidor. Sem configuração, retorna `indisponivel`; nenhuma integração real foi testada antes de disponibilizar as credenciais.
- `scripts/apps-script/participacao.gs` reproduz o script solicitado. A implantação e os contatos públicos (`src/lib/site.ts`) dependem do responsável pelo projeto. Consulte `docs/participacao.md`.
- A contribuição não publica conteúdo automaticamente; a equipe confere a planilha e atualiza o guia.

## Arquitetura e arquivos principais

| Local                                          | Responsabilidade                                                           |
| ---------------------------------------------- | -------------------------------------------------------------------------- |
| `src/app/`                                     | App Router: início, listagens, detalhes, participação, 404 e rotas legadas |
| `src/app/layout.tsx`                           | Fontes locais, metadados, cabeçalho, rodapé e link para pular ao conteúdo  |
| `src/types/content.ts`                         | Tipos de conteúdo, endereço, imagem, sessões e categorias                  |
| `src/data/establishments.json`                 | Negócios; o nome interno antigo foi mantido                                |
| `src/data/events.json`, `src/data/places.json` | Eventos e lugares                                                          |
| `src/lib/content.ts`                           | Leitura, seleção de publicados/destaques e validação de eventos            |
| `src/lib/events.ts`                            | Sessões, fuso, estados, filtros, resumos e validações                      |
| `src/lib/format.ts`                            | Funções de apresentação, como endereço                                     |
| `src/components/ui.tsx`                        | Cards, introduções, títulos de seção e convite à participação              |
| `src/components/business-media.tsx`            | Logo ou iniciais                                                           |
| `src/components/business-contacts.tsx`         | Contatos compartilhados por negócios, eventos e lugares                    |
| `src/components/detail.tsx`                    | Informações e galeria                                                      |
| `src/components/formatted-text.tsx`            | Renderização limitada de texto formatado; HTML bruto é tratado como texto  |
| `src/components/event-refresh.tsx`             | Atualização do estado dos eventos a cada minuto e ao voltar à aba          |
| `src/components/filters.tsx`                   | Filtro de categorias de negócios no cliente                                |
| `src/components/participation-form.tsx`        | Formulário de contribuição com Server Action                               |
| `src/components/styles.ts`                     | Receitas recorrentes de classes Tailwind                                   |
| `src/app/globals.css`                          | Tema e base global                                                         |
| `next.config.ts`                               | Redirecionamento de negócios                                               |
| `scripts/check-portal.mjs`                     | Verificações HTTP das páginas, conteúdo e redirecionamentos                |
| `scripts/events.test.mjs`                      | Testes das regras de eventos                                               |
| `.github/workflows/ci.yml`                     | Verificações automáticas em push/PR para `main`                            |

A stack instalada está fixada no `package.json`/`package-lock.json`: Next.js 16.3.6, React 19.3.0, TypeScript 6.0.3, Tailwind 4.3.3, Lucide e fontes Fontsource. Não atualizar dependências apenas para adequar exemplos de outra versão. Usar npm e manter o lockfile.

Listagens de eventos/lugares recebem filtros na URL. O parâmetro `voltar` mantém o retorno ao filtro de origem, restrito à listagem correspondente. Negócios têm filtro de categoria no cliente. Confira cada rota antes de uniformizar comportamentos que não são idênticos.

## Dados e futura persistência

- Registros usam `id`, `slug`, `status` (`draft`/`published`) e `featured`. Não confundir status editorial com `eventStatus` (`scheduled`/`cancelled`/`postponed`).
- Consultas públicas filtram publicados. Eventos são validados antes desse filtro; um rascunho inválido também pode interromper a leitura.
- `ImageAsset` contém `src` e `alt`. Campos opcionais devem resultar em blocos ausentes, não placeholders vazios.
- As redes suportadas hoje são Instagram, YouTube, LinkedIn, Facebook e TikTok, em `socialLinks`.
- O texto formatado aceita parágrafos, negrito, itálico, subtítulos, listas e links HTTP(S). Não é um parser Markdown completo nem aceita HTML arbitrário.
- A migração para Supabase está planejada, mas tabelas, RLS, autenticação, storage e fluxos de publicação ainda precisam ser projetados. Não tratar os tipos atuais como uma migration SQL já definida.

## Convenções visuais

Tailwind é o padrão escolhido. Preferir tokens nomeados para cores, escala padrão para espaçamentos e classes nos elementos que recebem o estilo. Compartilhar receitas quando existe repetição real; manter layouts específicos próximos do JSX. CSS Module é uma exceção localizada quando necessária. Evitar reconstruir classes de componentes globais com `@apply`.

Breakpoints atuais: `sm` 640, `md` 768, `lg` 1024, `xl` 1280 e `2xl` 1536 px. Os antigos 601/761/901/1001/1500 foram substituídos. Os números estão no tema; testar os dois lados da transição ao alterar responsividade.

Fontes: Plus Jakarta Sans para interface e Playfair Display para títulos. Preservar legibilidade (o usuário já pediu letras maiores), foco visível, menu por teclado, áreas de toque, textos alternativos e respeito a movimento reduzido.

Cores dos componentes usam tokens do tema. Categorias usam `categoryTag`; rótulos decorativos (`eyebrow`) foram removidos. `Placa` referencia as placas de rua de São Paulo e aparece apenas quando existe endereço, além da placa do bairro no hero. Cantos lapidados aparecem no hero, nos destaques de lugares da Home e nas imagens principais dos detalhes. Ainda existem medidas legadas em pixels; não afirmar que toda a escala foi migrada.

A grade compartilhada usa 1 coluna no celular, 2 em `md` e 3 em `lg`. O hero é dividido entre texto e imagem, seguido de `/#sobre`. O primeiro evento em destaque usa card largo. A Home prioriza destaques ativos, com preferência editorial explícita pelo Natal Aclimação Preciosa entre esses destaques; a agenda permanece cronológica. Eventos encerrados saem da Home.

O Natal é um exemplo com programação em construção, nove sessões de 12 a 20/12/2026, das 17h às 22h. O renderizador atual aceita somente links HTTP(S), portanto a frase com link relativo foi omitida conforme autorizado.

## Executar e validar

Usar Node.js 22 para acompanhar o CI. O mínimo do Next não é necessariamente suficiente para os testes que usam `--experimental-strip-types`.

```bash
npm ci
npm run dev
```

Desenvolvimento: `http://127.0.0.1:3000`. Para validar, executar lint, testes e build, com build e typecheck em sequência, pois Next gera arquivos em `.next/types`:

```bash
npm run lint
npm run test:events
npm run test:participation
npm run build
npm run typecheck
npm run start
```

`npm run start` permanece rodando no terminal. Com a porta 3000 livre e o servidor de produção respondendo, executar em outro terminal:

```bash
npm run check:portal
```

O script aceita `PORTAL_URL` para outra porta. Não confundir testar um servidor dev já aberto com testar o build de produção. Os smoke tests cobrem todas as páginas públicas derivadas dos dados, slugs inválidos, dados, filtros e redirecionamentos; testes de eventos cobrem limites de sessão, fuso, datas separadas, filtros e validação. Eles não substituem revisão visual ou teste de interação no navegador.

Revisão visual mínima para mudanças de interface: início, listagens, um detalhe de cada tipo, formulário e 404 em celular e desktop; menu aberto/fechado, Escape, foco, filtros, estados vazios, contatos ausentes e conteúdo longo. Não relatar testes como aprovados sem conferir sua conclusão.

O CI configura Node 22, executa `npm ci`, lint, typecheck, testes, build, `npm run start`, espera até 30 tentativas pela resposta HTTP e então roda os smoke tests. Se a inicialização falhar, imprime `portal.log`. A configuração está no repositório; a conclusão de uma execução remota precisa ser consultada no GitHub, não inferida de testes locais.

## Limites e cuidados conhecidos

- `robots` está com `index: false, follow: false` no layout. Revisar antes do lançamento; não habilitar indexação inadvertidamente.
- Conteúdo e imagens atuais incluem exemplos fictícios e referências externas. Não atribuir dados fictícios aos negócios reais mencionados pelo usuário.
- As pastas `stitch_aclima_o_preciosa_portal_design/` e `stitch_guia_aclima_o_preciosa/` foram retiradas do Git e ignoradas. Podem existir nesta máquina, mas não são dependências de um clone novo.
- `scripts/seed.mjs` é legado: lê layouts Stitch e escreve datasets. Não usá-lo para iniciar o projeto nem regenerar dados atuais sem revisão/migração explícita.
- As 15 referências temporárias foram migradas para 12 imagens únicas em `public/images/{negocios,eventos,lugares}`. Capas repetidas e galerias compartilham arquivos. O Natal usa SVG local. `check:portal` rejeita links Google temporários e caminhos locais sem arquivo. `remotePatterns` foi removido.
- `.env*` é ignorado, exceto `.env.example`. O MVP local não exige credenciais de Supabase; não registrar segredos na documentação ou no Git.
- O repositório é público e está ligado à Vercel: push na `main` publica; PR gera prévia. `private: true` no npm só impede publicação do pacote. Manter segredos fora do Git.

## Continuidade e manutenção deste contexto

Próximas frentes de produto: conteúdo real revisado, fluxo editorial/painel, persistência Supabase, configuração e verificação da integração de contribuições e preparação do lançamento (domínio, indexação, metadados e monitoramento). A ordem e o escopo devem seguir a próxima solicitação do usuário; esta lista não autoriza implementar tudo automaticamente.

Ao alterar uma decisão, integração, comando ou limitação, atualizar este arquivo na mesma entrega. Manter `AGENTS.md` como instruções curtas de trabalho e `CLAUDE.md` como ponto de entrada para Claude Code. Não duplicar todo o contexto nos três arquivos.

Sugestão de primeira mensagem para outra IA:

> Leia AGENTS.md e PROJECT_CONTEXT.md, confira o estado do Git e os arquivos relacionados à tarefa. Considere a especificação v0.1 e o prompt original apenas como histórico. Explique brevemente o estado atual antes de implementar minha próxima solicitação.
