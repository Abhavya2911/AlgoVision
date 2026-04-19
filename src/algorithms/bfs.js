export function bfsSteps(graph, start) {
  let steps = [];
  let visited = new Set();
  let queue = [start];

  visited.add(start);

  while (queue.length > 0) {
    let node = queue.shift();

    steps.push({
      type: "visit",
      node,
      queue: [...queue],
      visited: [...visited],
      message: `Visiting ${node}`
    });

    for (let neighbor of graph[node] || []){
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        steps.push({
          type: "enqueue",
          node: neighbor,
          queue: [...queue],
          visited: [...visited],
          message: `Adding ${neighbor} to queue`
        });
      }
    }
  }

  return steps;
}