# devforge.in — Landing Page Spec

A single-page landing site for **devforge.in**, built around the mascot. This file is the single source of truth: every colour, font, size and line of text is listed here. If something is not in this file, do not add it.

---

## 1. Project Summary

| Item | Value |
|---|---|
| Brand | devforge.in |
| What it is | A one-person studio that builds websites and apps for clients |
| Goal of the page | Get a visitor to message on Instagram or email |
| Page type | One page, scrolling, 5 sections |
| Built with | React |
| Image asset | One PNG only: `devforge_in_mascot.png` (used for hero, favicon and avatar) |
| Mascot | Chibi boy, messy black hair, half-lidded eyes, gray plaid scarf covering the lower face, black toggle coat, small black earring, white sticker outline, on a purple wave background |
| Mood | Calm, cool, quiet confidence. Dark, flat, clean. |

---

## 2. Hard Rules (Do Not Break)

**Never add:**
- Glowing orbs, blurred blobs, or floating light spots
- Neon glow, `box-shadow` glow, `text-shadow` glow, or `filter: drop-shadow` glow
- Random circles, dots, rings, particles, or confetti
- Gradients (except the none allowed below — there are none)
- Any font not listed in Section 4
- Any text not listed in Section 6 (no fake stats, fake testimonials, fake client logos, fake prices)
- Stock icons or emojis
- Glassmorphism / frosted blur cards

**Always:**
- Flat colours only
- Hard-edged, solid shapes
- Use only the colours in Section 3
- Use the mascot's own wave shapes as the background pattern (Section 5)

---

## 3. Colour Palette

Colours are taken from the mascot image. Open the image in an eyedropper tool and confirm each value before shipping; adjust the hex if your export differs.

| Token | Hex | Where it is used |
|---|---|---|
| `--bg-deep` | `#2A1248` | Main page background (the dark violet from the mascot background) |
| `--bg-wave` | `#8A12F5` | Wave shapes, primary buttons, accent lines |
| `--ink` | `#0F0D14` | Near-black: coat colour, text on light surfaces, card fill |
| `--scarf` | `#8F8F94` | Secondary text, borders, muted labels |
| `--paper` | `#F4F1EC` | Main text on dark, light-section background |
| `--skin` | `#EFD2B6` | Only used if mascot is recoloured; not used for UI |

**Contrast pairs (all pass WCAG AA):**
- `--paper` on `--bg-deep` → body text
- `--paper` on `--bg-wave` → button label (use bold weight, 16px or larger)
- `--ink` on `--paper` → text on light cards
- `--scarf` on `--bg-deep` → only for large or secondary text (18px+)

CSS variables:

```css
:root {
  --bg-deep: #2A1248;
  --bg-wave: #8A12F5;
  --ink:     #0F0D14;
  --scarf:   #8F8F94;
  --paper:   #F4F1EC;
}
```

---

## 4. Typography

Two fonts only, both from Google Fonts.

| Role | Font | Weights |
|---|---|---|
| Headings, logo text, buttons | **Space Grotesk** | 500, 700 |
| Body, labels, small text | **Inter** | 400, 500 |

Fallback stack: `system-ui, -apple-system, "Segoe UI", sans-serif`

**Type scale (desktop → mobile):**

| Use | Desktop | Mobile | Weight | Line height |
|---|---|---|---|---|
| H1 (hero) | 72px | 40px | 700 | 1.05 |
| H2 (section titles) | 44px | 30px | 700 | 1.1 |
| H3 (card titles) | 24px | 20px | 500 | 1.2 |
| Body | 18px | 16px | 400 | 1.6 |
| Small / label | 14px | 13px | 500 | 1.4 |
| Button | 16px | 16px | 700 | 1 |

Rules:
- Headings: sentence case, no all-caps, no letter-spacing tricks
- Labels (small): may be lowercase only, letter-spacing `0.02em`
- No italic, no underline except on hover for text links

---

## 5. Background Pattern (From the Mascot)

