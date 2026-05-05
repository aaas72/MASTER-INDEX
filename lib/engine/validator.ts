import { LogicStep } from "@/types/algorithm";

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  expected?: any;
  received?: any;
}

/**
 * Validator Registry
 */
const VALIDATORS: Record<string, (steps: LogicStep[], inputData: any) => ValidationResult> = {
  // SORTING VALIDATORS
  "bubble-sort": validateSorting,
  "quick-sort": validateSorting,
  "merge-sort": validateSorting,
  "insertion-sort": validateSorting,
  "selection-sort": validateSorting,

  // SEARCHING VALIDATORS
  "binary-search": validateSearching,
  "linear-search": validateSearching,
  "jump-search": validateSearching,

  // GRAPH VALIDATORS
  "bfs": validateGraphTraversal,
  "dfs": validateGraphTraversal,
};

/**
 * Central function to validate a simulation trace
 */
export function validateTrace(
  algorithmId: string,
  steps: LogicStep[],
  inputData: any
): ValidationResult {
  if (steps.length === 0) {
    return { isValid: false, error: "Simulation returned zero steps." };
  }

  const validator = VALIDATORS[algorithmId];
  if (!validator) {
    return performGenericSanityCheck(steps);
  }

  try {
    return validator(steps, inputData);
  } catch (err) {
    return {
      isValid: false,
      error: `Validator crashed: ${err instanceof Error ? err.message : String(err)}`
    };
  }
}

/**
 * Generic checks for any simulation
 */
function performGenericSanityCheck(steps: LogicStep[]): ValidationResult {
  const lastStep = steps[steps.length - 1];
  if (!lastStep.description_en) {
    return { isValid: false, error: "Steps are missing mandatory English description." };
  }
  return { isValid: true };
}

/**
 * Validation for sorting algorithms
 */
function validateSorting(steps: LogicStep[], inputData: number[]): ValidationResult {
  const finalState = steps[steps.length - 1].array_state;
  if (!finalState) return { isValid: false, error: "Final step missing array_state." };

  const expected = [...inputData].sort((a, b) => a - b);
  const isSorted = JSON.stringify(finalState) === JSON.stringify(expected);

  if (!isSorted) {
    return {
      isValid: false,
      error: "Array is not correctly sorted in the final step.",
      expected,
      received: finalState
    };
  }

  const inputSum = inputData.reduce((a, b) => a + b, 0);
  const outputSum = finalState.reduce((a, b) => a + b, 0);
  if (inputSum !== outputSum) {
    return { 
      isValid: false, 
      error: "Data corruption: Sum of elements changed." 
    };
  }

  return { isValid: true };
}

/**
 * Validation for searching algorithms
 */
function validateSearching(steps: LogicStep[], inputData: number[]): ValidationResult {
  const foundStep = steps.find(s => s.description_en.toLowerCase().includes("found"));
  const notFoundStep = steps.find(s => s.description_en.toLowerCase().includes("not found"));

  if (!foundStep && !notFoundStep) {
    return { 
      isValid: false, 
      error: "Search simulation did not reach a 'found' or 'not found' state." 
    };
  }

  return { isValid: true };
}

/**
 * Validation for graph algorithms
 */
function validateGraphTraversal(steps: LogicStep[]): ValidationResult {
  const firstStep = steps[0];
  const lastStep = steps[steps.length - 1];

  if (!firstStep.nodes_state || !lastStep.nodes_state) {
    return { 
      isValid: false, 
      error: "Graph simulation missing nodes_state." 
    };
  }

  // Ensure node count is consistent
  if (firstStep.nodes_state.length !== lastStep.nodes_state.length) {
    return { 
      isValid: false, 
      error: "Node count changed during simulation." 
    };
  }

  return { isValid: true };
}

