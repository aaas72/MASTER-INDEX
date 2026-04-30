"use client";

import { FullWidthLayout } from "@/components/shared";
import React from "react";
import { motion } from "framer-motion";

export default function DocumentationPage() {
  const sections = [
    { id: "symbology", title: "Ledger Symbology", icon: "traffic" },
    { id: "methodology", title: "Measurement Standards", icon: "science" },
    { id: "contribution", title: "Protocol Contribution", icon: "add_box" },
    { id: "complexity", title: "Complexity Notation", icon: "data_object" }
  ];

  return (
    <div className="bg-[#F7FAFE] min-h-screen">
      <FullWidthLayout>
        <div className="flex flex-col lg:flex-row gap-16 pt-0 pb-24">
          {/* Left: Sticky Navigation Sidebar */}
          <aside className="lg:w-44 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#002FA7]/40 font-bold block mb-4">Navigation_Index</span>
                <nav className="flex flex-col border-l border-slate-200">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-center gap-3 py-3 pl-4 -ml-px border-l border-transparent hover:border-[#002FA7] transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-[#002FA7] transition-colors">{section.icon}</span>
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-500 group-hover:text-black transition-colors">{section.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Right: Main Content */}
          <main className="flex-1 min-w-0">
            {/* Header */}
            <header className="mb-24">
              <h1 className="text-5xl lg:text-7xl font-sans font-black text-black uppercase tracking-tighter mb-8 leading-[0.9]">
                System <br />
                <span className="text-[#002FA7]">Documentation</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-body italic border-l-2 border-slate-100 pl-8">
                The operational framework and methodological constraints governing the Global Algorithm Repository. This manual dictates the rules of engagement, benchmarking standards, and archival protocols.
              </p>
            </header>

            <div className="space-y-32">
              {/* Section: Symbology */}
              <section id="symbology" className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-white border border-[#C4C5D6] flex items-center justify-center text-[#002FA7] shadow-sm">
                    <span className="material-symbols-outlined text-2xl">traffic</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-black">Ledger Symbology</h2>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mt-1">Status_Definition_System</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                  {[
                    { label: "Code Ready", color: "bg-green-500", desc: "Fully implemented, peer-reviewed, and optimized for production workloads." },
                    { label: "Simulation", color: "bg-purple-500", desc: "Algorithm is currently undergoing rigorous stress testing within the playground environment." },
                    { label: "Researching", color: "bg-[#002FA7]", desc: "Currently under theoretical review. Mathematical proofs are being verified by core contributors." }
                  ].map((status, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-8 hover:border-[#002FA7] transition-all group relative overflow-hidden">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-5 h-5 ${status.color} shrink-0`}></div>
                        <span className="font-mono text-xs uppercase tracking-[0.2em] font-black text-black">{status.label}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-body italic group-hover:text-slate-800 transition-colors">{status.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: Methodology */}
              <section id="methodology" className="scroll-mt-24">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-white border border-[#C4C5D6] flex items-center justify-center text-[#002FA7] shadow-sm">
                    <span className="material-symbols-outlined text-2xl">science</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-black">Measurement Standards</h2>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mt-1">Experimental_Boundary_Protocols</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { id: "01", title: "Asymptotic Analysis (Big-O)", desc: "All algorithms are evaluated at absolute worst-case boundaries to ensure system stability under load." },
                    { id: "02", title: "Space-Time Tradeoff", desc: "Comparative metrics emphasize cache-locality and memory-efficient implementations over raw speed where applicable." },
                    { id: "03", title: "Deterministic Validation", desc: "Every step in the computational visualization must be reproducible with the provided dataset archive." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 group">
                      <span className="font-mono text-xl font-black text-[#002FA7]/20 group-hover:text-[#002FA7] transition-colors">{item.id}</span>
                      <div className="pt-1">
                        <h4 className="font-sans font-bold text-on-surface uppercase tracking-tight mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-500 max-w-xl font-body leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section: Contribution */}
              <section id="contribution" className="scroll-mt-24 relative">
                <div className="absolute -inset-8 bg-[#0A1022] -z-10 blueprint-grid opacity-[0.03] pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-white border border-[#C4C5D6] flex items-center justify-center text-[#002FA7] shadow-sm">
                    <span className="material-symbols-outlined text-2xl">add_box</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-black">Protocol Contribution</h2>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mt-1">Internal_Git_Workflow</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div className="p-10">
                      <span className="text-[10px] font-mono text-[#002FA7] font-bold block mb-6">STEP_01</span>
                      <h5 className="font-bold uppercase text-xs mb-3 tracking-widest">Branch_Init</h5>
                      <p className="text-xs text-slate-500 leading-relaxed">Initialize a new feature branch using the repository's strict naming convention.</p>
                    </div>
                    <div className="p-10">
                      <span className="text-[10px] font-mono text-[#002FA7] font-bold block mb-6">STEP_02</span>
                      <h5 className="font-bold uppercase text-xs mb-3 tracking-widest">Logic_Implementation</h5>
                      <p className="text-xs text-slate-500 leading-relaxed">Provide the core algorithmic logic and its mathematical proof in LaTeX format.</p>
                    </div>
                    <div className="p-10 bg-slate-50">
                      <span className="text-[10px] font-mono text-[#002FA7] font-bold block mb-6">STEP_03</span>
                      <h5 className="font-bold uppercase text-xs mb-3 tracking-widest">Verification</h5>
                      <p className="text-xs text-slate-500 leading-relaxed">Include at least three stress tests and unit validation scenarios.</p>
                    </div>
                  </div>
                  <div className="bg-[#002FA7] p-4 text-center">
                    <button className="text-[10px] font-mono uppercase font-bold text-white tracking-[0.4em] hover:tracking-[0.5em] transition-all">Submit_Pull_Request_Archive →</button>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </FullWidthLayout>

      <style jsx global>{`
        .blueprint-grid {
          background-image: radial-gradient(circle, #002FA7 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>
    </div>
  );
}
