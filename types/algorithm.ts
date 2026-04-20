export interface AlgorithmData {
  // 1. الهوية (Identity)
  id: string; // "quick-sort"
  title: { ar: string; en: string };
  category: "Sorting" | "Graph" | "Searching" | "DP";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  
  // 2. التحليل الرياضي (Mathematical Analysis)
  complexity: {
    time: { best: string; average: string; worst: string }; // $O(n \log n)$
    space: string; // $O(\log n)$
    stable: boolean;
    in_place: boolean;
    recursive: boolean;
  };

  // 3. المحتوى البحثي (Research Content)
  content: {
    abstract: { ar: string; en: string };
    logic_steps: {
    description_en: string;
    description_ar: string;
    array_state: number[];
    pivot_index: number | null;
    partition_range: [number, number] | null;
  }[]; // خطوات العمل لتمثيلها في الـ Visualization
    proof_latex: string; // معادلات البرهان الرياضي
  };

  // 4. التنفيذ البرمجي (Implementation)
  code: {
    language: "cpp" | "python" | "javascript";
    snippet: string;
    github_url?: string;
  }[];

  // 5. البيانات التشغيلية (Benchmarking)
  benchmarks: {
    input_size: number; // 10^6
    execution_time_ms: number;
    environment_specs: string; // "Intel i7, 16GB RAM"
  }[];
}
