# Design: Porto Restyle ala Arfazrll (Vite ringan) — 2026-09-22

## Goal
Tiru feel Arfazrll portfolio (hero immersive + smooth scroll) ke porto Vite existing, data sama, tetap Netlify-friendly. Tanpa migrasi Next.js, tanpa chatbot/stats berat.

## Konteks
- Stack kini: Vite + React 19 + Tailwind 3, SPA scroll, black #000 + amber #FCD34D, DotCanvas interaktif, sections: Hero About Edu Exp Orgs Projects Research Gallery Contact.
- Data: `porto/src/data/profile.json` (source of truth dari Profile.md): 10 proyek, 5 riset, EN full.
- Template ref: Arfazrll PersonalBlog (Next.js 16, R3F WebGL, Framer+GSAP, Lenis, chatbot, GitHub/WakaTime stats, bilingual). Diambil hanya pola visual + motion, bukan stack.
- Skill: ui-ux-pro-max v2.13.0 clone permanen ke `~/.config/opencode/skills/ui-ux-pro-max-skill`. Design-system generator output: Pattern Scroll-Triggered Storytelling (pakai), Style Brutalism + Caveat/Quicksand (tolak, tak cocok dark porto). Override ke Style dark-mode-oled (active, cost low, cocok OLED #000/#121212, amber accent dipertahankan).

## Pendekatan dipertimbangkan
1. Restyle Vite ringan (dipilih): tambah lenis + framer-motion, rework Hero + Navbar + reveal. Cepat, deploy sama, risiko rendah.
2. Full clone Next.js: mirip 100% tapi berat, perlu Vercel, migrasi data, lama. Ditolak user.
3. Hybrid tengah + stats/chatbot: tambah GitHub API + chatbot. Ditolak user (pilih hanya hero + smooth scroll).

## Arsitektur
Tetap `porto/` Vite SPA. Tambah deps: `lenis`, `framer-motion`. No router, no SSR. Scroll: Lenis wrapper + anchor via `lenis.scrollTo`, fallback CSS smooth + reduced-motion off.

## Komponen / sentuhan
- `hooks/useLenis.js` (baru): init Lenis, raf loop, hormati `prefers-reduced-motion`, cleanup. Return instance via ref/context sederhana.
- `App.jsx`: pasang useLenis, anchor click intercept `#id` -> lenis scroll, pertahankan section ids sama.
- `Hero.jsx`: immersive ala Arfazrll — eyebrow badge (Portfolio 2026 + role Lecturer), h1 clamp besar, gradient glow amber di belakang foto, foto ring + shadow, stats mini (10 Projects / 5 Research / 4+ Years), CTA sama (View Projects, Contact, Download CV), stagger fade-up via framer-motion, contact line sama.
- `DotCanvas.jsx`: pertahankan, tambah fade on scroll sudah ada, opacity base diselaraskan agar glow Hero terbaca.
- `Navbar.jsx`: pertahankan progress bar, tambah active link highlight via IntersectionObserver (ringan), smooth anchor ikut Lenis.
- `index.css`: hapus `html{scroll-behavior:smooth}` saat Lenis aktif (class `lenis` di html), tambah `.lenis` recommended styles, pertahankan reveal + dot-card + reduced-motion.

## Data flow
Tanpa ubah: `profile.json` tetap single source. Hero baca `profile.hero` sama. No API baru, no i18n (tetap EN).

## Error handling
- Lenis gagal load -> fallback native scroll.
- `prefers-reduced-motion: reduce` -> matikan Lenis + framer-motion animasi (render final state).
- Canvas hidden tab -> raf pause (sudah ada).

## Testing / verif
- `cd porto; npm run build` PASS.
- `npx vitest run` (data.test.js, filter.test.js) PASS jika ada script.
- Manual: 375/768/1024/1440px, keyboard nav, focus visible, contrast amber di black ≥4.5:1 untuk teks kecil diverifikasi.
- Checklist skill: no emoji icons, cursor-pointer clickable, hover 150-300ms, focus visible, reduced-motion, reflow tanpa clip.

## Scope tegas TIDAK
No Next.js migrasi, no WebGL R3F penuh, no chatbot, no GitHub/WakaTime live stats, no bilingual toggle, no ubah konten/data.
