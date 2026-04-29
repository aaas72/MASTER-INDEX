export interface AlgorithmData {
  // 1. Identity
  id: string; // "quick-sort"
  title: { en: string };
  category: "Sorting" | "Graph" | "Searching" | "DP";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  
  // 2. Mathematical Analysis
  complexity: {
    time: { best: string; average: string; worst: string }; // $O(n \log n)$
    space: string; // $O(\log n)$
    stable: boolean;
    in_place: boolean;
    recursive: boolean;
  };

  // 3. Research Content
  content: {
    abstract: { en: string };
    logic_steps: {
      description_en: string;
      array_state: number[];
      pivot_index?: number | null;
      partition_range?: [number, number] | null;
      active_line?: number;
    }[]; // Execution steps for Visualization
    proof_latex: string; // Mathematical proof equations
  };

  // 4. Implementation
  code: {
    language: "cpp" | "python" | "javascript";
    snippet: string;
    github_url?: string;
  }[];

  // 5. Benchmarking
  benchmarks: {
    input_size: number; // 10^6
    execution_time_ms: number;
    environment_specs: string; // "Intel i7, 16GB RAM"
  }[];
}
