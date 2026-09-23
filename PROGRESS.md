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

## 2026-09-21

### Lanjut sesi kemarin
- Review hasil 2026-09-20 dari `PROGRESS.md` + `git log`.
- Konfirmasi cara run dev: `cd porto`, `npm install`, `npm run dev` → `http://localhost:5173`.

## 2026-09-22

### Skill ui-ux-pro-max (permanen)
- Clone `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git` → `~/.config/opencode/skills/ui-ux-pro-max-skill` (v2.13.0, MIT).
- Design-system generator: Pattern Scroll-Triggered Storytelling (dipakai); Style Brutalism + Caveat/Quicksand (ditolak, tak cocok dark porto) → override dark-mode-oled (black #000 + amber #FCD34D dipertahankan).

### Restyle porto ala template Arfazrll (21st.dev)
- Pendekatan dipilih user: Restyle Vite ringan (bukan full Next.js, tanpa chatbot/stats). Data sama `profile.json` (10 proyek, 5 riset, EN).
- Spec: `docs/superpowers/specs/2026-09-22-porto-arfazrll-restyle-design.md`.
- Deps baru: `lenis@1.3.26`, `framer-motion@13.4.0`.
- Baru: `porto/src/hooks/useLenis.js` (smooth scroll, hormati prefers-reduced-motion, fallback native).
- Rework: `Hero.jsx` immersive (glow amber, foto rounded ring + badge, stats 10/5/6, stagger fade-up, CTA sama); `Navbar.jsx` (active link highlight observer); `App.jsx` (`MotionConfig reducedMotion=user`); `index.css` (Lenis styles).
- Verif: `npm run build` PASS, `vitest` 6/6 PASS. Dev run OK → `http://localhost:5173/`.
- Commit `bfd8fae` → push `origin/main` → Netlify auto-deploy (`base=porto`, `publish=dist`).

### State
- `origin/main` = `bfd8fae`. Tree: `PROGRESS.md` modified (log ini), untracked `Foto/`, CV pdf (belum di-push, perlu keputusan user).

## 2026-09-23

### Security hardening + pentest
- Audit attack surface `porto/`: nol `dangerouslySetInnerHTML`/`eval`, React escape default, `npm audit` 0 vuln, nol sourcemap di `dist/`, `_redirects` SPA saja (nol open redirect).
- Celah tutup: security headers di `netlify.toml` root + `porto/` (DENY frame, nosniff, referrer strict, Permissions-Policy kosong, HSTS, COOP/COEP same-origin, CSP ketat); `Contact.jsx` tabnabbing → `rel="noopener noreferrer"` + `safeExternalUrl()` allowlist jobstreet; `useLenis.js` guard `closest` + validasi id anchor; form `maxLength` + `autoComplete`; `index.html` title/meta/referrer/theme; `framer-motion` 13.4.0→13.4.1.
- Verif: `vitest` 6/6 PASS, `npm run build` PASS.

### Anti-DDoS prep
- Cache headers: `/assets/*` immutable 1 thn, `/gallery/*` + `/*.pdf` + favicon 7 hari–1 thn.
- Form: Netlify reCAPTCHA (`data-netlify-recaptcha`) + CSP buka `google.com/gstatic` secukupnya. Wajib enable di dashboard: Site settings → Forms → reCAPTCHA.
- Diet payload: `photo-about.jpg` 166KB → `photo-about.webp` 640px 33KB (potong 80%) + `loading=lazy`; Gallery split chunk via `React.lazy` (awal 402→399KB); hapus aset mati (`hero.png`, `react.svg`, `vite.svg`, jpg lama).
- Cloudflare (manual saat domain pasang): proxy on, Cache Everything aset, Bot Fight Mode, rate rule 100 req/10s/IP → Managed Challenge, Under Attack Mode saat insiden.

### Credential audit (2026-09-23 sore)
- Scan live + history: nol `.env`, nol `api_key|secret|password|PRIVATE|ghp_|sk-live|AKIA|token`, nol service ID. `dist/` ignored. Kunci reCAPTCHA di dashboard, bukan kode.
- Fix: `.gitignore` blokir `.env*`/`*.pem`/`*.key`; hapus `porto/src/App.css` mati.
- Verif: `vitest` 6/6 PASS, `vite build` PASS.
