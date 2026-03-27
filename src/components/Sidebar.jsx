import InputPanel from "./InputPanel";

export default function Sidebar({ setArray, setAlgorithm ,algorithm}) {
  return (
    <div>
      <h2>DAA Visualizer</h2>

      <InputPanel setArray={setArray} />

      <hr />

     <h4>Sorting</h4>

<p
  className={`algo-item ${algorithm === "merge" ? "active" : ""}`}
  onClick={() => setAlgorithm("merge")}
>
  Merge Sort
</p>

<p
  className={`algo-item ${algorithm === "quick" ? "active" : ""}`}
  onClick={() => setAlgorithm("quick")}
>
  Quick Sort
</p>

<p
  className={`algo-item ${algorithm === "counting" ? "active" : ""}`}
  onClick={() => setAlgorithm("counting")}
>
  Counting Sort
</p>

<h4>Searching</h4>

<p
  className={`algo-item ${algorithm === "linear" ? "active" : ""}`}
  onClick={() => setAlgorithm("linear")}
>
  Linear Search
</p>

<p
  className={`algo-item ${algorithm === "binary" ? "active" : ""}`}
  onClick={() => setAlgorithm("binary")}
>
  Binary Search
</p>

<h4>Trees</h4>

<p
  className={`algo-item ${algorithm === "bst" ? "active" : ""}`}
  onClick={() => setAlgorithm("bst")}
>
  BST
</p>

<p
  className={`algo-item ${algorithm === "avl" ? "active" : ""}`}
  onClick={() => setAlgorithm("avl")}
>
  AVL
</p>

<h4>Graphs</h4>

<p
  className={`algo-item ${algorithm === "bfs" ? "active" : ""}`}
  onClick={() => setAlgorithm("bfs")}
>
  BFS
</p>

<p
  className={`algo-item ${algorithm === "dfs" ? "active" : ""}`}
  onClick={() => setAlgorithm("dfs")}
>
  DFS
</p>
 </div>
  );
}