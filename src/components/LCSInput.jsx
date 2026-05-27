import { useState } from "react";

export default function LCSInput({ setString1, setString2 }) {

  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");

  const handleSet = () => {

    if (!s1 || !s2) {
      alert("Enter both strings!");
      return;
    }

    setString1(s1);
    setString2(s2);

    alert("LCS Input Set ✅");
  };

  return (
    <div style={{ marginTop: "20px" }}>

      <h3>LCS Input</h3>

      <input
        type="text"
        placeholder="First String"
        value={s1}
        onChange={(e) => setS1(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        type="text"
        placeholder="Second String"
        value={s2}
        onChange={(e) => setS2(e.target.value)}
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
          fontWeight: "bold"
        }}
      >
        Set Input
      </button>

    </div>
  );
}