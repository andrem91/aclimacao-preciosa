# Aclimação Preciosa — Especificação do Site MVP v0.1

**Documento de referência para implementação com Codex**  
**Projeto:** Aclimação Preciosa  
**Versão alvo:** MVP v0.1  
**Stack inicial:** Next.js + React + TypeScript + Tailwind CSS + Lucide React + JSON local

---

# 1. Objetivo deste documento

Este documento define como o site **Aclimação Preciosa** deve ficar e como a primeira versão deve ser implementada.

Ele deve ser tratado como a principal referência funcional, visual e técnica da v0.1.

Existem layouts HTML gerados pelo Google Stitch que devem ser usados como referência visual. Porém, eles **não devem ser copiados cegamente**.

Existem duas famílias de layouts:

1. **Layout anterior / simplificado**  
   Deve ser usado como principal referência de:
   - estrutura;
   - quantidade de informação;
   - hierarquia das páginas;
   - simplicidade;
   - densidade visual;
   - organização dos cards;
   - escopo do MVP.

2. **Layout novo / Guia Aclimação Preciosa**  
   Deve ser usado seletivamente como referência de:
   - identidade visual;
   - personalidade;
   - tipografia;
   - paleta;
   - detalhes inspirados nas pedras preciosas;
   - elementos gráficos inspirados em São Paulo;
   - tratamento mobile;
   - linguagem editorial.

A implementação final deve ser um **híbrido**:

> **80% da estrutura e simplicidade do layout anterior + 20% da identidade e personalidade visual do layout novo.**

Não queremos reproduzir a complexidade do layout novo.

---

# 2. Contexto do projeto

Aclimação Preciosa é um projeto de valorização do bairro da Aclimação, em São Paulo.

O objetivo de longo prazo é ajudar a transformar o bairro de um local de passagem em um destino de:

- comércio;
- gastronomia;
- cultura;
- lazer;
- experiências;
- eventos;
- história;
- turismo local;
- convivência.

O portal será uma das ferramentas para atingir esse objetivo.

O site deve permitir que moradores e visitantes descubram:

- estabelecimentos;
- eventos;
- experiências;
- lugares;
- histórias relacionadas aos lugares;
- formas de participar do projeto.

A v0.1 não é uma plataforma completa.

Ela deve ser um:

> **guia digital moderno, editorial, simples e bonito da Aclimação.**

---

# 3. Posicionamento visual

O site NÃO deve parecer:

- marketplace;
- e-commerce;
- portal de prefeitura;
- site institucional corporativo;
- rede social;
- aplicativo de delivery;
- guia turístico genérico;
- portal de notícias;
- sistema administrativo.

O site deve parecer uma combinação de:

> **guia urbano + revista editorial + descoberta de bairro + identidade paulistana.**

A sensação desejada é:

> **“Eu não sabia que havia tanta coisa interessante na Aclimação.”**

---

# 4. Princípio central do MVP

A regra principal para a v0.1 é:

> **Se um elemento não for necessário para descobrir um estabelecimento, experiência, evento ou lugar, provavelmente não precisa existir agora.**

Não adicionar funcionalidades apenas porque estavam presentes nos HTMLs do Stitch.

Em caso de conflito entre os layouts e este documento:

> **este documento tem prioridade.**

---

# 5. Stack da v0.1

Utilizar:

- Next.js;
- React;
- TypeScript;
- App Router;
- Tailwind CSS;
- Lucide React;
- JSON local para dados;
- `next/image` para imagens quando apropriado.

Utilizar versões estáveis e compatíveis entre si.

## Não utilizar na v0.1

Não implementar ainda:

- Supabase;
- Prisma;
- banco de dados;
- autenticação;
- CMS;
- Zod;
- React Hook Form;
- API própria;
- dashboard;
- painel de comerciante.

Essas tecnologias ficam no roadmap.

---

# 6. Princípios de implementação

A implementação deve priorizar:

1. simplicidade;
2. legibilidade;
3. reutilização de componentes;
4. responsividade;
5. bom uso de Server Components;
6. pouco JavaScript no cliente;
7. conteúdo separado da interface;
8. facilidade para migrar os dados no futuro.

