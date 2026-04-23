export default function DPTable({ step }) {
  if (!step?.table) return <p>No DP data</p>;

  return (
    <div style={{ textAlign: "center" }}>
      
      <h3>{step.message}</h3>

      <div>
        {step.table.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            {row.map((cell, j) => (
              <div
                key={j}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #555",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    i === step.i && j === step.w
                      ? "#38bdf8"
                      : "#1e293b",
                  color: "white"
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}