# Pravidlá generovania obrázkov pre Kageod

Tento dokument slúži ako záväzné pravidlo pre všetkých AI asistentov pracujúcich na tomto projekte.

## Hlavné pravidlo

**NIKDY** nepoužívaj interný nástroj `generate_image` (DALL-E alebo iné vstavané nástroje) na tvorbu vizuálov pre tento web.

## Povinný postup

Všetky obrázky musia byť generované výhradne cez **Google Studio API** použitím pripraveného Python skriptu:

1. Umiestnenie generátora: `dev_tools/nano_banana_generator.py`
2. Postup:
   - Vytvor nový skript v `dev_tools/` (napr. `generate_x_img.py`).
   - Použi triedu `NanoBananaGenerator`.
   - Spusti skript cez terminál: `python dev_tools/generate_x_img.py`.

## Prečo?

- Model „Nana Banana“ (Imagen 3 cez Google GenAI) je vyladený na fotorealistické geomeračské zábery.
- Zachováva konzistentnú estetiku projektu (cinematic lighting, teal/orange tóny, 8k rozlíšenie).
- Obrázky sa ukladajú priamo do projektovej štruktúry.

## Konštantné nastavenia

- **Width/Height**: 1920x1080 pre hero sekcie, 1024x1024 pre karty.
- **Negative Prompt**: Vždy zahrň `illustration, 3d render, fake, cartoon, blurry`.
- **API Key**: Je definovaný v `nano_banana_generator.py` alebo v `.env`.

**Porušenie tohto pravidla hnevá používateľa!**
