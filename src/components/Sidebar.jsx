import InputPanel from "./InputPanel";
import GraphInput from "./GraphInput";
import KnapsackInput from "./KnapsackInput";
import NQueensInput from "./NQueensInput";

export default function Sidebar({ setArray, setAlgorithm, algorithm, setGraph, setStartNode, setDirectedGraph, setWeights, setValues, setCapacity, setNQueensSize }) {
  return (
    <div>
      <h2>DAA Visualizer</h2>

    {algorithm === "nqueens" ? (
  <NQueensInput setN={setNQueensSize} />
) : 
     (algorithm === "knapsack" )? (
  <KnapsackInput
    setWeights={setWeights}
    setValues={setValues}
    setCapacity={setCapacity}
  />
) : (algorithm === "bfs" || algorithm === "dfs") ? (
  <GraphInput
    setGraph={setGraph}
    setStartNode={setStartNode}
    setDirectedGraph={setDirectedGraph}
  />
) : (
  <InputPanel setArray={setArray} />
)}
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

 <h4>DP</h4>

 <p
   className={`algo-item ${algorithm=="knapsack" ? "active" : ""}`}
    onClick={()=> setAlgorithm("knapsack")}
  >
    0/1 Knapsack
  </p>

<h4>Backtracking</h4>
   <p
   className={`algo-item ${algorithm=="nqueens" ? "active" : ""}`}
    onClick={()=> setAlgorithm("nqueens")}
  >
    N-Queens
      </p>
 </div>


  );
}