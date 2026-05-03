import { LogicStep } from "@/types/algorithm";

export function simulateBubbleSort(data: number[]): LogicStep[] {
  const arr = [...data];
  const steps: LogicStep[] = [];
  steps.push({ description_en: "Initial unsorted array.", array_state: [...arr], highlight_indices: [], active_line: 1 });
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({ description_en: `Compare arr[${j}]=${arr[j]} with arr[${j+1}]=${arr[j+1]}.`, array_state: [...arr], highlight_indices: [j, j+1], active_line: 4 });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ description_en: `Swap ${arr[j+1]} ↔ ${arr[j]}. Array updated.`, array_state: [...arr], highlight_indices: [j, j+1], active_line: 5 });
      }
    }
    steps.push({ description_en: `Pass ${i+1} complete. Element ${arr[arr.length-i-1]} is in final position.`, array_state: [...arr], highlight_indices: [arr.length-i-1], active_line: 2 });
  }
  steps.push({ description_en: "Array is fully sorted.", array_state: [...arr], highlight_indices: [], active_line: -1 });
  return steps;
}

export function simulateQuickSort(data: number[]): LogicStep[] {
  const arr = [...data];
  const steps: LogicStep[] = [];
  steps.push({ description_en: "Initial array.", array_state: [...arr], highlight_indices: [], active_line: 1 });

  function qs(lo: number, hi: number) {
    if (lo >= hi) return;
    const pivot = arr[hi];
    steps.push({ description_en: `Pivot selected: ${pivot} at index ${hi}. Partition range [${lo}, ${hi}].`, array_state: [...arr], pivot_index: hi, partition_range: [lo, hi], highlight_indices: [hi], active_line: 3 });
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      steps.push({ description_en: `Compare arr[${j}]=${arr[j]} < pivot ${pivot}?`, array_state: [...arr], pivot_index: hi, partition_range: [lo, hi], highlight_indices: [j, hi], active_line: 7 });
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({ description_en: `Swap arr[${i}]=${arr[i]} ↔ arr[${j}]=${arr[j]}.`, array_state: [...arr], pivot_index: hi, partition_range: [lo, hi], highlight_indices: [i, j], active_line: 8 });
      }
    }
    [arr[i+1], arr[hi]] = [arr[hi], arr[i+1]];
    steps.push({ description_en: `Place pivot ${pivot} at position ${i+1}.`, array_state: [...arr], pivot_index: i+1, highlight_indices: [i+1], active_line: 10 });
    qs(lo, i);
    qs(i + 2, hi);
  }
  qs(0, arr.length - 1);
  steps.push({ description_en: "Array is fully sorted.", array_state: [...arr], highlight_indices: [], active_line: -1 });
  return steps;
}

export function simulateMergeSort(data: number[]): LogicStep[] {
  const arr = [...data];
  const steps: LogicStep[] = [];
  steps.push({ description_en: "Initial array.", array_state: [...arr], highlight_indices: [], active_line: 1 });

  function ms(a: number[], lo: number, hi: number) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    steps.push({ description_en: `Split [${lo}..${hi}] into [${lo}..${mid}] and [${mid+1}..${hi}].`, array_state: [...arr], highlight_indices: [lo, mid, hi], active_line: 3 });
    ms(a, lo, mid);
    ms(a, mid + 1, hi);
    // Merge
    const left = a.slice(lo, mid + 1);
    const right = a.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) { a[k++] = left[i++]; }
      else { a[k++] = right[j++]; }
    }
    while (i < left.length) a[k++] = left[i++];
    while (j < right.length) a[k++] = right[j++];
    // Copy back to arr
    for (let x = lo; x <= hi; x++) arr[x] = a[x];
    steps.push({ description_en: `Merged [${lo}..${hi}] → [${arr.slice(lo, hi+1).join(', ')}].`, array_state: [...arr], highlight_indices: Array.from({length: hi-lo+1}, (_,idx) => lo+idx), active_line: 6 });
  }
  ms(arr, 0, arr.length - 1);
  steps.push({ description_en: "Array is fully sorted.", array_state: [...arr], highlight_indices: [], active_line: -1 });
  return steps;
}
