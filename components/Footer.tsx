export default function Footer() {
  return (
    <footer className="py-12 border-t border-surface-container bg-white">
      <div className="max-w-[1280px] w-full mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <h4 className="font-sans font-bold text-lg uppercase tracking-tight mb-4">
            The Neo-Formalist Archive
          </h4>
          <p className="font-body text-on-surface-variant leading-relaxed max-w-md">
            This index is maintained as a digital artifact of high-performance
            computing history. Each entry is rigorously peer-reviewed by the
            Librarian Guide AI for complexity accuracy and implementation
            integrity.
          </p>
          <div className="mt-8 flex gap-8">
            <div>
              <span className="block font-mono text-[10px] text-slate-400 uppercase">
                Version
              </span>
              <span className="font-mono text-xs font-bold">4.2.0-STABLE</span>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-slate-400 uppercase">
                Last Sync
              </span>
              <span className="font-mono text-xs font-bold">
                2023.10.24 // 14:00 UTC
              </span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#002FA7] mb-6">
            Taxonomy
          </h5>
          <ul className="space-y-4 font-sans text-sm font-bold text-black uppercase tracking-tight">
            <li>
              <a className="hover:text-[#002FA7] transition-colors" href="#">
                Heuristic Search
              </a>
            </li>
            <li>
              <a className="hover:text-[#002FA7] transition-colors" href="#">
                Stochastic Logic
              </a>
            </li>
            <li>
              <a className="hover:text-[#002FA7] transition-colors" href="#">
                Memory Layouts
              </a>
            </li>
            <li>
              <a className="hover:text-[#002FA7] transition-colors" href="#">
                Linear Systems
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#002FA7] mb-6">
            Terminal
          </h5>
          <ul className="space-y-4 font-mono text-[10px] uppercase text-slate-500">
            <li>
              <a className="hover:text-black transition-colors" href="#">
                ssh root@the-hub.io
              </a>
            </li>
            <li>
              <a className="hover:text-black transition-colors" href="#">
                man algorithms
              </a>
            </li>
            <li>
              <a className="hover:text-black transition-colors" href="#">
                grep -r "complexity"
              </a>
            </li>
            <li>
              <a className="hover:text-black transition-colors" href="#">
                exit(0)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
