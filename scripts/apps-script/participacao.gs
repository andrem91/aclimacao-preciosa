/**
 * Aclimação Preciosa — recebe as contribuições do formulário "Participe"
 * e grava uma linha na aba correspondente desta planilha.
 *
 * Configuração: Extensões → Apps Script → Configurações do projeto →
 * Propriedades do script:
 *   PARTICIPATION_SECRET  senha igual à variável PARTICIPATION_WEBHOOK_SECRET da Vercel
 *   NOTIFY_EMAIL          (opcional) e-mail que recebe um aviso a cada envio
 */

const SHEETS = { negocio: "Negócios", evento: "Eventos", lugar: "Lugares e histórias" };

const HEADERS = {
  negocio: ["Recebido em", "Responsável", "Contato", "Nome do negócio", "Categoria", "Mensagem", "Situação"],
  evento: ["Recebido em", "Responsável", "Contato", "Nome do evento", "Data", "Horário", "Local", "Mensagem", "Situação"],
  lugar: ["Recebido em", "Responsável", "Contato", "Lugar ou história", "Mensagem", "Situação"],
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty("PARTICIPATION_SECRET");
    if (!secret || data.secret !== secret) return json({ ok: false, error: "unauthorized" });
    if (!SHEETS[data.tipo]) return json({ ok: false, error: "invalid_type" });

    const row = {
      negocio: [new Date(), data.responsavel, data.contato, data.nome, data.categoria, data.mensagem, "Nova"],
      evento: [new Date(), data.responsavel, data.contato, data.nome, data.data, data.horario, data.local, data.mensagem, "Nova"],
      lugar: [new Date(), data.responsavel, data.contato, data.nome, data.mensagem, "Nova"],
    }[data.tipo].map(safe);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      getSheet(data.tipo).appendRow(row);
    } finally {
      lock.releaseLock();
    }

    notify(props.getProperty("NOTIFY_EMAIL"), data);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: "server_error" });
  }
}

function getSheet(tipo) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEETS[tipo]);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEETS[tipo]);
    sheet.appendRow(HEADERS[tipo]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Evita que um texto começando com =, +, - ou @ seja interpretado como fórmula. */
function safe(value) {
  if (value instanceof Date) return value;
  const text = value == null ? "" : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function notify(to, data) {
  if (!to) return;
  MailApp.sendEmail(
    to,
    "Aclimação Preciosa: nova contribuição (" + SHEETS[data.tipo] + ")",
    data.responsavel + " enviou \"" + data.nome + "\". Confira a planilha.",
  );
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
