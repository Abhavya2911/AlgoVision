export default function Controls({
  start,
  next,
  play,
  pause,
  reset,
  speed,
  setSpeed
}) {
  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={next}>Next</button>
      
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>

      <div style={{ marginTop: "10px" }}>
        <label>Speed: </label>
        <input
          type="range"
          min="1500"
          max="3000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  );
}