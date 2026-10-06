# Dubbelgoed: portfolio business game

Portfolio-site over acht ronden als CHRO van Dubbelgoed in de business game (T-Challenge).

## Bekijken

Open `index.html` in je browser. Er hoeft niets geïnstalleerd te worden.

## Online zetten met GitHub Pages

1. Merge deze branch naar `main`.
2. Ga op GitHub naar **Settings → Pages**.
3. Kies bij *Source* **Deploy from a branch**, branch `main`, map `/ (root)`, en klik **Save**.
4. Na een minuut staat de site op `https://<gebruikersnaam>.github.io/<repo>/`.

## Video van het blikje

Zet een video als `assets/video/blikje.mp4` neer en de opening van de site gebruikt hem automatisch. De prompt en het startbeeld voor Higgsfield staan in `brand/video/`.

## Structuur

- `index.html`: de pagina
- `assets/css/style.css`: opmaak (merkkleuren staan bovenaan als variabelen)
- `assets/js/main.js`: cijfers per ronde, teksten van de rondes en de grafiek
- `assets/img/`, `assets/fonts/`: beeld en lettertypes (Anton en Poppins, OFL-licentie)
- `brand/`: originele merkbestanden en `BRAND.md`
- `tools/build-deel.py`: maakt `deel/`, de hele site in één bestand om te delen
