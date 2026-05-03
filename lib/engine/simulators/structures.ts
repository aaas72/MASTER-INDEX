import { LogicStep } from "@/types/algorithm";

export function simulateBSTInsertion(): LogicStep[] {
  const values = [50, 30, 70, 20, 40, 60, 80];
  const steps: LogicStep[] = [];
  type TNode = { id: string; x: number; y: number; label: string; state: string };
  type TEdge = { from: string; to: string; directed: boolean; state: string };
  const ns: TNode[] = [];
  const es: TEdge[] = [];

  const positions: Record<string, { x: number; y: number }> = {
    "50": { x: 300, y: 50 }, "30": { x: 180, y: 140 }, "70": { x: 420, y: 140 },
    "20": { x: 120, y: 230 }, "40": { x: 240, y: 230 }, "60": { x: 360, y: 230 }, "80": { x: 480, y: 230 },
  };

  steps.push({ description_en: "Empty BST. Begin insertions.", nodes_state: [], edges_state: [], active_line: 1 });

  for (const val of values) {
    const pos = positions[String(val)];
    ns.push({ id: String(val), x: pos.x, y: pos.y, label: String(val), state: "active" });

    // Find parent
    if (ns.length > 1) {
      let parent = values[0];
      for (const v of values) {
        if (v === val) break;
        if (val < v && ns.find(n => n.id === String(v))) parent = v;
        if (val > v && ns.find(n => n.id === String(v))) parent = v;
      }
      // Simple parent logic
      const parentId = val === 50 ? "" : (val < 50 ? (val === 30 ? "50" : "30") : (val === 70 ? "50" : "70"));
      if (ns.find(n => n.id === parentId)) {
        es.push({ from: parentId, to: String(val), directed: true, state: "default" });
      }
    }

    steps.push({ description_en: `Insert ${val} into BST. ${ns.length === 1 ? 'Becomes root.' : `Placed as ${val < 50 ? 'left' : 'right'} child.`}`, nodes_state: ns.map(n => ({ ...n })), edges_state: es.map(e => ({ ...e })), active_line: 2 });
    ns.find(n => n.id === String(val))!.state = "default";
  }
  steps.push({ description_en: "BST construction complete. All 7 nodes inserted.", nodes_state: ns.map(n => ({ ...n })), edges_state: es.map(e => ({ ...e })), active_line: -1 });
  return steps;
}

export function simulateInorderTraversal(): LogicStep[] {
  const steps: LogicStep[] = [];
  type TNode = { id: string; x: number; y: number; label: string; state: string };
  type TEdge = { from: string; to: string; directed: boolean; state: string };
  const ns: TNode[] = [
    { id: "50", x: 300, y: 50, label: "50", state: "default" },
    { id: "30", x: 180, y: 140, label: "30", state: "default" },
    { id: "70", x: 420, y: 140, label: "70", state: "default" },
    { id: "20", x: 120, y: 230, label: "20", state: "default" },
    { id: "40", x: 240, y: 230, label: "40", state: "default" },
  ];
  const es: TEdge[] = [
    { from: "50", to: "30", directed: true, state: "default" },
    { from: "50", to: "70", directed: true, state: "default" },
    { from: "30", to: "20", directed: true, state: "default" },
    { from: "30", to: "40", directed: true, state: "default" },
  ];
  const result: number[] = [];
  const cloneN = () => ns.map(n => ({ ...n }));
  const cloneE = () => es.map(e => ({ ...e }));

  steps.push({ description_en: "Start inorder traversal (Left → Root → Right).", nodes_state: cloneN(), edges_state: cloneE(), active_line: 1 });

  function inorder(nodeId: string) {
    const node = ns.find(n => n.id === nodeId);
    if (!node) return;
    const leftChild = es.find(e => e.from === nodeId && parseInt(e.to) < parseInt(nodeId));
    if (leftChild) { inorder(leftChild.to); }

    node.state = "active";
    result.push(parseInt(nodeId));
    steps.push({ description_en: `Visit node ${nodeId}. Output so far: [${result.join(', ')}].`, nodes_state: cloneN(), edges_state: cloneE(), active_line: 4 });
    node.state = "visited";

    const rightChild = es.find(e => e.from === nodeId && parseInt(e.to) > parseInt(nodeId));
    if (rightChild) { inorder(rightChild.to); }
  }
  inorder("50");
  steps.push({ description_en: `Inorder traversal complete: [${result.join(', ')}].`, nodes_state: cloneN(), edges_state: cloneE(), active_line: -1 });
  return steps;
}

