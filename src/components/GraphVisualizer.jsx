
export default function GraphVisualizer({ step, graph, directed }) {

  // 🔥 FIX: use fallback graph
  const graphData = step?.graph || graph || {};

  if (!graphData || Object.keys(graphData).length === 0) {
    return <p>Build a graph first</p>;
  }

  const nodes = Object.keys(graphData);

  const radius = 150;
  const centerX = 250;
  const centerY = 200;

  // 🔥 Position nodes in circle
  const positions = {};
  nodes.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length;
    positions[node] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });

  return (
    <div style={{ textAlign: "center" }}>

      <h3 style={{ color: "#38bdf8" }}>
        Current Node: {step?.node || "-"}
      </h3>

      <svg width="500" height="400">

        <defs>
    <marker
      id="arrow"
      markerWidth="12"
      markerHeight="12"
      refX="18"
      refY="6"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path d="M0,0 L0,12 L12,6 z" fill="#555" />
    </marker>
  </defs>

        {/* 🔥 EDGES (FIXED HERE) */}
        {nodes.map((node) =>
  Array.isArray(graphData[node])
  ? graphData[node].map((neighbor, idx) => {
      const dx = positions[neighbor].x - positions[node].x;
      const dy = positions[neighbor].y - positions[node].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const offsetX = (dx / dist) * 20; // node radius
      const offsetY = (dy / dist) * 20;

      return (
        <line
          key={node + "-" + neighbor + idx}
          x1={positions[node].x}
          y1={positions[node].y}
          x2={positions[neighbor].x - offsetX}
          y2={positions[neighbor].y - offsetY}
          stroke="#555"
          strokeWidth="2"
          markerEnd={directed ? "url(#arrow)" : ""}
        />
      );
    })
  : null
)}

        {/* 🔥 NODES */}
        {nodes.map((node, i) => {
          const isCurrent = node === step?.node;
          const isVisited = step?.visited?.includes(node);

          let fill = "#1e293b";

          if (isCurrent) fill = "#38bdf8";      // current node
          else if (isVisited) fill = "#22c55e"; // visited

          return (
            <g key={i}>
              <circle
                cx={positions[node].x}
                cy={positions[node].y}
                r="20"
                fill={fill}
              />
              <text
                x={positions[node].x}
                y={positions[node].y}
                textAnchor="middle"
                dy=".3em"
                fill="white"
                fontSize="14"
              >
                {node}
              </text>
            </g>
          );
        })}
      </svg>

      {/* 🔥 QUEUE */}
      {step?.queue && (
        <div style={{ color: "#facc15" }}>
          Queue: {step.queue.join(" → ")}
        </div>
      )}

      {/* 🔥 STACK */}
      {step?.stack && (
        <div style={{ color: "#ef4444" }}>
          Stack: {step.stack.join(" → ")}
        </div>
      )}

      <div style={{
  marginTop: "20px",
  padding: "10px",
  background: "#111",
  border: "1px solid #444",
  borderRadius: "8px",
  color: "#22c55e",
  fontWeight: "bold"
}}>
  Traversal: {Array.isArray(step?.visited) ? step.visited.join(" → ") : "—"}
</div>

    </div>

    
  );
}

