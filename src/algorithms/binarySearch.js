export function binarySearchSteps(arr, target) {
  let steps = [];
  let comparisons = 0;

  let a = [...arr].sort((x, y) => x - y);

  let l = 0, r = a.length - 1;

  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    comparisons++;

    steps.push({
      type: "compare",
      array: [...a],
      active: [mid],
      message: `Checking middle ${a[mid]}`,
      metrics: { comparisons }
    });

    if (a[mid] === target) {
      steps.push({
        type: "found",
        array: [...a],
        active: [mid],
        message: `Found ${target}`
      });
      break;
    }

    else if (a[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return steps;
}