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
    if (!graph || !startNode) {
      alert("Please build graph first!");
      return;
    }
    result = { steps: bfsSteps(graph, startNode), complexity: "O(V + E)" };
  }
  else if (algorithm === "dfs") {
    if (!graph || !startNode) {
      alert("Please build graph first!");
      return;
    }
    result = { steps: dfsSteps(graph, startNode), complexity: "O(V + E)" };
  }

  setSteps(result.steps);
  setComplexity(result.complexity);
  setI(0);
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

  if (steps.length === 0) {
    const s = mergeSortSteps([...array]);
    setSteps(s);
    setI(0);

    setTimeout(() => startAutoPlay(s, 0), 100);
  } else {
    startAutoPlay(steps, i);
  }
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
        />
      </div>
    ) : (
      <ArrayVisualizer
        array={safeArray}
        active={safeActive}
      />
    )}
    {(algorithm === "bfs" || algorithm === "dfs") && (
  <GraphVisualizer step={step} />
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