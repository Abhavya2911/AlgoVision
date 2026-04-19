import { useState } from "react";

export default function GraphInput({ setGraph, setStartNode }) {
  const [edges, setEdges] = useState("");
  const [directed, setDirected] = useState(false);
  const [start, setStart] = useState("");

  const buildGraph = () => {
    const graph = {};

    const edgeList = edges.split(",");

    edgeList.forEach(edge => {
      const [u, v] = edge.trim().split("-");

      if (!graph[u]) graph[u] = [];
      if (!graph[v]) graph[v] = [];

      graph[u].push(v);

      if (!directed) {
        graph[v].push(u);
      }
    });

    setGraph(graph);
    setStartNode(start);
  };

  return (
    <div>
      <h4>Graph Input</h4>

      <input
        placeholder="Edges (A-B, A-C)"
        value={edges}
        onChange={(e) => setEdges(e.target.value)}
      />

      <input
        placeholder="Start Node"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={directed}
          onChange={() => setDirected(!directed)}
        />
        Directed
      </label>

      <button onClick={buildGraph}>Build Graph</button>
    </div>
  );
}