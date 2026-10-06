# Sito A.S.D. Sant'Angelo D'Acri

Sito vetrina statico (HTML/CSS/JS puro, nessuna build necessaria) con pannello
di gestione contenuti incluso, pensato per essere aggiornato direttamente dal
social media manager del club. Design originale (palette blu navy + oro presa
dallo stemma, non il rosso/nero del template Tuttocampo), nessun codice o
asset copiato da terzi.

- **Sito pubblico**: https://asd-santangelodacri.github.io/santangelodacri-sito/
- **Pannello contenuti**: https://asd-santangelodacri.github.io/santangelodacri-sito/admin/

## Come aprirlo in locale

I contenuti vengono caricati via `fetch()` dai file in `data/*.json`, quindi
serve un server locale (il protocollo `file://` blocca il fetch per motivi di
sicurezza del browser). Da dentro la cartella del progetto:

```bash
python3 -m http.server 8000
```

e aprire `http://localhost:8000`.

## Struttura

```
index.html         Home
notizie.html        Elenco notizie
squadra.html         Rosa e staff
calendario.html       Calendario, classifica, risultati (widget Tuttocampo)
contatti.html         Contatti, form, sponsor
css/style.css         Tutto lo stile del sito
js/main.js         Menu mobile + tab classifica/calendario
js/content.js        Legge i file in data/ e popola le pagine
data/*.json          Contenuti modificabili (anche a mano, oppure dal pannello /admin)
assets/stemma.svg       Stemma segnaposto — SOSTITUIRE con lo stemma reale del club
assets/uploads/        Dove il pannello salva le immagini caricate (loghi, foto notizie)
admin/index.html        Pannello di gestione contenuti (Sveltia CMS)
admin/config.yml        Configurazione del pannello (quali campi sono modificabili)
```

## Come funziona il pannello di gestione (`/admin`)

Il social media manager apre `/admin`, fa login con GitHub, e vede un modulo
per ogni sezione del sito invece dell'HTML:

| Sezione nel pannello | File aggiornato      | Dove compare sul sito |
|---|---|---|
| Notizie | `data/notizie.json` | Home (ultime 3) + pagina Notizie (tutte) |
| Prossima gara | `data/prossima-gara.json` | Home |
| Rosa | `data/rosa.json` | Pagina Squadra |
| Staff tecnico | `data/staff.json` | Pagina Squadra |
| Sponsor | `data/sponsor.json` | Home + pagina Contatti |
| Contatti | `data/contatti.json` | Pagina Contatti + footer |

Ogni salvataggio dal pannello crea un commit sul repository: il sito si
aggiorna da solo entro un minuto circa, senza bisogno di nessun intervento
tecnico. La classifica/calendario (pagina Calendario) resta gestita a parte
tramite il widget Tuttocampo — non passa dal pannello perché è un dato che
arriva in diretta da loro.

### Accesso al pannello — due modalità possibili

Il pannello (basato su [Sveltia CMS](https://sveltiacms.app), gratuito e
open source) supporta due modi di login. Chi scrive i contenuti deve comunque
avere accesso in scrittura al repository (come collaboratore o membro
dell'organizzazione che lo ospita) — cambia solo *come* si autentica:

**Opzione A — Token di accesso personale (consigliata per iniziare, nessuna
infrastruttura in più)**

Su `/admin`, pulsante "Accedi con Token di Accesso":

1. Su GitHub: Settings → Developer settings → Personal access tokens →
   **Fine-grained tokens** → genera un token limitato al solo repository del
   sito, con permesso "Contents: Read and write"
2. Incollare il token nel pannello

Resta valido finché non viene revocato o scade. Zero servizi esterni oltre
GitHub stesso — sufficiente per uno o pochi editor.

**Opzione B — Login con un click ("Accedi con GitHub")**

Più comodo da usare ogni giorno (nessun token da generare/conservare), ma
richiede di mettere in piedi un piccolo componente esterno, perché un sito
statico non può custodire credenziali segrete:

1. **Cloudflare Worker di autenticazione** (gratuito): un piccolo script
   ([sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)) che
   gestisce il login GitHub del pannello. Richiede un account Cloudflare
   (gratuito) — non ha a che fare con l'hosting del sito, serve solo per
   questo passaggio di login.
2. **GitHub OAuth App**: un'app OAuth registrata sull'organizzazione/account
   che possiede il repository, con callback URL che punta al Worker del
   punto 1.
3. Una volta ottenuti client ID/secret dal punto 2, si configurano come
   variabili d'ambiente del Worker, e si completa `admin/config.yml`
   aggiungendo la riga `base_url` con l'indirizzo del Worker.

Finché l'Opzione B non è configurata, il pulsante "Accedi con GitHub" in
`/admin` risulta "not found" — è normale, basta usare l'Opzione A nel
frattempo (o definitivamente, se è sufficiente).

## Cosa va sostituito prima di andare online

Tutto ciò che è marcato con l'etichetta gialla **"Esempio"** o con "Da
aggiornare" è contenuto segnaposto, modificabile sia a mano nei file
`data/*.json` sia dal pannello `/admin`:

- Stemma del club (`assets/stemma.svg`) → sostituire con il logo ufficiale
- Notizie, prossima gara, rosa, staff, sponsor, contatti → vedi tabella sopra

## Collegare il widget gratuito di Tuttocampo (classifica/calendario sempre aggiornati)

Tuttocampo mette a disposizione gratuitamente widget embeddabili (iframe) per
siti di società sportive, separati dal pacchetto "sito completo" a pagamento:

1. Andare su **https://www.tuttocampo.it/WidgetApi**
2. Selezionare: Regione = **Calabria**, Categoria = **Terza Categoria**,
   Girone = quello del Sant'Angelo D'Acri (risultava Girone B alla stesura di
   questo sito — verificare che sia ancora corretto), e il tipo di widget
   (Classifica / Calendario / Risultati)
3. Cliccare "Genera Widget": Tuttocampo fornisce un blocco di codice
   (tipicamente un `<iframe src="https://widget.tuttocampo.it/...">`)
4. Incollare quel codice al posto dei blocchi segnaposto `.widget-mount`
   che si trovano in:
   - `calendario.html` (3 punti: classifica, calendario, risultati — cercare
     i commenti `PUNTO DI AGGANCIO WIDGET TUTTOCAMPO`)
   - `index.html` (anteprima classifica/calendario in home — commenti
     `TUTTOCAMPO_WIDGET_CLASSIFICA` / `TUTTOCAMPO_WIDGET_CALENDARIO`)

## Perché è legalmente ok

- Nessun codice, CSS, font o immagine di Tuttocampo è stato copiato: il sito è
  scritto da zero, con un design (colori, tipografia, layout dei componenti)
  volutamente diverso dal loro template.
- Il widget Tuttocampo, quando lo configurerete, è un servizio che loro stessi
  offrono gratuitamente per essere incorporato su siti esterni — usarlo così
  è l'uso previsto, non una violazione.
- Nome squadra, stemma reale, foto e contenuti sono di proprietà del club e
  possono essere usati liberamente su un sito commissionato dal club stesso.

## Prossimi passi suggeriti

- Completare il setup del pannello (vedi sezione sopra)
- Sostituire tutti i contenuti segnaposto con i dati reali
- Configurare i widget Tuttocampo (classifica, calendario, eventualmente risultati)
- Quando/se il club vorrà un dominio proprio (es. `.it`), collegarlo sopra
  l'hosting GitHub Pages esistente — nessuna migrazione necessaria
