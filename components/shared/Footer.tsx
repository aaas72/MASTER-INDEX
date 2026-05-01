import { footer as t } from "@/locales/en/footer";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-20 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid w-full grid-cols-1 gap-16 md:grid-cols-4">
        <div className="col-span-2">
          <h4 className="mb-4 font-sans text-base font-bold uppercase tracking-tight">
            {t.title}
          </h4>
          <p className="max-w-md font-body text-sm leading-relaxed text-on-surface-variant">
            {t.description}
          </p>
          <div className="mt-8 flex gap-8">
            <div>
              <span className="block font-mono text-[10px] uppercase text-slate-400">
                {t.version_label}
              </span>
              <span className="font-mono text-[10px] font-bold">4.2.0-STABLE</span>
            </div>
            <div>
              <span className="block font-mono text-[10px] uppercase text-slate-400">
                {t.sync_label}
              </span>
              <span className="font-mono text-[10px] font-bold">
                {t.sync_value}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-widest text-[#002FA7]">
            {t.taxonomy_title}
          </h5>
          <ul className="space-y-4 font-sans text-xs font-bold uppercase tracking-tight text-black">
            <li><a className="transition-colors hover:text-[#002FA7]" href="#">{t.links.heuristic}</a></li>
            <li><a className="transition-colors hover:text-[#002FA7]" href="#">{t.links.stochastic}</a></li>
            <li><a className="transition-colors hover:text-[#002FA7]" href="#">{t.links.memory}</a></li>
            <li><a className="transition-colors hover:text-[#002FA7]" href="#">{t.links.linear}</a></li>
          </ul>
        </div>

        <div>
          <h5 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-widest text-[#002FA7]">
            {t.terminal_title}
          </h5>
          <ul className="space-y-4 font-mono text-[10px] uppercase text-slate-500">
            <li><a className="transition-colors hover:text-black" href="#">ssh root@the-hub.io</a></li>
            <li><a className="transition-colors hover:text-black" href="#">man algorithms</a></li>
            <li><a className="transition-colors hover:text-black" href="#">grep -r "complexity"</a></li>
            <li><a className="transition-colors hover:text-black" href="#">exit(0)</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
}