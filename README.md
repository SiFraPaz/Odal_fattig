# Kopibok for Nord-Odal fattigstyre 1846–1884 – digital utgave

Digitalisat med transkripsjon linje for linje. Hold pekeren over en linje i bildet
for å se teksten; klikk låser linjen. Bildet kan zoomes (musehjul, knip, dobbeltklikk,
knappene + / − / ⤢) og flyttes ved å dra.

* Arkivskaper: Nord-Odal kommune. Fattigstyret
* Oppbevaringssted: Innlandet fylkesarkiv / IKA Opplandene
* Referanse: OFA/0418-311/B/Ba/L0001 –
  [Arkivportalen](https://www.arkivportalen.no/entity/no-OFA_arkiv_000000120147)
* Digitalisat: Digitalarkivet

## Mappestruktur

| Sti | Innhold |
|---|---|
| `index.html` | Nettsiden (betrakter, verktøytips, lesetekst, sidebytte) |
| `config.js` | Metadata og listen over sider |
| `sider/side-001.js` | Transkripsjon og linjekoordinater for én side |
| `bilder/` | Digitalisatene |
| `verktoy/pagexml_til_js.py` | Gjør om PAGE-XML fra Transkribus til sidefiler |

## Publisere på GitHub Pages

1. Lag et nytt, offentlig repository på GitHub, f.eks. `kopibok-nord-odal`.
2. Last opp hele innholdet i denne mappen (*Add file → Upload files*, dra inn filer og mapper).
3. *Settings → Pages → Build and deployment*: velg *Deploy from a branch*, gren `main`, mappe `/ (root)`.
4. Etter et par minutter ligger siden på `https://<brukernavn>.github.io/kopibok-nord-odal/`.

Siden kan også åpnes lokalt ved å dobbeltklikke på `index.html`.

## Lenker til en bestemt linje

Adressen oppdateres når en linje låses, f.eks. `…/index.html#side=1&linje=12`.
Lenken kan deles og åpner siden med linjen fremhevet.

## Legge til nye sider fra Transkribus

1. Transkriber siden i Transkribus (gjerne med linjedeling og regioner kontrollert).
2. Eksporter dokumentet som **PAGE-XML** (*Export → Transkribus Document / PAGE*).
3. Kopier bildefila til `bilder/` (samme filnavn som i XML-fila).
4. Kjør i mappen:

   ```
   python verktoy/pagexml_til_js.py eksport/page/0002_Odal_2.xml --etikett "s. 2–3"
   ```

   Skriptet lager `sider/side-002.js` og legger siden til i `config.js`.
5. Åpne `sider/side-002.js` og fyll inn dato, tittel og regest for hver innførsel.

Kjører du skriptet på nytt for samme side (f.eks. etter justert linjedeling i Transkribus),
oppdateres bare koordinatene; tekst, merknader og innførsler du har rettet i sidefila beholdes
for linjer med samme id. Med `--overskriv` hentes teksten på nytt fra XML-fila.

## Tegn i transkripsjonen

| Tegn | Betydning |
|---|---|
| `[?]` | usikker lesning av foregående ord |
| `[…]` | uleselig |
| `[ord?]` | usikkert supplert lesning |
| `~~tekst~~` | overstrøket i originalen |

Feltene per linje: `tekst`, `marg` (randnotat/dato), `merknad` (redaksjonell kommentar),
`type` (`topp`, `tittel`, `etikett`, `randnotat` – disse nummereres ikke).
Koordinater oppgis som `y` (midten av linjen), `boks: [x1, y1, x2, y2]` eller `punkter` (polygon).
