export function mcmSteps(arr) {

  const n = arr.length;

  const dp = Array.from({ length: n }, () =>
    Array(n).fill(0)
  );

  let steps = [];

  for (let len = 2; len < n; len++) {

    for (let i = 1; i < n - len + 1; i++) {

      let j = i + len - 1;

      dp[i][j] = Infinity;

      for (let k = i; k < j; k++) {

        const cost =
          dp[i][k] +
          dp[k + 1][j] +
          arr[i - 1] * arr[k] * arr[j];

        steps.push({
          type: "partition",
          table: dp.map(row => [...row]),
          i,
          j,
          k,
          cost,
          dims: [...arr],
          message:
            `Splitting at k=${k} | Cost = ${cost}`
        });

        if (cost < dp[i][j]) {

          dp[i][j] = cost;

          steps.push({
            type: "update",
            table: dp.map(row => [...row]),
            i,
            j,
            k,
            cost,
            dims: [...arr],
            message:
              `Updating dp[${i}][${j}] = ${cost}`
          });
        }
      }
    }
  }

  steps.push({
    type: "result",
    table: dp,
    dims: [...arr],
    message:
      `Minimum Cost = ${dp[1][n - 1]}`
  });

  return steps;
}