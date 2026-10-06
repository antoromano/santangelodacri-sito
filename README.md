# Sito A.S.D. Sant'Angelo D'Acri — MVP

Sito vetrina statico (HTML/CSS/JS puro, nessuna build necessaria) per mostrare al
social media manager della squadra. Design originale (palette blu navy + oro
presa dallo stemma, non il rosso/nero del template Tuttocampo), nessun codice
o asset copiato da terzi.

## Come aprirlo

Basta aprire `index.html` nel browser (doppio click), oppure servirlo con un
server locale qualsiasi, es.:

```bash
python3 -m http.server 8000
```

e aprire `http://localhost:8000`.

## Struttura

```
index.html        Home
notizie.html       Elenco notizie
squadra.html        Rosa e staff
calendario.html      Calendario, classifica, risultati (qui va il widget Tuttocampo)
contatti.html        Contatti, form, sponsor
css/style.css        Tutto lo stile del sito
js/main.js        Menu mobile + tab classifica/calendario
assets/stemma.svg      Stemma segnaposto — SOSTITUIRE con lo stemma reale del club
```

## Cosa va sostituito prima di andare online

Tutto ciò che è marcato con l'etichetta gialla **"Esempio"** nel sito è contenuto
segnaposto:

- Stemma del club (`assets/stemma.svg`) → sostituire con il logo ufficiale
- Notizie (home + `notizie.html`) → testi, date e immagini reali
- Rosa e staff (`squadra.html`) → nomi, ruoli, numeri di maglia reali
- Prossima gara (home) → avversario, data, orario reali
- Contatti (`contatti.html`) → indirizzo, telefono, social reali
- Sponsor → loghi reali al posto dei riquadri "LOGO SPONSOR"

## Collegare il widget gratuito di Tuttocampo (classifica/calendario sempre aggiornati)

Tuttocampo mette a disposizione gratuitamente widget embeddabili (iframe) per
siti di società sportive, separati dal pacchetto "sito completo" a pagamento:

1. Andare su **https://www.tuttocampo.it/WidgetApi**
2. Selezionare: Regione = **Calabria**, Categoria = **Terza Categoria**,
   Girone = quello del Sant'Angelo D'Acri (risultava Girone B alla stesura di
   questo MVP — verificare che sia ancora corretto), e il tipo di widget
   (Classifica / Calendario / Risultati)
3. Cliccare "Genera Widget": Tuttocampo fornisce un blocco di codice
   (tipicamente un `<iframe src="https://widget.tuttocampo.it/...">`)
4. Incollare quel codice al posto dei blocchi segnaposto `.widget-mount`
   che si trovano in:
   - `calendario.html` (3 punti: classifica, calendario, risultati — cercare
     i commenti `PUNTO DI AGGANCIO WIDGET TUTTOCAMPO`)
   - `index.html` (anteprima classifica/calendario in home — commenti
     `TUTTOCAMPO_WIDGET_CLASSIFICA` / `TUTTOCAMPO_WIDGET_CALENDARIO`)

Nota: al momento della creazione di questo MVP, tuttocampo.it restituiva un
errore 500 temporaneo sulla pagina dei widget — se capita di nuovo, riprovare
più tardi, il servizio di solito torna disponibile in breve tempo.

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

- Sostituire tutti i contenuti segnaposto con i dati reali
- Configurare i 2-3 widget Tuttocampo (classifica, calendario, eventualmente risultati)
- Decidere come il social media manager aggiornerà le notizie (per un MVP
  statico serve editare l'HTML a mano; se servirà autonomia va aggiunto un
  pannello/CMS minimale — da valutare come passo successivo)
- Scegliere hosting e dominio per la pubblicazione definitiva
