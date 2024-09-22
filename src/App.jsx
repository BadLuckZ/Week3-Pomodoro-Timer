import { useState } from "react";

function App() {
  const [timeSession, setTimeSession] = useState(25);
  const [timeBreak, setTimeBreak] = useState(5);

  return (
    <>
      <h1 className="text-smoke text-center">Pomodoro Timer</h1>
      <div className="bg-redwood flex flex-col items-center px-[40px]">
        <div className="setting-box">
          <h2>Session</h2>
          <h3>{timeSession}</h3>
          <div className="flex justify-between w-full">
            <button className="btn">Start</button>
            <button className="btn">Reset</button>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="setting-box">
            <h2>Session Timer</h2>
            <h3>{timeSession}</h3>
            <div className="flex justify-between w-full">
              <button
                className="rounded-btn"
                onClick={() => {
                  setTimeSession((time) => time - 1);
                }}
                disabled={timeSession == 0}
              >
                -
              </button>
              <button
                className="rounded-btn"
                onClick={() => {
                  setTimeSession((time) => time + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="setting-box">
            <h2>Break Timer</h2>
            <h3>{timeBreak}</h3>
            <div className="flex justify-between w-full">
              <button
                className="rounded-btn"
                onClick={() => {
                  setTimeBreak((time) => time - 1);
                }}
                disabled={timeBreak == 0}
              >
                -
              </button>
              <button
                className="rounded-btn"
                onClick={() => {
                  setTimeBreak((time) => time + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
