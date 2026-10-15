"""Generates public/og.png: the 1200x630 social preview image (og:image) in the site's colors.

Usage (fonts are the site's: Inter and JetBrains Mono, from the Fontsource CDN):
    mkdir -p /tmp/og-fonts && cd /tmp/og-fonts && for f in inter@5.2.8/latin-800-normal \
      inter@5.2.8/latin-500-normal jetbrains-mono@5.2.8/latin-700-normal; do
      curl -sSfLo "$(echo $f | tr '/@' '__').ttf" "https://cdn.jsdelivr.net/fontsource/fonts/$f.ttf"; done
    uv run --with pillow python scripts/og_image.py /tmp/og-fonts public/og.png
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

fonts = Path(sys.argv[1])
out = Path(sys.argv[2])

W, H = 1200, 630
BG = (13, 17, 23)
FG = (230, 237, 243)
MUTED = (145, 152, 161)
BLUE = (110, 168, 214)
BLUE_DARK = (48, 105, 152)
YELLOW = (255, 212, 59)

heavy = ImageFont.truetype(str(fonts / "inter_5.2.8_latin-800-normal.ttf"), 96)
medium = ImageFont.truetype(str(fonts / "inter_5.2.8_latin-500-normal.ttf"), 40)
small = ImageFont.truetype(str(fonts / "inter_5.2.8_latin-500-normal.ttf"), 30)
mono = ImageFont.truetype(str(fonts / "jetbrains-mono_5.2.8_latin-700-normal.ttf"), 38)

img = Image.new("RGB", (W, H), BG)

# Soft Python-blue glow in the top-right corner.
glow = Image.new("RGB", (W, H), BG)
gd = ImageDraw.Draw(glow)
for r in range(520, 0, -8):
    t = 1 - r / 520
    color = tuple(int(BG[i] + (BLUE_DARK[i] - BG[i]) * t * 0.55) for i in range(3))
    gd.ellipse((W - 160 - r, -120 - r, W - 160 + r, -120 + r), fill=color)
img = Image.blend(img, glow, 1.0)

d = ImageDraw.Draw(img)
x = 96

# Yellow accent bar, like the section headings on the site.
d.rounded_rectangle((x, 150, x + 12, 330), radius=6, fill=YELLOW)

d.text((x + 44, 140), "Diego Ponte", font=heavy, fill=FG)
d.text((x + 48, 268), "Machine Learning Engineer", font=medium, fill=BLUE)
d.text(
    (x + 48, 380),
    "AI Engineering · Computer Vision · Deep Learning, RAG & LLMs",
    font=small,
    fill=MUTED,
)

# Logo-style domain at the bottom: diego (blue) ponte (muted) .dev (yellow).
y = 500
for text, color in (("diego", BLUE), ("ponte", MUTED), (".dev", YELLOW)):
    d.text((x + 48, y), text, font=mono, fill=color)
    x += int(d.textlength(text, font=mono))

d.rectangle((0, H - 10, W, H), fill=BLUE_DARK)
d.rectangle((0, H - 10, W // 3, H), fill=YELLOW)

img.save(out, optimize=True)
print(out, img.size, out.stat().st_size, "bytes")
