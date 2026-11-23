"""Zet de bijlagen uit het logboek (docx) om naar assets/js/docs.js + afbeeldingen in assets/img/docs/."""
import sys, os, re, json, html, io
import docx
from docx.oxml.ns import qn
from PIL import Image

SRC, OUTJS, IMGDIR = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(IMGDIR, exist_ok=True)
d = docx.Document(SRC)
rels = d.part.rels
used_imgs = {}

def img_for(rid):
    part = rels[rid].target_part
    name = os.path.splitext(os.path.basename(part.partname))[0]
    key = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')[:40]
    if key not in used_imgs:
        im = Image.open(io.BytesIO(part.blob)).convert('RGB')
        if im.width > 1400: im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
        im.save(os.path.join(IMGDIR, key + '.webp'), quality=80, method=6)
        used_imgs[key] = f'assets/img/docs/{key}.webp'
    return key

PRIVATE = [re.compile(r'Studentnummer:\s*\d+'), re.compile(r'\b\d{7}\b')]
def clean(t):
    for p in PRIVATE: t = p.sub('', t)
    return t

def para_html(p, el):
    st = p.style.name if p.style is not None else ''
    imgs = [b.get(qn('r:embed')) for b in el.iter(qn('a:blip'))]
    out = ''.join(f'<figure><img data-img="{img_for(r)}" alt=""></figure>' for r in imgs if r)
    # tekst met vet/cursief per run
    parts = []
    for r in p.runs:
        t = html.escape(clean(r.text))
        if not t: continue
        if r.bold: t = f'<strong>{t}</strong>'
        if r.italic: t = f'<em>{t}</em>'
        parts.append(t)
    txt = ''.join(parts).replace('\n', '<br>').strip()
    if not txt: return out, None
    s = st.lower()
    if 'heading 1' in s or s == 'title': tag = 'h3'
    elif 'heading 2' in s: tag = 'h4'
    elif 'heading 3' in s: tag = 'h5'
    elif 'list' in s: return out, ('li', txt)
    else: tag = 'p'
    return out + f'<{tag}>{txt}</{tag}>', None

def table_html(t):
    rows = []
    for r in t.rows:
        seen, cells = set(), []
        for c in r.cells:
            if id(c._tc) in seen: continue
            seen.add(id(c._tc))
            ps = [clean(x.text).strip() for x in c.paragraphs if clean(x.text).strip()]
            cells.append('<td>' + '<br>'.join(html.escape(x) for x in ps) + '</td>')
        rows.append('<tr>' + ''.join(cells) + '</tr>')
    return '<div class="doc__table"><table>' + ''.join(rows) + '</table></div>'

# alle blokken in volgorde, met hun platte tekst om grenzen te vinden
blocks = []
for el in d.element.body.iterchildren():
    if el.tag == qn('w:p'):
        p = docx.text.paragraph.Paragraph(el, d); blocks.append(('p', p, el, p.text.strip()))
    elif el.tag == qn('w:tbl'):
        t = docx.table.Table(el, d); blocks.append(('t', t, el, ''))

def find(prefix, start=0):
    for i in range(start, len(blocks)):
        if blocks[i][3].startswith(prefix): return i
    raise SystemExit('niet gevonden: ' + prefix)

def render(a, b, skip=()):
    out, lst = [], []
    def flush():
        if lst: out.append('<ul>' + ''.join(f'<li>{x}</li>' for x in lst) + '</ul>'); lst.clear()
    for kind, obj, el, text in blocks[a:b]:
        if text in skip or text.startswith('Bron: '): continue
        if kind == 't':
            flush(); out.append(table_html(obj)); continue
        h, li = para_html(obj, el)
        if li: lst.append(li[1])
        else:
            flush()
            if h: out.append(h)
    flush()
    return ''.join(out)

i_b = find('Bijlagen', find('Bronnenlijst'))
i1, i2, i3, i4, i5 = (find(f'Bijlage {n} ') for n in range(1, 6))
iD = find('Bijlage D', i5)
iB = find('Bijlage B', i5)

DOCS = {
  'logboek': {'title': 'Mijn logboek T-Challenge', 'src': 'Hoetink (2026), logboek bij dit bewijsstuk',
              'html': render(0, i_b, skip={'Inhoudsopgave'})},
  'strategie': {'title': 'Strategiedocument Dubbelgoed', 'src': 'Directie Dubbelgoed (2026a)', 'html': render(i1 + 1, i2)},
  'bg': {'title': 'Samenwerkingsdocument HUB-team (BG-document)', 'src': 'Van den Brink et al. (2026), met de managementsamenvattingen van Vulling (2026)', 'html': render(i2 + 1, i3)},
  'presentatie': {'title': 'Evaluatiepresentatie', 'src': 'Directie Dubbelgoed (2026b)', 'html': render(i3 + 1, i4)},
  'ceo': {'title': 'CEO-dossier Max van der Weijden', 'src': 'Van der Weijden (2026)', 'html': render(i5 + 1, len(blocks))},
  'logboekD': {'title': 'Besluitenlogboek', 'src': 'Bijlage D van het CEO-dossier (Van der Weijden, 2026)', 'html': render(iD + 1, len(blocks))},
  'kpi': {'title': 'KPI-scores en kerncijfers per kwartaal', 'src': 'Resultatenexport, bijlage B en C van het CEO-dossier (T-Challenge, 2026; Van der Weijden, 2026)', 'html': render(iB, iD)},
}
with open(OUTJS, 'w') as f:
    f.write('// Bijlagen uit mijn logboek, omgezet voor de documentviewer. Gegenereerd door tools/docs.py.\n')
    f.write('const DOC_IMG = {\n' + ''.join(f"  '{k}': '{v}',\n" for k, v in used_imgs.items()) + '};\n')
    f.write('const DOCS = ' + json.dumps(DOCS, ensure_ascii=False, indent=1) + ';\n')
print({k: len(v['html']) for k, v in DOCS.items()}, len(used_imgs), 'afbeeldingen')
