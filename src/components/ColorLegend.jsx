export default function ColorLegend() {
  const item = (color, text) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{
        width: "20px",
        height: "20px",
        background: color,
        borderRadius: "4px"
      }}></div>
      <span>{text}</span>
    </div>
  );

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Legend</h3>
      {item("#facc15", "Compare")}
      {item("#ef4444", "Swap")}
      {item("#22c55e", "Found / Sorted")}
      {item("#a855f7", "Merge")}
      {item("#38bdf8", "Pivot")}
    </div>
  );
}