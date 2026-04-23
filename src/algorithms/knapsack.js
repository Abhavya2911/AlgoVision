export function knapsackSteps(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );

  let steps = [];

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {

      if (weights[i - 1] <= w) {
        const include = values[i - 1] + dp[i - 1][w - weights[i - 1]];
        const exclude = dp[i - 1][w];

        dp[i][w] = Math.max(include, exclude);

        steps.push({
          type: "choice",
          table: dp.map(row => [...row]),
          i,
          w,
          message: `Max of include (${include}) and exclude (${exclude})`
        });

      } else {
        dp[i][w] = dp[i - 1][w];

        steps.push({
          type: "skip",
          table: dp.map(row => [...row]),
          i,
          w,
          message: `Weight too large, skip item`
        });
      }
    }
  }

  steps.push({
    type: "result",
    table: dp,
    message: `Max Profit = ${dp[n][capacity]}`
  });

  return steps;
}