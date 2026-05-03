/**
 * Strict Algorithm Schema Definition (V2)
 * Designed for programmatic sorting, multi-language support, and edge-case simulation.
 */

export type LocalizedString = {
  en: string;
  ar?: string;
};

/** 
 * Complexity Ranking for programmatic comparison
 * 1: O(1)
 * 2: O(log n)
 * 3: O(n)
 * 4: O(n log n)
 * 5: O(n^2)
 * 6: O(2^n)
 * 7: O(n!)
 */
export type ComplexityRank = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ComplexityValue {
  label: string; // e.g., "O(n log n)"
  rank: ComplexityRank; // e.g., 4
}

export interface Algorithm {
  id?: string;
  
  metadata: {
    title: LocalizedString;
    subtitle: LocalizedString;
    category: "Sorting" | "Searching" | "Pathfinding & Networks" | "Trees & Hierarchies" | "Dynamic Programming" | "Geometry" | "Strings";
    tags: string[];
  };

  complexity: {
    time: {
      best: ComplexityValue;
      average: ComplexityValue;
      worst: ComplexityValue;
    };
    space: ComplexityValue;
  };

  visualizer_config: {
    type: "bars" | "graph" | "matrix" | "tree" | "geometry" | "linkedlist" | "array";
    initial_pattern: "random" | "sorted" | "reverse_sorted" | "nearly_sorted" | "empty";
    engine_params: {
      default_speed: number;
      default_size: number;
    };
  };

  implementations: {
    language: "javascript" | "python" | "cpp" | "go";
    snippet: string;
    explanation: LocalizedString;
  }[];

  documentation: {
    description: LocalizedString;
    how_it_works: LocalizedString[];
    applications: LocalizedString[];
  };

  simulation_trace?: {
    step: number;
    description: LocalizedString;
    active_line?: number;
    state_snapshot: {
      array?: number[];
      nodes?: any[];
      edges?: any[];
      pointers?: Record<string, number>; // e.g., { pivot: 5, left: 2, right: 8 }
      highlights?: number[];
    };
  }[];

  benchmarks?: {
    input_size: number;
    execution_time_ms: number;
    environment_specs: string;
  }[];
}

/**
 * Unified interface for a single logical frame of simulation.
 * Shared between the Engine, Detail pages, Versus hub, and Playground.
 * 
 * RULES:
 * - Every LogicStep MUST have description_en and active_line
 * - array_state is used by bars/array visualizers (Sorting, Searching)
 * - nodes_state/edges_state are used by graph/tree visualizers (BFS, DFS, Dijkstra)
 * - matrix_state is used by DP visualizers (Knapsack, LCS)
 * - highlight_indices marks which array indices are "active" in this step
 * - pivot_index/partition_range are sorting-specific pointers
 */
export interface LogicStep {
  description_en: string;
  description_ar?: string;
  array_state?: number[];
  nodes_state?: any[];
  edges_state?: any[];
  matrix_state?: (number | null)[][];
  linked_list_state?: { value: number | string; state?: string }[];
  pivot_index?: number | null;
  partition_range?: [number, number] | null;
  highlight_indices?: number[];
  active_line?: number;
  pointers?: Record<string, number>;
}
