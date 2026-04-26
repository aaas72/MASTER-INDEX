import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background text-on-background font-serif min-h-screen flex flex-col bg-[radial-gradient(#c4c5d6_1px,transparent_1px)] bg-[size:20px_20px]">
      <main className="flex-grow flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Left-side vertical terminal stack trace */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block w-64 opacity-60">
          <div className="font-mono text-[10px] text-outline leading-relaxed space-y-2">
            <p className="text-primary font-bold">CRITICAL_ERROR: ROUTE_NOT_DEFINED</p>
            <p>LOOKUP_FAILED_AT_ADDRESS: 0x00404</p>
            <p>POINTER_EXCEPTION: NULL</p>
            <p className="pt-4">SEGMENT_MAP: UNREACHABLE</p>
            <p>ARCHIVE_QUERY: [EMPTY_SET]</p>
            <p>MEM_DUMP: 00 2F A7 00 FF 00</p>
            <p>RECOVERY_VECTOR: UNKNOWN</p>
            <p className="text-tertiary-container">STACK_OVERFLOW_PREVENTED</p>
            <p>CPU_CYCLES: 0.0004ms</p>
          </div>
        </div>

        {/* Main Content Canvas */}
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-start-3 md:col-span-8 text-center space-y-12">
            {/* 404 Wireframe Container */}
            <div className="relative inline-block group">
              <h1 className="font-sans text-[12rem] md:text-[24rem] font-black leading-none select-none tracking-tighter text-transparent [-webkit-text-stroke:1px_#002FA7]">
                404
              </h1>
              {/* Decorative technical elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-primary-container"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-primary-container"></div>
            </div>

            {/* Textual Information */}
            <div className="space-y-4">
              <h2 className="font-mono text-sm uppercase tracking-[0.3em] text-primary-container font-bold bg-primary-fixed inline-block px-4 py-1">
                SYSTEM_EXCEPTION: PAGE_NOT_IN_INDEX
              </h2>
              <p className="text-on-surface font-serif text-xl md:text-2xl max-w-2xl mx-auto italic opacity-80">
                The requested algorithm or path does not exist in the current computational taxonomy.
              </p>
            </div>

            {/* Interactive Recovery */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
              <Link className="group flex items-center gap-4 bg-transparent border border-primary-container px-8 py-4 transition-all duration-300 hover:bg-primary-container" href="/">
                <span className="font-mono text-xs font-bold text-primary-container group-hover:text-white">RETURN_TO_ROOT_DIRECTORY</span>
                <span className="material-symbols-outlined text-primary-container group-hover:text-white" data-icon="terminal">terminal</span>
              </Link>
              <a className="group relative py-2" href="mailto:admin@archive.sys">
                <span className="font-mono text-xs text-outline group-hover:text-primary transition-colors">NOTIFY_ADMIN_R3</span>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></div>
              </a>
            </div>
          </div>

          {/* Right-side background graphic */}
          <div className="absolute right-0 top-0 h-full w-1/4 opacity-[0.03] pointer-events-none hidden lg:block">
            <div className="h-full w-full border-l border-outline-variant flex flex-col justify-between p-8 font-mono text-[8px] uppercase tracking-widest leading-[4]">
              <div>01001010 01101111 01101000 01101110 00100000 01000100 01101111 01100101 00001010 01010100 01101000 01100101 00100000 01000001 01110010 01100011 01101000 01101001 01110110 01100101 00001010 01010110 01101111 01101001 01100100 00100000 01001110 01110101 01101100 01101100 00001010</div>
              <div>11010010 01101000 01101110 00100000 01000100 01101111 01100101 00001010 01010100 01101000 01100101 00100000 01000001 01110010 01100011 01101000 01101001 01110110 01100101 00001010 01010110 01101111 01101001 01100100 00100000 01001110 01110101 01101100 01101100 00001010</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer from Shared Components JSON */}
      <footer className="flex justify-between items-center px-6 py-2 w-full fixed bottom-0 z-50 bg-opacity-80 backdrop-blur-md bg-[#f7fafe] dark:bg-slate-950 border-t border-slate-200/20 dark:border-slate-800/20">
        <div className="font-mono text-[10px] tracking-tight text-slate-400 dark:text-slate-600">
          © 2026 THE NEO-FORMALIST ARCHIVE | NULL_REF_EXCEPTION_HANDLED
        </div>
        <div className="flex gap-4">
          <Link className="font-mono text-[10px] tracking-tight text-slate-400 dark:text-slate-600 hover:text-black dark:hover:text-white transition-all underline decoration-transparent hover:decoration-[#002FA7]" href="/documentation">Documentation</Link>
          <Link className="font-mono text-[10px] tracking-tight text-slate-400 dark:text-slate-600 hover:text-black dark:hover:text-white transition-all underline decoration-transparent hover:decoration-[#002FA7]" href="#">API_Status</Link>
        </div>
      </footer>

      {/* Background Decorative Text Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center -z-10 overflow-hidden">
        <span className="font-sans text-[40vw] text-primary rotate-12 font-black leading-none">VOID</span>
      </div>
    </div>
  );
}
