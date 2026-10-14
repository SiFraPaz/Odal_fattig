#!/usr/bin/env python3
"""
Konverterer PAGE-XML (eksport fra Transkribus) til sidefiler for nettutgaven.

Bruk:
    python verktoy/pagexml_til_js.py eksport/page/0002_Odal_2.xml --etikett "s. 2–3"
    python verktoy/pagexml_til_js.py eksport/page/*.xml

For hver XML-fil:
  * lages  sider/side-NNN.js  med linjekoordinater (polygoner) og tekst,
  * legges siden til i listen «sider» i config.js (hvis den ikke er der fra før),
  * forventes bildet i mappen bilder/ med samme filnavn som i XML-en
    (attributtet imageFilename). Kopier bildene dit selv.

Finnes sidefilen fra før, beholdes tekst, merknader og innførsler som er rettet
for hånd for linjer med samme id – bare koordinatene oppdateres. Bruk --overskriv
for å ta teksten fra XML-en i stedet.
"""
import argparse
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROT = Path(__file__).resolve().parent.parent


def lokal(tag):
    return tag.rsplit("}", 1)[-1]


def barn(el, navn):
    return [c for c in el if lokal(c.tag) == navn]


def forste(el, navn):
    for c in el:
        if lokal(c.tag) == navn:
            return c
    return None


def tekst_fra(el):
    """Tekst fra TextEquiv/Unicode direkte under el (eller tom streng)."""
    te = forste(el, "TextEquiv")
    if te is not None:
        u = forste(te, "Unicode")
        if u is not None and u.text:
            return u.text.strip()
    return ""


def linjetekst(tl):
    t = tekst_fra(tl)
    if t:
        return t
    ord_ = [tekst_fra(w) for w in barn(tl, "Word")]
    return " ".join(o for o in ord_ if o)


def struktur(el):
    """Leser type fra Transkribus' custom-attributt, f.eks. 'structure {type:marginalia;}'."""
    m = re.search(r"structure\s*\{[^}]*type:([^;}]+)", el.get("custom", ""))
    return m.group(1).strip() if m else (el.get("type") or "")


def rekkefolge(el, standard):
    m = re.search(r"readingOrder\s*\{[^}]*index:(\d+)", el.get("custom", ""))
    return int(m.group(1)) if m else standard


TYPEKART = {
    "marginalia": "randnotat",
    "header": "topp",
    "page-number": "topp",
    "heading": "topp",
    "catch-word": "randnotat",
}


def les_pagexml(sti):
    rot = ET.parse(sti).getroot()
    side = next((e for e in rot.iter() if lokal(e.tag) == "Page"), None)
    if side is None:
        raise SystemExit(f"{sti}: fant ikke <Page>")

    regioner = []
    for i, reg in enumerate(e for e in side.iter() if lokal(e.tag) == "TextRegion"):
        typ = TYPEKART.get(struktur(reg), "")
        linjer = []
        for j, tl in enumerate(barn(reg, "TextLine")):
            c = forste(tl, "Coords")
            if c is None or not c.get("points"):
                continue
            linjer.append((rekkefolge(tl, j), {
                "id": tl.get("id"),
                "punkter": c.get("points").strip(),
                "tekst": linjetekst(tl),
                **({"type": typ} if typ else {}),
            }))
        if linjer:
            linjer.sort(key=lambda x: x[0])
            regioner.append((rekkefolge(reg, i), reg.get("id") or f"r{i+1}", typ, [l for _, l in linjer]))
    regioner.sort(key=lambda x: x[0])

    return {
        "bilde": side.get("imageFilename"),
        "bredde": int(float(side.get("imageWidth"))),
        "hoyde": int(float(side.get("imageHeight"))),
        "regioner": regioner,
    }


def les_eksisterende(js_sti, stille=False):
    """Henter JSON-objektet ut av en eksisterende sidefil (skrevet av dette skriptet)."""
    if not js_sti.exists():
        return None
    t = js_sti.read_text(encoding="utf-8")
    m = re.search(r"=\s*(\{.*\})\s*;\s*$", t, re.S)
    if not m:
        return None
    try:
        return json.loads(m.group(1))
    except json.JSONDecodeError:
        if not stille:
            print(f"  Merk: {js_sti.name} er redigert for hånd og kan ikke flettes; bruk --overskriv eller rett i fila.")
        return None


