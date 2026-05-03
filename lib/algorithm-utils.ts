/**
 * algorithm-utils: Centralized mapping for algorithm category icons 
 * to ensure visual consistency across the entire platform.
 */

export const categoryIconMap: Record<string, string> = {
  "Sorting": "sort",
  "Searching": "search",
  "Pathfinding & Networks": "hub",
  "Dynamic Programming": "dynamic_form",
  "Trees & Hierarchies": "account_tree",
  "Mathematical": "functions",
  "Strings & Sequences": "segment",
  "General": "category"
};

/**
 * Returns the standardized icon for a given category name.
 */
export const getCategoryIcon = (category: string): string => {
  return categoryIconMap[category] || categoryIconMap["General"];
};
