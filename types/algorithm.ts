/**
 * Strict Algorithm DNA Schema (V3)
 * Focused on English-only precision, LaTeX support, and structural clarity.
 */

export type ComplexityRank = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ComplexityValue {
  best: string;
  average: string;
  worst: string;
  worst_weight?: number;
}

export interface Algorithm {
  id: string;
  
  metadata: {
    title: string;
    subtitle: string;
    category: string;
    tags: string[];
    stability?: "stable" | "unstable";
  };

  complexity: {
    time: ComplexityValue;
    space: {
      average: string;
      notes: string;
    };
    recurrence_relation?: string;
  };

  visualizer_config: {
    type: "bars" | "graph" | "matrix" | "tree" | "geometry" | "linkedlist" | "array";
    default_data_size: number;
    default_data_pattern: "random" | "sorted" | "reverse_sorted" | "nearly_sorted" | "empty";
    complexity_level: "beginner" | "intermediate" | "advanced";
  };

  implementations: {
    language: string;
    snippet: string;
    explanation: string;
  }[];

  documentation: {
    description: string;
    how_it_works: string[];
    applications: string[];
    pitfalls?: string[];
    comparisons?: {
      alternative_to: string;
      reason: string;
    }[];
  };

  benchmarks?: {
    input_size: number;
    execution_time_ms: number;
    environment_specs: string;
  }[];

  citations?: {
    source_name: string;
    authors: string;
    chapter_or_page: string;
  }[];
}

/**
 * Unified interface for a single logical frame of simulation.
 */
export interface LogicStep {
  description_en: string;
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
