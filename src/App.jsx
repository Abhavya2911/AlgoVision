import React, { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Sidebar from "./components/Sidebar";
import ArrayVisualizer from "./components/ArrayVisualizer";
import Controls from "./components/Controls";
import ExplanationPanel from "./components/ExplanationPanel";
import RecursionTree from "./components/RecursionTree"; 
import { mergeSortSteps } from "./algorithms/mergeSort";
import InputPanel from "./components/InputPanel";
import MetricsPanel from "./components/MetricsPanel";
import PseudocodePanel from "./components/PseudocodePanel";
import { quickSortSteps } from "./algorithms/quickSort";
import { linearSearchSteps } from "./algorithms/linearSearch";
import { binarySearchSteps } from "./algorithms/binarySearch";
import { countingSortSteps } from "./algorithms/countingSort";
import ColorLegend from "./components/ColorLegend";

export default function App() {
  const [array, setArray] = useState([4, 2, 7, 1, 5, 3]);
  const [steps, setSteps] = useState([]);
  const [i, setI] = useState(0);
const [intervalId, setIntervalId] = useState(null);
const [speed, setSpeed] = useState(2000);
const [algorithm, setAlgorithm] = useState("merge");
const [complexity, setComplexity] = useState("");

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
    setArray={(arr) => {
      setArray(arr);
      setSteps([]);
      setI(0);
    }}
    setAlgorithm={setAlgorithm}
    algorithm={algorithm}  
  />
}
      
center={
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  }}>

    {/* STEP MESSAGE */}
    <div style={{
      marginBottom: "20px",
      padding: "10px 20px",
      background: "#111",
      border: "1px solid #444",
      borderRadius: "8px"
    }}>
      {step.message || "Click Start"}
    </div>

    {/* 🔥 CONDITIONAL LAYOUT */}
    {algorithm === "merge" ? (
      <div style={{
        display: "flex",
        gap: "40px",
        width: "100%",
        justifyContent: "space-around"
      }}>
        {/* TREE */}
        <RecursionTree
          tree={steps[0]?.tree}
          activeNode={step.activeNode}
        />

        {/* ARRAY */}
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