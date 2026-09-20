# Portfolio SPA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build dark modern SPA portfolio Pandu, deploy Netlify.

**Architecture:** Vite React SPA single-page scroll, no router, `profile.json` single source from `Profile.md`, Tailwind dark theme, client filter.

**Tech Stack:** Vite 5 + React 18, Tailwind 3, Netlify (build `npm run build`, publish `dist`).

**Spec:** `docs/superpowers/specs/2026-09-20-portfolio-spa-design.md`

## Global Constraints

- SPA redirect `/* -> /index.html 200` via `netlify.toml` + `public/_redirects`.
- Lang ID, dark default `bg-zinc-950 text-zinc-100`.
- All 10 projects + 5 research render with filter.
- No router, no CMS, no SSR.

---

### Task 1: Scaffold Vite + Tailwind + Netlify

**Files:**
- Create: `porto/package.json`, `porto/vite.config.js`, `porto/tailwind.config.js`, `porto/postcss.config.js`, `porto/index.html`, `porto/src/main.jsx`, `porto/src/index.css`, `porto/netlify.toml`, `porto/public/_redirects`
- Modify: none
- Test: `porto/src/smoke.test.js` (vitest: assert profile.json loads, 10 projects)

**Interfaces:**
- Consumes: Spec §1, §4
- Produces: `npm run dev` runnable app, `npm run build` outputs `dist/index.html`

- [ ] **Step 1: Scaffold vite**

```bash
npm create vite@latest porto -- --template react
```

- [ ] **Step 2: Install tailwind + vitest**

```bash
npm i -D tailwindcss@3 postcss autoprefixer vitest
npx tailwindcss init -p
```

- [ ] **Step 3: Write tailwind.config.js**

```js
export default { content: ["./index.html","./src/**/*.{jsx,js}"], theme: { extend: { fontFamily: { sans: ["Inter","system-ui","sans-serif"] } } }, plugins: [] }
```

- [ ] **Step 4: Write src/index.css**

```css
@tailwind base; @tailwind components; @tailwind utilities;
html{scroll-behavior:smooth} body{background:#09090b}
```

- [ ] **Step 5: Write netlify.toml**

