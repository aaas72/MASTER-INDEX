import { LogicStep } from "@/types/algorithm";

export function simulateBinarySearch(data: number[]): LogicStep[] {
  const arr = [...data].sort((a, b) => a - b);
  const target = arr[Math.floor(arr.length * 0.7)]; // Pick a target that exists
  const steps: LogicStep[] = [];
  let low = 0, high = arr.length - 1;
  steps.push({ description_en: `Sorted array. Target: ${target}. Search range: [${low}, ${high}].`, array_state: [...arr], highlight_indices: [], pointers: { low, high, mid: -1 }, active_line: 2 });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({ description_en: `Mid = ${mid}, arr[${mid}] = ${arr[mid]}. Compare with target ${target}.`, array_state: [...arr], highlight_indices: [mid], pointers: { low, high, mid }, pivot_index: mid, partition_range: [low, high], active_line: 4 });
    if (arr[mid] === target) {
      steps.push({ description_en: `Found target ${target} at index ${mid}!`, array_state: [...arr], highlight_indices: [mid], pointers: { low, high, mid }, pivot_index: mid, active_line: 5 });
      return steps;
    } else if (arr[mid] < target) {
      low = mid + 1;
      steps.push({ description_en: `arr[${mid}]=${arr[mid]} < ${target}. Move low to ${low}.`, array_state: [...arr], highlight_indices: [mid], pointers: { low, high, mid }, partition_range: [low, high], active_line: 6 });
    } else {
      high = mid - 1;
      steps.push({ description_en: `arr[${mid}]=${arr[mid]} > ${target}. Move high to ${high}.`, array_state: [...arr], highlight_indices: [mid], pointers: { low, high, mid }, partition_range: [low, high], active_line: 7 });
    }
  }
  steps.push({ description_en: `Target ${target} not found.`, array_state: [...arr], highlight_indices: [], active_line: 9 });
  return steps;
}

export function simulateLinearSearch(data: number[]): LogicStep[] {
  const arr = [...data];
  const target = arr[Math.floor(arr.length * 0.6)];
  const steps: LogicStep[] = [];
  steps.push({ description_en: `Array loaded. Target: ${target}.`, array_state: [...arr], highlight_indices: [], active_line: 1 });

  for (let i = 0; i < arr.length; i++) {
    steps.push({ description_en: `Check index ${i}: arr[${i}]=${arr[i]}. Is it ${target}?`, array_state: [...arr], highlight_indices: [i], pivot_index: i, active_line: 3 });
    if (arr[i] === target) {
      steps.push({ description_en: `Found ${target} at index ${i}!`, array_state: [...arr], highlight_indices: [i], pivot_index: i, active_line: 3 });
      return steps;
    }
  }
  steps.push({ description_en: `Target ${target} not found.`, array_state: [...arr], highlight_indices: [], active_line: 5 });
  return steps;
}

export function simulateJumpSearch(data: number[]): LogicStep[] {
  const arr = [...data].sort((a, b) => a - b);
  const target = arr[Math.floor(arr.length * 0.65)];
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  const steps: LogicStep[] = [];
  steps.push({ description_en: `Sorted array. Target: ${target}. Block size: √${n} ≈ ${step}.`, array_state: [...arr], highlight_indices: [], active_line: 2 });

  let prev = 0;
  let curr = step;
  while (curr < n && arr[Math.min(curr, n) - 1] < target) {
    steps.push({ description_en: `Jump: block [${prev}, ${Math.min(curr,n)-1}]. arr[${Math.min(curr,n)-1}]=${arr[Math.min(curr,n)-1]} < ${target}. Jump forward.`, array_state: [...arr], highlight_indices: [prev, Math.min(curr,n)-1], partition_range: [prev, Math.min(curr,n)-1], active_line: 5 });
    prev = curr;
    curr += step;
  }
  steps.push({ description_en: `Block found: [${prev}, ${Math.min(curr,n)-1}]. Start linear scan.`, array_state: [...arr], highlight_indices: [prev], partition_range: [prev, Math.min(curr,n)-1], active_line: 8 });

  for (let i = prev; i < Math.min(curr, n); i++) {
    steps.push({ description_en: `Linear check: arr[${i}]=${arr[i]} === ${target}?`, array_state: [...arr], highlight_indices: [i], pivot_index: i, active_line: 9 });
    if (arr[i] === target) {
      steps.push({ description_en: `Found ${target} at index ${i}!`, array_state: [...arr], highlight_indices: [i], active_line: 12 });
      return steps;
    }
  }
  steps.push({ description_en: `Target ${target} not found.`, array_state: [...arr], highlight_indices: [], active_line: 13 });
  return steps;
}