The mascot sits on flat, organic wave bands: wide curved ribbons in `--bg-wave` over `--bg-deep`. Reuse that exact idea:

- Build **one inline SVG** inside the React Hero component (no separate file) with 3–4 large wavy ribbon shapes (flat fill `--bg-wave`, no stroke, no blur) on a `--bg-deep` rectangle.
- Use it **only behind the hero section**, covering the full width.
- Keep the ribbons large and sweeping. **No small blobs, dots or circles.**
- Other sections use flat `--bg-deep` or flat `--paper`. No pattern.
- On mobile, scale the same SVG with `preserveAspectRatio="xMidYMid slice"`.
- Optional: lower the ribbon colour to `#5B0FAA` behind the text area to keep the headline readable. Still flat, no gradient.

---

## 6. Page Structure and Exact Copy

Total sections: **Header, Hero, Services, Process, Contact, Footer.**

### 6.1 Header (sticky, 64px tall)

- Background: `--bg-deep`, 1px bottom border `--scarf` at 25% opacity
- Left: text logo **devforge.in** (Space Grotesk 700, 20px, `--paper`)
- Right (desktop): links `Services` · `Process` · `Contact`, then button **Message me**
- Mobile: logo + button only (no hamburger needed, three links are hidden)

### 6.2 Hero

Layout: two columns on desktop (text left 55%, mascot right 45%). Stacked on mobile (mascot first, then text).

| Element | Text |
|---|---|
| Small label | `websites and apps for clients` |
| H1 | `I build websites and apps that work.` |
| Paragraph | `devforge.in is a one-person studio. You tell me what you need, I design it, build it and deliver it.` |
| Primary button | `Message me on Instagram` |
| Secondary link | `See services` (scrolls to Services) |

- **Mascot:** use `devforge_in_mascot.png` as it is. It is a square image with its own purple wave background and white sticker outline, so no cutout is needed.
  - Display it as a square with a `24px` border radius.
  - Max width 520px on desktop, 280px on mobile.
  - Do not put it over the wave SVG. Keep the wave SVG behind the hero text side only, and let the square image sit on the right as its own block.
  - Keep the image `aspect-ratio: 1 / 1` and `object-fit: cover`.
- No shadow around the mascot.

### 6.3 Services

Background: `--paper`. Text: `--ink`.

- H2: `Services`
- Three cards in a row (stacked on mobile). Card: `--ink` fill, `--paper` text, 20px radius, 32px padding, no shadow.

| Card | Title | Description |
|---|---|---|
| 1 | `Websites` | `Landing pages, portfolios and business sites. Fast, clean and mobile friendly.` |
| 2 | `Apps` | `Web and mobile apps built around what your users actually need.` |
| 3 | `Logos` | `Simple, clear logos and brand marks for your business or page.` |

Card detail: a 3px solid `--bg-wave` line at the top of each card (full width of the card, flat). No icons.

### 6.4 Process

Background: `--bg-deep`. Text: `--paper`.

- H2: `How it works`
- Four steps in a row (2×2 on tablet, stacked on mobile). Each step: a number in Space Grotesk 700, 44px, colour `--bg-wave`, then a title and one line.

| Step | Title | Line |
|---|---|---|
| 01 | `Tell me` | `Share what you want to build.` |
| 02 | `Design` | `I send you the design to approve.` |
| 03 | `Build` | `I code it and keep you updated.` |
| 04 | `Deliver` | `You get the finished work, ready to use.` |

- Steps are separated by a 1px line in `--scarf` at 30% opacity. No circles around numbers.

### 6.5 Contact

Background: `--bg-wave`. Text: `--paper`.

- H2: `Let’s build yours.`
- Paragraph: `The fastest way to reach me is Instagram.`
- Primary button (fill `--ink`, text `--paper`): `Message @devforge.in`
- Secondary text link: `devforge.in@gmail.com`
- Both link targets:
  - Instagram: `https://instagram.com/devforge.in`
  - Email: `mailto:devforge.in@gmail.com`