Não criar abstrações complexas apenas pensando em versões futuras.

---

# 7. Estrutura de rotas

Estrutura esperada:

```text
/
├── estabelecimentos
│   └── [slug]
├── experiencias
│   └── [slug]
├── eventos
│   └── [slug]
├── lugares
│   └── [slug]
└── participe
```

A página visual **Experiências & Eventos** poderá combinar dados de `/experiencias` e `/eventos`, mesmo mantendo entidades separadas internamente.

---

# 8. Navegação principal

O header deve ser simples.

## Desktop

À esquerda:

**Aclimação Preciosa**

Menu:

- Início
- Estabelecimentos
- Experiências & Eventos
- Lugares

Botão destacado:

**Participe**

## Mobile

Usar menu hambúrguer simples.

Não utilizar bottom navigation fixa no rodapé nesta versão.

## Não incluir no header

- login;
- ícone de usuário;
- busca;
- notificações;
- favoritos;
- carrinho.

---

# 9. Identidade visual

## 9.1 Direção

A direção deve ser:

- editorial;
- urbana;
- acolhedora;
- contemporânea;
- cultural;
- leve;
- elegante;
- local.

Um bom nome interno para a linguagem visual é:

> **Editorial Urbano Botânico com referências paulistanas e pedras preciosas.**

---

# 10. Paleta

Usar como referência:

## Fundo principal

```css
#F6F2EA
```

Off-white / papel quente.

## Verde principal

```css
#0F6B4F
```

Usar em:

- header;
- botões principais;
- badges;
- elementos de destaque;
- links importantes.

## Grafite / texto

Usar tom escuro próximo de:

```css
#1C1C1C
```

## Azul paulistano

Referência aproximada:

```css
#1F3A93
```

Usar com moderação.

É especialmente interessante para pequenos elementos inspirados em placas de rua.

## Tons de pedras preciosas

Podem existir como pequenos acentos:

- ametista;
- rubi;
- âmbar/topázio;
- safira;
- esmeralda.

Não transformar cada categoria numa explosão de cores.

Usar de forma pontual.

---

# 11. Tipografia

Preferência visual:

## Títulos

**Playfair Display** ou serif equivalente de alta qualidade.

Usar em:

- H1;
- H2 importantes;
- títulos editoriais.

## Interface e corpo

**Plus Jakarta Sans** ou sans-serif equivalente moderna.

Usar em:

- parágrafos;
- navegação;
- botões;
- labels;
- cards;
- filtros.

Evitar misturar muitas famílias tipográficas.

---

# 12. Logo

Usar o conceito de marca presente nos layouts apenas como referência.

O símbolo pode sugerir:

- pedra lapidada;
- faceta;
- natureza;
- descoberta;
- algo precioso.

Mas deve ser discreto.

Não criar aparência de:

- joalheria;
- loja de diamantes;
- luxo ostensivo.

O logo pode permanecer provisório na v0.1.

---

# 13. Regras gerais de layout

Usar:

- bastante espaço em branco;
- containers bem definidos;
- largura confortável para leitura;
- grid consistente;
- imagens grandes;
- poucas sombras;
- bordas discretas;
- border-radius moderado.

Evitar:

- glassmorphism;
- gradientes em excesso;
- grandes sombras;
- animações desnecessárias;
- cards muito carregados;
- grandes quantidades de ícones.

---

# 14. Fotografia

A fotografia deve ter protagonismo.

Priorizar visualmente:

- fachadas;
- comida;
- pessoas;
- natureza;
- arquitetura;
- arte;
- detalhes das ruas;
- cenas do bairro.

Durante o MVP é aceitável utilizar imagens demonstrativas.

Antes do lançamento público, substituir progressivamente por fotografias reais.

Manter proporções consistentes para evitar saltos de layout.

---

# 15. Sistema de cards

Regra geral:

> **foto → categoria/badge → título → texto curto**

O card inteiro pode ser clicável.

Evitar colocar vários botões dentro do card.

Cards diferentes podem ter pequenas variações entre:

