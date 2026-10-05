# Video: blikje opent (Higgsfield)

## Instellingen

- **Modus:** Image to Video
- **Startbeeld:** `brand/video/higgsfield-startframe.png` (zelfde groene achtergrond en cirkel als de website)
- **Formaat:** 16:9, 1080p
- **Duur:** 5 seconden
- **Camera:** statisch of een heel langzame push-in (geen draaiende camera)

## Prompt

```
Premium cinematic product commercial. A cold aluminum can of "dubbelgoed" Green Tea Lemon ice tea stands upright in front of a large soft sage-green circle on a deep forest-green background, with a sprig of fresh mint at its base. Condensation droplets cover the can.

The pull tab on top of the can lifts and snaps open in crisp slow motion. A fine burst of carbonation mist and tiny bubbles escapes from the opening, catching a soft rim light. A few clear droplets of tea spray upward and arc gracefully, while two or three mint leaves float slowly up past the can. Then the motion settles: the can stays perfectly still and centered, mist slowly fading.

Smooth, elegant, fluid motion. Studio lighting, soft cool highlights on the metal, shallow depth of field, ultra sharp product detail. Colors stay within deep forest green, sage green, mint and silver. Clean, modern, minimal.
```

## Negative prompt (als Higgsfield daarom vraagt)

```
changing label, warped text, distorted logo, extra cans, hands, people, camera shake, fast cuts, rotating camera, liquid spilling everywhere, background color change, blur on the logo
```

## Tips

- Het logo en de tekst op het blikje moeten scherp en hetzelfde blijven. Is de tekst vervormd, genereer dan opnieuw, of maak de beweging kleiner ("subtle", "gentle").
- Kies de versie waarin het blikje aan het eind stil staat. De website speelt de video één keer af en blijft op het laatste beeld staan.
- Achtergrond moet donkergroen blijven (`#074235`), dan loopt de video naadloos over in de website.

## Op de website zetten

1. Download de video als mp4.
2. Noem het bestand `blikje.mp4`.
3. Zet het in de map `assets/video/` van deze website.

De website laat de video dan automatisch zien in plaats van de losse blikje-compositie. Is er geen video, dan blijft de compositie met bubbels staan.
