export default function NQueensBoard({ step }) {
  if (!step?.board) return <p>No board data</p>;

  return (
    <div style={{ textAlign: "center" }}>

      <h3>{step.message}</h3>

      <div style={{ display: "inline-block" }}>
        {step.board.map((row, i) => (
          <div key={i} style={{ display: "flex" }}>
            {row.map((cell, j) => (
              <div
                key={j}
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    (i + j) % 2 === 0 ? "#eee" : "#666",
                  color: cell ? "red" : "black",
                  fontSize: "24px",
                  border: "1px solid #333"
                }}
              >
                {cell ? "♛" : ""}
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}