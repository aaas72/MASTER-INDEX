import { Footer } from "@/components/shared";
import React from "react";

export default function DocumentationPage() {
  return (
    <div>
      <div className="py-12 max-w-[1280px] w-full mx-auto px-12 animate-fade-in">
        {/* Page Header */}

        <div className="mb-16">
          <span className="page-kicker block mb-2">
            Protocol Manual
          </span>
          <h1 className="page-title mb-4 uppercase">
            Documentation
          </h1>
          <p className="body-copy max-w-3xl">
            The operational framework and methodological constraints governing
            the Global Algorithm Repository. This manual dictates the rules of
            engagement, benchmarking standards, and archival protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Section 1: Symbology & Status */}
          <section className="bg-surface-container-lowest border border-outline-variant p-8 shadow-custom">
            <div className="flex items-center gap-3 mb-6 border-b border-surface-container pb-4">
              <span className="material-symbols-outlined text-[#002FA7] text-2xl">
                traffic
              </span>
              <h2 className="section-title uppercase">
                Ledger Symbology
              </h2>
            </div>
            <p className="body-copy mb-6">
              Every entry in the index is assigned a strict operational status.
              These visual markers indicate the current stage of the algorithm's
              lifecycle within our laboratory environments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface border border-outline-variant p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500"></div>
                  <span className="font-mono text-xs uppercase tracking-widest font-bold text-on-surface">
                    Code Ready
                  </span>
                </div>
                <p className="font-body text-sm text-on-surface-variant italic">
                  Fully implemented, peer-reviewed, and optimized. The code is
                  available for immediate extraction and deployment.
                </p>
              </div>
              <div className="bg-surface border border-outline-variant p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500"></div>
                  <span className="font-mono text-xs uppercase tracking-widest font-bold text-on-surface">
                    Simulation
                  </span>
                </div>
                <p className="font-body text-sm text-on-surface-variant italic">
                  The algorithm is currently undergoing rigorous stress testing
                  and theoretical benchmarking in the Versus Hub.
                </p>
              </div>
              <div className="bg-surface border border-outline-variant p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#002FA7]"></div>
                  <span className="font-mono text-xs uppercase tracking-widest font-bold text-on-surface">
                    Researching
                  </span>
                </div>
                <p className="font-body text-sm text-on-surface-variant italic">
                  Currently under theoretical review. Mathematical proofs and
                  complexity bounds are being verified by the Librarian AI.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Measurement Methodology */}
          <section className="bg-surface-container-lowest border border-outline-variant p-8 shadow-custom">
            <div className="flex items-center gap-3 mb-6 border-b border-surface-container pb-4">
              <span className="material-symbols-outlined text-[#002FA7] text-2xl">
                science
              </span>
              <h2 className="section-title uppercase">
                Measurement Methodology
              </h2>
            </div>
            <p className="body-copy mb-6">
              When the Versus Hub declares an algorithm "Faster" or "Optimal,"
              it relies on specific, unyielding baseline constraints.
              Performance is not anecdotal; it is mathematically verified.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="font-mono text-[#002FA7] font-bold mt-1">
                  01
                </span>
                <div>
                  <h4 className="font-sans font-bold text-on-surface uppercase tracking-tight">
                    Asymptotic Analysis (Big-O)
                  </h4>
                  <p className="font-body text-sm text-on-surface-variant">
                    All algorithms are evaluated at absolute worst-case
                    boundaries unless specifically annotated as "Average Case"
                    in the ledger.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="font-mono text-[#002FA7] font-bold mt-1">
                  02
                </span>
                <div>
                  <h4 className="font-sans font-bold text-on-surface uppercase tracking-tight">
                    Hardware Abstraction
                  </h4>
                  <p className="font-body text-sm text-on-surface-variant">
                    Execution latency percentages (e.g., -14.2%) are derived
                    from a standardized V8 JS Engine runtime operating within an
                    isolated Docker container allocating EXACTLY 2GB of RAM.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="font-mono text-[#002FA7] font-bold mt-1">
                  03
                </span>
                <div>
                  <h4 className="font-sans font-bold text-black uppercase tracking-tight">
                    Input Scale
                  </h4>
                  <p className="font-body text-sm text-slate-500">
                    "Large Array" benchmarks always utilize an input boundary of
                    N = 10,000,000 randomized 64-bit integers to accurately
                    display logarithmic divergence.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3: Contribution Guidelines */}
          <section className="bg-surface-container-lowest border border-outline-variant p-8 shadow-custom">
            <div className="flex items-center gap-3 mb-6 border-b border-surface-container pb-4">
              <span className="material-symbols-outlined text-[#002FA7] text-2xl">
                add_box
              </span>
              <h2 className="font-sans font-bold text-2xl uppercase tracking-tight text-black">
                Contribution Guidelines
              </h2>
            </div>
            <p className="font-body text-lg text-slate-600 mb-6">
              The archive relies on strict peer-reviewed submissions. To
              introduce a new algorithmic concept into the Master Index,
              developers must conform to the ingestion protocol.
            </p>
            <div className="bg-surface-container-high p-6 border-l-2 border-[#002FA7]">
              <ol className="list-decimal list-inside font-body text-slate-700 space-y-3">
                <li>
                  Initialize a feature branch from{" "}
                  <code className="font-mono text-[10px] bg-white px-1 py-0.5">
                    main
                  </code>{" "}
                  labeled{" "}
                  <code className="font-mono text-[10px] bg-white px-1 py-0.5">
                    algo/your-algorithm-name
                  </code>
                  .
                </li>
                <li>
                  Provide the raw implementation code alongside a{" "}
                  <code className="font-mono text-[10px] bg-white px-1 py-0.5">
                    .md
                  </code>{" "}
                  brief detailing Time and Space complexity bounds.
                </li>
                <li>
                  Include at least 3 unit tests covering:{" "}
                  <strong>Base Case</strong>, <strong>Edge Case</strong>, and{" "}
                  <strong>Large Scale Load</strong>.
                </li>
                <li>
                  Submit a Pull Request. The Librarian AI will automatically
                  trigger CI/CD pipelines to verify complexity claims against
                  the Versus Hub constraints.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 4: Terminology */}
          <section className="bg-surface-container-lowest border border-outline-variant p-8 shadow-custom">
            <div className="flex items-center gap-3 mb-6 border-b border-surface-container pb-4">
              <span className="material-symbols-outlined text-[#002FA7] text-2xl">
                translate
              </span>
              <h2 className="font-sans font-bold text-2xl uppercase tracking-tight text-black">
                Terminology & Lexicon
              </h2>
            </div>
            <p className="font-body text-lg text-slate-600 mb-6">
              The Neo-Formalist nature of this archive demands highly specific
              naming conventions to prevent ambiguity in engineering
              communication.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-outline-variant p-4">
                <span className="font-mono text-[10px] uppercase font-bold text-[#002FA7] block mb-1">
                  Lexicon 01
                </span>
                <h4 className="font-sans font-bold text-lg text-black uppercase tracking-tight mb-2">
                  Simulation (Versus Hub)
                </h4>
                <p className="font-body text-sm text-slate-500">
                  We use "Simulation" rather than "Testing" to imply that
                  algorithms are pitted against environmental constraints, not
                  just boolean unit assertions.
                </p>
              </div>
              <div className="border border-outline-variant p-4">
                <span className="font-mono text-[10px] uppercase font-bold text-[#002FA7] block mb-1">
                  Lexicon 02
                </span>
                <h4 className="font-sans font-bold text-lg text-black uppercase tracking-tight mb-2">
                  Master Index
                </h4>
                <p className="font-body text-sm text-slate-500">
                  Refers to the main database of algorithms. Chosen over "List"
                  to echo the architectural weight of a library ledger.
                </p>
              </div>
              <div className="border border-outline-variant p-4">
                <span className="font-mono text-[10px] uppercase font-bold text-[#002FA7] block mb-1">
                  Lexicon 03
                </span>
                <h4 className="font-sans font-bold text-lg text-black uppercase tracking-tight mb-2">
                  Heuristic Route
                </h4>
                <p className="font-body text-sm text-slate-500">
                  Applied to algorithms that sacrifice absolute perfection for
                  speed (e.g., A* Search). Emphasizes calculated estimation.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
