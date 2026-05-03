import { LogicStep } from "@/types/algorithm";

export function simulateFibonacciDP(): LogicStep[] {
  const n = 6;
  const steps: LogicStep[] = [];
  const memo: (number | null)[] = new Array(n + 1).fill(null);
  memo[0] = 0; memo[1] = 1;

  // Build tree nodes for visualization
  type TNode = { id: string; x: number; y: number; label: string; state: string };
  type TEdge = { from: string; to: string; directed: boolean; state: string };
  const treeNodes: TNode[] = [
    { id: "f6", x: 300, y: 40, label: "fib(6)", state: "default" },
    { id: "f5", x: 160, y: 120, label: "fib(5)", state: "default" },
    { id: "f4a", x: 440, y: 120, label: "fib(4)", state: "default" },
    { id: "f4b", x: 80, y: 200, label: "fib(4)", state: "default" },
    { id: "f3a", x: 240, y: 200, label: "fib(3)", state: "default" },
    { id: "f3b", x: 380, y: 200, label: "fib(3)", state: "default" },
    { id: "f2a", x: 500, y: 200, label: "fib(2)", state: "default" },
  ];
  const treeEdges: TEdge[] = [
    { from: "f6", to: "f5", directed: true, state: "default" },
    { from: "f6", to: "f4a", directed: true, state: "default" },
    { from: "f5", to: "f4b", directed: true, state: "default" },
    { from: "f5", to: "f3a", directed: true, state: "default" },
    { from: "f4a", to: "f3b", directed: true, state: "default" },
    { from: "f4a", to: "f2a", directed: true, state: "default" },
  ];
  const cloneN = () => treeNodes.map(n => ({ ...n }));
  const cloneE = () => treeEdges.map(e => ({ ...e }));

  steps.push({ description_en: `Initialize: memo[0]=0, memo[1]=1. Calculate fib(${n}).`, nodes_state: cloneN(), edges_state: cloneE(), matrix_state: [memo.map(v => v)], active_line: 1 });

  // Simulate bottom-up
  for (let i = 2; i <= n; i++) {
    memo[i] = (memo[i-1] ?? 0) + (memo[i-2] ?? 0);
    const ns = cloneN();
    const nodeId = `f${i}`;
    const node = ns.find(nd => nd.id === nodeId);
    if (node) { node.state = "active"; node.label = `fib(${i})=${memo[i]}`; }
    steps.push({ description_en: `fib(${i}) = fib(${i-1}) + fib(${i-2}) = ${memo[i-1]} + ${memo[i-2]} = ${memo[i]}.`, nodes_state: ns, edges_state: cloneE(), matrix_state: [memo.map(v => v)], active_line: 4 });
  }
  steps.push({ description_en: `Result: fib(${n}) = ${memo[n]}.`, nodes_state: cloneN(), edges_state: cloneE(), matrix_state: [memo.map(v => v)], active_line: -1 });
  return steps;
}

export function simulateKnapsack(): LogicStep[] {
  const weights = [1, 2, 3, 2];
  const values = [10, 15, 40, 30];
  const W = 5;
  const nItems = weights.length;
  const steps: LogicStep[] = [];

  const dp: number[][] = Array(nItems + 1).fill(null).map(() => Array(W + 1).fill(0));
  steps.push({ description_en: `Initialize DP table (${nItems+1}×${W+1}) with zeros. Items: weights=[${weights}], values=[${values}], capacity=${W}.`, matrix_state: dp.map(r => [...r]), active_line: 2 });

  for (let i = 1; i <= nItems; i++) {
    for (let w = 1; w <= W; w++) {
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(values[i-1] + dp[i-1][w - weights[i-1]], dp[i-1][w]);
        steps.push({ description_en: `Item ${i} (w=${weights[i-1]}, v=${values[i-1]}), cap=${w}: take=${values[i-1]}+dp[${i-1}][${w-weights[i-1]}]=${values[i-1]+dp[i-1][w-weights[i-1]]}, skip=${dp[i-1][w]}. Best=${dp[i][w]}.`, matrix_state: dp.map(r => [...r]), highlight_indices: [i * (W+1) + w], active_line: 6 });
      } else {
        dp[i][w] = dp[i-1][w];
        steps.push({ description_en: `Item ${i} (w=${weights[i-1]}) too heavy for cap=${w}. Skip. dp[${i}][${w}]=${dp[i][w]}.`, matrix_state: dp.map(r => [...r]), highlight_indices: [i * (W+1) + w], active_line: 8 });
      }
    }
  }
  steps.push({ description_en: `Knapsack solved. Maximum value: ${dp[nItems][W]}.`, matrix_state: dp.map(r => [...r]), active_line: -1 });
  return steps;
}

export function simulateLCS(): LogicStep[] {
  const s1 = "ABCDE";
  const s2 = "ACE";
  const m = s1.length, n = s2.length;
  const steps: LogicStep[] = [];
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  steps.push({ description_en: `LCS of "${s1}" and "${s2}". Initialize (${m+1}×${n+1}) table.`, matrix_state: dp.map(r => [...r]), active_line: 1 });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i-1] === s2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
        steps.push({ description_en: `'${s1[i-1]}' == '${s2[j-1]}' → dp[${i}][${j}] = dp[${i-1}][${j-1}]+1 = ${dp[i][j]}.`, matrix_state: dp.map(r => [...r]), highlight_indices: [i * (n+1) + j], active_line: 4 });
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        steps.push({ description_en: `'${s1[i-1]}' ≠ '${s2[j-1]}' → dp[${i}][${j}] = max(${dp[i-1][j]}, ${dp[i][j-1]}) = ${dp[i][j]}.`, matrix_state: dp.map(r => [...r]), highlight_indices: [i * (n+1) + j], active_line: 5 });
      }
    }
  }
  steps.push({ description_en: `LCS length = ${dp[m][n]}.`, matrix_state: dp.map(r => [...r]), active_line: -1 });
  return steps;
}