- estabelecimento;
- evento;
- experiência;
- lugar.

Mas todos devem pertencer ao mesmo design system.

---

# 16. HOME

A Home deve ser curta o suficiente para ser entendida rapidamente.

Estrutura:

1. Hero
2. Estabelecimentos em destaque
3. Experiências & Eventos
4. Lugares para conhecer
5. Participe
6. Footer

Não adicionar seções extras sem necessidade.

---

# 17. Home — Hero

Usar uma grande fotografia com identidade da Aclimação.

Conteúdo sugerido:

## Título

**Descubra a Aclimação de um novo jeito.**

## Texto

**Lugares, experiências e negócios que fazem o bairro ser especial.**

## CTA

Um único CTA principal:

**Explorar a Aclimação**

Evitar dois ou três CTAs concorrentes.

---

# 18. Home — Estabelecimentos

Título:

**Conheça negócios da Aclimação**

Mostrar aproximadamente:

- 3 cards.

Cada card:

- foto;
- categoria;
- nome;
- frase curta.

Não mostrar no card:

- estrelas;
- avaliações;
- horário;
- preço;
- distância;
- vários links.

CTA geral:

**Ver todos os estabelecimentos**

---

# 19. Home — Experiências & Eventos

Título:

**O que está acontecendo**

Mostrar:

- 2 ou 3 itens.

Cada card:

- imagem;
- badge `EVENTO` ou `EXPERIÊNCIA`;
- título;
- data ou frequência;
- local.

Preço somente se for relevante.

CTA:

**Ver experiências e eventos**

---

# 20. Home — Lugares

Título:

**Lugares para conhecer**

Mostrar:

- aproximadamente 3 lugares.

Os cards podem ser maiores e mais editoriais do que os cards de estabelecimento.

Mostrar:

- fotografia;
- categoria;
- nome;
- pequena frase.

CTA:

**Explorar lugares**

---

# 21. Home — Participe

Seção simples.

Título:

**Faça parte do Aclimação Preciosa**

Texto:

**Tem um negócio, evento ou conhece um lugar especial no bairro? Conte para nós.**

CTA:

**Participar**

---

# 22. Estabelecimentos — listagem

Rota:

```text
/estabelecimentos
```

Estrutura:

1. título;
2. texto curto;
3. categorias;
4. grid.

## Título

**Estabelecimentos**

## Texto

**Descubra negócios e serviços da Aclimação.**

---

# 23. Estabelecimentos — filtros

Somente filtro por categoria.

Categorias iniciais:

- Todos
- Comer & Beber
- Saúde & Bem-estar
- Compras
- Arte & Cultura
- Educação
- Serviços

Usar chips simples.

No mobile, permitir scroll horizontal.

Não adicionar:

- aberto agora;
- distância;
- preço;
- avaliação;
- ordenação;
- pet friendly;
- acessibilidade;
- filtros múltiplos.

---

# 24. Card de estabelecimento

Mostrar apenas:

- imagem;
- categoria;
- nome;
- descrição curta.

Opcionalmente pode haver um pequeno detalhe visual inspirado nas pedras ou placas paulistanas.

Não exagerar.

Não mostrar:

- estrelas;
- avaliações;
- horário;
- distância;
- botão de rota;
- selo;
- status “aberto agora”.

---

# 25. Detalhe de estabelecimento

Rota:

```text
/estabelecimentos/[slug]
```

Estrutura:

1. categoria;
2. nome;
3. descrição curta;
4. imagem principal / galeria;
5. Sobre;
6. Informações;
7. Veja também.

---

# 26. Detalhe de estabelecimento — informações

Mostrar:

- endereço;
- horário;
- telefone;
- WhatsApp;
- Instagram;
- site.

CTAs permitidos:

- WhatsApp;
- Instagram;
- Site.

Não mostrar:

- mapa embutido;
- estrelas;
- avaliações;
- comentários;
- cardápio completo;
- selo de certificação;
- rota;
- aberto agora;
- estatísticas.

---

# 27. Veja também

Pode existir.

Mostrar até:

- 3 estabelecimentos.

A lógica pode ser simples.

