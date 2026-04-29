"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[9999] bg-surface text-on-surface font-serif flex flex-col bg-[radial-gradient(#c4c5d6_1px,transparent_1px)] bg-[size:20px_20px] w-full h-full">
      <main className="flex-grow flex items-center justify-center px-6 relative overflow-hidden h-full w-full">
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
            <p className="text-[#002FA7]">STACK_OVERFLOW_PREVENTED</p>
            <p>CPU_CYCLES: 0.0004ms</p>
          </div>
        </div>

        {/* Main Content Canvas */}
        <div className="max-w-[1440px] w-full mx-auto flex flex-col items-center justify-center space-y-12">
          <div className="text-center space-y-12">
            {/* 404 Wireframe Container */}
            <div className="relative inline-block group">
              <h1 className="font-sans text-[6rem] md:text-[10rem] font-black leading-none select-none tracking-tighter text-transparent [-webkit-text-stroke:1px_#002FA7]">
                404
              </h1>
              {/* Decorative technical elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#002FA7]/30"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#002FA7]/30"></div>
            </div>

            {/* Textual Information */}
            <div className="space-y-4">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white font-bold bg-[#002FA7] inline-block px-4 py-1">
                SYSTEM_EXCEPTION: PAGE_NOT_IN_INDEX
              </h2>
              <p className="text-on-surface font-serif text-lg md:text-xl max-w-2xl mx-auto italic opacity-80">
                The requested algorithm or path does not exist in the current computational taxonomy.
              </p>
            </div>

            {/* Interactive Recovery */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
              <Link className="group flex items-center gap-4 bg-transparent border border-[#002FA7] px-8 py-4 transition-all duration-300 hover:bg-[#002FA7]" href="/">
                <span className="font-mono text-[10px] font-bold text-[#002FA7] group-hover:text-white uppercase tracking-widest">RETURN_TO_ROOT</span>
                <span className="material-symbols-outlined text-[#002FA7] group-hover:text-white" data-icon="terminal">terminal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Background Decorative Text Layer */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center -z-10 overflow-hidden">
          <span className="font-sans text-[40vw] text-[#002FA7] rotate-12 font-black leading-none">VOID</span>
        </div>
      </main>
    </div>
  );
}
