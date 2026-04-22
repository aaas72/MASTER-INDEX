export default function Footer() {
  return (
    <footer className="border-t border-surface-container bg-white py-12">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-12 md:grid-cols-4">
        <div className="col-span-2">
          <h4 className="mb-4 font-sans text-lg font-bold uppercase tracking-tight">
            The Neo-Formalist Archive
          </h4>
          <p className="max-w-md font-body leading-relaxed text-on-surface-variant">
            This index is maintained as a digital artifact of high-performance
            computing history. Each entry is rigorously peer-reviewed by the
            Librarian Guide AI for complexity accuracy and implementation
            integrity.
          </p>
          <div className="mt-8 flex gap-8">
            <div>
              <span className="block font-mono text-[10px] uppercase text-slate-400">
                Version
              </span>
              <span className="font-mono text-xs font-bold">4.2.0-STABLE</span>
            </div>
            <div>
              <span className="block font-mono text-[10px] uppercase text-slate-400">
                Last Sync
              </span>
              <span className="font-mono text-xs font-bold">
                2023.10.24 // 14:00 UTC
              </span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-widest text-[#002FA7]">
            Taxonomy
          </h5>
          <ul className="space-y-4 font-sans text-sm font-bold uppercase tracking-tight text-black">
            <li><a className="transition-colors hover:text-[#002FA7]" href="#">Heuristic Search</a></li>
            <li><a className="transition-colors hover:text-[#002FA7]" href="#">Stochastic Logic</a></li>
            <li><a className="transition-colors hover:text-[#002FA7]" href="#">Memory Layouts</a></li>
            <li><a className="transition-colors hover:text-[#002FA7]" href="#">Linear Systems</a></li>
          </ul>
        </div>

        <div>
          <h5 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-widest text-[#002FA7]">
            Terminal
          </h5>
          <ul className="space-y-4 font-mono text-[10px] uppercase text-slate-500">
            <li><a className="transition-colors hover:text-black" href="#">ssh root@the-hub.io</a></li>
            <li><a className="transition-colors hover:text-black" href="#">man algorithms</a></li>
            <li><a className="transition-colors hover:text-black" href="#">grep -r "complexity"</a></li>
            <li><a className="transition-colors hover:text-black" href="#">exit(0)</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}