# Meetings die waarde maken

Playbook voor de head of meetings van het HAN Salesteam. Een statische website: alleen HTML, CSS en een klein beetje JavaScript. Er is geen framework en niets om te installeren.

## Mappen

```
index.html, waarom.html, team.html, ...   de pagina's
bijlagen.html + bijlagen/a.html t/m i.html   de bijlagen
bronnen.html                                 de bronnenlijst
assets/style.css                             alle vormgeving
assets/site.js                               menu, tabbladen, afvinklijsten
assets/img/                                  zet hier je eigen foto's
```

## Lokaal openen

Dubbelklik op `index.html`. De site opent in je browser en alle links werken.

Wil je hem precies zo zien als online? Open dan een terminal in deze map en start een kleine server:

```bash
python3 -m http.server 8000
```

Ga daarna naar http://localhost:8000.

## Gratis online zetten

**Netlify Drop (het snelst, zonder account):**
1. Ga naar https://app.netlify.com/drop.
2. Sleep deze hele map in het venster.
3. Je krijgt meteen een link. Maak gratis een account aan als je de site wilt bewaren of later wilt bijwerken.

**GitHub Pages:**
1. Zet deze map in een GitHub-repository (dat kan via "Add file → Upload files").
2. Ga naar Settings → Pages.
3. Kies bij "Branch" de branch met de bestanden en de map `/ (root)` en klik op Save.
4. Na een minuut staat de site op `https://<gebruikersnaam>.github.io/<repository>/`.

## PDF maken

1. Open een pagina in Chrome of Edge.
2. Kies Afdrukken (Ctrl+P, op een Mac Cmd+P) en daarna "Opslaan als PDF".
3. Zet bij "Meer instellingen" de optie "Achtergrondafbeeldingen" aan als je de roze kleuren wilt behouden.

In de afdrukversie verdwijnt het menu, staan beide cases onder elkaar, staat bij links het adres en is de begrippenlijst uitgeklapt. Elke pagina is een eigen PDF. Wil je één document, voeg de PDF's dan samen (bijvoorbeeld met https://www.ilovepdf.com/nl/pdf-samenvoegen).

## Aanvullen en aanpassen

- **Invulblokken:** alles wat nog moet worden ingevuld staat in een roze kader met een stippelrand. In de code zoek je op `class="fill"`. Vervang het hele `<span class="fill">…</span>` door je eigen tekst.
- **Foto's:** zet de foto in `assets/img/` en vervang een `<div class="photo …">…</div>` door bijvoorbeeld `<img src="assets/img/meeting.jpg" alt="Korte omschrijving van de foto">` (op een bijlagepagina: `../assets/img/...`).
- **Menu en footer:** die staan in elke pagina. Pas je ze aan, doe dat dan op elke pagina op dezelfde manier.
- **Afvinklijsten:** vinkjes worden in je eigen browser bewaard. Een ander apparaat of een privévenster begint met een lege lijst. De knop "Alles leegmaken" zet een lijst weer op nul.
