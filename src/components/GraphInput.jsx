import { useState } from "react";

export default function GraphInput({ setGraph, setStartNode, setDirectedGraph }) {
  const [edges, setEdges] = useState("");
  const [start, setStart] = useState("");
  const [directed, setDirected] = useState(false);

  const buildGraph = () => {
    const g = {};

    const edgeList = edges.split(",");

    edgeList.forEach((edge) => {
      if (!edge.includes("-")) return;

      const [u, v] = edge.trim().split("-");

      if (!u || !v) return;

      if (!g[u]) g[u] = [];
      if (!g[v]) g[v] = [];

      g[u].push(v);

      if (!directed) {
        g[v].push(u);
      }
    });

    console.log("GRAPH:", g);

    setGraph(g);
    setDirectedGraph(directed);
    setStartNode(start.trim());

    alert("Graph built successfully ✅");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Graph Input</h3>

      {/* EDGES INPUT */}
      <input
        type="text"
        placeholder="Edges (A-B, A-C, B-D)"
        value={edges}
        onChange={(e) => setEdges(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #444",
          background: "#111",
          color: "white"
        }}
      />

      {/* START NODE */}
      <input
        type="text"
        placeholder="Start Node (A)"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #444",
          background: "#111",
          color: "white"
        }}
      />

      {/* DIRECTED BUTTON */}
      <button
        onClick={() => setDirected(!directed)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          background: directed ? "#38bdf8" : "#333",
          color: "white",
          marginBottom: "10px"
        }}
      >
        {directed ? "Directed Graph" : "Undirected Graph"}
      </button>

      {/* BUILD BUTTON */}
      <button
        onClick={buildGraph}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          background: "orange",
          color: "black",
          fontWeight: "bold"
        }}
      >
        Build Graph
      </button>
    </div>
  );
}