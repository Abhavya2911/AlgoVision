export function quickSortSteps(arr) {
  let steps = [];
  let comparisons = 0;

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
      message: `Choosing pivot ${pivot}`
    });

    let i = low;

    for (let j = low; j < high; j++) {
      comparisons++;

      steps.push({
        type: "compare",
        array: [...a],
        active: [j, high],
        message: `Comparing ${a[j]} with pivot ${pivot}`,
        metrics: { comparisons }
      });

      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];

        steps.push({
          type: "swap",
          array: [...a],
          active: [i, j],
          message: `Swapping ${a[i]} and ${a[j]}`
        });

        i++;
      }
    }

    [a[i], a[high]] = [a[high], a[i]];

    steps.push({
      type: "swap",
      array: [...a],
      active: [i, high],
      message: `Placing pivot ${pivot} at correct position`
    });

    return i;
  }

  quickSort(arr, 0, arr.length - 1);

  return steps;
}