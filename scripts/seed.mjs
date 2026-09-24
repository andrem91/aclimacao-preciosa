import fs from "node:fs";
const old = "stitch_aclima_o_preciosa_portal_design/";
const images = (dir) =>
  [
    ...fs
      .readFileSync(old + dir + "/code.html", "utf8")
      .matchAll(/<img\b[^>]*src="(https:\/\/lh3[^\"]+)"/g),
  ].map((m) => m[1]);
const businessImages = images("estabelecimentos_aclima_o_preciosa");
const placeImages = images("lugares_aclima_o_preciosa");
const agendaImages = images("experi_ncias_e_eventos_aclima_o_preciosa");
const photos = (arr) => arr.filter((x) => x.includes("/aida-public/"));
const b = photos(businessImages),
  p = photos(placeImages),
  a = photos(agendaImages);
const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const base = (name, i) => ({
  id: slug(name),
  slug: slug(name),
  status: "published",
  featured: i < 3,
});
const address = {
  street: "Endereço a confirmar",
  neighborhood: "Aclimação",
  city: "São Paulo",
  state: "SP",
};
const businesses = [
  [
    "Café & Livraria da Praça",
    "Comer & Beber",
    "Cafés especiais, boas leituras e uma pausa de frente para a praça.",
  ],
  [
    "Ateliê Mariana Prado",
    "Arte & Cultura",
    "Cerâmica feita à mão e espaço para descobrir um novo ofício.",
  ],
  [
    "Moinho da Colina",
    "Comer & Beber",
    "Pães de fermentação natural e o cheiro de uma nova fornada.",
  ],
  [
    "Quintal das Suculentas",
    "Compras",
    "Plantas, vasos e pequenos jardins para levar para casa.",
  ],
  [
    "Espaço Yoga Aclimação",
    "Saúde & Bem-estar",
    "Movimento, respiração e um momento de cuidado no dia.",
  ],
  [
    "Oficina Mecânica do Bairro",
    "Serviços",
    "Um exemplo de serviço de proximidade para o cotidiano do bairro.",
  ],
].map(([name, category, shortDescription], i) => ({
  ...base(name, i),
  name,
  category,
  shortDescription,
  description: shortDescription,
  coverImage: { src: b[i], alt: "Imagem de " + name },
  address,
}));
const places = [
  [
    "Parque da Aclimação",
    "Natureza",
    "Uma pausa entre o lago, as árvores e os caminhos do bairro.",
  ],
  [
    "Biblioteca Raul Bopp",
    "Arte & Cultura",
    "Livros e descobertas para um passeio com tempo de sobra.",
  ],
  [
    "Vilas da Rua Pedra Azul",
    "Arquitetura",
    "Um convite para observar os detalhes das ruas e suas casas.",
  ],
].map(([name, category, shortDescription], i) => ({
  ...base(name, i),
  name,
  category,
  shortDescription,
  description: shortDescription,
  coverImage: { src: p[i], alt: "Imagem de " + name },
  gallery: [{ src: p[i], alt: "Referência visual para " + name }],
  address,
  admission: "Informação a confirmar",
}));
const events = [
  [
    "Piquenique musical no parque",
    "Música",
    "Música ao ar livre e uma tarde para encontrar a vizinhança.",
    "2026-11-15",
    "Parque da Aclimação",
    a[0],
  ],
  [
    "Caminhada pelos casarões",
    "Cultura",
    "Um olhar atento para fachadas, jardins e detalhes do bairro.",
    "2026-11-21",
    "Ponto de encontro a confirmar",
    a[2],
  ],
].map(
  ([title, category, shortDescription, startDate, locationName, src], i) => ({
    ...base(title, i),
    title,
    category,
    subtitle: shortDescription,
    body: shortDescription,
    sessions: [{ date: startDate, startTime: "10:00", endTime: "12:00" }],
    locationName,
    admission: "free",
    coverImage: { src, alt: "Imagem de " + title },
  }),
);
fs.mkdirSync("src/data", { recursive: true });
for (const [name, data] of Object.entries({
  establishments: businesses,
  places,
  events,
}))
  fs.writeFileSync(
    "src/data/" + name + ".json",
    JSON.stringify(data, null, 2) + "\n",
  );
console.log("Created initial records.");
