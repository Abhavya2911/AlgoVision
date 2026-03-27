export function quickSortSteps(arr) {
  let steps = [];
  let comparisons = 0;
  let swaps = 0;
  let worstCase = isSorted(arr);

  function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

  function quickSort(a, low, high) {
    if (low >= high) return;

    let pivotIndex = partition(a, low, high);

    quickSort(a, low, pivotIndex - 1);
    quickSort(a, pivotIndex + 1, high);
  }

  function partition(a, low, high) {
    let pivot = a[high];

    steps.push({
      type: "pivot",
      array: [...a],
      active: [high],
      message: `Choosing pivot ${pivot}`,
      metrics: { comparisons, swaps }
    });

    let i = low;

    for (let j = low; j < high; j++) {
      comparisons++;

      steps.push({
        type: "compare",
        array: [...a],
        active: [j, high],
        message: `Comparing ${a[j]} with pivot ${pivot}`,
        metrics: { comparisons, swaps }
      });

      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        swaps++;

        steps.push({
          type: "swap",
          array: [...a],
          active: [i, j],
          message: `Swapping ${a[i]} and ${a[j]}`,
          metrics: { comparisons, swaps }
        });

        i++;
      }
    }

    [a[i], a[high]] = [a[high], a[i]];
    swaps++;

    steps.push({
      type: "swap",
      array: [...a],
      active: [i, high],
      message: `Placing pivot ${pivot} at correct position`,
      metrics: { comparisons, swaps }
    });

    return i;
  }

  quickSort(arr, 0, arr.length - 1);

  return {
  steps,
  complexity: worstCase ? "O(n²)" : "O(n log n)"
};
}