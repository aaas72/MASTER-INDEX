import { BrutalistButton } from "@/components/shared";
import React, { useState } from "react";

interface ArchiveSidebarProps {
  complexityOptions: string[];
  taxonomyOptions: string[];
  tagOptions: string[];
  selectedComplexities: string[];
  selectedTaxonomies: string[];
  selectedTags: string[];
  onToggleComplexity: (val: string) => void;
  onToggleTaxonomy: (val: string) => void;
  onToggleTag: (val: string) => void;
  onApply: () => void;
  isFiltered?: boolean;
}

export default function ArchiveSidebar({
  complexityOptions,
  taxonomyOptions,
  tagOptions,
  selectedComplexities,
  selectedTaxonomies,
  selectedTags,
  onToggleComplexity,
  onToggleTaxonomy,
  onToggleTag,
  onApply,
  isFiltered
}: ArchiveSidebarProps) {
  const [showAllComplexity, setShowAllComplexity] = useState(false);
  const [showAllTaxonomy, setShowAllTaxonomy] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  return (
    <aside className="hidden w-64 shrink-0 lg:flex flex-col">
      <div className="sticky top-10 space-y-8 max-h-[calc(100vh-80px)] overflow-y-auto no-scrollbar pr-2">
        {/* Header Section */}
        <div className="px-1">
          <h2 className="font-headline text-sm font-bold tracking-widest uppercase text-primary">System Filters</h2>
          <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">ARCHIVE_V4.02</p>
        </div>

        <nav className="space-y-8">
          {/* Complexity Section */}
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] font-black uppercase text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">data_exploration</span>
              COMPLEXITY_RANK
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {(showAllComplexity ? complexityOptions : complexityOptions.slice(0, 5)).map((comp) => (
                <label key={comp} className="flex cursor-pointer items-center gap-3 group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer h-4 w-4 appearance-none border-2 border-primary/20 checked:border-primary checked:bg-primary transition-all cursor-pointer" 
                      checked={selectedComplexities.includes(comp)}
                      onChange={() => onToggleComplexity(comp)}
                    />
                    <span className="material-symbols-outlined absolute text-white text-[12px] opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-primary transition-colors">{comp}</span>
                </label>
              ))}
              {complexityOptions.length > 5 && (
                <button 
                  onClick={() => setShowAllComplexity(!showAllComplexity)}
                  className="text-left font-mono text-[9px] font-black text-primary/40 hover:text-primary uppercase tracking-widest mt-1 transition-colors"
                >
                  {showAllComplexity ? "— SHOW_LESS" : `+ ${complexityOptions.length - 5} MORE...`}
                </button>
              )}
            </div>
          </div>

          {/* Taxonomy Section */}
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] font-black uppercase text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">category</span>
              TAXONOMY_GROUPS
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {(showAllTaxonomy ? taxonomyOptions : taxonomyOptions.slice(0, 5)).map((cat) => (
                <label key={cat} className="flex cursor-pointer items-center gap-3 group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer h-4 w-4 appearance-none border-2 border-primary/20 checked:border-primary checked:bg-primary transition-all cursor-pointer" 
                      checked={selectedTaxonomies.includes(cat)}
                      onChange={() => onToggleTaxonomy(cat)}
                    />
                    <span className="material-symbols-outlined absolute text-white text-[12px] opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                  </div>
                  <span className="font-sans text-[11px] font-bold text-slate-500 group-hover:text-primary transition-colors">{cat}</span>
                </label>
              ))}
              {taxonomyOptions.length > 5 && (
                <button 
                  onClick={() => setShowAllTaxonomy(!showAllTaxonomy)}
                  className="text-left font-mono text-[9px] font-black text-primary/40 hover:text-primary uppercase tracking-widest mt-1 transition-colors"
                >
                  {showAllTaxonomy ? "— SHOW_LESS" : `+ ${taxonomyOptions.length - 5} MORE...`}
                </button>
              )}
            </div>
          </div>

          {/* System Tags */}
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] font-black uppercase text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">tag</span>
              SYSTEM_TAGS
            </h3>
            <div className="flex flex-wrap gap-2">
              {(showAllTags ? tagOptions : tagOptions.slice(0, 10)).map(tag => (
                <button 
                  key={tag} 
                  onClick={() => onToggleTag(tag)}
                  className={`px-2 py-1 border font-mono text-[9px] font-bold transition-all ${selectedTags.includes(tag) ? 'bg-primary text-white border-primary shadow-[2px_2px_0px_#DCE6FF]' : 'bg-surface-container-low border-outline-variant/10 text-primary hover:border-primary/40'}`}
                >
                  #{tag.toUpperCase()}
                </button>
              ))}
            </div>
            {tagOptions.length > 10 && (
              <button 
                onClick={() => setShowAllTags(!showAllTags)}
                className="text-left font-mono text-[9px] font-black text-primary/40 hover:text-primary uppercase tracking-widest mt-1 transition-colors"
              >
                {showAllTags ? "— SHOW_LESS" : `+ ${tagOptions.length - 10} MORE...`}
              </button>
            )}
          </div>
        </nav>

        <div className="pt-4 border-t border-outline-variant/10">
          <BrutalistButton 
            variant="primary" 
            icon={isFiltered ? "backspace" : "terminal"} 
            className="w-full"
            onClick={onApply}
            disabled={!isFiltered}
          >
            {isFiltered ? "CLEAR_FILTERS" : "SYSTEM_READY"}
          </BrutalistButton>
          <p className="mt-4 text-center font-mono text-[8px] text-slate-300 uppercase tracking-widest leading-relaxed">
            Results cross-referenced<br />against system cores
          </p>
        </div>
      </div>
    </aside>
  );
}
