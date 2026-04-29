export type LogicStep = {
  description_en: string;
  array_state: number[];
  pivot_index?: number | null;
  partition_range?: [number, number] | null;
  active_line?: number; // Line number in the pseudo-code/snippet to highlight
};

/**
 * Main Simulator Router
 * Returns an array of execution steps for visualization.
 */
export function generateSimulation(algorithmId: string, initialData?: number[]): LogicStep[] | null {
  if (algorithmId === "quick-sort") {
    return simulateQuickSort(initialData || [12, 4, 8, 3, 10, 2, 7, 5, 9, 6]);
  }
  
  if (algorithmId === "dijkstra") {
    return simulateDijkstra();
  }

  if (algorithmId === "merge-sort") {
    return simulateMergeSort(initialData || [12, 4, 8, 3, 10, 2, 7, 5, 9, 6]);
  }

  if (algorithmId === "binary-search") {
    return simulateBinarySearch();
  }

  return [
    { description_en: `Simulation not implemented yet.`, array_state: [1, 2, 3], pivot_index: 0, active_line: 0 }
  ];
}

// ---------------------------------------------------------
// 1. QUICK SORT SIMULATOR (In-place with Line Tracing)
// ---------------------------------------------------------
function simulateQuickSort(initialArr: number[]): LogicStep[] {
  const steps: LogicStep[] = [];
  const arr = [...initialArr];

  steps.push({
    description_en: "Initial unsorted array.",
    array_state: [...arr],
    pivot_index: null,
    partition_range: [0, arr.length - 1],
    active_line: 1
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    steps.push({
      description_en: `Select pivot (${pivot}) at index ${high}.`,
      array_state: [...arr],
      pivot_index: high,
      partition_range: [low, high],
      active_line: 7
    });

    let i = low - 1;
    steps.push({
      description_en: `Initialize partition pointer i at ${i}.`,
      array_state: [...arr],
      pivot_index: high,
      partition_range: [low, high],
      active_line: 8
    });

    for (let j = low; j < high; j++) {
      steps.push({
        description_en: `Comparing array[${j}] (${arr[j]}) with pivot (${pivot}).`,
        array_state: [...arr],
        pivot_index: high,
        partition_range: [low, high],
        active_line: 9
      });

      if (arr[j] < pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        steps.push({
          description_en: `Swapped ${arr[j]} and ${arr[i]} (i increased to ${i}).`,
          array_state: [...arr],
          pivot_index: high,
          partition_range: [low, high],
          active_line: 12
        });
      }
    }
    const temp2 = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp2;

    steps.push({
      description_en: `Swap pivot with array[i+1]. Pivot is now at index ${i + 1}.`,
      array_state: [...arr],
      pivot_index: i + 1,
      partition_range: [low, high],
      active_line: 13
    });

    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      steps.push({
        description_en: `Current sub-array [${low}..${high}] has size > 1. Proceed to partition.`,
        array_state: [...arr],
        pivot_index: null,
        partition_range: [low, high],
        active_line: 1
      });

      const pi = partition(low, high);
      
      steps.push({
        description_en: `Recursively sorting left sub-array [${low}..${pi - 1}].`,
        array_state: [...arr],
        pivot_index: null,
        partition_range: [low, pi - 1 >= low ? pi - 1 : low],
        active_line: 3
      });
      sort(low, pi - 1);

      steps.push({
        description_en: `Recursively sorting right sub-array [${pi + 1}..${high}].`,
        array_state: [...arr],
        pivot_index: null,
        partition_range: [pi + 1 <= high ? pi + 1 : high, high],
        active_line: 4
      });
      sort(pi + 1, high);
    }
  }

  sort(0, arr.length - 1);

  steps.push({
    description_en: "Final sorted array complete.",
    array_state: [...arr],
    pivot_index: null,
    partition_range: null,
    active_line: 0
  });

  return steps;
}

// ---------------------------------------------------------
// 2. MERGE SORT SIMULATOR
// ---------------------------------------------------------
function simulateMergeSort(initialArr: number[]): LogicStep[] {
  const steps: LogicStep[] = [];
  const arr = [...initialArr];

  function merge(left: number, mid: number, right: number) {
    const temp = [];
    let i = left;
    let j = mid + 1;
    
    steps.push({
      description_en: `Merging sub-arrays [${left}..${mid}] and [${mid+1}..${right}].`,
      array_state: [...arr],
      pivot_index: mid,
      partition_range: [left, right],
      active_line: 6
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

    for (let k = 0; k < temp.length; k++) {
      arr[left + k] = temp[k];
      steps.push({
        description_en: `Updating element at index ${left + k}.`,
        array_state: [...arr],
        pivot_index: left + k,
        partition_range: [left, right],
        active_line: 12
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
  return steps;
}

// ---------------------------------------------------------
// 3. BINARY SEARCH SIMULATOR
// ---------------------------------------------------------
function simulateBinarySearch(): LogicStep[] {
  const steps: LogicStep[] = [];
  const arr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  const target = 16;
  
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({
      description_en: `Evaluating mid element ${arr[mid]} at index ${mid}.`,
      array_state: [...arr],
      pivot_index: mid,
      partition_range: [low, high],
      active_line: 4
    });

    if (arr[mid] === target) {
      steps.push({
        description_en: `Target found at index ${mid}.`,
        array_state: [...arr],
        pivot_index: mid,
        partition_range: [mid, mid],
        active_line: 5
      });
      return steps;
    } else if (arr[mid] < target) {
      low = mid + 1;
      steps.push({
        description_en: `Target is larger than ${arr[mid]}. Searching right half.`,
        array_state: [...arr],
        pivot_index: mid,
        partition_range: [low, high],
        active_line: 6
      });
    } else {
      high = mid - 1;
      steps.push({
        description_en: `Target is smaller than ${arr[mid]}. Searching left half.`,
        array_state: [...arr],
        pivot_index: mid,
        partition_range: [low, high],
        active_line: 7
      });
    }
  }
  return steps;
}

// ---------------------------------------------------------
// 4. DIJKSTRA SIMULATOR
// ---------------------------------------------------------
function simulateDijkstra(): LogicStep[] {
  const steps: LogicStep[] = [];
  steps.push({
    description_en: "Distance to start node (A) set to 0. All others to Infinity.",
    array_state: [0, Infinity, Infinity, Infinity, Infinity, Infinity],
    pivot_index: 0,
    active_line: 1
  });

  steps.push({
    description_en: "Evaluating neighbor edges of A.",
    array_state: [0, 5, Infinity, 8, Infinity, Infinity],
    pivot_index: 0,
    active_line: 4
  });

  steps.push({
    description_en: "Updating shortest path to C through B.",
    array_state: [0, 5, 8, 8, Infinity, Infinity],
    pivot_index: 1,
    active_line: 6
  });

  return steps;
}
