import "../styles/tree.css";

function TreeNode({ node, activeNode }) {
  if (!node) return null;

  const isActive = node?.id === activeNode;

  return (
    <div className="tree-node-container">

      <div
        className="tree-node"
        style={{
          background: isActive ? "black" : "#020617",
          color: isActive ? "white" : "white",
          transform: isActive ? "scale(1.1)" : "scale(1)"
        }}
      >
        [{node.value.join(", ")}]
      </div>

      {(node.left || node.right) && (
        <div className="children">

          <div className="child">
            <TreeNode node={node.left} activeNode={activeNode} />
          </div>

          <div className="child">
            <TreeNode node={node.right} activeNode={activeNode} />
          </div>

        </div>
      )}
    </div>
  );
}

export default function RecursionTree({ tree, activeNode }) {
  return (
    <div className="tree-wrapper">
      <TreeNode node={tree} activeNode={activeNode} />
    </div>
  );
}