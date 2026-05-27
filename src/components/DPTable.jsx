export default function DPTable({ step }) {

  if (!step?.table) return <p>No DP Data</p>;

  return (
    <div style={{
  textAlign: "center",
  width: "100%",
  overflowX: "auto",
  padding: "10px"
}}>

      <h3>{step.message}</h3>

      {/* 🔥 LCS STRING LABELS */}
      {step.str1 && (
        <div style={{ marginBottom: "10px", color: "#38bdf8" }}>
          String 1: {step.str1}
        </div>
      )}

      {step.str2 && (
        <div style={{ marginBottom: "10px", color: "#facc15" }}>
          String 2: {step.str2}
        </div>
      )}
<div style={{
  display: "inline-block",
  minWidth: "max-content"
}}>
      {/* 🔥 DP TABLE */}
      {step.table.map((row, rowIndex) => (

        <div
          key={rowIndex}
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >

          {row.map((cell, colIndex) => {

            const isActive =
              rowIndex === step.i &&
              colIndex === step.j;

            let bg = "#1e293b";

            // 🔥 LCS COLORS
            if (isActive) {

              if (step.type === "match") {
                bg = "#22c55e";
              }

              else if (step.type === "nomatch") {
                bg = "#ef4444";
              }

              // 🔥 KNAPSACK COLORS
              else if (step.type === "choice") {
                bg = "#38bdf8";
              }

              else if (step.type === "skip") {
                bg = "#facc15";
              }
            }

            return (
              <div
                key={colIndex}
                style={{
                  width: "45px",
                  height: "45px",
                  border: "1px solid #555",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: bg,
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                {cell}
              </div>
            );
          })}
        </div>

      ))}
</div>
    </div>
  );
}