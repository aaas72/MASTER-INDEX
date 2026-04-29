export type LogicStep = {
  description_en: string;
  array_state: number[];
  pivot_index?: number | null;
  partition_range?: [number, number] | null;
};

/**
 * Main Simulator Router
 * Returns an array of execution steps for visualization.
 * If the algorithm is not yet supported by the engine, returns null to fallback to static mock data.
 */
export function generateSimulation(algorithmId: string, initialData?: number[]): LogicStep[] | null {
  if (algorithmId === "quick-sort") {
    // A classic random-looking array for sorting demonstration
    return simulateQuickSort(initialData || [12, 4, 8, 3, 10, 2, 7, 5, 9, 6]);
  }
  
  if (algorithmId === "dijkstra") {
    return simulateDijkstra();
  }

  // Generic Graph Fallback
  if (["a-star", "bellman-ford", "bfs", "dfs", "kruskal"].includes(algorithmId)) {
    return [
      { description_en: `Initialize ${algorithmId.replace(/-/g, ' ')}.`, array_state: [0, Infinity, Infinity, Infinity, Infinity, Infinity], pivot_index: 0 },
      { description_en: "Evaluating connections...", array_state: [0, 10, 20, 30, Infinity, Infinity], pivot_index: 1 },
      { description_en: "Algorithm execution complete.", array_state: [0, 10, 20, 30, 40, 50], pivot_index: 5 }
    ];
  }

  if (algorithmId === "merge-sort") {
    return simulateMergeSort(initialData || [12, 4, 8, 3, 10, 2, 7, 5, 9, 6]);
  }

  if (algorithmId === "binary-search") {
    return simulateBinarySearch();
  }

  // Generic Graph/DP Fallback for unimplemented algorithms
  if (["a-star", "bellman-ford", "bfs", "dfs", "kruskal"].includes(algorithmId)) {
    return [
      { description_en: `Initialize ${algorithmId.replace(/-/g, ' ')}.`, array_state: [0, Infinity, Infinity, Infinity, Infinity, Infinity], pivot_index: 0 },
      { description_en: "Evaluating connections...", array_state: [0, 10, 20, 30, Infinity, Infinity], pivot_index: 1 },
      { description_en: "Algorithm execution complete.", array_state: [0, 10, 20, 30, 40, 50], pivot_index: 5 }
    ];
  }

  return [
    { description_en: `Simulation not implemented yet.`, array_state: [1, 2, 3], pivot_index: 0 }
  ];
}

// ---------------------------------------------------------
// 1. QUICK SORT SIMULATOR
// ---------------------------------------------------------
function simulateQuickSort(initialArr: number[]): LogicStep[] {
  const steps: LogicStep[] = [];
  const arr = [...initialArr];

  steps.push({
    description_en: "Initial unsorted array.",
    array_state: [...arr],
    pivot_index: null,
    partition_range: [0, arr.length - 1],
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    steps.push({
      description_en: `Select pivot (${pivot}) at index ${high}.`,
      array_state: [...arr],
      pivot_index: high,
      partition_range: [low, high],
    });

    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        steps.push({
          description_en: `Swapped ${arr[j]} and ${arr[i]} because ${arr[i]} < pivot (${pivot}).`,
          array_state: [...arr],
          pivot_index: high,
          partition_range: [low, high],
        });
      } else {
        steps.push({
          description_en: `Element ${arr[j]} >= pivot (${pivot}), no swap needed.`,
          array_state: [...arr],
          pivot_index: high,
          partition_range: [low, high],
        });
      }
    }
    const temp2 = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp2;

    steps.push({
      description_en: `Partition complete. Pivot ${pivot} moved to its final sorted position (idx: ${i + 1}).`,
      array_state: [...arr],
      pivot_index: i + 1,
      partition_range: [low, high],
    });

    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      
      steps.push({
        description_en: `Recursively sorting left sub-array [${low}..${pi - 1}].`,
        array_state: [...arr],
        pivot_index: null,
        partition_range: [low, pi - 1 > 0 ? pi - 1 : low],
      });
      sort(low, pi - 1);

      steps.push({
        description_en: `Recursively sorting right sub-array [${pi + 1}..${high}].`,
        array_state: [...arr],
        pivot_index: null,
        partition_range: [pi + 1, high],
      });
      sort(pi + 1, high);
    } else if (low === high) {
      steps.push({
        description_en: `Base case reached. Element at index ${low} (${arr[low]}) is sorted.`,
        array_state: [...arr],
        pivot_index: low,
        partition_range: [low, high],
      });
    }
  }

  sort(0, arr.length - 1);

  steps.push({
    description_en: "Final sorted array. All elements are in their correct positions.",
    array_state: [...arr],
    pivot_index: null,
    partition_range: null,
  });

  return steps;
}

