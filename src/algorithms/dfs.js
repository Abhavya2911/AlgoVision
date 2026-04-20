export function dfsSteps(graph, start) {
  let steps = [];
  let visited = new Set();

  function dfs(node, stack = []) {
    visited.add(node);

    steps.push({
      type: "visit",
      node,
      stack: [...stack, node],
      visited: [...visited],

      graph,
      message: `Visiting ${node}`
    });

    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, [...stack, node]);
      }
    }
  }

  dfs(start);
  return steps;
}