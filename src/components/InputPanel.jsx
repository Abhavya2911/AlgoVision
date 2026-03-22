import { useState } from "react";

export default function InputPanel({ setArray }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input) return;

    try {
      const arr = input
        .split(",")
        .map((x) => parseInt(x.trim()))
        .filter((x) => !isNaN(x));

      if (arr.length === 0) {
        alert("Invalid input!");
        return;
      }

      setArray(arr);
    } catch (err) {
      alert("Error in input!");
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter numbers (e.g. 4,2,7,1)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: "8px",
          width: "200px",
          marginRight: "10px"
        }}
      />

      <button onClick={handleSubmit}>Set Input</button>
    </div>
  );
}