```toml
[build]
command = "npm run build"
publish = "dist"
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

- [ ] **Step 6: Write public/_redirects**

```
/* /index.html 200
```

- [ ] **Step 7: Verify build**

Run: `npm run build`
Expected: PASS, `dist/index.html` exists.

### Task 2: Data profile.json + shared UI

**Files:**
- Create: `porto/src/data/profile.json`, `porto/src/components/Badge.jsx`, `porto/src/components/FilterBar.jsx`, `porto/src/components/Modal.jsx`, `porto/src/components/Timeline.jsx`
- Test: `porto/src/data.test.js`

**Interfaces:**
- Consumes: Task 1 scaffold, `Profile.md` §1-8
- Produces: `import profile from "../data/profile.json"`, `<Badge/>`, `<FilterBar/>`, `<Modal/>`

- [ ] **Step 1: Write failing data test**

```js
import { describe, it, expect } from "vitest";
import p from "./data/profile.json";
describe("profile", () => {
  it("has 10 projects + 5 research", () => {
    expect(p.projects.length).toBe(10);
    expect(p.research.length).toBe(5);
  });
});
```

- [ ] **Step 2: Run test, verify fail**

Run: `npx vitest run src/data.test.js`
Expected: FAIL "cannot find module profile.json"

- [ ] **Step 3: Write profile.json (full content from Profile.md)**

```json
{
  "hero": {"name":"Muhammad Pandu Wirakusuma","roles":["Lecturer S1 Teknik Telekomunikasi Tel-U Jakarta","Sales Engineer","Project Manager","UI/UX Designer"],"phone":"(62) 812-3900-2650","emails":["panduwirak@gmail.com","Muhammadpandu@telkomuniversity.ac.id"],"jobstreet":"id.jobstreet.com/profiles/pandu-wirakusuma-3dfTxz9x74"},
  "about": "Hybrid professional...",
  "education": [{"level":"S1","school":"Universitas Telkom Bandung","period":"Agu 2019 – Agu 2023","major":"Teknik Telekomunikasi","gpa":"3.44/4.00","notes":"Beasiswa Fast-Track"} , {"level":"S2","school":"Universitas Telkom Bandung","period":"Agu 2023 – Apr 2026","major":"Magister Teknik Elektro","gpa":"3.85/4.00","notes":"Beasiswa prestisius"}],
  "experience": [{"org":"PT. Mukti Rejo Abadi","role":"Product Designer","period":"Jan 2022 – Jun 2022"},{"org":"PT. Bina Sarana Medika","role":"Member of Creative Division","period":"Jan 2022 – Jun 2022"},{"org":"PT. ISRSI","role":"3D Designer (Intern)","period":"Sep 2022 – Des 2022"},{"org":"Tsuki Software & Media House","role":"Co-Founder / UI Designer / Sales Engineer / Project Manager","period":"Okt 2021 – Sekarang"}],
  "projects": [{"year":2021,"title":"DigiTelco","tags":["UI/UX"],"desc":"Portal info Tektel"},{"year":2022,"title":"Design Packaging","tags":["Packaging"],"desc":"Packaging alkes"},{"year":2022,"title":"Voting-Q","tags":["UI/UX","PM"],"desc":"Digital voting"},{"year":2022,"title":"NPK Information Website","tags":["UI/UX","PM"],"desc":"Hub agrikultur"},{"year":2022,"title":"3D Video Presentation","tags":["3D/Motion"],"desc":"Video Pertamina AE"},{"year":2023,"title":"Warehouse Inventory Website","tags":["PM"],"desc":"Inventory internal"},{"year":2024,"title":"Perguruan Cikini Company Profile","tags":["UI/UX","PM"],"desc":"Profile sekolah"},{"year":2025,"title":"UNIB Correspondence System","tags":["UI/UX","PM"],"desc":"Surat UNIB"},{"year":2025,"title":"Wave Prediction App","tags":["Frontend","ML"],"desc":"Framer + forecasting"},{"year":2025,"title":"Phinisi Boat Website","tags":["UI/UX","PM"],"desc":"Luxury boat web"}],
  "research": [{"year":2021,"title":"LoRa Patch Antenna M2M","models":["SolidWorks"],"metrics":"IEEE MTT-Sat"},{"year":2023,"title":"Livestock Motion Detection","models":["YOLO V3"],"metrics":"76.15%"},{"year":2024,"title":"TB Detection Voting Classifier","models":["SVM","Random Forest"],"metrics":"99.1% acc, 99.3% AUC"},{"year":2024,"title":"Sentiment Analysis Banking","models":["Naive Bayes","LogReg"],"metrics":"5 banks"},{"year":2025,"title":"Shallot Price Prediction","models":["ARIMA","SARIMA","Prophet","LSTM"],"metrics":"Tesis S2"}]
}
```

- [ ] **Step 4: Write Badge.jsx**

```jsx
export default function Badge({children}){ return <span className="px-2 py-0.5 rounded-full text-xs bg-amber-400/10 text-amber-300 border border-amber-400/30">{children}</span> }
```

- [ ] **Step 5: Run test, verify pass**

Run: `npx vitest run src/data.test.js`
Expected: PASS

### Task 3: Sections Hero→Orgs

**Files:**
- Create: `porto/src/components/Navbar.jsx`, `Hero.jsx`, `About.jsx`, `Education.jsx`, `Experience.jsx`, `Organizations.jsx`, `porto/src/App.jsx`
- Test: manual `npm run dev` scroll-spy

**Interfaces:**
- Consumes: Task 2 profile.json, Badge, Timeline
- Produces: `App` renders all sections with ids `hero,about,edu,exp,orgs,projects,research,contact`

- [ ] **Step 1: Write App.jsx**

```jsx
import profile from "./data/profile.json";
import Navbar from "./components/Navbar"; import Hero from "./components/Hero";
export default function App(){ return (<div className="bg-zinc-950 text-zinc-100 min-h-screen"><Navbar/><Hero data={profile.hero}/><main>...</main></div>) }
```

- [ ] **Step 2: Write Navbar + Hero minimal dark**

```jsx
// Navbar: sticky top, links ["About","Edu","Exp","Projects","Research","Contact"]
```

- [ ] **Step 3: Verify dev**

Run: `npm run dev`
Expected: page loads, nav anchors work.

### Task 4: Projects + Research filter + Modal

**Files:**
- Create: `porto/src/components/Projects.jsx`, `Research.jsx`
- Modify: `porto/src/App.jsx:20-40`
- Test: `porto/src/filter.test.js`

**Interfaces:**
- Consumes: Task 2 FilterBar + Modal + Badge
- Produces: filter by year/category, modal detail

- [ ] **Step 1: Write failing filter test**

```js
import { describe,it,expect } from "vitest";
import { filterBy } from "./components/filter.js";
describe("filter",()=>{ it("filters 2022",()=>{ expect(filterBy([{year:2022},{year:2025}],2022).length).toBe(1) }) });
```

- [ ] **Step 2: Implement filter.js + Projects.jsx with useMemo**

```jsx
// Projects.jsx: const [year,setYear]=useState("all"); const [cat,setCat]=useState("all"); list=useMemo(...)
```

- [ ] **Step 3: Verify**

Run: `npx vitest run src/filter.test.js && npm run build`
Expected: PASS

### Task 5: Gallery Contact polish + deploy

**Files:**
- Create: `porto/src/components/Gallery.jsx`, `Contact.jsx`
- Modify: `porto/README.md`
- Test: build + lighthouse smoke

**Interfaces:**
- Consumes: Tasks 1-4
- Produces: Netlify-ready `dist/`

- [ ] **Step 1: Netlify Forms contact + footer links (WA, 2 email, Jobstreet)**
- [ ] **Step 2: Verify final**

Run: `npm run build`
Expected: PASS, no 404 assets.

- [ ] **Step 3: Deploy**

```bash
netlify deploy --prod --dir=dist
```
