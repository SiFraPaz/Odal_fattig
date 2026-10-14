/*
  Side 1 (forsats og s. 1)
  Koordinater i piksler i bildet. Hver linje har enten
    y: midten av linjen (boks lages automatisk over tekstspalten),
    boks: [x1, y1, x2, y2], eller
    punkter: "x,y x,y ..." (polygon, f.eks. fra PAGE-XML).

  Tegn i teksten:
    [?]        usikker lesning av foregående ord
    […]        uleselig
    [ord?]     usikkert supplert lesning
    ~~tekst~~  overstrøket i originalen
*/
KOPIBOK.data["side-001"] = {
  id: "side-001",
  etikett: "Forsats og s. 1",
  bilde: "bilder/Odal_1.jpg",
  bredde: 2181,
  hoyde: 1728,
  standardspalte: [1030, 2100],

  innforsler: [
    { id: "forsats", dato: "", tittel: "Forsats",
      regest: "Bokbinderetikett og tittel på kopiboken." },
    { id: "1846-01-27", dato: "27. januar 1846", tittel: "Til Hedemarkens amt",
      regest: "Oversender de skjematiske oppgavene over fattigforsørgelsen 1841–45 og over kreaturhold og utsæd 1845. Forklarer at antallet fattige økte etter harde år med mangel og tiltagende tigging, mens utgiftene holdt seg stabile fordi gode år ga arbeidsfortjeneste og bidragene kunne settes ned." },
    { id: "1846-07-06", dato: "6. juli 1846", tittel: "Attest, Holterske legat 1844",
      regest: "Attest om at Nordre Odalens andel av rentene av Holterske legat for 1844 er delt ut til de mest trengende fattige til innkjøp av såkorn." },
    { id: "1846-07-27", dato: "27. juli 1846", tittel: "Attest, Holterske legat 1845",
      regest: "Attest om at 30 spd 77 ß av legatets renter for 1845 er delt ut etter fundasens § 21 til innkjøp av såkorn; underskrevet på kommisjonens vegne av Nørregaard. Randnotat: til prost Kynning." },
    { id: "1846-11-16", dato: "16. november 1846", tittel: "Til Strøms fattigvesensbestyrelse",
      regest: "Oversender et brev etter anmodning fra pastor Gude, da de omtalte personene er helt ukjente i Nordre Odalens prestegjeld." },
    { id: "1846-12-14", dato: "14. desember 1846", tittel: "Til lensmann Herstette",
      regest: "Oversender avskrift i henhold til § 40 i fattigloven av 20. september 1845 (fortsetter på neste side)." }
  ],

  linjer: [
    /* venstre side (forsats) */
    { inn: "forsats", type: "etikett", boks: [115, 60, 290, 165],
      tekst: "Faaes hos / BOGBINDER / J. C. Hoppe [?] / Christiania",
      merknad: "Trykt bokbinderetikett" },
    { inn: "forsats", type: "tittel", boks: [380, 650, 600, 775],
      tekst: "Copiebog." },

    /* høyre side, topp */
    { inn: "1846-01-27", type: "topp", y: 96, marg: "1846.",
      tekst: "Aaret 1846.", merknad: "Sidetall øverst til høyre: 1" },

    /* 27. januar 1846 */
    { inn: "1846-01-27", y: 167, marg: "27 Januar",
      tekst: "Tilskrevet Hedemarkens Amt saalydende: De i Amtscirkulæret af 8de Octbr f.A. begjer-" },
    { inn: "1846-01-27", y: 204,
      tekst: "te schematiske Oplysninger, saavel ved Fattigforsørgelsen i Nordre Oudalen i Aa-" },
    { inn: "1846-01-27", y: 239,
      tekst: "rene 1841–45 m.m., som over Kreaturholdet og Udsæden i Aaret 1845, giver jeg" },
    { inn: "1846-01-27", y: 280,
      tekst: "mig den Ære hermed at indsende. I Sagens Anledning finder jeg mig",
      merknad: "«indsende» er overskrevet med mørkere blekk i originalen" },
    { inn: "1846-01-27", y: 318,
      tekst: "dog foranlediget til at gjøre følgende Bemærkninger: At de Fattiges Antal" },
    { inn: "1846-01-27", y: 358,
      tekst: "har tiltaget noget i det sidste Qvinqvennium, sammenholdt med det næstfore-" },
    { inn: "1846-01-27", y: 397,
      tekst: "gaaende, er formeentlig ene og alene at tilskrive de haarde [?] i forrige" },
    { inn: "1846-01-27", y: 435,
      tekst: "Qvinqvennium paa hverandre følgende Aar, der havde Mangel […]" },
    { inn: "1846-01-27", y: 475,
      tekst: "saa og et overhaandtagende Tiggerie til Følge. Forsaavidt […], at man" },
    { inn: "1846-01-27", y: 519,
      tekst: "[…] fandt Fattigcommissionen det nødvendigt at antage til stadig" },
    { inn: "1846-01-27", y: 557,
      tekst: "Forsørgelse Flere, som forhen nøde ingen eller i alt Fald kun partiel Un-" },
    { inn: "1846-01-27", y: 597,
      tekst: "derstøttelse; deraf altsaa Tilvæxten i de Fattiges Antal, som især viser sig" },
    { inn: "1846-01-27", y: 636,
      tekst: "kjendelig i Tabellens 2det Rubrum, hvori de Fattiges Antal findes an-" },
    { inn: "1846-01-27", y: 674,
      tekst: "førte, der nyde Understøttelse udenfor Huset. Tilvæxten har dog ikke" },
    { inn: "1846-01-27", y: 712,
      tekst: "bevirket nogen synderlig Forøgelse i Fattigbyrden [?], der har holdt sig" },
    { inn: "1846-01-27", y: 755,
      tekst: "omtr. paa samme Standpunkt i begge respective Qvinqvennier; men denne" },
    { inn: "1846-01-27", y: 796,
      tekst: "tilsyneladende Anomali lader sig let forklare, naar bemærkes, at det sidste" },
    { inn: "1846-01-27", y: 835,
      tekst: "Qvinqvenniums Aaringer alle have faldet gode, altsaa givet god Adgang" },
    { inn: "1846-01-27", y: 873,
      tekst: "til Arbeidsfortjeneste; hvoraf igjen følger, at Fattigcommissionen har" },
    { inn: "1846-01-27", y: 911,
      tekst: "kunnet nedsætte de forhen ydede Bidrag til de Fattige; medens den dog ikke" },
    { inn: "1846-01-27", y: 950,
      tekst: "saae nogen Udvei [?] til at foretage Indskrænkning i de Forsørgedes Tal. –" },

    /* 6. juli 1846 */
    { inn: "1846-07-06", y: 999, marg: "6 Juli",
      tekst: "[…] Skrivelse af 30 Juni 1846 (se Journal No 4/1846) oversendt [?] […]" },
    { inn: "1846-07-06", y: 1036,
      tekst: "følgende Attest: At den Andeel i Renterne af det Holterske Legat, der i Aaret" },
    { inn: "1846-07-06", y: 1071,
      tekst: "1844 tilfaldt Nordre Oudalen, er af Fattigcommissionen uddeelt til Præstegjel-" },
    { inn: "1846-07-06", y: 1107,
      tekst: "dets mest trængende Fattige til Sædekorns Indkjøb, attesteres herved. –" },

    /* 27. juli 1846 */
    { inn: "1846-07-27", y: 1150, marg: "27 Juli",
      tekst: "Den i Skrivelse af 22 Juli […] begjerte [?] Attest oversendtes [?] herved […]" },
    { inn: "1846-07-27", y: 1188,
      tekst: "Attesten lød saaledes: At 30 Spd 77 ß af det Holterske Legats Renter for Aaret" },
    { inn: "1846-07-27", y: 1228,
      tekst: "1845 ere af Nordre Oudals Fattigcommission uddeelte i Overeensstemmelse" },
    { inn: "1846-07-27", y: 1266,
      tekst: "med Fundatsens § 21 til Sædekorns Indkjøb, attesteres herved paa Com-" },
    { inn: "1846-07-27", y: 1304,
      tekst: "missionens Vegne. – Nørregaard.",
      merknad: "Randnotat til høyre, annet blekk: «til Hr Provst Kynning»" },

    /* 16. november 1846 */
    { inn: "1846-11-16", y: 1366, marg: "16 Novbr",
      tekst: "Oversendt Strøms Fattigvæsensbestyrelse den i Journalen under No 6 indførte" },
    { inn: "1846-11-16", y: 1405,
      tekst: "Skrivelse af 2den Novbr 1846 med saadan Paategning: „Oversendes herved, ifølge" },
    { inn: "1846-11-16", y: 1441,
      tekst: "ovenstaaende Begjering af Pastor Gude, til Strøms ærede Fattigvæsensbestyrel-" },
    { inn: "1846-11-16", y: 1478,
      tekst: "se, da Angjeldende ere aldeles ubekjendte Personer i Nordre Oudalens Præste-" },
    { inn: "1846-11-16", y: 1513,
      tekst: "gjeld.“ –" },

    /* 14. desember 1846 */
    { inn: "1846-12-14", y: 1568, marg: "14de Decbr",
      tekst: "Tilskrevet Lensmand Herstette [?] saalydende: Jeg har den Ære herved ærbødigst, i Henhold til" },
    { inn: "1846-12-14", y: 1606,
      tekst: "Lov af 20 Septbr 1845 § 40, at oversende Hr Lensmanden Afskrift af Nordre Oudals",
      merknad: "Fortsetter på neste side" }
  ]
};
