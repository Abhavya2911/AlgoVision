import "../styles/array.css";

export default function ArrayVisualizer({ array = [], active = [], stepType }) {
  return (
    <div className="array-container">
      {array.length === 0 ? (
  <p>No array data</p>
) : (
  array.map((val, i) => {
    const isActive = active?.includes(i);

    let className = "box";

    if (isActive) {
      if (stepType === "compare") {
        className += " active";
      } 
      else if (stepType === "merge") {
        className += " active";
      } 
      else if (stepType === "swap") {
        className += " swap";
      } 
      else if (stepType === "pivot") {
        className += " pivot";
      }
      else if (stepType === "found") {
  className += " found";
}
    }

    return (
      <div
        key={i}
        className={className}
        style={{
          transform: isActive ? "scale(1.2)" : "scale(1)"
        }}
      >
        {val}
      </div>
    );
  })
)}
</div>
  );
}