Não implementar algoritmo de recomendação.

Pode usar:

- mesma categoria;
- registros destacados;
- fallback simples.

---

# 28. Experiências & Eventos — listagem

A interface mostra ambos juntos.

Título:

**Experiências & Eventos**

Texto:

**Descubra o que viver na Aclimação.**

Filtros:

- Todos
- Eventos
- Experiências

Não adicionar mais filtros.

---

# 29. Card de evento

Mostrar:

- imagem;
- badge `EVENTO`;
- título;
- data;
- horário opcional;
- local.

Preço opcional.

---

# 30. Card de experiência

Mostrar:

- imagem;
- badge `EXPERIÊNCIA`;
- título;
- frequência ou disponibilidade;
- local.

Preço opcional.

Não colocar muitas informações.

---

# 31. Detalhe de evento

Rota:

```text
/eventos/[slug]
```

Estrutura:

1. badge;
2. título;
3. imagem;
4. linha de informações principais;
5. Sobre;
6. CTA opcional.

Exemplo da linha de informações:

```text
23 JUN   |   11h–15h   |   Parque da Aclimação
```

Não duplicar essas informações em outro card lateral.

## Sobre

Título:

**Sobre o evento**

Descrição.

## CTA

Opcional:

**Participar**

Não implementar:

- salvar na agenda;
- mapas;
- programação avançada;
- várias caixas laterais;
- circuitos;
- rotas.

---

# 32. Detalhe de experiência

Rota:

```text
/experiencias/[slug]
```

Estrutura:

1. badge;
2. título;
3. imagem;
4. Sobre;
5. informações;
6. CTA opcional.

Informações:

- local;
- quando acontece;
- duração;
- preço.

CTA:

**Saiba mais**

ou:

**Reservar**

Não mostrar “vagas limitadas” a menos que isso seja dado real.

---

# 33. Lugares — listagem

Rota:

```text
/lugares
```

Título:

**Lugares para conhecer**

Texto:

**Descubra espaços interessantes da Aclimação.**

Cards mais editoriais.

Mostrar:

- fotografia grande;
- categoria;
- nome;
- descrição curta.

Categorias possíveis:

- Todos
- Natureza
- História
- Arte & Cultura
- Arquitetura

Se os filtros deixarem a tela mais pesada, podem ser removidos.

---

# 34. Detalhe de lugar

Rota:

```text
/lugares/[slug]
```

Estrutura:

1. Hero;
2. Sobre;
3. História;
4. Informações para visitar;
5. Galeria.

---

# 35. Lugar — Hero

Mostrar:

- imagem;
- categoria;
- nome;
- descrição curta.

---

# 36. Lugar — Sobre

Título:

**Sobre**

Texto principal.

---

# 37. Lugar — História

Título:

**A história deste lugar**

Utilizar aproximadamente:

- 2 a 3 parágrafos.

Não criar timeline complexa.

Na v0.1 não haverá seção independente “Histórias”.

A história vive dentro dos lugares.

---

# 38. Lugar — Informações

Mostrar:

- endereço;
- horário, se necessário;
- entrada gratuita/paga, se aplicável.

Pode haver link:

**Abrir no Google Maps**

Não incorporar mapa.

---

# 39. Lugar — Galeria

Galeria simples.

Não exigir:

- título por imagem;
- descrição por imagem;
- metadata editorial.

Somente imagens + `alt`.

---

# 40. Participe

Rota:

```text
/participe
```

Título:

**Faça parte do Aclimação Preciosa**

Texto:

**O portal é construído com a participação de comerciantes, moradores e pessoas que conhecem o bairro.**

Mostrar 3 opções:

1. Cadastre seu negócio
2. Envie um evento ou experiência
3. Sugira um lugar ou história

---

# 41. Participe — formulários

A UI pode alterar campos conforme a opção selecionada.

## Cadastrar negócio

Campos mínimos:

- nome;
- categoria;
- contato;
- mensagem.

## Evento ou experiência

Campos mínimos:

- nome;
- tipo;
- data/frequência;
- local;
- contato;
- descrição.

## Lugar ou história

Campos mínimos:

