export function linearSearchSteps(arr, target) {
  let steps = [];
  let comparisons = 0;

  for (let i = 0; i < arr.length; i++) {
    comparisons++;

    steps.push({
      type: "compare",
      array: [...arr],
      active: [i],
      message: `Checking ${arr[i]}`,
      metrics: { comparisons }
    });

    if (arr[i] === target) {
      steps.push({
        type: "found",
        array: [...arr],
        active: [i],
        message: `Found ${target} at index ${i}`
      });
      break;
    }
  }

  return steps;
}