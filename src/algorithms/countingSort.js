export function countingSortSteps(arr) {
  let steps = [];
  let max = Math.max(...arr);

  let count = new Array(max + 1).fill(0);

  // count frequency
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;

    steps.push({
      type: "count",
      array: [...arr],
      active: [i],
      message: `Counting ${arr[i]}`
    });
  }

  // rebuild array
  let sorted = [];
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      sorted.push(i);
      count[i]--;

      steps.push({
        type: "rebuild",
        array: [...sorted],
        message: `Placing ${i}`
      });
    }
  }

  return steps;
}