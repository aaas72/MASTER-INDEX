import { Algorithm } from "@/types/algorithm";

export function getInitialState(algoData: Algorithm) {
  const { type, initial_pattern, engine_params } = algoData.visualizer_config;
  const size = engine_params.default_size || 10;

  switch (type) {
    case "bars":
      return generateArray(size, initial_pattern);
    case "graph":
      return generateGraph(size, initial_pattern);
    case "tree":
      return generateTree(size, initial_pattern);
    case "geometry":
      return generatePoints(size, initial_pattern);
    case "matrix":
      return generateMatrix(size, initial_pattern);
    default:
      return {};
  }
}

function generateArray(size: number, pattern: string) {
  const arr = Array.from({ length: size }, (_, i) => i + 1);
  if (pattern === "random") {
    return arr.sort(() => Math.random() - 0.5);
  } else if (pattern === "reverse_sorted") {
    return arr.reverse();
  } else if (pattern === "nearly_sorted") {
    // Swap 1-2 pairs
    if (arr.length > 4) {
      [arr[1], arr[2]] = [arr[2], arr[1]];
    }
    return arr;
  }
  return arr;
}

function generateGraph(size: number, pattern: string) {
  const nodes = Array.from({ length: size }, (_, i) => ({
    id: String(i + 1),
    label: String.fromCharCode(65 + i),
    x: 100 + Math.random() * 400,
    y: 50 + Math.random() * 200,
    state: "default" as const
  }));

  const edges = [];
  for (let i = 0; i < size - 1; i++) {
    edges.push({
      from: nodes[i].id,
      to: nodes[i + 1].id,
      directed: true,
      state: "default" as const
    });
  }

  return { nodes, edges };
}

function generateTree(size: number, pattern: string) {
  // Simple binary tree for size
  const nodes: any[] = [];
  const build = (id: number, depth: number): any => {
    if (id > size) return null;
    return {
      id: String(id),
      value: id,
      state: "default",
      children: [
        build(id * 2, depth + 1),
        build(id * 2 + 1, depth + 1)
      ].filter(Boolean)
    };
  };
  return { root: build(1, 0) };
}

function generatePoints(size: number, pattern: string) {
  const points = Array.from({ length: size }, (_, i) => ({
    id: String(i),
    x: 100 + Math.random() * 400,
    y: 50 + Math.random() * 200,
    label: `P${i}`
  }));
  return { points, edges: [] };
}

function generateMatrix(size: number, pattern: string) {
  const rows = Math.min(size, 8);
  const cols = Math.min(size, 8);
  const matrix = Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => 0)
  );
  return { matrix };
}
