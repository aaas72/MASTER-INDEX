interface VersusHeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function VersusHeader({
  activeCategory,
  onCategoryChange,
}: VersusHeaderProps) {
  const categories = [
    { id: "Sorting", label: "Sorting", icon: "sort_by_alpha" },
    { id: "Search", label: "Search", icon: "search" },
    { id: "Graph Theory", label: "Graphs", icon: "hub" },
    { id: "Trees", label: "Trees", icon: "account_tree" },
    { id: "Geometry", label: "Geometry", icon: "architecture" },
  ];

  return (
    <header className="sticky top-0 flex h-20 w-full shrink-0 items-center justify-between gap-4 border-b border-outline-variant/20 bg-white px-8 z-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 border-r border-outline-variant/30 pr-6">
          <span className="material-symbols-outlined text-outline-variant text-lg">
            category
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            Target_Domain:
          </span>
        </div>
        <nav className="hidden gap-2 font-mono text-[11px] font-bold uppercase tracking-widest xl:flex">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 transition-all rounded-none border ${
                activeCategory === cat.id 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105 z-10" 
                  : "bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container-high"
              }`}
            >
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: activeCategory === cat.id ? "'FILL' 1" : "" }}
              >
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
