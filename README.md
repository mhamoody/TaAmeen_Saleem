# TaAmeen_Saleem

One Arabic, right-to-left landing-page concept for Saleem, built with React, JavaScript, Vite, Tailwind CSS and React Router. It follows the page/component/layout structure used in impersona and digital_fortress projects.

## Scope

The page presents all ten requested insurance categories:

1. Individual motor insurance.
2. Vehicle fleets.
3. Medical insurance for companies and establishments.
4. Medical malpractice.
5. Domestic workers: health and contractual insurance.
6. Travel.
7. Premium residency.
8. Protection and savings.
9. Cargo: sea, land and air.
10. Homes.

Visitors can filter the catalogue, choose a product and its available purpose/options, and open a journey preview in a native dialog. The selection is reflected in the URL through `product`, `purpose` and `option` query parameters. The page also includes a mobile navigation menu and expandable FAQs.

Entry options include travel type and purpose, savings goals, and premium-residency beneficiaries. These are choices within the existing products, verified against the reference entry screens. Products without another verified entry choice retain one path.

The hero cycles through ten insurance images every four seconds. Click the photo to advance, use the arrows or dots to choose a slide, or pause the rotation. Rotation pauses while the carousel is hovered, focused, offscreen or the browser tab is hidden; reduced-motion preferences start it paused. Product cards use category-coloured icons with pastel backgrounds. Only the current and next photos are requested initially.

Motion includes a smooth photo crossfade, one-time section entrances, subtle card/button hover effects, and short transitions for product summaries, dialogs and FAQ answers. It uses CSS and native browser animations without an animation dependency. Reduced-motion preferences disable these effects, including when changed while the page is open.

This is a **frontend prototype**. It makes no API calls, collects no customer identity data, and does not provide real quotations, verification, payments or policy issuance. Account and help buttons open clearly labelled prototype dialogs. Full insurance journeys remain future work.

The brief's motor-first and pilot-product limits concern a future operational launch. This design includes all ten categories as requested for the landing-page assignment.

## Run locally

Use Node.js 22.12 or later and npm:

```sh
npm ci
npm run dev
```

Open **http://localhost:5191**. No backend or environment file is required.

## Structure

```text
src/
  assets/             Original Saleem logo, generated hero artwork
  components/
    home/             Landing-page sections and product journey preview
    ui/               Shared interface components
  data/               Product catalogue and page content
  hooks/              Shared browser interactions and scroll entrances
  layouts/            Shared page layout
  pages/Home.jsx      Landing page
  styles/             Tailwind entry and theme
  App.jsx             Routes
tests/                Browser checks
docs/REFERENCE-MAP.md  Reference inventory and scope notes
```

Keep future pages in `src/pages/`, their sections in `src/components/`, and static content in `src/data/`. Reuse the shared theme and layout.

## Checks

```sh
npm run build
npm run lint
npm run test:e2e
```

Browser checks use Microsoft Edge on Windows. Follow the Playwright configuration for other environments.

## References and assets

- The supplied **Saleem Developer Brief – Motor** informs the motor journey and branding. The original logo was extracted unchanged from that PDF; the hero artwork is AI-generated.
- Tameeni and Bcare inform the insurance catalogue and entry patterns. [REFERENCE-MAP.md](docs/REFERENCE-MAP.md) records the observations and their limits. Shory was excluded at the user's request.
- Competitor observations are references, not confirmation of Saleem's launch capabilities. No licensing, insurer partnership, price or performance claims are assumed.

Source repository: [mhamoody/TaAmeen_Saleem](https://github.com/mhamoody/TaAmeen_Saleem). Follow the local run instructions above to preview the page.
