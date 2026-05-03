import { useMemo } from "react";
import algorithmsData from "@/data/algorithms.json";
import { UnifiedFilterBar } from "@/components/shared";
import { getCategoryIcon } from "@/lib/algorithm-utils";

interface VersusHeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function VersusHeader({
  activeCategory,
  onCategoryChange,
}: VersusHeaderProps) {
  const dynamicCategories = useMemo(() => {
    const cats = Array.from(
      new Set(Object.values(algorithmsData).map((algo: any) => algo.metadata.category))
    ).sort();

    return cats.map(cat => ({
      id: cat,
      label: cat,
      icon: getCategoryIcon(cat)
    }));
  }, []);

  return (
    <div className="sticky top-0 z-20 -mx-1">
      <UnifiedFilterBar 
        options={dynamicCategories}
        activeId={activeCategory}
        onChange={onCategoryChange}
        className="!border-none !shadow-none py-3 px-8"
      />
      <div className="h-px bg-outline-variant/10 w-full" />
    </div>
  );
}
