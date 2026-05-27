export function lisSteps(arr) {

  const n = arr.length;

  const dp = Array(n).fill(1);
const parent = Array(n).fill(-1);

  let steps = [];

  for (let i = 1; i < n; i++) {

    for (let j = 0; j < i; j++) {

      steps.push({
        type: "compare",
        array: [...arr],
        dp: [...dp],
        active: [j, i],
        message: `Comparing ${arr[j]} and ${arr[i]}`
      });

      if (arr[j] < arr[i]) {

        if (dp[j] + 1 > dp[i]) {

          dp[i] = dp[j] + 1;
          parent[i]=j;

          steps.push({
            type: "update",
            array: [...arr],
            dp: [...dp],
            active: [j, i],
            message: `Updating dp[${i}] = ${dp[i]}`
          });
        }
      }
    }
  }

  let lisLength = Math.max(...dp);

let index = dp.indexOf(lisLength);

let sequence = [];

while (index !== -1) {

  sequence.push(arr[index]);
  index = parent[index];
}

sequence.reverse();

  steps.push({
    type: "result",
    array: [...arr],
    dp: [...dp],
    message:
  `LIS Length = ${lisLength} | Sequence = ${sequence.join(" → ")}`
  });

  return steps;
}