def neste_side_id(config_tekst):
    nr = [int(n) for n in re.findall(r"side-(\d+)\.js", config_tekst)]
    return f"side-{(max(nr) + 1 if nr else 1):03d}"


def legg_til_i_config(config, filnavn):
    t = config.read_text(encoding="utf-8")
    if f'"{filnavn}"' in t:
        return
    t2 = re.sub(r"(sider:\s*\[)(.*?)(\s*\])",
                lambda m: m.group(1) + m.group(2).rstrip() + ("," if m.group(2).strip() else "")
                + f'\n    "{filnavn}"' + m.group(3),
                t, count=1, flags=re.S)
    config.write_text(t2, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("xml", nargs="+", type=Path, help="PAGE-XML-fil(er)")
    ap.add_argument("--side-id", help="f.eks. side-002 (standard: neste ledige nummer)")
    ap.add_argument("--etikett", help="kort sidebetegnelse, f.eks. «s. 2–3»")
    ap.add_argument("--overskriv", action="store_true", help="ta tekst fra XML selv om sidefila finnes")
    a = ap.parse_args()

    config = ROT / "config.js"
    (ROT / "sider").mkdir(exist_ok=True)

    for x in sorted(a.xml):
        d = les_pagexml(x)
        sid = a.side_id if (a.side_id and len(a.xml) == 1) else None
        if not sid:
            # samme bilde som en eksisterende side? da oppdateres den
            for f in sorted((ROT / "sider").glob("side-*.js")):
                gammel = les_eksisterende(f, stille=True)
                if gammel and Path(gammel.get("bilde", "")).name == d["bilde"]:
                    sid = f.stem
                    break
        if not sid:
            sid = neste_side_id(config.read_text(encoding="utf-8"))
        js = ROT / "sider" / f"{sid}.js"
        gammel = None if a.overskriv else les_eksisterende(js)

        innforsler, linjer = [], []
        for _, rid, typ, ls in d["regioner"]:
            innforsler.append({"id": rid, "dato": "", "tittel": "", "regest": ""})
            for l in ls:
                linjer.append({"inn": rid, **l})

        if gammel:
            etter_id = {l.get("id"): l for l in gammel.get("linjer", []) if l.get("id")}
            for l in linjer:
                g = etter_id.get(l["id"])
                if g:
                    for felt in ("tekst", "merknad", "marg", "type", "inn"):
                        if felt in g:
                            l[felt] = g[felt]
            kjente = {e["id"]: e for e in gammel.get("innforsler", [])}
            innforsler = [kjente.get(e["id"], e) for e in innforsler] + \
                         [e for e in gammel.get("innforsler", []) if e["id"] not in {i["id"] for i in innforsler}]

        side = {
            "id": sid,
            "etikett": a.etikett or (gammel or {}).get("etikett") or Path(d["bilde"]).stem,
            "bilde": f"bilder/{d['bilde']}",
            "bredde": d["bredde"],
            "hoyde": d["hoyde"],
            "innforsler": innforsler,
            "linjer": linjer,
        }
        hode = (f"/* Generert fra {x.name} med verktoy/pagexml_til_js.py.\n"
                f"   Tekst, merknader og innførsler kan rettes her; kjør skriptet på nytt for nye koordinater. */\n")
        js.write_text(hode + f'KOPIBOK.data["{sid}"] = ' + json.dumps(side, ensure_ascii=False, indent=1) + ";\n",
                      encoding="utf-8")
        legg_til_i_config(config, f"sider/{sid}.js")

        mangler = not (ROT / "bilder" / d["bilde"]).exists()
        print(f"{x.name} -> sider/{sid}.js  ({len(linjer)} linjer, {len(innforsler)} regioner)"
              + (f"\n  Merk: kopier bildet til bilder/{d['bilde']}" if mangler else ""))


if __name__ == "__main__":
    sys.exit(main())
