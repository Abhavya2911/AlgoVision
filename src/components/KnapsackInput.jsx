import { useState } from "react";

export default function KnapsackInput({ setWeights, setValues, setCapacity }) {
  const [w, setW] = useState("");
  const [v, setV] = useState("");
  const [cap, setCap] = useState("");

  const handleSet = () => {
    const weights = w.split(",").map(Number);
    const values = v.split(",").map(Number);

    if (weights.length !== values.length) {
      alert("Weights and Values must be same length!");
      return;
    }

    setWeights(weights);
    setValues(values);
    setCapacity(Number(cap));

    alert("Knapsack input set ✅");
  };

  return (
    <div>
      <h4>Knapsack Input</h4>

      <input
        placeholder="Weights (1,3,4)"
        value={w}
        onChange={(e) => setW(e.target.value)}
      />

      <input
        placeholder="Values (15,20,30)"
        value={v}
        onChange={(e) => setV(e.target.value)}
      />

      <input
        placeholder="Capacity (4)"
        value={cap}
        onChange={(e) => setCap(e.target.value)}
      />

      <button onClick={handleSet}>Set Input</button>
    </div>
  );
}