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

export default function App() {
  const [array, setArray] = useState([4, 2, 7, 1, 5, 3]);
  const [steps, setSteps] = useState([]);
  const [i, setI] = useState(0);
const [intervalId, setIntervalId] = useState(null);
const [speed, setSpeed] = useState(2000);
const [algorithm, setAlgorithm] = useState("merge");
const [complexity, setComplexity] = useState("");
const [graph, setGraph] = useState({});
const [startNode, setStartNode] = useState("");
const [isDirected, setIsDirected] = useState(false);

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
  setDirectedGraph={setIsDirected}   // 🔥 FIX
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
      {step.message || "Click Start"}
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
) : (algorithm === "bfs" || algorithm === "dfs") ? (
  <GraphVisualizer step={step} graph={graph} directed={isDirected}/>
) : (
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