- nome do lugar/história;
- contato;
- descrição.

Na v0.1 não é necessário persistir em banco.

Não criar:

- cadastro;
- autenticação;
- dashboard;
- workflow de aprovação;
- painel editorial.

---

# 42. Footer

Footer compacto.

Mostrar:

- marca;
- pequena frase;
- Estabelecimentos;
- Experiências & Eventos;
- Lugares;
- Participe;
- Sobre;
- Contato;
- Instagram.

Não criar footer excessivamente alto.

---

# 43. Elementos do layout novo que DEVEM ser aproveitados

O segundo layout tem ótimas ideias de identidade.

Incorporar seletivamente:

## Tipografia

- Playfair Display;
- Plus Jakarta Sans.

## Fundo

- tom papel quente.

## Verde esmeralda

Usar como cor primária.

## Azul paulistano

Pode aparecer pontualmente.

## Placas de rua

Usar como inspiração em pequenos detalhes.

Exemplo:

```text
RUA TOPÁZIO, 320
```

Não transformar isso em um componente dominante em toda página.

## Pedras preciosas

Usar como pequenos acentos ou labels.

Não transformar toda categoria numa cor forte.

## Mobile

A nova versão tem boa leitura vertical e fotografia grande.

Usar como referência para o tratamento mobile.

---

# 44. Elementos do layout novo que NÃO DEVEM ser implementados

Não implementar na v0.1:

- circuitos;
- rota Topázio ou similares;
- walking distance;
- “região sentimental”;
- classificações por pedra complexas;
- códigos dos lugares;
- métricas de curadoria;
- contadores de locais;
- temporada editorial;
- número de vagas fictício;
- programa de embaixadores;
- busca avançada;
- bottom navigation fixa;
- dezenas de padrões diferentes de card;
- sistemas de curadoria complexos.

---

# 45. Dados locais

Estrutura:

```text
src/
├── data/
│   ├── establishments.json
│   ├── events.json
│   ├── experiences.json
│   └── places.json
├── lib/
├── types/
└── ...
```

---

# 46. Base comum

Exemplo:

```ts
export type BaseContent = {
  id: string
  slug: string
  status: "draft" | "published"
  isMock: boolean
  featured: boolean
}
```

`isMock` deve ser obrigatório.

---

# 47. Conteúdo demonstrativo

Quando:

```ts
isMock === true
```

mostrar discretamente:

**Demonstração**

Especialmente em:

- eventos;
- experiências.

O badge não deve dominar a interface.

Antes do lançamento oficial, substituir mocks por dados reais.

---

# 48. Imagem

```ts
export type ImageAsset = {
  src: string
  alt: string
}
```

Não criar metadata adicional na v0.1.

---

# 49. Endereço

```ts
export type Address = {
  street: string
  number?: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  postalCode?: string
}
```

Não adicionar latitude/longitude na v0.1.

---

# 50. Estabelecimento

```ts
export type Establishment = BaseContent & {
  name: string
  category: EstablishmentCategory
  tags?: string[]

  shortDescription: string
  description: string

  coverImage: ImageAsset
  gallery?: ImageAsset[]

  address: Address
  openingHours?: string

  phone?: string
  whatsapp?: string
  email?: string
  website?: string
  instagram?: string
}
```

---

# 51. Evento

```ts
export type Event = BaseContent & {
  title: string
  category: EventCategory
  tags?: string[]

  shortDescription: string
  description: string

  coverImage: ImageAsset
  gallery?: ImageAsset[]

  startDate: string
  endDate?: string

  startTime?: string
  endTime?: string

  locationName: string
  address?: Address

  price?: number
  priceText?: string

  registrationUrl?: string
}
```

---

# 52. Experiência

```ts
export type Experience = BaseContent & {
  title: string
  category: ExperienceCategory
  tags?: string[]

  shortDescription: string
  description: string

  coverImage: ImageAsset
  gallery?: ImageAsset[]

  locationName: string
  address?: Address

  schedule?: string
  duration?: string

  price?: number
  priceText?: string

  bookingUrl?: string
  whatsapp?: string
}
```

---

# 53. Lugar

