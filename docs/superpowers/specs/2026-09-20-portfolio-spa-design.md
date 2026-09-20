# Design Spec — Portfolio SPA Pandu (Approach A)

Date: 2026-09-20
Source: `Profile.md` (from 29-slide pptx), `Muhammad Pandu Wirakusuma_Personal Portofolio.pptx`
Stack: Vite + React + Tailwind, SPA, Netlify
Lang: ID. Style: modern dark. Audience: mix akademik + profesional.

## 1. Architecture

- Vite React SPA, single-page scroll, hash nav + scroll-spy.
- No react-router. State filter client-side.
- Data: `src/data/profile.json` generated from `Profile.md` §1-8. Single source truth.
- Styling: Tailwind. Dark theme default (`bg-zinc-950`, accent amber/cyan). Bold typography (Inter/Space Grotesk).
- Deploy Netlify: build `npm run build`, publish `dist`, redirect `/* -> /index.html 200`.

## 2. Components

- `Navbar` (sticky, scroll-spy, mobile hamburger)
- `Hero` (nama, role, tagline, CTA, kontak icons)
- `About`, `Education` (timeline S1/S2), `Experience` (timeline 4 kerja), `Organizations` (grid 6)
- `Projects` (10 cards, filter tahun 2021-2025 + kategori UI/UX, PM, 3D, Packaging, ML/Frontend, modal detail + gallery)
- `Research` (5 cards, metric badge 76.15%, 99.1% etc, model tags)
- `Gallery` (lightbox, placeholder ganti screenshot asli)
- `Contact/Footer` (WA, email kampus/pribadi, Jobstreet)
- `FilterBar`, `Modal`, `Badge`, `Timeline` shared.

## 3. Data flow

`Profile.md` -> `profile.json` {hero, about, education[], experience[], orgs[], projects[{year,title,desc,role,tags,links}], research[{year,title,desc,models,metrics}], skills, contact} -> components render + filter via useState/useMemo.

## 4. Netlify

- `netlify.toml`: `[build] command="npm run build" publish="dist"`, `[[redirects]] from="/*" to="/index.html" status=200`.
- `public/_redirects` backup same rule.
- Env: none. Forms: Netlify Forms di Contact (fallback mailto).

## 5. Non-goals (YAGNI)

- No router multi-page, no CMS, no SSR/Next, no bilingual toggle v1, no backend.

## 6. Testing / Verify

- `npm run build` pass. `npm run dev` smoke: nav, filter projects/research, modal, mobile 360px, lighthouse basic.
- Broken links check kontak + demo links (tandai TBD kalau belum ada).

## 7. TODO konten

Screenshot tiap proyek, portrait hero, link demo, PDF thesis/paper, domain Netlify.

## Self-review

- No TBD vague kecuali link demo/screenshot (explicit TODO §7).
- Konsisten: semua 10 proyek + 5 riset masuk, filter sesuai jawaban user.
- Scope single plan: scaffold + data + sections + deploy. No downgrade.
