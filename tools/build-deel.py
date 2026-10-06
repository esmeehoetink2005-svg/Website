"""Maakt deel/Dubbelgoed-portfolio-Esmee-Hoetink.html: de hele site in één bestand.

Gebruik (vanuit de map van de website):  python3 tools/build-deel.py
Staat er een video in assets/video/blikje.mp4, dan gaat die mee in het bestand.
"""
import base64, os, re

def data_uri(path, mime):
    return f"data:{mime};base64," + base64.b64encode(open(path, 'rb').read()).decode()

html = open('index.html').read()
css = open('assets/css/style.css').read()
css = re.sub(r"url\('\.\./fonts/([^']+)'\)", lambda m: f"url('{data_uri('assets/fonts/' + m.group(1), 'font/woff2')}')", css)
js = open('assets/js/main.js').read()

html = html.replace('<link rel="preload" href="assets/fonts/anton-400.woff2" as="font" type="font/woff2" crossorigin>\n', '')
html = html.replace('<link rel="stylesheet" href="assets/css/style.css">', f'<style>\n{css}\n</style>')
html = html.replace('<script src="assets/js/main.js"></script>', f'<script>\n{js}\n</script>')

video = 'assets/video/blikje.mp4'
if os.path.exists(video):
    html = re.sub(r'<source src="assets/video/blikje\.webm"[^>]*>\s*', '', html)
    html = html.replace('src="assets/video/blikje.mp4"', f'src="{data_uri(video, "video/mp4")}"')
else:
    html = re.sub(r'\s*<!-- Zet de Higgsfield.*?</video>', '', html, flags=re.S)

html = re.sub(r'(src|poster)="(assets/img/[^"]+\.webp)"', lambda m: f'{m.group(1)}="{data_uri(m.group(2), "image/webp")}"', html)
left = re.findall(r'assets/[^"\')\s]+', html)
assert not left, f'Niet ingepakt: {left[:5]}'

os.makedirs('deel', exist_ok=True)
out = 'deel/Dubbelgoed-portfolio-Esmee-Hoetink.html'
open(out, 'w').write(html)
print(out, round(os.path.getsize(out) / 1e6, 2), 'MB')