```ts
export type Place = BaseContent & {
  name: string
  category: PlaceCategory
  tags?: string[]

  shortDescription: string
  description: string

  history?: string

  coverImage: ImageAsset
  gallery?: ImageAsset[]

  address: Address
  openingHours?: string
}
```

---

# 54. Camada de acesso aos dados

Não importar e filtrar JSON diretamente em vários componentes.

Criar helpers/repositories simples.

Exemplo:

```ts
getEstablishments()
getFeaturedEstablishments()
getEstablishmentBySlug()

getEvents()
getEventBySlug()

getExperiences()
getExperienceBySlug()

getPlaces()
getFeaturedPlaces()
getPlaceBySlug()
```

Nada de repository genérico sofisticado.

---

# 55. Componentes esperados

Possíveis componentes:

```text
Header
MobileMenu
Footer
Container
SectionHeader
Button
Badge
CategoryFilters

EstablishmentCard
EventCard
ExperienceCard
PlaceCard

ImageGallery
MockBadge
EmptyState
```

Não fragmentar excessivamente componentes triviais.

---

# 56. Server e Client Components

Usar Server Components por padrão.

Usar `"use client"` apenas para interações reais, por exemplo:

- menu mobile;
- filtros;
- formulário;
- pequenos controles interativos.

Não transformar páginas inteiras em Client Components sem motivo.

---

# 57. Ícones

Usar somente:

**Lucide React**

Exemplos:

- MapPin;
- Clock;
- Phone;
- Instagram;
- Globe;
- Menu;
- X;
- ChevronRight.

Não adicionar outra biblioteca de ícones.

Não usar ícones quando texto for mais claro.

---

# 58. Responsividade

Precisa funcionar bem em:

- desktop;
- tablet;
- smartphone.

Mobile não deve ser simplesmente o desktop reduzido.

No mobile:

- uma coluna;
- imagens grandes;
- texto confortável;
- header simples;
- menu hambúrguer;
- filtros com scroll horizontal;
- botões com boa área de toque.

---

# 59. Acessibilidade

Implementar desde a v0.1:

- HTML semântico;
- heading hierarchy;
- alt em imagens;
- labels de formulário;
- foco visível;
- navegação por teclado;
- contraste adequado;
- links identificáveis;
- botões corretos semanticamente.

---

# 60. Performance

Priorizar:

- Server Components;
- geração estática quando possível;
- imagens otimizadas;
- pouco JavaScript;
- dependências mínimas.

O portal deve ser leve.

---

# 61. SEO básico

Não criar sistema de SEO complexo.

Pode utilizar os próprios dados das páginas para `metadata`.

Exemplo:

- nome/título;
- descrição curta;
- imagem principal.

Não criar um objeto `SeoMetadata` dedicado na v0.1.

---

# 62. Conteúdo inicial

Para a demonstração, o site pode funcionar com aproximadamente:

## Estabelecimentos

5–8 registros.

## Eventos

1–3 registros.

## Experiências

1–3 registros.

## Lugares

3–5 registros.

Parte dos dados pode ser mockada.

---

# 63. Não inventar dados como se fossem reais

Se um dado não estiver confirmado:

- utilizar conteúdo claramente fictício;
- definir `isMock: true`;
- mostrar badge “Demonstração”.

Não inventar:

- avaliações;
- número de visitantes;
- estatísticas;
- quantidade de estabelecimentos;
- números de curadoria;
- datas oficiais;
- parceiros confirmados.

---

# 64. Roadmap de evolução

A v0.1 precisa ficar preparada para evoluir, mas não deve implementar o roadmap agora.

---

# 65. v0.1 — Portal MVP

Tecnologias:

- Next.js;
- React;
- TypeScript;
- Tailwind;
- Lucide;
- JSON.

Funcionalidades:

- Home;
- estabelecimentos;
- filtro simples;
- detalhes;
- eventos;
- experiências;
- lugares;
- Participe;
- mock/real;
- responsividade;
- deploy.

---

# 66. v0.2 — Dados reais e CMS simples

Avaliar:

- Supabase;
- PostgreSQL;
- Supabase Storage.

