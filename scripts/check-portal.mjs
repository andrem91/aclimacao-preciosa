import assert from "node:assert/strict";
import fs from "node:fs";
const base = process.env.PORTAL_URL ?? "http://127.0.0.1:3000";
const datasets = {
  establishments: "negocios",
  events: "eventos",
  places: "lugares",
};
const routes = ["/", "/negocios", "/eventos", "/lugares", "/participe"];
for (const [file, route] of Object.entries(datasets)) {
  const records = JSON.parse(fs.readFileSync(`src/data/${file}.json`, "utf8"));
  assert.equal(
    new Set(records.map((x) => x.slug)).size,
    records.length,
    `${file}: duplicate slug`,
  );
  for (const record of records) {
    assert.ok(["draft", "published"].includes(record.status));
    if (file === "places")
      assert.ok(record.coverImage?.src && record.coverImage?.alt);
    for (const image of [record.coverImage, record.logo].filter(Boolean))
      assert.ok(image.src && image.alt);
    if (record.status === "published") routes.push(`/${route}/${record.slug}`);
  }
}
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.ok(html.includes("<h1"), `${route}: missing h1`);
  assert.ok(html.includes('lang="pt-BR"'), `${route}: missing language`);
  assert.ok(!html.includes('href="#"'), `${route}: placeholder link`);
  assert.ok(!html.includes("\uFFFD"), `${route}: invalid text encoding`);
  if (route === "/negocios") {
    assert.ok(
      !html.includes("data-business-photo"),
      "Business cards must not use photo banners",
    );
  }
  if (route === "/negocios/cafe-livraria-da-praca") {
    assert.ok(
      html.includes("data-business-photo") &&
        html.includes("/images/cafe-livraria-da-praca.svg"),
    );
    assert.ok(html.includes('href="mailto:contato@example.com"'));
    assert.ok(html.includes('aria-label="Copiar e-mail"'));
    for (const name of [
      "Instagram",
      "YouTube",
      "LinkedIn",
      "Facebook",
      "TikTok",
    ])
      assert.ok(html.includes(`aria-label="${name}"`), `Missing ${name}`);
  }
  if (route === "/negocios/atelie-mariana-prado") {
    assert.ok(!html.includes("data-business-photo"));
    assert.ok(html.includes('aria-label="Instagram"'));
    assert.ok(!html.includes('aria-label="YouTube"'));
  }
  if (route === "/negocios/eletricista-do-bairro") {
    assert.ok(
      html.includes("No local do cliente") &&
        html.includes("Aclimação e arredores"),
    );
    assert.ok(
      !/<dt[^>]*>Endereço<\/dt>/.test(html),
      "Mobile provider must not display an address",
    );
    assert.ok(
      html.includes('aria-label="Iniciais de Eletricista do Bairro"'),
      "Missing initials fallback",
    );
    assert.ok(
      !html.includes('aria-label="Contatos do negócio"'),
      "Empty contact section",
    );
    assert.ok(!html.includes("data-business-photo"), "Empty photo section");
  }
  if (route === "/negocios/atelie-mariana-prado")
    assert.ok(
      html.includes("/images/atelie-mariana-prado.svg"),
      "Missing logo",
    );
  console.log(`OK ${route}`);
}
for (const route of ["/negocios", "/lugares", "/eventos", "/experiencias"]) {
  const response = await fetch(base + route + "/registro-inexistente");
  const html = await response.text();
  // Next may stream the not-found UI with 200; noindex and the correct UI must still be present.
  assert.ok([200, 404].includes(response.status));
  assert.ok(
    html.includes("Essa descoberta ainda não está aqui.") &&
      html.includes("noindex"),
    route + ": missing not-found handling",
  );
}
const redirected = await fetch(base + "/experiencias", { redirect: "manual" });
for (const suffix of ["", "/cafe-livraria-da-praca"]) {
  const legacy = await fetch(
    base + "/estabelecimentos" + suffix + "?origem=teste",
    { redirect: "manual" },
  );
  assert.equal(legacy.status, 308);
  assert.equal(
    legacy.headers.get("location"),
    "/negocios" + suffix + "?origem=teste",
  );
}
assert.ok([307, 308].includes(redirected.status));
assert.equal(redirected.headers.get("location"), "/eventos");
console.log(
  `Passed ${routes.length} public pages, 4 invalid slugs, redirect, and dataset checks.`,
);

