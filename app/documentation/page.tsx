import { FullWidthLayout } from "@/components/shared";
import React from "react";

export default function DocumentationPage() {
  return (
    <FullWidthLayout>
      <div className="mb-16">
        <span className="page-kicker block mb-2">Protocol Manual</span>
        <h1 className="page-title mb-4 uppercase">Documentation</h1>
        <p className="body-copy max-w-3xl">
          The operational framework and methodological constraints governing
          the Global Algorithm Repository. This manual dictates the rules of
          engagement, benchmarking standards, and archival protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <section className="bg-surface-container-lowest border border-outline-variant p-8 shadow-custom">
          <div className="flex items-center gap-3 mb-6 border-b border-surface-container pb-4">
            <span className="material-symbols-outlined text-[#002FA7] text-2xl">traffic</span>
            <h2 className="section-title uppercase">Ledger Symbology</h2>
          </div>
          <p className="body-copy mb-6">Every entry in the index is assigned a strict operational status.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface border border-outline-variant p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500"></div>
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-on-surface">Code Ready</span>
              </div>
              <p className="font-body text-sm text-on-surface-variant italic">Fully implemented, peer-reviewed, and optimized.</p>
            </div>
            {/* ... other status cards ... */}
            <div className="bg-surface border border-outline-variant p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500"></div>
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-on-surface">Simulation</span>
              </div>
              <p className="font-body text-sm text-on-surface-variant italic">The algorithm is currently undergoing rigorous stress testing.</p>
            </div>
            <div className="bg-surface border border-outline-variant p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#002FA7]"></div>
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-on-surface">Researching</span>
              </div>
              <p className="font-body text-sm text-on-surface-variant italic">Currently under theoretical review.</p>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest border border-outline-variant p-8 shadow-custom">
          <div className="flex items-center gap-3 mb-6 border-b border-surface-container pb-4">
            <span className="material-symbols-outlined text-[#002FA7] text-2xl">science</span>
            <h2 className="section-title uppercase">Measurement Methodology</h2>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="font-mono text-[#002FA7] font-bold mt-1">01</span>
              <div>
                <h4 className="font-sans font-bold text-on-surface uppercase tracking-tight">Asymptotic Analysis (Big-O)</h4>
                <p className="font-body text-sm text-on-surface-variant">All algorithms are evaluated at absolute worst-case boundaries.</p>
              </div>
            </li>
            {/* ... other methodology items ... */}
          </ul>
        </section>

        {/* ... Contribution Guidelines ... */}
        <section className="bg-surface-container-lowest border border-outline-variant p-8 shadow-custom">
          <div className="flex items-center gap-3 mb-6 border-b border-surface-container pb-4">
            <span className="material-symbols-outlined text-[#002FA7] text-2xl">add_box</span>
            <h2 className="font-sans font-bold text-2xl uppercase tracking-tight text-black">Contribution Guidelines</h2>
          </div>
          <div className="bg-surface-container-high p-6 border-l-2 border-[#002FA7]">
            <ol className="list-decimal list-inside font-body text-slate-700 space-y-3">
              <li>Initialize a feature branch from main.</li>
              <li>Provide implementation code and complexity brief.</li>
              <li>Include at least 3 unit tests.</li>
            </ol>
          </div>
        </section>
      </div>
    </FullWidthLayout>
  );
}