// ---------------------------------------------------------
// 2. MERGE SORT SIMULATOR
// ---------------------------------------------------------
function simulateMergeSort(initialArr: number[]): LogicStep[] {
  const steps: LogicStep[] = [];
  const arr = [...initialArr];

  steps.push({
    description_en: "Initial unsorted array.",
    array_state: [...arr],
    pivot_index: null,
    partition_range: [0, arr.length - 1],
  });

  function merge(left: number, mid: number, right: number) {
    const temp = [];
    let i = left;
    let j = mid + 1;
    
    steps.push({
      description_en: `Merging sub-arrays [${left}..${mid}] and [${mid+1}..${right}].`,
      array_state: [...arr],
      pivot_index: mid,
      partition_range: [left, right],
    });

    while (i <= mid && j <= right) {
      if (arr[i] <= arr[j]) {
        temp.push(arr[i++]);
      } else {
        temp.push(arr[j++]);
      }
    }
    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);

    // Copy back to arr
    for (let k = 0; k < temp.length; k++) {
      arr[left + k] = temp[k];
      steps.push({
        description_en: `Placed ${temp[k]} into index ${left + k}.`,
        array_state: [...arr],
        pivot_index: left + k,
        partition_range: [left, right],
      });
    }
  }

  function sort(left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    sort(left, mid);
    sort(mid + 1, right);
    merge(left, mid, right);
  }

  sort(0, arr.length - 1);

  steps.push({
    description_en: "Merge Sort complete. Array is fully sorted.",
    array_state: [...arr],
    pivot_index: null,
    partition_range: null,
  });

  return steps;
}

// ---------------------------------------------------------
// 3. BINARY SEARCH SIMULATOR
// ---------------------------------------------------------
function simulateBinarySearch(): LogicStep[] {
  const steps: LogicStep[] = [];
  const arr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  const target = 16;
  
  steps.push({
    description_en: `Searching for target ${target} in a sorted array.`,
    array_state: [...arr],
    pivot_index: null,
    partition_range: [0, arr.length - 1]
  });

  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      description_en: `Checking middle element ${arr[mid]} at index ${mid}. Range: [${low}..${high}]`,
      array_state: [...arr],
      pivot_index: mid,
      partition_range: [low, high]
    });

    if (arr[mid] === target) {
      steps.push({
        description_en: `Target ${target} found at index ${mid}!`,
        array_state: [...arr],
        pivot_index: mid,
        partition_range: [mid, mid]
      });
      return steps;
    } else if (arr[mid] < target) {
      steps.push({
        description_en: `${arr[mid]} < ${target}. Target must be in the right half.`,
        array_state: [...arr],
        pivot_index: mid,
        partition_range: [mid + 1, high]
      });
      low = mid + 1;
    } else {
      steps.push({
        description_en: `${arr[mid]} > ${target}. Target must be in the left half.`,
        array_state: [...arr],
        pivot_index: mid,
        partition_range: [low, mid - 1]
      });
      high = mid - 1;
    }
  }

  steps.push({
    description_en: `Target ${target} not found in the array.`,
    array_state: [...arr],
    pivot_index: null,
    partition_range: null
  });

  return steps;
}

// ---------------------------------------------------------
// 4. DIJKSTRA SIMULATOR
// ---------------------------------------------------------
function simulateDijkstra(): LogicStep[] {
  // Simulating Graph traversal for A->B, A->D, etc.
  // Nodes: A(0), B(1), C(2), D(3), E(4), F(5)
  // Distance array maps to [A, B, C, D, E, F]
  const steps: LogicStep[] = [];
  
  steps.push({
    description_en: "Initialize all shortest distances to infinity. Distance to start node (A) is 0.",
    array_state: [0, Infinity, Infinity, Infinity, Infinity, Infinity],
    pivot_index: 0,
  });

  steps.push({
    description_en: "Visit A. Evaluate neighbors B (dist: 5) and D (dist: 8).",
    array_state: [0, 5, Infinity, 8, Infinity, Infinity],
    pivot_index: 0,
  });

  steps.push({
    description_en: "Visit B (smallest dist 5). Evaluate neighbor C (dist: 5 + 3 = 8).",
    array_state: [0, 5, 8, 8, Infinity, Infinity],
    pivot_index: 1,
  });

  steps.push({
    description_en: "Visit C (smallest dist 8). Evaluate neighbor E (dist: 8 + 7 = 15).",
    array_state: [0, 5, 8, 8, 15, Infinity],
    pivot_index: 2,
  });

  steps.push({
    description_en: "Visit D (smallest dist 8). Evaluate neighbor C (8+12=20, no change) and F (8+4=12).",
    array_state: [0, 5, 8, 8, 15, 12],
    pivot_index: 3,
  });

  steps.push({
    description_en: "Visit F (smallest dist 12). No unvisited neighbors.",
    array_state: [0, 5, 8, 8, 15, 12],
    pivot_index: 5,
  });

  steps.push({
    description_en: "Visit E (smallest dist 15). No unvisited neighbors.",
    array_state: [0, 5, 8, 8, 15, 12],
    pivot_index: 4,
  });

  steps.push({
    description_en: "Shortest Path Tree computation complete.",
    array_state: [0, 5, 8, 8, 15, 12],
    pivot_index: -1, // Done
  });

  return steps;
}
