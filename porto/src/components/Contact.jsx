import profile from "../data/profile.json";

export default function Contact() {
  const c = profile.contact ?? profile.hero;
  const emails = c.emails || [];
  const mailto = emails[0] ? `mailto:${emails[0]}?subject=Kontak%20Portofolio` : "mailto:";
  const waNumber = "6281239002650";

  return (
    <section className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">08 — Contact</p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-2">Kontak</h2>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="dot-card bg-white/[0.02] border border-white/10 p-5 flex flex-col gap-3 max-w-lg mt-8"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Jangan isi: <input name="bot-field" />
            </label>
          </p>
          <label className="text-sm flex flex-col gap-1">
            Nama
            <input
              name="name"
              required
              className="bg-black border border-white/10 px-3 py-2 text-sm focus:border-amber-300 outline-none"
              placeholder="Nama kamu"
            />
          </label>
          <label className="text-sm flex flex-col gap-1">
            Email
            <input
              name="email"
              type="email"
              required
              className="bg-black border border-white/10 px-3 py-2 text-sm focus:border-amber-300 outline-none"
              placeholder="email@contoh.com"
            />
          </label>
          <label className="text-sm flex flex-col gap-1">
            Pesan
            <textarea
              name="message"
              required
              rows="4"
              className="bg-black border border-white/10 px-3 py-2 text-sm focus:border-amber-300 outline-none"
              placeholder="Halo Pandu, ..."
            />
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-1.5 bg-white text-black text-sm font-medium hover:bg-amber-300"
            >
              Kirim →
            </button>
            <a
              href={mailto}
              className="px-4 py-1.5 border border-white/20 text-sm text-zinc-200 hover:border-amber-300 hover:text-amber-300"
            >
              mailto fallback
            </a>
          </div>
        </form>
        <footer className="mt-8 text-sm text-zinc-400 flex flex-col gap-1 font-mono">
          <a href={`https://wa.me/${waNumber}`} className="hover:text-amber-300">
            WA 0812-3900-2650
          </a>
          {emails.map((e) => (
            <a key={e} href={`mailto:${e}`} className="hover:text-amber-300">
              {e}
              {c.emailLabels?.[e] ? ` (${c.emailLabels[e]})` : ""}
            </a>
          ))}
          <a
            href={`https://${c.jobstreet}`}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-amber-300"
          >
            Jobstreet: {c.jobstreet}
          </a>
        </footer>
      </div>
    </section>
  );
}
