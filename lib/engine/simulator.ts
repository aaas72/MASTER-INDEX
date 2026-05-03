import { LogicStep } from "@/types/algorithm";
import { simulateBubbleSort, simulateQuickSort, simulateMergeSort } from "./simulators/sorting";
import { simulateBinarySearch, simulateLinearSearch, simulateJumpSearch } from "./simulators/searching";
import { simulateBFS, simulateDFS, simulateDijkstra } from "./simulators/graph";
import { simulateFibonacciDP, simulateKnapsack, simulateLCS } from "./simulators/dp";
import { simulateBSTInsertion, simulateInorderTraversal, simulateMaxHeapify, simulateLinkedList } from "./simulators/structures";

/**
 * MASTER SIMULATION ENGINE
 * 
 * Central dispatcher that generates full procedural LogicStep[] traces
 * for every algorithm in the platform.
 * 
 * RULES:
 * 1. Every algorithm MUST return LogicStep[] (never null)
 * 2. Each step MUST contain description_en and at least one state field
 * 3. The engine is DATA-DRIVEN: initialData can override defaults
 * 4. All pages (Detail, Versus, Playground) use this single function
 */

// Default data generators per algorithm type
function getDefaultData(algorithmId: string): number[] {
  switch (algorithmId) {
    case "bubble-sort": return [8, 3, 5, 1, 9, 2, 7, 4, 6];
    case "quick-sort": return [7, 2, 9, 4, 1, 8, 3, 6, 5];
    case "merge-sort": return [12, 4, 8, 3, 10, 2, 7, 5, 9, 6];
    case "binary-search": return [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    case "linear-search": return [45, 12, 89, 34, 67, 23, 91, 56, 78, 10];
    case "jump-search": return [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47];
    default: return [5, 3, 8, 1, 9, 2, 7, 4, 6];
  }
}

// Map of algorithm IDs to their simulator functions
const SIMULATORS: Record<string, (data: number[]) => LogicStep[]> = {
  "bubble-sort": simulateBubbleSort,
  "quick-sort": simulateQuickSort,
  "merge-sort": simulateMergeSort,
  "binary-search": simulateBinarySearch,
  "linear-search": simulateLinearSearch,
  "jump-search": simulateJumpSearch,
};

// Algorithms that don't need array data (they generate their own structures)
const STRUCTURAL_SIMULATORS: Record<string, () => LogicStep[]> = {
  "bfs": simulateBFS,
  "dfs": simulateDFS,
  "dijkstra": simulateDijkstra,
  "fibonacci-dp": simulateFibonacciDP,
  "knapsack-01": simulateKnapsack,
  "lcs": simulateLCS,
  "bst-insertion": simulateBSTInsertion,
  "tree-inorder": simulateInorderTraversal,
  "max-heapify": simulateMaxHeapify,
  "singly-linked-list": simulateLinkedList,
};

/**
 * Generate a full simulation trace for any algorithm.
 * 
 * @param algorithmId - The algorithm key from algorithms.json
 * @param initialData - Optional array to override default data (for Sorting/Searching)
 * @returns LogicStep[] - Full trace with 10-30+ steps
 */
export function generateSimulation(algorithmId: string, initialData?: number[]): LogicStep[] {
  // 1. Check structural simulators (no array data needed)
  if (STRUCTURAL_SIMULATORS[algorithmId]) {
    return STRUCTURAL_SIMULATORS[algorithmId]();
  }

  // 2. Check array-based simulators
  if (SIMULATORS[algorithmId]) {
    const data = initialData && initialData.length > 0 ? initialData : getDefaultData(algorithmId);
    return SIMULATORS[algorithmId](data);
  }

  // 3. Fallback: return a minimal single-step trace
  return [{ description_en: `Simulation for "${algorithmId}" is not yet implemented.`, active_line: -1 }];
}
