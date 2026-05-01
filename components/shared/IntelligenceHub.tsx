"use client";

import { motion, AnimatePresence } from "framer-motion";
import { hub as t } from "@/locales/en/hub";

interface IntelligenceHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntelligenceHub({ isOpen, onClose }: IntelligenceHubProps) {
  // ... (logic remains same)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
          {/* Backdrop - Pure Blur, No Tint */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 backdrop-blur-md bg-white/5"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative h-full w-[80%] bg-white border-l border-slate-200 shadow-2xl overflow-y-auto"
          >
            {/* Top Indicator */}
            <div className="h-1 bg-[#002FA7]" />
            
            <div className="p-12 md:p-16 min-h-full flex flex-col bg-white">
              {/* Header Section */}
              <div className="flex justify-between items-start mb-20">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#002FA7] flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl">hub</span>
                    </div>
                    <div>
                      <h2 className="text-5xl font-black text-black uppercase tracking-tighter leading-none">
                        {t.title} <span className="text-[#002FA7]">{t.title_accent}</span>
                      </h2>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.4em] mt-1">{t.subtitle}</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center border border-slate-100 rounded-none hover:bg-slate-50 transition-all group"
                >
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-black transition-colors">close</span>
                </button>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 flex-1">
                
                {/* Left Column: Manifesto & Stats (Span 7) */}
                <div className="lg:col-span-7 space-y-16">
                  <section>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[10px] font-mono font-bold text-[#002FA7] bg-[#002FA7]/5 px-3 py-1 uppercase tracking-widest">{t.manifesto.label}</span>
                      <div className="h-px bg-slate-100 flex-1"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-black uppercase tracking-tight mb-6">{t.manifesto.title}</h3>
                    <p className="text-base text-slate-600 leading-relaxed font-body italic border-l-4 border-[#002FA7] pl-8 max-w-xl">
                      {t.manifesto.content}
                    </p>
                  </section>

                  <section className="grid grid-cols-2 gap-8">
                    <div className="p-6 border border-slate-100 bg-slate-50/50">
                      <span className="material-symbols-outlined text-[#002FA7] mb-4">analytics</span>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-1">{t.stats.total_sims}</h4>
                      <div className="text-2xl font-mono font-black text-black tracking-tighter">{t.stats.sims_unit}</div>
                      <p className="text-[10px] text-slate-400 uppercase mt-2">{t.stats.sims_status}</p>
                    </div>
                    <div className="p-6 border border-slate-100 bg-slate-50/50">
                      <span className="material-symbols-outlined text-[#002FA7] mb-4">memory</span>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-1">{t.stats.latency_label}</h4>
                      <div className="text-2xl font-mono font-black text-black tracking-tighter">{t.stats.latency_value}</div>
                      <p className="text-[10px] text-slate-400 uppercase mt-2">{t.stats.latency_status}</p>
                    </div>
                  </section>
                </div>

                {/* Right Column: Personnel & Nodes (Span 5) */}
                <div className="lg:col-span-5 space-y-16">
                  <section>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[10px] font-mono font-bold text-[#002FA7] bg-[#002FA7]/5 px-3 py-1 uppercase tracking-widest">{t.architect.label}</span>
                      <div className="h-px bg-slate-100 flex-1"></div>
                    </div>
                    <div className="flex items-center gap-6 p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rotate-45 translate-x-8 -translate-y-8"></div>
                      <div className="w-20 h-20 bg-slate-100 rounded-none flex items-center justify-center shrink-0 border border-slate-200">
                        <span className="material-symbols-outlined text-4xl text-slate-300">engineering</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase tracking-tight text-black leading-none mb-1">{t.architect.name}</h4>
                        <p className="text-[11px] text-[#002FA7] font-mono uppercase tracking-widest mb-4">{t.architect.role}</p>
                        <div className="flex gap-4">
                          <a href="#" className="material-symbols-outlined text-slate-300 hover:text-[#002FA7] transition-colors text-xl">database</a>
                          <a href="#" className="material-symbols-outlined text-slate-300 hover:text-[#002FA7] transition-colors text-xl">share</a>
                          <a href="#" className="material-symbols-outlined text-slate-300 hover:text-[#002FA7] transition-colors text-xl">alternate_email</a>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[10px] font-mono font-bold text-[#002FA7] bg-[#002FA7]/5 px-3 py-1 uppercase tracking-widest">{t.nodes.label}</span>
                      <div className="h-px bg-slate-100 flex-1"></div>
                    </div>
                    <div className="space-y-4">
                      <a href="#" className="flex items-center gap-6 p-5 border border-slate-100 hover:bg-slate-50 transition-all group">
                        <div className="w-12 h-12 bg-white flex items-center justify-center text-[#002FA7] border border-slate-100 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined">terminal</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="text-xs font-bold uppercase tracking-widest text-black">{t.nodes.docs_title}</h5>
                          <p className="text-[10px] text-slate-400 uppercase mt-1">{t.nodes.docs_subtitle}</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-[#002FA7]">arrow_right_alt</span>
                      </a>
                      <a href="#" className="flex items-center gap-6 p-5 border border-slate-100 hover:bg-slate-50 transition-all group">
                        <div className="w-12 h-12 bg-white flex items-center justify-center text-[#002FA7] border border-slate-100 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined">help_center</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="text-xs font-bold uppercase tracking-widest text-black">{t.nodes.support_title}</h5>
                          <p className="text-[10px] text-slate-400 uppercase mt-1">{t.nodes.support_subtitle}</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-[#002FA7]">arrow_right_alt</span>
                      </a>
                    </div>
                  </section>
                </div>
              </div>

              {/* Technical Footer Area */}
              <div className="mt-20 pt-10 border-t border-slate-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-2">{t.technical.signature}</span>
                    <span className="text-[11px] font-mono text-black font-bold">MI-4.0.2-STABLE</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-2">{t.technical.regional}</span>
                    <span className="text-[11px] font-mono text-black font-bold">NODE_01_GLOBAL</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-2">{t.technical.uptime}</span>
                    <span className="text-[11px] font-mono text-black font-bold">{t.technical.uptime_value}</span>
                  </div>
                  <div className="flex justify-end items-end">
                    <span className="text-[9px] font-mono text-[#002FA7] uppercase tracking-[0.4em] font-black animate-pulse">{t.technical.status_ready}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
