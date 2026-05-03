import { LogicStep } from "@/types/algorithm";

type GNode = { id: string; x: number; y: number; label: string; state: string };
type GEdge = { from: string; to: string; directed: boolean; state: string; weight?: number };

function makeGraph(): { nodes: GNode[]; adj: Record<string, string[]>; edges: GEdge[] } {
  const nodes: GNode[] = [
    { id: "A", x: 300, y: 50, label: "A", state: "default" },
    { id: "B", x: 150, y: 160, label: "B", state: "default" },
    { id: "C", x: 450, y: 160, label: "C", state: "default" },
    { id: "D", x: 80, y: 280, label: "D", state: "default" },
    { id: "E", x: 250, y: 300, label: "E", state: "default" },
    { id: "F", x: 400, y: 300, label: "F", state: "default" },
  ];
  const edges: GEdge[] = [
    { from: "A", to: "B", directed: true, state: "default" },
    { from: "A", to: "C", directed: true, state: "default" },
    { from: "B", to: "D", directed: true, state: "default" },
    { from: "B", to: "E", directed: true, state: "default" },
    { from: "C", to: "F", directed: true, state: "default" },
    { from: "E", to: "F", directed: true, state: "default" },
  ];
  const adj: Record<string, string[]> = {};
  nodes.forEach(n => { adj[n.id] = []; });
  edges.forEach(e => { adj[e.from].push(e.to); });
  return { nodes, adj, edges };
}

function cloneNodes(nodes: GNode[]): GNode[] { return nodes.map(n => ({ ...n })); }
function cloneEdges(edges: GEdge[]): GEdge[] { return edges.map(e => ({ ...e })); }

export function simulateBFS(): LogicStep[] {
  const { nodes, adj, edges } = makeGraph();
  const steps: LogicStep[] = [];
  const visited = new Set<string>();
  const queue: string[] = ["A"];
  visited.add("A");

  const ns = cloneNodes(nodes); ns.find(n => n.id === "A")!.state = "active";
  steps.push({ description_en: "Start BFS from node A. Add A to queue.", nodes_state: cloneNodes(ns), edges_state: cloneEdges(edges), active_line: 2 });

  while (queue.length > 0) {
    const current = queue.shift()!;
    const cn = cloneNodes(ns);
    cn.find(n => n.id === current)!.state = "processing";
    steps.push({ description_en: `Dequeue node ${current}. Process its neighbors.`, nodes_state: cloneNodes(cn), edges_state: cloneEdges(edges), active_line: 5 });

    for (const neighbor of adj[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        ns.find(n => n.id === neighbor)!.state = "active";
        const es = cloneEdges(edges);
        const edge = es.find(e => e.from === current && e.to === neighbor);
        if (edge) edge.state = "active";
        steps.push({ description_en: `Visit neighbor ${neighbor} from ${current}. Add to queue. Queue: [${queue.join(', ')}].`, nodes_state: cloneNodes(ns), edges_state: es, active_line: 8 });
      }
    }
    ns.find(n => n.id === current)!.state = "visited";
  }
  steps.push({ description_en: "BFS traversal complete. All reachable nodes visited.", nodes_state: cloneNodes(ns), edges_state: cloneEdges(edges), active_line: -1 });
  return steps;
}

export function simulateDFS(): LogicStep[] {
  const { nodes, adj, edges } = makeGraph();
  const steps: LogicStep[] = [];
  const visited = new Set<string>();
  const ns = cloneNodes(nodes);

  function dfs(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    ns.find(n => n.id === nodeId)!.state = "active";
    steps.push({ description_en: `Visit node ${nodeId}. Mark as visited. Stack depth: ${visited.size}.`, nodes_state: cloneNodes(ns), edges_state: cloneEdges(edges), active_line: 3 });

    for (const neighbor of adj[nodeId]) {
      if (!visited.has(neighbor)) {
        const es = cloneEdges(edges);
        const edge = es.find(e => e.from === nodeId && e.to === neighbor);
        if (edge) edge.state = "active";
        steps.push({ description_en: `Explore edge ${nodeId} → ${neighbor}.`, nodes_state: cloneNodes(ns), edges_state: es, active_line: 5 });
        dfs(neighbor);
      }
    }
    ns.find(n => n.id === nodeId)!.state = "visited";
    steps.push({ description_en: `Backtrack from node ${nodeId}. All neighbors explored.`, nodes_state: cloneNodes(ns), edges_state: cloneEdges(edges), active_line: 5 });
  }
  steps.push({ description_en: "Start DFS from node A.", nodes_state: cloneNodes(ns), edges_state: cloneEdges(edges), active_line: 1 });
  dfs("A");
  steps.push({ description_en: "DFS traversal complete.", nodes_state: cloneNodes(ns), edges_state: cloneEdges(edges), active_line: -1 });
  return steps;
}

export function simulateDijkstra(): LogicStep[] {
  const { nodes, edges: baseEdges } = makeGraph();
  // Add weights
  const wEdges: GEdge[] = baseEdges.map((e, i) => ({ ...e, weight: [4, 2, 5, 1, 3, 6][i] || 1 }));
  const adj: Record<string, { to: string; w: number }[]> = {};
  nodes.forEach(n => { adj[n.id] = []; });
  wEdges.forEach(e => { adj[e.from].push({ to: e.to, w: e.weight! }); });

  const dist: Record<string, number> = {};
  nodes.forEach(n => { dist[n.id] = Infinity; });
  dist["A"] = 0;
  const visited = new Set<string>();
  const steps: LogicStep[] = [];
  const ns = cloneNodes(nodes);

  ns.find(n => n.id === "A")!.state = "active";
  steps.push({ description_en: `Initialize: dist(A)=0, all others=∞.`, nodes_state: cloneNodes(ns), edges_state: cloneEdges(wEdges), active_line: 3 });

  const unvisited = new Set(nodes.map(n => n.id));
  while (unvisited.size > 0) {
    let u = ""; let minD = Infinity;
    for (const id of Array.from(unvisited)) { if (dist[id] < minD) { minD = dist[id]; u = id; } }
    if (!u || minD === Infinity) break;
    unvisited.delete(u);
    visited.add(u);
    ns.find(n => n.id === u)!.state = "processing";
    steps.push({ description_en: `Select node ${u} (dist=${dist[u]}). Process edges.`, nodes_state: cloneNodes(ns), edges_state: cloneEdges(wEdges), active_line: 5 });

    for (const { to, w } of adj[u]) {
      const newDist = dist[u] + w;
      if (newDist < dist[to]) {
        dist[to] = newDist;
        ns.find(n => n.id === to)!.state = "active";
        ns.find(n => n.id === to)!.label = `${to}(${newDist})`;
        const es = cloneEdges(wEdges);
        const edge = es.find(e => e.from === u && e.to === to);
        if (edge) edge.state = "active";
        steps.push({ description_en: `Relax edge ${u}→${to}: dist=${dist[u]}+${w}=${newDist} < ${dist[to] === Infinity ? '∞' : dist[to]+w}. Update dist(${to})=${newDist}.`, nodes_state: cloneNodes(ns), edges_state: es, active_line: 6 });
      }
    }
    ns.find(n => n.id === u)!.state = "visited";
  }
  steps.push({ description_en: `Dijkstra complete. Shortest distances: ${Object.entries(dist).map(([k,v]) => `${k}=${v}`).join(', ')}.`, nodes_state: cloneNodes(ns), edges_state: cloneEdges(wEdges), active_line: -1 });
  return steps;
}
