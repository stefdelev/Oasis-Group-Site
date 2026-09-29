# Brand images

Sources for the social share image and favicon set in `public/`. Both are plain
HTML using the site's fonts, colors, bracket wordmark, and globe art (inlined
from `src/components/GlobeArt.tsx`), rendered to PNG with headless Chrome.

| Source | Output |
|---|---|
| `og-image.html` (1200×630 CSS px, rendered at 2× → 2400×1260) | `public/og-image.png` |
| `favicon.html` (512×512) | `public/icon-512.png`, `apple-touch-icon.png` (180), `favicon-32.png`, `favicon.ico` (16/32/48) |

To regenerate: serve this folder, screenshot each page at its size with
`chrome --headless=new --hide-scrollbars --force-device-scale-factor=N
--virtual-time-budget=5000 --window-size=W,H --screenshot=out.png URL`
(scale factor 2 for the share image, 1 for the favicon; the time budget lets Google Fonts load), then resize the 512px favicon
screenshot (scale factor 1) with `sharp` for the smaller sizes. `favicon.ico` embeds the
16/32/48 PNGs directly in an ICO container.
