# Portfolio 6 Slicing Challenge

## Project overview

A responsive, single-page portfolio implemented faithfully from the supplied Figma design. The project uses reusable React components, locally scoped styles, optimized local assets, and restrained Motion interactions while preserving the original content and visual identity.

- [Figma design](https://www.figma.com/design/biFqdQPHIvUFtUNR0nGUkk/Portfolio-6---REP--Copy-?node-id=16411-2)
- [Live Vercel deployment](https://portfolio-6-slicing.vercel.app)
- [GitHub repository](https://github.com/sigitsyambudi/portfolio-6-slicing)

## Tech stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS and CSS Modules
- Motion for React
- `next/font` and `next/image`

## Key features

- Responsive compositions based on the supplied 1440px desktop and 393px mobile frames, with intermediate and narrow-mobile support.
- Reusable section, card, carousel, accordion, and dialog components.
- Permanent local copies of the exact Figma assets; no temporary Figma asset URLs are used at runtime.
- Accessible mobile navigation, carousel controls, FAQ accordion, form validation, and feedback-dialog previews.
- Visible keyboard focus, focus restoration, semantic landmarks and headings, descriptive image alternatives, and reduced-motion support.

## Local installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

To serve a completed production build locally:

```bash
npm run build
npm run start
```

## Validation

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Contact demo disclosure

The Contact form is intentionally a design-demo experience. It performs client-side validation and exposes the supplied success and failure dialog designs for visual review, but it does not send or store messages and is not connected to a backend.

## Known limitations

- Social profile and project destinations are not linked because the Figma source does not provide verified external URLs.
- Contact success and failure states are design previews only; real message delivery is unavailable.
- Original Figma wording is preserved, including any spelling or copy inconsistencies present in the source design.
- Lighthouse scores are not published because no Lighthouse audit has been recorded for this repository.