export function simulateMaxHeapify(): LogicStep[] {
  const arr = [4, 10, 3, 5, 1, 8, 7];
  const steps: LogicStep[] = [];
  type TNode = { id: string; x: number; y: number; label: string; state: string };
  const buildNodes = (a: number[]): TNode[] => [
    { id: "0", x: 300, y: 50, label: String(a[0]), state: "default" },
    { id: "1", x: 180, y: 140, label: String(a[1]), state: "default" },
    { id: "2", x: 420, y: 140, label: String(a[2]), state: "default" },
    ...(a[3] !== undefined ? [{ id: "3", x: 120, y: 230, label: String(a[3]), state: "default" }] : []),
    ...(a[4] !== undefined ? [{ id: "4", x: 240, y: 230, label: String(a[4]), state: "default" }] : []),
    ...(a[5] !== undefined ? [{ id: "5", x: 360, y: 230, label: String(a[5]), state: "default" }] : []),
    ...(a[6] !== undefined ? [{ id: "6", x: 480, y: 230, label: String(a[6]), state: "default" }] : []),
  ];
  const baseEdges = [
    { from: "0", to: "1", directed: true, state: "default" },
    { from: "0", to: "2", directed: true, state: "default" },
    { from: "1", to: "3", directed: true, state: "default" },
    { from: "1", to: "4", directed: true, state: "default" },
    { from: "2", to: "5", directed: true, state: "default" },
    { from: "2", to: "6", directed: true, state: "default" },
  ];

  steps.push({ description_en: `Initial array: [${arr.join(', ')}]. Build Max-Heap.`, array_state: [...arr], nodes_state: buildNodes(arr), edges_state: [...baseEdges.map(e => ({...e}))], active_line: 1 });

  function heapify(a: number[], n: number, i: number) {
    let largest = i;
    const l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;
    steps.push({ description_en: `Heapify at index ${i} (val=${a[i]}). Children: L=${l < n ? a[l] : 'none'}, R=${r < n ? a[r] : 'none'}. Largest=${a[largest]}.`, array_state: [...a], nodes_state: buildNodes(a), edges_state: [...baseEdges.map(e => ({...e}))], highlight_indices: [i, largest], active_line: 3 });
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push({ description_en: `Swap ${a[largest]} ↔ ${a[i]} (indices ${i} and ${largest}).`, array_state: [...a], nodes_state: buildNodes(a), edges_state: [...baseEdges.map(e => ({...e}))], highlight_indices: [i, largest], active_line: 5 });
      heapify(a, n, largest);
    }
  }
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) { heapify(arr, arr.length, i); }
  steps.push({ description_en: `Max-Heap built: [${arr.join(', ')}]. Root = ${arr[0]}.`, array_state: [...arr], nodes_state: buildNodes(arr), edges_state: [...baseEdges.map(e => ({...e}))], active_line: -1 });
  return steps;
}

export function simulateLinkedList(): LogicStep[] {
  const values = [10, 25, 37, 42, 58, 63];
  const steps: LogicStep[] = [];
  steps.push({ description_en: "Empty linked list. Begin insertions.", linked_list_state: [], active_line: 1 });

  for (let i = 0; i < values.length; i++) {
    const list = values.slice(0, i + 1).map((v, idx) => ({
      value: v, state: idx === i ? "active" : "default"
    }));
    steps.push({ description_en: `Insert ${values[i]}. List: ${values.slice(0, i+1).join(' → ')} → null.`, linked_list_state: list, active_line: 3 });
  }

  // Traversal
  for (let i = 0; i < values.length; i++) {
    const list = values.map((v, idx) => ({
      value: v, state: idx === i ? "active" : idx < i ? "visited" : "default"
    }));
    steps.push({ description_en: `Traverse: visiting node ${values[i]}.`, linked_list_state: list, active_line: 5 });
  }
  steps.push({ description_en: "Traversal complete. All nodes visited.", linked_list_state: values.map(v => ({ value: v, state: "visited" })), active_line: -1 });
  return steps;
}
