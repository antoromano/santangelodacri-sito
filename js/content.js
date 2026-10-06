// Carica i dati da /data/*.json (modificabili dal pannello CMS su /admin)
// e popola le sezioni dinamiche delle pagine. Nessuna build richiesta:
// i JSON vengono letti direttamente dal browser.

async function loadJSON(path) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Impossibile caricare", path, err);
    return null;
  }
}

function newsCardHTML(item) {
  const thumb = item.image
    ? `<div class="news-thumb" style="background-image:url('${item.image}');background-size:cover;background-position:center;"></div>`
    : `<div class="news-thumb"><span class="placeholder-tag">Esempio</span></div>`;
  return `
    <article class="news-card">
      ${thumb}
      <div class="news-body">
        <div class="news-date">${item.date || "Da aggiornare"}</div>
        <h3>${item.title || "Titolo notizia"}</h3>
        <p>${item.excerpt || ""}</p>
        <a href="notizie.html" class="news-link">Leggi di più →</a>
      </div>
    </article>`;
}

async function renderNewsHome() {
  const el = document.getElementById("home-news-grid");
  if (!el) return;
  const data = await loadJSON("data/notizie.json");
  const items = (data && data.items) || [];
  el.innerHTML = items.slice(0, 3).map(newsCardHTML).join("");
}

async function renderNewsFull() {
  const el = document.getElementById("notizie-grid-full");
  if (!el) return;
  const data = await loadJSON("data/notizie.json");
  const items = (data && data.items) || [];
  el.innerHTML = items.map(newsCardHTML).join("") || "<p>Nessuna notizia pubblicata.</p>";
}

async function renderMatch() {
  const avversarioEl = document.getElementById("match-avversario");
  const whenEl = document.getElementById("match-when");
  if (!avversarioEl && !whenEl) return;
  const data = await loadJSON("data/prossima-gara.json");
  if (!data) return;
  if (avversarioEl) avversarioEl.textContent = data.avversario || "Avversario";
  if (whenEl) whenEl.innerHTML = `${data.data || ""} · ore ${data.ora || ""}<br>${data.luogo || ""}`;
}

function sponsorHTML(item) {
  if (item && item.logo) {
    return `<div class="sponsor-slot" style="border-style:solid;"><img src="${item.logo}" alt="${item.nome || "Sponsor"}" style="max-width:100%;max-height:100%;"></div>`;
  }
  return `<div class="sponsor-slot">LOGO SPONSOR</div>`;
}

async function renderSponsors() {
  const targets = document.querySelectorAll("[data-sponsor-strip]");
  if (!targets.length) return;
  const data = await loadJSON("data/sponsor.json");
  const items = (data && data.items) || [];
  const html = items.map(sponsorHTML).join("");
  targets.forEach((el) => { el.innerHTML = html; });
}

async function renderRosa() {
  const el = document.getElementById("rosa-tbody");
  if (!el) return;
  const data = await loadJSON("data/rosa.json");
  const giocatori = (data && data.giocatori) || [];
  el.innerHTML = giocatori
    .map((g) => `<tr><td>${g.numero || ""}</td><td>${g.nome || "Nome Cognome"}</td><td>${g.ruolo || ""}</td></tr>`)
    .join("");
}

async function renderStaff() {
  const el = document.getElementById("staff-grid");
  if (!el) return;
  const data = await loadJSON("data/staff.json");
  const membri = (data && data.membri) || [];
  el.innerHTML = membri
    .map((m) => {
      const iniziale = (m.nome || "?").trim().charAt(0).toUpperCase();
      return `
        <div class="staff-card">
          <div class="staff-avatar">${iniziale}</div>
          <h3 style="margin-bottom:2px;">${m.nome || "Nome Cognome"}</h3>
          <p style="color:var(--ink-muted); font-size:0.9rem; margin:0;">${m.ruolo || ""}</p>
        </div>`;
    })
    .join("");
}

async function renderContattiCard() {
  const el = document.getElementById("contatti-list");
  if (!el) return;
  const data = await loadJSON("data/contatti.json");
  if (!data) return;
  const socialParts = [
    data.facebook && `<a href="${data.facebook}" target="_blank" rel="noopener">Facebook</a>`,
    data.instagram && `<a href="${data.instagram}" target="_blank" rel="noopener">Instagram</a>`,
  ].filter(Boolean);
  const social = socialParts.length ? socialParts.join(" · ") : "Pagine Facebook / Instagram da collegare";
  el.innerHTML = `
    <li><span class="ic">⌂</span><div><strong>Sede</strong><br>${data.sede || "Da aggiornare"}</div></li>
    <li><span class="ic">☎</span><div><strong>Telefono</strong><br>${data.telefono || "Da aggiornare"}</div></li>
    <li><span class="ic">✉</span><div><strong>Email</strong><br>${data.email || "Da aggiornare"}</div></li>
    <li><span class="ic">@</span><div><strong>Social</strong><br>${social}</div></li>`;
}

async function renderFooterContatti() {
  const el = document.getElementById("footer-contatti-list");
  if (!el) return;
  const data = await loadJSON("data/contatti.json");
  if (!data) return;
  el.innerHTML = `
    <li>Sede: ${data.sede || "da aggiornare"}</li>
    <li>Tel: ${data.telefono || "da aggiornare"}</li>
    <li>Email: ${data.email || "da aggiornare"}</li>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNewsHome();
  renderNewsFull();
  renderMatch();
  renderSponsors();
  renderRosa();
  renderStaff();
  renderContattiCard();
  renderFooterContatti();
});
