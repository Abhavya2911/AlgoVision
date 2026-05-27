export default function MCMVisualizer({ step }) {

  if (!step?.table) return <p>No MCM Data</p>;

  return (
    <div style={{
      textAlign: "center",
      overflowX: "auto",
      padding: "10px"
    }}>

      <h3>{step.message}</h3>

      {/* MATRIX INFO */}
      <div style={{
        marginBottom: "20px",
        color: "#38bdf8",
        fontWeight: "bold"
      }}>
        Dimensions: {step.dims.join(" → ")}
      </div>

      {/* DP TABLE */}
      <div style={{
        display: "inline-block",
        minWidth: "max-content"
      }}>

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

              if (isActive) {

                if (step.type === "partition")
                  bg = "#facc15";

                if (step.type === "update")
                  bg = "#22c55e";
              }

              return (
                <div
                  key={colIndex}
                  style={{
                    width: "55px",
                    height: "55px",
                    border: "1px solid #555",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: bg,
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  {cell === Infinity ? "∞" : cell}
                </div>
              );
            })}
          </div>

        ))}

      </div>

      {/* CURRENT PARTITION */}
      {step.k !== undefined && (

        <div style={{
          marginTop: "20px",
          color: "#f97316",
          fontWeight: "bold"
        }}>
          Current Partition k = {step.k}
        </div>

      )}

    </div>
  );
}