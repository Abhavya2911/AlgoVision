import "../styles/array.css";

export default function ArrayVisualizer({ array = [], active = [], stepType, range }) {
  return (
    <div className="array-container">
      {array.length === 0 ? (
        <p>No array data</p>
      ) : (
        array.map((val, i) => {
          const isActive = active?.includes(i);

          // 🔥 RANGE LOGIC (NEW)
          const inRange = range
            ? i >= range[0] && i <= range[1]
            : false;

          let className = "box";

          // 🔥 RANGE STYLE (light highlight)
          if (inRange) {
            className += " range";
          }

          // 🔥 ACTIVE LOGIC
         if (isActive) {
  switch (stepType) {
    case "compare":
      className += " active";
      break;

    case "merge":
      className += " merge";   // 🔥 FIXED
      break;

    case "swap":
      className += " swap";
      break;

    case "pivot":
      className += " pivot";
      break;

    case "found":
      className += " found";
      break;

    default:
      className += " active";
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