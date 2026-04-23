import { useState } from "react";

export default function NQueensInput({ setN }) {
  const [input, setInput] = useState("");

  const handleSet = () => {
    const n = Number(input);

    if (!n || n < 1) {
      alert("Enter valid N");
      return;
    }

    if (n > 10) {
      alert("Keep N ≤ 10 for visualization");
      return;
    }

    setN(n);
    alert("N-Queens input set ✅");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>N-Queens Input</h3>

      <input
        type="number"
        placeholder="Enter N (e.g., 4)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button
        onClick={handleSet}
        style={{
          width: "100%",
          padding: "10px",
          background: "orange",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Set N
      </button>
    </div>
  );
}