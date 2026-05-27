import { useState } from "react";

export default function MCMInput({ setMcmArray }) {

  const [input, setInput] = useState("");

  const handleSet = () => {

    const arr = input.split(",").map(Number);

    if (arr.length < 2) {
      alert("Enter valid dimensions!");
      return;
    }

    setMcmArray(arr);

    alert("MCM Input Set ✅");
  };

  return (
    <div style={{ marginTop: "20px" }}>

      <h3>MCM Input</h3>

      <input
        type="text"
        placeholder="10,20,30,40"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px"
        }}
      />

      <button
        onClick={handleSet}
        style={{
          width: "100%",
          padding: "10px",
          background: "orange",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold"
        }}
      >
        Set Input
      </button>

    </div>
  );
}