export default function GraphVisualizer({ step }) {
  if (!step) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Current Node: {step.node}</h3>

      <div>
        <strong>Visited:</strong> {step.visited?.join(", ")}
      </div>

      {step.queue && (
        <div>
          <strong>Queue:</strong> {step.queue.join(" → ")}
        </div>
      )}

      {step.stack && (
        <div>
          <strong>Stack:</strong> {step.stack.join(" → ")}
        </div>
      )}
    </div>
  );
}