const detail = await (
  await fetch(base + "/eventos/oficina-de-ceramica")
).text();
assert.ok(
  detail.includes("Dias e horários") && detail.includes("Entrada paga"),
);
assert.ok(detail.includes("28/11/2026") && detail.includes("13/12/2026"));
assert.ok(
  !detail.includes("Horário de São Paulo") &&
    !/>\s*(Inscreva-se|Ver ingresso)\s*</.test(detail),
);
assert.ok(
  detail.includes("<strong>") && detail.includes("Prepare-se para o encontro"),
);
const filtered = await (
  await fetch(base + "/eventos?categoria=Oficinas&periodo=todos")
).text();
assert.ok(filtered.includes("Oficina de cerâmica"));
assert.ok(!filtered.includes('href="/eventos/piquenique-musical-no-parque'));
const upcoming = await (await fetch(base + "/eventos?periodo=proximos")).text();
assert.match(
  upcoming,
  /<option value="proximos" selected="">Próximos<\/option>/,
);
const defaultEvents = await (await fetch(base + "/eventos")).text();
assert.match(
  defaultEvents,
  /<option value="ativos" selected="">Próximos e em andamento<\/option>/,
);
const empty = await (await fetch(base + "/eventos?q=nenhum-evento-xyz")).text();
assert.ok(empty.includes("Nenhum evento por aqui ainda"));
for (const slug of ["oficina-de-ceramica", "degustacao-de-cafes-especiais"]) {
  const response = await fetch(base + "/experiencias/" + slug, {
    redirect: "manual",
  });
  const html = await response.text();
  assert.ok(
    response.headers.get("location") === "/eventos/" + slug ||
      html.includes("/eventos/" + slug),
  );
}
console.log(
  "Passed event filters, schedules and simplified details and legacy redirects.",
);

const contribution = await (
  await fetch(base + "/participe?tipo=evento")
).text();
const placeSearch = await (
  await fetch(base + "/lugares?q=aclimacao&categoria=Natureza")
).text();
assert.ok(placeSearch.includes('href="/lugares/parque-da-aclimacao?voltar='));
assert.ok(!placeSearch.includes('href="/lugares/biblioteca-raul-bopp'));
const noPlaces = await (await fetch(base + "/lugares?q=nao-existe-xyz")).text();
assert.ok(noPlaces.includes("Nenhum lugar encontrado"));
const park = await (
  await fetch(
    base +
      "/lugares/parque-da-aclimacao?voltar=%2Flugares%3Fcategoria%3DNatureza",
  )
).text();
assert.ok(park.includes("Planeje sua visita") && park.includes("Como chegar"));
assert.ok(park.includes('href="/lugares?categoria=Natureza"'));
assert.ok(
  park.includes("Mais informações") && !park.includes("Outros olhares"),
);
const street = await (
  await fetch(base + "/lugares/vilas-da-rua-pedra-azul")
).text();
assert.ok(
  street.includes("Observação pela via pública") &&
    !street.includes('aria-label="Contatos do lugar"'),
);
console.log(
  "Passed place filters, visitor information, optional contacts and duplicate gallery checks.",
);
assert.ok(
  contribution.includes("Data do evento") &&
    !contribution.includes("Nome do evento ou experiência"),
);

assert.ok(
  !park.includes("Consultado em") && !/<dt[^>]*>Acesso<\/dt>/.test(park),
);
const phoneLinks = [
  ...park.matchAll(/<a\b[^>]*href="tel:[^"]*"[^>]*>([\s\S]*?)<\/a>/g),
];
assert.ok(phoneLinks.length > 0, "Missing place phone link");
for (const [, contents] of phoneLinks) {
  assert.ok(
    !contents.replace(/<[^>]*>/g, "").includes("Ligar"),
    "Place phone should be a simple contact link",
  );
}
