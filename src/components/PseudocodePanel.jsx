export default function PseudocodePanel({ algorithm }) {

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

      {code.map((line, i) => (
        <div key={i} style={{ padding: "4px" }}>
          {line}
        </div>
      ))}
    </div>
  );
}