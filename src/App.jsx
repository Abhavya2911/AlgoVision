import React, { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Sidebar from "./components/Sidebar";
import ArrayVisualizer from "./components/ArrayVisualizer";
import Controls from "./components/Controls";
import RecursionTree from "./components/RecursionTree"; 
import { mergeSortSteps } from "./algorithms/mergeSort";
import MetricsPanel from "./components/MetricsPanel";
import PseudocodePanel from "./components/PseudocodePanel";
import { quickSortSteps } from "./algorithms/quickSort";
import { linearSearchSteps } from "./algorithms/linearSearch";
import { binarySearchSteps } from "./algorithms/binarySearch";
import { countingSortSteps } from "./algorithms/countingSort";
import ColorLegend from "./components/ColorLegend";
import GraphVisualizer from "./components/GraphVisualizer";
import { bfsSteps } from "./algorithms/bfs";
import { dfsSteps } from "./algorithms/dfs";
import { knapsackSteps } from "./algorithms/knapsack";
import DPTable from "./components/DPTable";
import { nQueensSteps } from "./algorithms/nqueens";
import NQueensBoard from "./components/NQueensBoard";
import { lcsSteps } from "./algorithms/lcs";
import LCSInput from "./components/LCSInput";
import { lisSteps } from "./algorithms/lis";
import LISVisualizer from "./components/LISVisualizer";
import { mcmSteps } from "./algorithms/mcm";
import MCMVisualizer from "./components/MCMVisualizer";

export default function App() {
  const [array, setArray] = useState([4, 2, 7, 1, 5, 3]);
  const [steps, setSteps] = useState([]);
  const [i, setI] = useState(0);
const [intervalId, setIntervalId] = useState(null);
const [speed, setSpeed] = useState(800);
const [algorithm, setAlgorithm] = useState("merge");
const [complexity, setComplexity] = useState("");
const [graph, setGraph] = useState({});
const [startNode, setStartNode] = useState("");
const [isDirected, setIsDirected] = useState(false);
const [weights, setWeights] = useState([]);
const [values, setValues] = useState([]);
const [capacity, setCapacity] = useState(0);
const [nQueensSize, setNQueensSize] = useState(4);
const [string1, setString1] = useState("");
const [string2, setString2] = useState("");
const [mcmArray, setMcmArray] = useState([]);

const start = () => {
  let result = { steps: [], complexity: "" };

  if (algorithm === "merge") {
    result = { steps: mergeSortSteps([...array]), complexity: "O(n log n)" };
  } 
  else if (algorithm === "quick") {
    result = quickSortSteps([...array]);
  }
  else if (algorithm === "linear") {
    const target = Number(prompt("Enter target"));
    result = { steps: linearSearchSteps([...array], target), complexity: "O(n)" };
  }
  else if (algorithm === "binary") {
    const target = Number(prompt("Enter target"));
    result = { steps: binarySearchSteps([...array], target), complexity: "O(log n)" };
  }
  else if (algorithm === "counting") {
    result = { steps: countingSortSteps([...array]), complexity: "O(n + k)" };
  }
  else if (algorithm === "bfs") {
  if (!graph || Object.keys(graph).length === 0 || !startNode) {
    alert("Please build graph first!");
    return;
  }

  result = {
    steps: bfsSteps(graph, startNode),
    complexity: "O(V + E)"
  };
}

else if (algorithm === "dfs") {
  if (!graph || Object.keys(graph).length === 0 || !startNode) {
    alert("Please build graph first!");
    return;
  }

  result = {
    steps: dfsSteps(graph, startNode),
    complexity: "O(V + E)"
  };
}
else if (algorithm === "knapsack") {
  if (!weights.length || !values.length || !capacity) {
  alert("Please set knapsack input first!");
  return;
}

result = {
  steps: knapsackSteps([...weights], [...values], capacity),
  complexity: "O(n * W)"
};
}
else if (algorithm === "nqueens") {
  if (!nQueensSize) {
  alert("Please set N first!");
  return;
}

result = {
  steps: nQueensSteps(nQueensSize),
  complexity: "O(N!)"
};
}else if (algorithm === "lcs") {

  if (!string1 || !string2) {
    alert("Set LCS input first!");
    return;
  }

  result = {
    steps: lcsSteps(string1, string2),
    complexity: "O(n × m)"
  };
}else if (algorithm === "lis") {

  if (!array.length) {
    alert("Enter array first!");
    return;
  }

  result = {
    steps: lisSteps([...array]),
    complexity: "O(n²)"
  };
}else if (algorithm === "mcm") {
   
  if (!mcmArray.length) {
    alert("Set MCM input first!");
    return;
  }

  result = {
    steps: mcmSteps(mcmArray),
    complexity: "O(n³)"
  };
}

  setSteps(result.steps);
  setComplexity(result.complexity);
  setI(0);

  return result.steps;
};

const startAutoPlay = (stepsData, startIndex) => {
  const id = setInterval(() => {
    setI((prev) => {
      if (prev >= stepsData.length - 1) {
        clearInterval(id);
        return prev;
      }
      return prev + 1;
    });
  }, speed);

  setIntervalId(id);
};

const play = () => {
  if (intervalId) return;

  if (!steps || steps.length === 0) {
    const newSteps = start();

    if (!newSteps || newSteps.length === 0) return;

    setTimeout(() => {
      startAutoPlay(newSteps, 0);
    }, 100);

    return;
  }

  startAutoPlay(steps, i);
};

const pause = () => {
  clearInterval(intervalId);
  setIntervalId(null);
};

const reset = () => {
  clearInterval(intervalId);
  setIntervalId(null);

  setSteps([]);
  setI(0);
};

const next = () => {
  setI((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
};

  const step = steps[i] || {};
const safeArray = step.array || array;
const safeActive = step.active || [];

const metrics = step?.metrics || {};

  return (
    <MainLayout
    
sidebar={
<Sidebar
  setArray={setArray}
  setAlgorithm={setAlgorithm}
  algorithm={algorithm}
  setGraph={setGraph}
  setStartNode={setStartNode}
  setDirectedGraph={setIsDirected}
    setWeights={setWeights}
  setValues={setValues}
  setCapacity={setCapacity} 
  setNQueensSize={setNQueensSize} 
  setString1={setString1}
setString2={setString2}
setMcmArray={setMcmArray}
/>
}
      
center={
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  }}>

   
    <div style={{
      marginBottom: "20px",
      padding: "10px 20px",
      background: "#111",
      border: "1px solid #444",
      borderRadius: "8px"
    }}>
      {step.message || "Click Start button given below"}
    </div>
    
    {algorithm === "merge" ? (
  <div style={{
    display: "flex",
    gap: "40px",
    width: "100%",
    justifyContent: "space-around"
  }}>
    <RecursionTree
      tree={steps[0]?.tree}
      activeNode={step.activeNode}
    />
    <ArrayVisualizer
      array={safeArray}
      active={safeActive}
      stepType={step.type}
      range={step.range}
    />
  </div>
) :(algorithm=="knapsack" || algorithm=="lcs")?(
  <DPTable step={step} />
): (algorithm === "bfs" || algorithm === "dfs") ? (
  <GraphVisualizer step={step} graph={graph} directed={isDirected}/>
) : algorithm === "nqueens" ? (
  <NQueensBoard step={step} />
): algorithm === "lis" ? (

  <LISVisualizer step={step} />

) : algorithm === "mcm" ? (
   
  <MCMVisualizer step={step} />

):(
  <ArrayVisualizer
    array={safeArray}
    active={safeActive}
    stepType={step.type}
    range={step.range}
  />
)}
  

  </div>
}

 right={
  <>
    <MetricsPanel 
  metrics={metrics} 
  algorithm={algorithm} 
  complexity={complexity}
/>
    <PseudocodePanel algorithm={algorithm} stepType={step.type} />
    <ColorLegend />
  </>
}
      
   bottom={
  <Controls
    start={start}
    next={next}
    play={play}
    pause={pause}
    reset={reset}
    speed={speed}
    setSpeed={setSpeed}
  />
}
    />
  );

}