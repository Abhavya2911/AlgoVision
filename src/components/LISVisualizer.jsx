export default function LISVisualizer({ step }) {

  if (!step?.array) return <p>No LIS Data</p>;

  return (
    <div style={{ textAlign: "center" }}>

      <h3>{step.message}</h3>

      {/* ORIGINAL ARRAY */}
      <div style={{ marginBottom: "20px" }}>

        <h4 style={{ color: "#38bdf8" }}>Array</h4>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap"
        }}>
          {step.array.map((num, idx) => {

            const active = step.active?.includes(idx);

            return (
              <div
                key={idx}
                style={{
                  width: "50px",
                  height: "50px",
                  background: active
                    ? "#facc15"
                    : "#1e293b",
                  color: active
                    ? "black"
                    : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  fontWeight: "bold"
                }}
              >
                {num}
              </div>
            );
          })}
        </div>
      </div>

      {/* DP ARRAY */}
      <div>

        <h4 style={{ color: "#22c55e" }}>DP Array</h4>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap"
        }}>
          {step.dp.map((num, idx) => {

            const active = step.active?.includes(idx);

            return (
              <div
                key={idx}
                style={{
                  width: "50px",
                  height: "50px",
                  background:
                    step.type === "update" && active
                      ? "#22c55e"
                      : "#334155",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                  fontWeight: "bold"
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}