Migrar JSON gradualmente.

Adicionar:

- CRUD;
- imagens;
- status;
- conteúdo em destaque.

---

# 67. v0.3 — Formulários reais

Avaliar:

- Zod;
- React Hook Form;
- Server Actions;
- Supabase.

Transformar Participe em entrada real de dados.

Adicionar validação.

---

# 68. v0.4 — Administração

Criar somente se houver necessidade.

Possibilidades:

- painel editorial;
- aprovação;
- editar conteúdos;
- upload de fotos.

---

# 69. v0.5 — Mapa

Adicionar:

- latitude;
- longitude;
- mapa;
- pins;
- lugares;
- negócios;
- eventos.

Avaliar:

- Mapbox;
- Google Maps;
- Leaflet/OpenStreetMap.

---

# 70. v0.6 — Rotas

Adicionar:

- rota gastronômica;
- rota cultural;
- rota histórica;
- Natal;
- circuitos.

Somente depois que os dados estiverem maduros.

---

# 71. v0.7 — Contas

Se houver necessidade real:

- Supabase Auth;
- comerciantes;
- perfis;
- edição do próprio negócio.

Não assumir que será necessário.

---

# 72. v0.8 — Analytics

Medir:

- páginas;
- cliques;
- WhatsApp;
- Instagram;
- site;
- eventos;
- conversões.

Usar os dados para demonstrar impacto.

---

# 73. Prisma

Prisma não é obrigatório.

Avaliar somente quando a camada de dados justificar.

Supabase/PostgreSQL pode atender bem sem Prisma.

Não adicionar por hábito.

---

# 74. O que deve ser removido mesmo que exista no Stitch

Lista explícita:

- login;
- usuário;
- avaliações;
- estrelas;
- comentários;
- favoritos;
- mapas;
- rotas;
- circuitos;
- aberto agora;
- distance calculation;
- contadores;
- estatísticas;
- badges de certificação;
- programa de embaixadores;
- rankings;
- newsletter;
- checkout;
- pagamentos;
- marketplace;
- delivery;
- dashboard;
- busca avançada;
- filtros avançados;
- bottom navigation mobile;
- curadoria complexa.

---

# 75. Critérios de aceite

## Visual

- identidade consistente;
- aproximação visual dos layouts Stitch;
- densidade semelhante ao layout simplificado;
- personalidade seletiva do layout novo;
- responsividade;
- boa fotografia;
- boa hierarquia.

## Funcional

- navegação funcionando;
- filtros funcionando;
- rotas por slug;
- JSON alimentando páginas;
- mocks identificados;
- links externos funcionando.

## Técnico

Os comandos devem funcionar:

```bash
npm run dev
```

e:

```bash
npm run build
```

Sem:

- erros TypeScript;
- erros de build;
- warnings importantes;
- erros no console.

---

# 76. Processo recomendado para o Codex

Antes de implementar:

1. ler este documento inteiro;
2. abrir os dois conjuntos de layouts do Stitch;
3. identificar componentes visuais reutilizáveis;
4. usar o layout anterior como estrutura principal;
5. usar o layout novo apenas como inspiração visual seletiva;
6. listar rapidamente o plano de implementação;
7. implementar a v0.1;
8. rodar lint;
9. rodar build;
10. corrigir erros;
11. testar desktop e mobile.

---

# 77. Regra para decisões durante a implementação

Quando houver dúvida entre:

- uma solução mais simples;
- uma solução mais sofisticada;

escolher a mais simples, desde que:

- mantenha qualidade visual;
- não prejudique acessibilidade;
- não gere grande dívida técnica.

---

# 78. Resultado esperado

Ao abrir o site, a sensação deve ser:

- bonito;
- leve;
- local;
- editorial;
- moderno;
- acolhedor;
- confiável.

A pessoa deve entender rapidamente que pode:

1. descobrir negócios;
2. descobrir o que fazer;
3. conhecer lugares;
4. participar do projeto.

O site não precisa parecer uma plataforma enorme.

Precisa parecer:

> **um MVP muito bem resolvido de um guia digital da Aclimação.**
