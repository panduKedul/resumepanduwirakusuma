# Progress Log — Portfolio Pandu

## 2026-09-20

### Build awal (Vite + React + Tailwind + Netlify)
- Extract 29-slide pptx → `Profile.md` (hero, about, edu S1/S2, 4 kerja, 6 org, 10 proyek, 5 riset, skills, kontak).
- Spec `docs/superpowers/specs/2026-09-20-portfolio-spa-design.md` + plan `docs/superpowers/plans/2026-09-20-portfolio-spa.md`.
- Scaffold `porto/`: SPA scroll single-page, `profile.json` source of truth, filter proyek/riset, modal, gallery, Netlify Forms contact.
- Tests: vitest 6 passed. Build PASS.

### Restyle dot-pad (ref Awwwards SOTD)
- Canvas dot-matrix interaktif (mouse repel, scroll fade), black #000, amber accent.
- Navbar blur + progress bar + jumpmarks, hero type clamp 7rem, reveal on scroll, section numbering.

### Deploy GitHub + Netlify
- Repo: `panduKedul/resumepanduwirakusuma`, branch `main`, SSH (`local laptop`).
- Fix 404: root `netlify.toml` (`base=porto`, `publish=dist`, SPA redirect).

### Revisi konten
1. Tagline → "Menjembatani teknik, desain, dan strategi bisnis..." (lalu full EN: "Bridging engineering, design, and business strategy...").
2. Email: `pandusnowway@gmail.com` (primary/utama) + `panduwirak@gmail.com` + `muhammadpandu@...` (academic only).
3. About → teks baru user (ID lalu EN).
4. Keywords → 6 skill SE/PM/UIUX.
5. Experience + Lecturer Tel-U Jakarta (2026 – Present, perlu konfirmasi periode).
6. Navbar angka dihapus.
7. Foto hero (B&W transparan WebP) + foto about (Turkey); fix bg putih via WebP alpha.
8. Research: metrics besar dihapus dari card.
9. Tombol Download CV (amber) + PDF di `public/`.
10. Hero cue scroll clearance (pb-32, bottom-2).
11. Full English seluruh web (konten + UI). `Profile.md` tetap ID (internal).

### State
- Tests 6/6 PASS, build PASS, `main` sync `origin/main`, Netlify auto-deploy dari `main`.
- TODO konten: foto project 2-10 (belum disediakan user), link demo proyek, PDF thesis, domain final.

### Revisi lanjutan
12. Tombol Download CV (amber) di hero + PDF `public/CV-Muhammad-Pandu-Wirakusuma.pdf` (272KB).
13. Hero cue scroll clearance (pb-32, bottom-2, pointer-events-none).
14. Full English seluruh web (konten profile.json + semua UI strings). `Profile.md` tetap ID.
15. Gallery rework: label `Project 1..10` (Screenshot dihapus), album per-project + lightbox carousel (panah, keyboard, swipe, counter, thumbnail). Project 1 DigiTelco terisi 8 foto (`public/gallery/digitelco/`); project lain "Photos coming soon".
