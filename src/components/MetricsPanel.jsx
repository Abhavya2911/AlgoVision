export default function MetricsPanel({ metrics, algorithm }) {
  
  const complexityData = {
  merge: {
    time: "O(n log n)",
    space: "O(n)"
  },
  quick: {
    time: "O(n log n) avg, O(n²) worst",
    space: "O(log n)"
  },
  linear: {
    time: "O(n)",
    space: "O(1)"
  },
  binary: {
    time: "O(log n)",
    space: "O(1)"
  },
  counting: {
    time: "O(n + k)",
    space: "O(k)"
  }
};

  const current = complexityData[algorithm] || complexityData["merge"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

      <h3>Metrics</h3>

      <div style={boxStyle}>
        <p>Comparisons</p>
        <strong>{metrics.comparisons || 0}</strong>
      </div>

      <div style={boxStyle}>
        <p>Swaps</p>
        <strong>{metrics.swaps || 0}</strong>
      </div>

      <h3>Complexity</h3>

      <div style={boxStyle}>
        <p>Time</p>
        <strong>{current.time}</strong>
      </div>

      <div style={boxStyle}>
        <p>Space</p>
        <strong>{current.space}</strong>
      </div>

    </div>
  );
}

const boxStyle = {
  padding: "10px",
  border: "1px solid #444",
  borderRadius: "8px",
  background: "#111",
  textAlign: "center"
};