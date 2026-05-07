/**
 * Central Utility Functions for Simulation Engine
 */

/**
 * Deep clones any simulation state (arrays, nodes, edges, matrices).
 * Currently implemented via JSON serialization. 
 * By centralizing this, we can easily swap to Immer.js or structuredClone
 * in the future to improve performance without modifying all simulators.
 */
export function cloneState<T>(state: T): T {
  // Use structuredClone if available, otherwise fallback to JSON
  if (typeof structuredClone === "function") {
    return structuredClone(state);
  }
  return JSON.parse(JSON.stringify(state));
}