### 6.6 Footer

Background: `--ink`. Text: `--scarf`, 14px.

- Left: `© 2026 devforge.in`
- Right: `Instagram` (link)

---

## 7. Components

### Buttons

| Type | Fill | Text | Border | Radius | Height | Padding |
|---|---|---|---|---|---|---|
| Primary (on dark) | `--bg-wave` | `--paper` | none | 12px | 52px | 0 28px |
| Primary (on purple) | `--ink` | `--paper` | none | 12px | 52px | 0 28px |
| Secondary link | transparent | `--paper` | none | — | — | — |

States:
- **Hover:** fill shifts to a slightly darker flat tone (`#7410D0` for purple, `#000000` for ink). Move up 2px. No glow.
- **Active:** move back to 0px.
- **Focus-visible:** 3px solid `--paper` outline, 3px offset.
- Transition: `150ms ease`, only `background-color` and `transform`.

### Cards
- Radius 20px, flat fill, no shadow, no border.
- Hover: move up 4px. Nothing else.

### Links
- Colour `--paper`; on hover: underline.

---

## 8. Layout and Spacing

- Max content width: **1120px**, centred
- Side padding: 24px (mobile), 48px (desktop)
- Spacing scale (px): 4, 8, 16, 24, 32, 48, 64, 96
- Section vertical padding: 96px desktop, 64px mobile
- Grid: 12 columns, 24px gap
- Breakpoints: mobile `< 640px`, tablet `640–1023px`, desktop `≥ 1024px`

---

## 9. Motion

Keep it small and quiet.

- On load: hero text fades up 12px over 400ms. Mascot fades in over 400ms.
- On scroll: each section’s content fades up 12px over 400ms, once.
- Mascot: no floating, bouncing or looping animation.
- Respect `prefers-reduced-motion: reduce` → turn off all animation.

---

## 10. Accessibility and SEO

- Mascot `alt`: `devforge.in mascot: a boy with messy black hair and a gray scarf`
- One `<h1>` only. Headings in order.
- Every interactive element reachable by keyboard.
- Page `<title>`: `devforge.in — websites and apps for clients`
- Meta description: `devforge.in builds websites, apps and logos for clients. Message on Instagram to start.`
- Favicon: `devforge_in_mascot.png` (same file, no separate favicon image).
- Open Graph / social preview image: `devforge_in_mascot.png` (same file).

---

## 11. Image Asset (One File Only)

Only one image is used across the whole site:

| File | Used for |
|---|---|
| `devforge_in_mascot.png` | Hero image, favicon, avatar, social preview |

Do not create or add any other image files. The wave background is an inline SVG in code, not an image file.

React usage:

```jsx
import mascot from "./devforge_in_mascot.png";

<img
  src={mascot}
  alt="devforge.in mascot: a boy with messy black hair and a gray scarf"
  width="520"
  height="520"
/>
```

Favicon (in `index.html`):

```html
<link rel="icon" type="image/png" href="/devforge_in_mascot.png" />
<link rel="apple-touch-icon" href="/devforge_in_mascot.png" />
<meta property="og:image" content="/devforge_in_mascot.png" />
```

Put a copy of the PNG in the `public/` folder for these tags, and import the same file in the component for the hero.

---

## 12. Final Checklist Before Launch

- [ ] Only Space Grotesk and Inter are loaded
- [ ] Only the 5 colours from Section 3 are used
- [ ] No glow, neon, blur, gradient, orb or circle anywhere
- [ ] All text matches Section 6 exactly
- [ ] Email shows `devforge.in@gmail.com`
- [ ] Only `devforge_in_mascot.png` is used for hero, favicon and avatar
- [ ] Mascot looks sharp on mobile and desktop
- [ ] Buttons have hover and focus states
- [ ] Tested at 360px, 768px and 1440px widths
- [ ] Lighthouse accessibility score 95+
