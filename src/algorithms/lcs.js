export function lcsSteps(str1, str2) {

  const n = str1.length;
  const m = str2.length;

  const dp = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill(0)
  );

  let steps = [];

  for (let i = 1; i <= n; i++) {

    for (let j = 1; j <= m; j++) {

      if (str1[i - 1] === str2[j - 1]) {

        dp[i][j] = dp[i - 1][j - 1] + 1;

        steps.push({
          type: "match",
          table: dp.map(row => [...row]),
          i,
          j,
          char1: str1[i - 1],
          char2: str2[j - 1],
          str1,
          str2,
          message: `Match '${str1[i - 1]}' → dp[${i}][${j}] = ${dp[i][j]}`
        });

      } else {

        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);

        steps.push({
          type: "nomatch",
          table: dp.map(row => [...row]),
          i,
          j,
          char1: str1[i - 1],
          char2: str2[j - 1],
          str1,
          str2,
          message: `No match → max(top, left)`
        });
      }
    }
  }  
  let lcs = "";

  let i = n;
  let j = m;

  while (i > 0 && j > 0) {

    if (str1[i - 1] === str2[j - 1]) {

      lcs = str1[i - 1] + lcs;
      i--;
      j--;

    } else if (dp[i - 1][j] > dp[i][j - 1]) {

      i--;

    } else {

      j--;
    }
  }

  steps.push({
    type: "result",
    table: dp,
    str1,
    str2,
   message: `LCS Length = ${dp[n][m]} | Sequence = ${lcs}`
  });

  return steps;
}