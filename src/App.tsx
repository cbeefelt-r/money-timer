import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const pastelTeal = '#7fd8be';
const pastelPink = '#f7a8a8';
const pastelYellow = '#fff5ba';
const pastelPurple = '#b5ead7';
const pastelBlue = '#a0c4ff';

function pad(num: number) {
  return num.toString().padStart(2, '0');
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [rate, setRate] = useState(42); // default $42/hr
  const [isStopped, setIsStopped] = useState(false);
  // Use number type for intervalRef to avoid NodeJS namespace issue
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && !isStopped) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isStopped]);

  const handleRestart = () => {
    setSeconds(0);
    setIsRunning(false);
    setIsStopped(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsStopped(true);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRate(Number(e.target.value));
  };

  const money = ((seconds / 3600) * rate).toFixed(2);

  return (
    <div className="timer-container">
      <div className="rate-input">
        <label htmlFor="rate">$ per hour:</label>
        <input
          id="rate"
          type="number"
          min="0"
          step="0.01"
          value={rate}
          onChange={handleRateChange}
          disabled={isStopped}
        />
      </div>
      <div className="display">
        <div className="time">{formatTime(seconds)}</div>
        <div className="money" style={{ minHeight: '1.5rem', marginTop: '0rem', fontSize: '1.2rem' }}>
          {isStopped ? `$${money}` : ''}
        </div>
      </div>
      <button className="restart-btn" onClick={handleRestart} title="Restart">
        ↻
      </button>
      <button
        className="stop-btn"
        onClick={handleStop}
        title="Stop"
        disabled={isStopped || (!isRunning && seconds === 0)}
      >
        ■
      </button>
      <button
        className="start-pause-btn"
        onClick={() => setIsRunning((r) => !r)}
        aria-label={isRunning ? 'Pause' : 'Start'}
        disabled={isStopped}
      >
        {isRunning ? (
          // Pause icon
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="5" width="5" height="18" rx="2" fill="#3a6351"/>
            <rect x="17" y="5" width="5" height="18" rx="2" fill="#3a6351"/>
          </svg>
        ) : (
          // Play icon
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="8,5 23,14 8,23" fill="#3a6351"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default App;
