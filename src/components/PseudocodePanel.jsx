export default function PseudocodePanel({ algorithm, stepType }) {

  const data = {

    merge: [
      "if (l >= r) return",
      "find mid",
      "sort left half",
      "sort right half",
      "merge both halves"
    ],

    quick: [
      "choose pivot",
      "partition array",
      "place pivot correctly",
      "sort left part",
      "sort right part"
    ],

    linear: [
      "for each element",
      "compare with target",
      "if equal → found",
      "else continue"
    ],

    binary: [
      "sort array",
      "find middle element",
      "compare with target",
      "go left or right",
      "repeat until found"
    ],

    counting: [
      "find max element",
      "create count array",
      "store frequency",
      "rebuild sorted array"
    ]

  };

  const code = data[algorithm] || data["merge"];

  return (
    <div>
      <h3>Pseudocode</h3>

      {code.map((line, i) => {

        let highlight = false;

        if (algorithm === "merge") {
          if (stepType === "split" && i === 1) highlight = true;
          if (stepType === "compare" && i === 4) highlight = true;
          if (stepType === "merge" && i === 4) highlight = true;
        }

        if (algorithm === "quick") {
          if (stepType === "pivot" && i === 0) highlight = true;
          if (stepType === "compare" && i === 1) highlight = true;
          if (stepType === "swap" && i === 2) highlight = true;
        }

        if (algorithm === "linear") {
          if (stepType === "compare" && i === 1) highlight = true;
          if (stepType === "found" && i === 2) highlight = true;
        }

        if (algorithm === "binary") {
          if (stepType === "compare" && i === 2) highlight = true;
        }

        if (algorithm === "counting") {
          if (stepType === "count" && i === 2) highlight = true;
          if (stepType === "rebuild" && i === 3) highlight = true;
        }

        return (
          <div
            key={i}
            style={{
              padding: "6px",
              margin: "2px 0",
              borderRadius: "5px",
              background: highlight ? "#334155" : "transparent",
              color: highlight ? "#facc15" : "#e2e8f0",
              transition: "0.2s"
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
}